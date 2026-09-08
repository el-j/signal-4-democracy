import deTranslations from '../../translations/de.json';

export type TranslationDictionary = Record<string, string>;

// Flat dictionary of all translation strings in the "i18n" sheet
export const translations: TranslationDictionary = (deTranslations as any)?.i18n ?? {};

/**
 * Retrieves a translated string by its key (case-insensitive).
 * Returns the fallback string if the key does not exist.
 */
export function t(key: string, fallback?: string): string {
	const normalizedKey = key.toLowerCase().trim();
	const val = translations[normalizedKey];
	if (val !== undefined && val !== null && val.trim().length > 0) {
		return val;
	}
	return fallback !== undefined ? fallback : key;
}

export interface PillarItem {
	number: string;
	title: string;
	tagline: string;
	points: string[];
	example: string;
}

export function getPillars(): PillarItem[] {
	return [
		{
			number: t('pillar_1_number', '01'),
			title: t('pillar_1_title', 'Digitale Aufklärung & Vernetzung'),
			tagline: t('pillar_1_tagline', 'Wissen teilen. Desinformation stoppen. Solidarität sichtbar machen.'),
			points: [
				t('pillar_1_point_1', 'Fakten statt Fake News: recherchierte Informationen gegen rechte Narrative — und positive Geschichten dagegen.'),
				t('pillar_1_point_2', 'Vernetzung, die wirkt: auf Signal und Threads bringen wir Engagierte für schlagkräftige Kampagnen zusammen.'),
				t('pillar_1_point_3', 'Ziel: Bis 2027 100.000 Menschen mit faktenbasierten Inhalten erreichen — und zum Mitmachen motivieren.'),
			],
			example: t('pillar_1_example', 'Unsere virale Kampagne #HeimatFürAlle: 78% der Befragten fühlten sich danach besser informiert.'),
		},
		{
			number: t('pillar_2_number', '02'),
			title: t('pillar_2_title', 'Politisches Engagement für Gerechtigkeit'),
			tagline: t('pillar_2_tagline', 'Rechtsextremismus wächst dort, wo Menschen abgehängt werden. Wir ändern das.'),
			points: [
				t('pillar_2_point_1', 'Soziale Sicherheit für alle: Bedingungsloses Grundeinkommen in Pilotregionen, finanziert durch eine Vermögenssteuer auf Millionenerben.'),
				t('pillar_2_point_2', 'Gerechte Steuern: Reiche und Konzerne leisten ihren fairen Beitrag — für Schulen, Krankenhäuser und Klimaschutz.'),
				t('pillar_2_point_3', 'Mobilität für alle: kostenloser ÖPNV im ländlichen Raum, finanziert durch z.B. eine Stadtmaut.'),
			],
			example: t('pillar_2_example', 'Mit lokalen Gewerkschaften haben wir 12 Kommunen von Bürgerräten für gerechte Fördergelder überzeugt.'),
		},
		{
			number: t('pillar_3_number', '03'),
			title: t('pillar_3_title', 'Gelebte Solidarität vor Ort'),
			tagline: t('pillar_3_tagline', 'Demokratie entsteht im Miteinander — nicht im Netz.'),
			points: [
				t('pillar_3_point_1', 'Aktionen, die verbinden: Müllsammeln, Dorfplatz-Verschönerung, Pop-up-Cafés mit Diskussionen über Demokratie.'),
				t('pillar_3_point_2', 'Partnerschaften auf Augenhöhe: mit Feuerwehren, Sportvereinen und Kulturinitiativen für ein lebendiges Land.'),
				t('pillar_3_point_3', 'Sichtbare Veränderung: 1.000 lokale Projekte bis 2030 — von renovierten Sportplätzen bis zu solidarischen Festen.'),
			],
			example: t('pillar_3_example', 'Unsere #SolidaritätsKilometer-Tour durch 50 Dörfer brachte über 2.000 Menschen zusammen — und 15 neue Ortsgruppen.'),
		},
	];
}

export interface RuleItem {
	title: string;
	text: string;
}

