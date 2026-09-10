import locales from './locales';

export type TranslationDictionary = Record<string, string>;
export type LocaleCode = (typeof locales)[number];

export const DEFAULT_LOCALE: LocaleCode = 'de-de';

const localeSet = new Set(locales);

let currentLocale: LocaleCode = DEFAULT_LOCALE;

const localeJsonFiles = import.meta.glob('../../translations/*.json', { eager: true }) as Record<string, any>;

const localeJsonByCode = Object.fromEntries(
	Object.entries(localeJsonFiles)
		.map(([filePath, content]) => {
			const match = filePath.match(/\/([^/]+)\.json$/);
			if (!match) return null;
			return [match[1].toLowerCase(), content] as const;
		})
		.filter((entry): entry is readonly [string, any] => entry !== null),
);

export const DEFAULT_SHEET = 'hero';

type SheetDictionaries = Record<string, TranslationDictionary>;

/**
 * Extracts one flat key-value dictionary per sheet from a locale's JSON file.
 * Each top-level key (other than "i18n", the locale display-name labels) is a
 * separate CryptPad sheet/page, e.g. "hero", "impressum", "datenschutz".
 */
function extractSheets(source: unknown): SheetDictionaries {
	const sheets: SheetDictionaries = {};
	if (!source || typeof source !== 'object') return sheets;

	for (const [sheetName, sheetValue] of Object.entries(source as Record<string, unknown>)) {
		if (sheetName === 'i18n' || !sheetValue || typeof sheetValue !== 'object') continue;

		const dict: TranslationDictionary = {};
		for (const [key, value] of Object.entries(sheetValue as Record<string, unknown>)) {
			if (typeof value === 'string') {
				dict[key.toLowerCase().trim()] = value;
			}
		}
		sheets[sheetName.toLowerCase().trim()] = dict;
	}
	return sheets;
}

const sheetsByLocale: Record<LocaleCode, SheetDictionaries> = Object.fromEntries(
	locales.map((locale) => [locale, extractSheets(localeJsonByCode[locale])]),
) as Record<LocaleCode, SheetDictionaries>;

const localeLabelsByUiLocale: Record<LocaleCode, Record<string, string>> = Object.fromEntries(
	locales.map((locale) => {
		const source = localeJsonByCode[locale];
		const labels = source && typeof source.i18n === 'object' ? source.i18n : {};
		return [locale, labels as Record<string, string>];
	}),
) as Record<LocaleCode, Record<string, string>>;

export function normalizeLocale(locale?: string): LocaleCode {
	const normalized = (locale ?? '').toLowerCase().trim();
	if (localeSet.has(normalized as LocaleCode)) {
		return normalized as LocaleCode;
	}
	return DEFAULT_LOCALE;
}

export function setLocale(locale?: string): LocaleCode {
	currentLocale = normalizeLocale(locale);
	return currentLocale;
}

export function getLocale(): LocaleCode {
	return currentLocale;
}

export function getLocaleFromPath(pathname: string): LocaleCode {
	const segments = pathname
		.split('/')
		.map((segment) => segment.toLowerCase().trim())
		.filter(Boolean);

	for (const segment of segments) {
		if (localeSet.has(segment as LocaleCode)) {
			return segment as LocaleCode;
		}
	}

	return DEFAULT_LOCALE;
}

export function localeToPathPrefix(locale?: string): string {
	const normalized = normalizeLocale(locale);
	return normalized === DEFAULT_LOCALE ? '' : `${normalized}/`;
}

export function localePath(basePath: string, locale?: string): string {
	const base = basePath.endsWith('/') ? basePath : `${basePath}/`;
	return `${base}${localeToPathPrefix(locale)}`;
}

export function getCurrentTranslations(sheet: string = DEFAULT_SHEET): TranslationDictionary {
	return sheetsByLocale[getLocale()]?.[sheet.toLowerCase().trim()] ?? {};
}

export function getLocaleLabel(locale: string, uiLocale?: string): string {
	const resolvedLocale = normalizeLocale(locale);
	const resolvedUiLocale = normalizeLocale(uiLocale);
	const localizedLabel = localeLabelsByUiLocale[resolvedUiLocale]?.[resolvedLocale];
	if (typeof localizedLabel === 'string' && localizedLabel.trim().length > 0) {
		return localizedLabel;
	}
	return resolvedLocale.toUpperCase();
}

/**
 * Retrieves a translated string by its key (case-insensitive) from the given
 * sheet (a top-level page key in the translation JSON, defaulting to "hero").
 * Returns the key itself if no value is found.
 */
export function t(key: string, sheet: string = DEFAULT_SHEET): string {
	const normalizedKey = key.toLowerCase().trim();
	const val = getCurrentTranslations(sheet)[normalizedKey];
	if (val !== undefined && val !== null && val.trim().length > 0) {
		return val;
	}
	return key;
}
