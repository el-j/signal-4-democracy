# Signal für Demokratie

Website für **Signal für Demokratie** – eine Bewegung für eine solidarische Heimat in Deutschland.
*Demokratie. Gerechtigkeit. Nachbarschaft.*

Das inhaltliche Leitbild der Bewegung steht in [MANIFEST.md](MANIFEST.md). Dieses README beschreibt das Website-Projekt selbst.

## Tech-Stack

Statische Website mit [Astro](https://astro.build), keine zusätzlichen UI-Frameworks.

## Projektstruktur

```
├── material/                     Quellmaterial (Logo, Flyer, Design-Entwürfe)
├── public/
│   ├── logo.svg                  Logo für Header/Footer
│   ├── favicon.svg
│   └── downloads/                Dateien für den Download-Bereich der Seite
├── src/
│   ├── components/
│   │   ├── Header.astro          Sticky Navigation
│   │   ├── Footer.astro          Footer mit Kontakt-/Link-Spalten
│   │   ├── Ticker.astro          Scrollender Hashtag-Banner
│   │   ├── ui/                   Kleine, wiederverwendbare Bausteine
│   │   │   ├── Eyebrow.astro     Kleines Badge über Überschriften
│   │   │   ├── SectionHeading.astro
│   │   │   ├── Button.astro      Button in den Varianten primary/pink/outline
│   │   │   └── Divider.astro     Wellenförmiger Section-Übergang (SVG)
│   │   └── sections/             Ein Astro-Component pro Seitenabschnitt
│   │       ├── Hero.astro
│   │       ├── Warum.astro
│   │       ├── Saeulen.astro
│   │       ├── Regeln.astro
│   │       ├── Vision.astro
│   │       ├── Mitmachen.astro
│   │       └── Download.astro
│   ├── i18n/                     Übersetzungs- und Lokalisierungsdateien
│   │   ├── locales.ts            Enthält alle verfügbaren Sprachlokalisierungen
│   │   └── index.ts              Helfer `t()`
│   ├── lib/                      languageData.json
│   ├── layouts/
│   │   └── Layout.astro          HTML-Grundgerüst, Fonts, Hintergrund-Blobs
│   ├── styles/
│   │   └── global.css            Farbvariablen, Reset, globale Utility-Klassen
│   ├── scripts/
│   │   └── interactions.js       Scroll-Reveal & Header-Scroll-Zustand
│   └── pages/
│       └── index.astro           Startseite: Inhalte (Daten) + Abschnitte zusammensetzen
├── translations/               Übersetzungsdateien für die CryptPad-Synchronisation (z. B. `de-DE.json`, `en-GB.json`)
└── astro.config.mjs
```

Jeder Seitenabschnitt (Hero, Warum, Säulen, …) ist eine eigene Komponente unter
`src/components/sections/` mit eigenem, gekapseltem `<style>`-Block. Wiederkehrende
UI-Elemente wie Badges, Buttons oder der Section-Divider liegen als kleine
Komponenten unter `src/components/ui/`. Globale Design-Tokens (Farben, Radius,
Schriften) und Utility-Klassen (`.btn`, `.card`, `.section`, …) leben zentral in
[src/styles/global.css](src/styles/global.css).

## Inhalte & Übersetzung via CryptPad (i18n)

Alle Texte der Website werden über `@el-j/google-sheet-translations` verwaltet und sind synchronisiert mit einer Ende-zu-Ende verschlüsselten CryptPad-Tabelle.

### CryptPad Synchronisation

Die Befehle nutzen das offizielle `gst-cryptpad`-Tooling des Pakets (Zugangsdaten in `.env`):

```sh
npm run i18n:pull      # Übersetzungen aus CryptPad herunterladen (auch: npm run sync:data)
npm run i18n:push      # Lokale Übersetzungen nach CryptPad hochladen
npm run i18n:sync      # Bidirektionaler Abgleich mit Konfliktauflösung
npm run i18n:inspect   # Headless Status, Tab-Namen und Zeilenanzahl prüfen
```

- Die Übersetzungsdaten liegen typisiert und exportiert in `src/i18n/index.ts` mit dem Helfer `t(key, fallback)`.
- Komponenten und Abschnitte importieren `t()`.
- Bei Anpassungen in der CryptPad-Tabelle einfach `npm run i18n:pull` ausführen und neu bauen (`npm run build`).

## Entwicklung

```sh
npm install
npm run dev       # Dev-Server, siehe Ausgabe für die lokale URL
npm run build     # Statischen Build nach dist/ erzeugen
npm run preview   # Build lokal testen
```

## Deployment

Ein Push nach `main` löst automatisch [.github/workflows/deploy.yml](.github/workflows/deploy.yml) aus:
Der Build (`npm run build`) wird auf den `gh-pages`-Branch veröffentlicht. `astro.config.mjs`
ist auf `site`/`base` für `https://el-j.github.io/signal-4-democracy/` eingestellt — bei einer
eigenen Domain oder einem anderen Repo-Namen müssen diese Werte angepasst werden.