export function getRules(): RuleItem[] {
	return [
		{
			title: t('rule_1_title', 'Kein Platz für Hass'),
			text: t('rule_1_text', 'Rassismus, Antisemitismus, Sexismus oder Queerfeindlichkeit führen zum sofortigen Ausschluss.'),
		},
		{
			title: t('rule_2_title', 'Fakten statt Gerüchte'),
			text: t('rule_2_text', 'Wir teilen nur geprüfte Informationen — keine Panikmache, keine Verschwörungstheorien.'),
		},
		{
			title: t('rule_3_title', 'Sicherheit geht vor'),
			text: t('rule_3_text', 'Keine Screenshots oder Weiterleitungen aus der Signal-Gruppe ohne Absprache.'),
		},
		{
			title: t('rule_4_title', 'Fokus auf das Wesentliche'),
			text: t('rule_4_text', 'Keine parteipolitischen Grabenkämpfe — wir konzentrieren uns auf unsere drei Säulen.'),
		},
	];
}

export function getVisionGoals(): string[] {
	return [
		t('vision_goal_1', '1.000 lokale Gruppen in ganz Deutschland'),
		t('vision_goal_2', 'Eine Bewegung, die Rechtsextremismus die Luft abwürgt'),
		t('vision_goal_3', 'Eine Gesellschaft, in der Solidarität und Gerechtigkeit selbstverständlich sind'),
	];
}

export interface DownloadItem {
	name: string;
	file: string;
	format: string;
	size: string;
	desc: string;
}

export function getDownloads(): DownloadItem[] {
	return [
		{
			name: t('download_item_1_name', 'Flyer'),
			file: '/downloads/flyer.jpg',
			format: 'JPG',
			size: '390 KB',
			desc: t('download_item_1_desc', 'Der Signal-für-Demokratie-Flyer zum Ausdrucken und Weitergeben.'),
		},
		{
			name: t('download_item_2_name', 'Logo'),
			file: '/downloads/logo.svg',
			format: 'SVG',
			size: '2 KB',
			desc: t('download_item_2_desc', 'Unser Logo als Vektorgrafik — verlustfrei skalierbar für Web und Druck.'),
		},
		{
			name: t('download_item_3_name', 'Design-Entwurf (Vektor)'),
			file: '/downloads/entwurf-design.svg',
			format: 'SVG',
			size: '2,1 MB',
			desc: t('download_item_3_desc', 'Der vollständige Gestaltungsentwurf als SVG-Datei.'),
		},
		{
			name: t('download_item_4_name', 'Design-Entwurf (Druckformat)'),
			file: '/downloads/entwurf-design.eps',
			format: 'EPS',
			size: '1,1 MB',
			desc: t('download_item_4_desc', 'Der Gestaltungsentwurf im EPS-Format für professionellen Druck.'),
		},
	];
}

export interface InitiativeItem {
	name: string;
	url: string;
	domain: string;
	tag: string;
}

export function getInitiatives(): InitiativeItem[] {
	return [
		{
			name: t('hero_initiative_1_name', 'Widersetzen'),
			url: 'https://widersetzen.com',
			domain: 'widersetzen.com',
			tag: t('hero_initiative_1_tag', 'Aktionsbündnis'),
		},
		{
			name: t('hero_initiative_2_name', 'Zusammen gegen Rechts'),
			url: 'https://zusammen-gegen-rechts.org',
			domain: 'zusammen-gegen-rechts.org',
			tag: t('hero_initiative_2_tag', 'Demokratie-Bündnis'),
		},
		{
			name: t('hero_initiative_3_name', 'Omas gegen Rechts'),
			url: 'https://omasgegenrechts.de',
			domain: 'omasgegenrechts.de',
			tag: t('hero_initiative_3_tag', 'Zivilcourage'),
		},
		{
			name: t('hero_initiative_4_name', 'Campact'),
			url: 'https://campact.de',
			domain: 'campact.de',
			tag: t('hero_initiative_4_tag', 'Bürgerbewegung'),
		},
		{
			name: t('hero_initiative_5_name', 'Correctiv'),
			url: 'https://correctiv.org',
			domain: 'correctiv.org',
			tag: t('hero_initiative_5_tag', 'Recherche-Netzwerk'),
		},
	];
}
