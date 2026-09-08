#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
	CryptPadClient,
	createCryptPadSheetInputProvider,
	runProviderPipeline,
	writeTranslationFiles,
	writeLocalesFile,
	writeLanguageDataFile,
	convertFromDataJsonFormat,
} from '@el-j/google-sheet-translations';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

function parseArgs(argv) {
	const args = { _: [] };
	for (let i = 2; i < argv.length; i++) {
		const arg = argv[i];
		if (arg.startsWith('--')) {
			const [key, val] = arg.slice(2).split('=');
			args[key] = val !== undefined ? val : true;
		} else {
			args._.push(arg);
		}
	}
	return args;
}

function printHelp() {
	console.log(`
  signal-4-democracy i18n CryptPad Sync Tool

  USAGE:
    node --env-file=.env scripts/sync-data.mjs [options]

  OPTIONS:
    --url=URL            CryptPad sheet URL (defaults to CRYPTPAD_URL in .env)
    --password=PASS      CryptPad password (defaults to CRYPTPAD_PASSWORD in .env)
    --table-name=NAME    Table/sheet title (defaults to "i18n")
    --export-seed        Generate and output TSV data to paste into CryptPad
    --dry-run            Test fetch and inspect remote CryptPad sheet without saving
    --help, -h           Show this help message
`);
}

async function main() {
	const args = parseArgs(process.argv);
	if (args.help || args.h) {
		printHelp();
		return;
	}

	if (args['export-seed']) {
		const seedPath = path.join(ROOT_DIR, 'src/data/i18n-seed.tsv');
		if (fs.existsSync(seedPath)) {
			console.log(fs.readFileSync(seedPath, 'utf8'));
		} else {
			console.error('Seed file not found at:', seedPath);
		}
		return;
	}

	const url = args.url || process.env.CRYPTPAD_URL;
	const password = args.password || process.env.CRYPTPAD_PASSWORD;
	const tableName = args['table-name'] || 'i18n';

	if (!url) {
		console.error('Error: No CryptPad URL provided. Set CRYPTPAD_URL in .env or pass --url=...');
		process.exit(1);
	}

	console.log(`Connecting to CryptPad sheet (E2EE WebSocket)...`);
	console.log(`URL: ${url}`);
	if (password) {
		console.log(`Password: [PROTECTED]`);
	}

	try {
		const client = new CryptPadClient({
			url,
			password,
			timeoutMs: 15000,
		});

		const sheetResult = await client.fetchSheetData();
		const cellCount = Object.keys(sheetResult.cells || {}).length;
		const rows = sheetResult.rows || [];

		console.log(`Retrieved CryptPad pad. Detected ${cellCount} cell(s) and ${rows.length} row(s).`);

		if (rows.length === 0) {
			console.warn(`
⚠️  The CryptPad sheet currently has no populated translation rows!
To populate the sheet:
  1. Open your CryptPad sheet in the browser: ${url}
  2. Copy the contents of "src/data/i18n-seed.tsv" or run:
     node --env-file=.env scripts/sync-data.mjs --export-seed
  3. Paste directly into cell A1 in the CryptPad spreadsheet.
  4. Run "npm run sync:data" again to pull the updated data!
`);
			return;
		}

		if (args['dry-run']) {
			console.log('Dry run preview. Sample rows:', rows.slice(0, 5));
			return;
		}

		const inputProvider = createCryptPadSheetInputProvider({
			url,
			password,
			tableName,
			timeoutMs: 15000,
		});

		const pipelineResult = await runProviderPipeline({
			inputProvider,
			tableNames: [tableName],
		});

		const translationsOutputDir = path.join(ROOT_DIR, 'translations');
		const localesOutputPath = path.join(ROOT_DIR, 'src/i18n/locales.ts');
		const dataJsonPath = path.join(ROOT_DIR, 'src/lib/languageData.json');

		writeTranslationFiles(pipelineResult.translations, pipelineResult.locales, translationsOutputDir);
		writeLocalesFile(pipelineResult.locales, pipelineResult.localeMapping, localesOutputPath);
		if (pipelineResult.locales.length > 0) {
			writeLanguageDataFile(pipelineResult.translations, pipelineResult.locales, dataJsonPath);
		}

		console.log(`✅ Successfully synchronized ${pipelineResult.locales.length} locale(s) from CryptPad!`);
	} catch (err) {
		console.error('Error during CryptPad sync:', err instanceof Error ? err.message : err);
		process.exit(1);
	}
}

main();
