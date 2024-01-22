import {
  GOOGLE_SHEET_RECOMMENDATIONS_API_KEY,
  RECOMMENDATIONS_GOOGLE_SHEET_ID,
} from '~/config';

export async function getCellContentFromGoogleSheet({
  sheetName,
  cellRange,
}: {
  sheetName: string;
  cellRange: string;
}): Promise<string[]> {
  const GOOGLE_API_KEY = GOOGLE_SHEET_RECOMMENDATIONS_API_KEY;
  const cellLink = `https://sheets.googleapis.com/v4/spreadsheets/${RECOMMENDATIONS_GOOGLE_SHEET_ID}/values/${sheetName}!${cellRange}?key=${GOOGLE_API_KEY}`;
  return await fetch(cellLink)
    .then(async (res) => await res.json())
    .then((cell) => {
      return cell;
    });
}
