
import { normalizePath, Notice, TAbstractFile, TFile, TFolder, Vault } from "obsidian";
import { ExcelProSettings } from "../common/setting";

/**
 * Splits a full path including a folderpath and a filename into separate folderpath and filename components
 * @param filepath
 */

export function splitFolderAndFilename(filepath: string): {
  folderpath: string;
  filename: string;
  basename: string;
} {
  const lastIndex = filepath.lastIndexOf("/");
  const filename = lastIndex == -1 ? filepath : filepath.substring(lastIndex + 1);
  return {
    folderpath: normalizePath(filepath.substring(0, lastIndex)),
    filename,
    basename: filename.replace(/\.[^/.]+$/, ""),
  };
}


/**
 * Generates the image filename based on the excalidraw filename
 * @param path - path to the excalidraw file
 * @param extension - extension without the preceeding "."
 * @returns 
 */
export function getIMGFilename(path: string, extension: string): string {
  return `${path.substring(0, path.lastIndexOf("."))}.${extension}`;
}

/**
 * Create new file, if file already exists find first unique filename by adding a number to the end of the filename
 * @param filename
 * @param folderpath
 * @returns
 */
export function getNewUniqueFilepath(
  vault: Vault,
  filename: string,
  folderpath: string,
): string {
  let fname = normalizePath(`${folderpath}/${filename}`);
  let file: TAbstractFile | null = vault.getAbstractFileByPath(fname);
  let i = 0;
  const extension = filename.endsWith("univer.md")
    ? ".univer.md"
    : filename.slice(filename.lastIndexOf("."));
  while (file) {
    fname = normalizePath(
      `${folderpath}/${filename.slice(
        0,
        filename.lastIndexOf(extension),
      )}_${i}${extension}`,
    );
    i++;
    file = vault.getAbstractFileByPath(fname);
  }
  return fname;
}

export function getExcelFilename(settings: ExcelProSettings): string {
  return (
    settings.excelFilenamePrefix +
    (settings.excelFilenameDateTime !== ""
      ? window.moment().format(settings.excelFilenameDateTime)
      : "") +
    ".univer.md"
  );
}


/**
 * Open or create a folderpath if it does not exist
 * @param folderpath
 */
export async function checkAndCreateFolder(vault: Vault, folderpath: string) {
  folderpath = normalizePath(folderpath);
  //https://github.com/zsviczian/obsidian-excalidraw-plugin/issues/658
  //@ts-ignore
  const folder = vault.getAbstractFileByPathInsensitive(folderpath);
  if (folder && folder instanceof TFolder) {
    return;
  }
  if (folder && folder instanceof TFile) {
    new Notice(`The folder cannot be created because it already exists as a file: ${folderpath}.`)
  }
  await vault.createFolder(folderpath);
}
