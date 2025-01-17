import "@univerjs/design/lib/index.css";
import "@univerjs/ui/lib/index.css";
import "@univerjs/sheets-ui/lib/index.css";
import "@univerjs/sheets-formula/lib/index.css";
import "@univerjs/sheets-numfmt/lib/index.css";
import "@univerjs/find-replace/lib/index.css";
import "@univerjs/find-replace/lib/index.css";

import { LocaleType, LogLevel, Univer } from "@univerjs/core";
import { defaultTheme } from "@univerjs/design";
import { UniverDocsPlugin } from "@univerjs/docs";
import { UniverDocsUIPlugin } from "@univerjs/docs-ui";
import { UniverFormulaEnginePlugin } from "@univerjs/engine-formula";
import { UniverRenderEnginePlugin } from "@univerjs/engine-render";
import { UniverSheetsPlugin } from "@univerjs/sheets";
import { UniverSheetsFormulaPlugin } from "@univerjs/sheets-formula";
import { UniverSheetsNumfmtPlugin } from "@univerjs/sheets-numfmt";
import { UniverSheetsUIPlugin } from "@univerjs/sheets-ui";
import { UniverUIPlugin } from "@univerjs/ui";
import { locales } from "./locale";

export function createUniver(
	id: string,
	locale = LocaleType.EN_US,
	header = true
) {
	const univer = new Univer({
		theme: defaultTheme,
		locale: locale,
		logLevel: LogLevel.VERBOSE,
		locales,
		id: id,
	});

	univer.registerPlugin(UniverDocsPlugin, {
		hasScroll: false,
	});
	univer.registerPlugin(UniverDocsUIPlugin);
	univer.registerPlugin(UniverRenderEnginePlugin);
	univer.registerPlugin(UniverUIPlugin, {
		container: id,
		header: header,
		footer: true,
	});
	univer.registerPlugin(UniverSheetsPlugin);
	univer.registerPlugin(UniverSheetsUIPlugin);

	univer.registerPlugin(UniverSheetsNumfmtPlugin);
	univer.registerPlugin(UniverFormulaEnginePlugin);
	univer.registerPlugin(UniverSheetsFormulaPlugin);

	return univer;
}

export function createUniverNotUI(id: string) {
	const univer = new Univer();

	univer.registerPlugin(UniverSheetsPlugin);
	univer.registerPlugin(UniverFormulaEnginePlugin);
	univer.registerPlugin(UniverSheetsFormulaPlugin);

	return univer;
}
