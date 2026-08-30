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
│   ├── layouts/
│   │   └── Layout.astro          HTML-Grundgerüst, Fonts, Hintergrund-Blobs
│   ├── styles/
│   │   └── global.css            Farbvariablen, Reset, globale Utility-Klassen
│   ├── scripts/
│   │   └── interactions.js       Scroll-Reveal & Header-Scroll-Zustand
│   └── pages/
│       └── index.astro           Startseite: Inhalte (Daten) + Abschnitte zusammensetzen
└── astro.config.mjs
```

Jeder Seitenabschnitt (Hero, Warum, Säulen, …) ist eine eigene Komponente unter
`src/components/sections/` mit eigenem, gekapseltem `<style>`-Block. Wiederkehrende
UI-Elemente wie Badges, Buttons oder der Section-Divider liegen als kleine
Komponenten unter `src/components/ui/`. Globale Design-Tokens (Farben, Radius,
Schriften) und Utility-Klassen (`.btn`, `.card`, `.section`, …) leben zentral in
[src/styles/global.css](src/styles/global.css).

## Entwicklung

```sh
npm install
npm run dev       # Dev-Server, siehe Ausgabe für die lokale URL
npm run build     # Statischen Build nach dist/ erzeugen
npm run preview   # Build lokal testen
```

## Inhalte & Material pflegen

- Texte der Seite basieren auf [MANIFEST.md](MANIFEST.md). Listen-Inhalte (Säulen, Regeln,
  Vision-Ziele, Downloads) werden als Daten-Arrays in [src/pages/index.astro](src/pages/index.astro)
  gepflegt und als Props an die jeweilige Section-Komponente übergeben.
- Platzhalter für Kontakt, Spenden-Link, Threads/Signal-Handles in [src/components/Footer.astro](src/components/Footer.astro)
  und in [src/components/sections/Mitmachen.astro](src/components/sections/Mitmachen.astro) sind noch mit echten Angaben zu ersetzen.
- Neue Downloads (z. B. aktualisierter Flyer) unter `public/downloads/` ablegen und in der
  `downloads`-Liste in [src/pages/index.astro](src/pages/index.astro) verlinken.
- Farbschema (Grasgrün & Hellrosa), Radius, Schriften etc. sind als CSS-Variablen in
  [src/styles/global.css](src/styles/global.css) definiert — dort ändern wirkt sich auf die ganze Seite aus.
- Neuer Seitenabschnitt: eine Komponente unter `src/components/sections/` anlegen (Markup +
  eigener `<style>`-Block) und in [src/pages/index.astro](src/pages/index.astro) einbinden.

## Deployment

Ein Push nach `main` löst automatisch [.github/workflows/deploy.yml](.github/workflows/deploy.yml) aus:
Der Build (`npm run build`) wird auf den `gh-pages`-Branch veröffentlicht. `astro.config.mjs`
ist auf `site`/`base` für `https://el-j.github.io/signal-4-democracy/` eingestellt — bei einer
eigenen Domain oder einem anderen Repo-Namen müssen diese Werte angepasst werden.
