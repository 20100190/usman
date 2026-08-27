import fs from "node:fs/promises";
import { Workbook } from "@oai/artifact-tool";

const inputPath = "/Users/usman/Desktop/Usman CV/Job Applications/data-scientist-2026-08-26T20-37-47-511Z.csv";
const outputPath = "/Users/usman/Desktop/Usman CV/Job Applications/data-scientist-2026-08-26T20-37-47-511Z-triaged.csv";
const previewTopPath = "/Users/usman/Documents/ChatGPT/cv-triage/outputs/triage-20260826/triage-top.png";
const previewBottomPath = "/Users/usman/Documents/ChatGPT/cv-triage/outputs/triage-20260826/triage-bottom.png";

const decisions = new Map([
  ["4435449570", { score: 0, verdict: "REJECT", why: "Fluent German is mandatory." }],
  ["4442649414", { score: 0, verdict: "REJECT", why: "Very good German is required." }],
  ["4440554467", { score: 0, verdict: "REJECT", why: "German B2 is mandatory." }],
  ["4457700244", { score: 100, verdict: "APPLY", why: "Python, Linux, AI workflows, and data pipelines fully align." }],
  ["4459176713", { score: 100, verdict: "APPLY", why: "LLM and workflow automation experience matches this student role." }],
  ["4435442758", { score: 0, verdict: "REJECT", why: "Fluent German is mandatory." }],
  ["4457680777", { score: 0, verdict: "REJECT", why: "Business-fluent German is mandatory." }],
  ["4459346392", { score: "", verdict: "FLAG", why: "Language requirement not stated for German employer." }],
  ["4457951563", { score: 100, verdict: "APPLY", why: "Python and applied AI experience match every required technology." }],
  ["4418724267", { score: "", verdict: "FLAG", why: "No named technologies in the description." }],
  ["4457281379", { score: 0, verdict: "REJECT", why: "Business-fluent German is mandatory." }],
  ["4459179598", { score: 100, verdict: "APPLY", why: "Excel, Python, SQL, R, and Power BI all align." }],
  ["4457234515", { score: 0, verdict: "REJECT", why: "German B2 is mandatory." }],
  ["4440582586", { score: 100, verdict: "APPLY", why: "Python, SQL, ETL, BigQuery, and machine learning fully align." }],
  ["4457980178", { score: 100, verdict: "APPLY", why: "Python, SQL, data analysis, and machine learning fully align." }],
  ["4456981963", { score: 0, verdict: "REJECT", why: "Very good German is required." }],
  ["4457943440", { score: "", verdict: "FLAG", why: "Language requirement not stated for German employer." }],
  ["4403875047", { score: 0, verdict: "REJECT", why: "Business-fluent German is mandatory." }],
  ["4431734157", { score: 100, verdict: "APPLY", why: "Python, SQL, dbt, Looker, Tableau, and experimentation fully align." }],
  ["4403854923", { score: 0, verdict: "REJECT", why: "Business-fluent German is mandatory." }],
  ["4443242307", { score: 0, verdict: "REJECT", why: "Principal title is a hard seniority reject." }],
  ["4443241345", { score: 0, verdict: "REJECT", why: "Principal title is a hard seniority reject." }],
  ["4403873056", { score: 0, verdict: "REJECT", why: "Business-fluent German is mandatory." }],
  ["4459177740", { score: 90, verdict: "APPLY", why: "Strong Python and R; lacks next-generation sequencing experience." }],
  ["4459072794", { score: 100, verdict: "APPLY", why: "Python, testing, Git, LLM evaluation, and agent systems fully align." }],
  ["4457236414", { score: 0, verdict: "REJECT", why: "Fluent German is mandatory." }],
  ["4459084802", { score: 90, verdict: "APPLY", why: "Strong evaluation stack; TensorFlow is the only required technology gap." }],
  ["4459161820", { score: 0, verdict: "REJECT", why: "German C1 is mandatory." }],
  ["4446645926", { score: 0, verdict: "REJECT", why: "German B2 is mandatory." }],
  ["4437062023", { score: "", verdict: "FLAG", why: "Description is missing." }],
  ["4301797915", { score: "", verdict: "FLAG", why: "Description is missing." }],
  ["4418725034", { score: "", verdict: "FLAG", why: "Description is missing." }],
  ["4459196005", { score: "", verdict: "FLAG", why: "Description is missing." }],
  ["4439874286", { score: "", verdict: "FLAG", why: "Description is missing." }],
  ["4449011562", { score: "", verdict: "FLAG", why: "Description is missing." }],
  ["4459363685", { score: "", verdict: "FLAG", why: "Description is missing." }],
  ["4457228751", { score: "", verdict: "FLAG", why: "Description is missing." }],
  ["4459330791", { score: 100, verdict: "APPLY", why: "Excel, Power BI, automation, AI, and finance reporting align." }],
  ["4459160622", { score: "", verdict: "FLAG", why: "No named technologies in the description." }],
  ["4459091618", { score: 90, verdict: "APPLY", why: "Strong evaluation stack; TensorFlow is the only required technology gap." }],
]);

const flag = { score: "", verdict: "FLAG", why: "Salary missing for full-time German role." };

const sourceText = (await fs.readFile(inputPath, "utf8")).replace(/^\uFEFF/, "");

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    if (quoted) {
      if (char === '"' && text[index + 1] === '"') {
        cell += '"';
        index += 1;
      } else if (char === '"') {
        quoted = false;
      } else {
        cell += char;
      }
    } else if (char === '"') {
      quoted = true;
    } else if (char === ",") {
      row.push(cell);
      cell = "";
    } else if (char === "\n") {
      row.push(cell.endsWith("\r") ? cell.slice(0, -1) : cell);
      rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }
  if (cell || row.length) {
    row.push(cell.endsWith("\r") ? cell.slice(0, -1) : cell);
    rows.push(row);
  }
  return rows;
}

const workbook = await Workbook.fromCSV(sourceText, { sheetName: "Jobs" });
const sheet = workbook.worksheets.getItem("Jobs");
const values = parseCsv(sourceText);
const headers = values[0].map((value) => String(value ?? ""));
const jobIdIndex = headers.indexOf("job_id");
if (jobIdIndex < 0) throw new Error("job_id column not found");

const rows = values.slice(1).map((row, originalIndex) => {
  const normalized = [...row];
  while (normalized.length < headers.length) normalized.push("");
  const jobId = String(normalized[jobIdIndex] ?? "");
  const decision = decisions.get(jobId) ?? flag;
  return {
    values: [...normalized, decision.score, decision.verdict, decision.why],
    score: typeof decision.score === "number" ? decision.score : Number.NEGATIVE_INFINITY,
    originalIndex,
  };
});

rows.sort((a, b) => b.score - a.score || a.originalIndex - b.originalIndex);
const outputMatrix = [[...headers, "Score", "Verdict", "Why"], ...rows.map((row) => row.values)];
const lastRow = outputMatrix.length;

sheet.getUsedRange().clear({ applyTo: "all" });
sheet.getRangeByIndexes(0, 0, outputMatrix.length, outputMatrix[0].length).values = outputMatrix;
sheet.getRange("A1:R1").format = {
  fill: "#1F4E78",
  font: { bold: true, color: "#FFFFFF" },
  wrapText: true,
};
sheet.getRange(`A1:R${lastRow}`).format.font = { name: "Arial", size: 9 };
sheet.getRange(`A1:R${lastRow}`).format.verticalAlignment = "top";
sheet.getRange(`P2:P${lastRow}`).format.horizontalAlignment = "right";
sheet.getRange(`Q2:Q${lastRow}`).format.horizontalAlignment = "center";
sheet.getRange(`P1:P${lastRow}`).format.columnWidth = 10;
sheet.getRange(`Q1:Q${lastRow}`).format.columnWidth = 12;
sheet.getRange(`R1:R${lastRow}`).format.columnWidth = 58;
sheet.getRange(`P1:R${lastRow}`).format.rowHeight = 22;
sheet.freezePanes.freezeRows(1);

const topPreview = await workbook.render({ sheetName: "Jobs", range: "P1:R14", scale: 1.2, format: "png" });
await fs.writeFile(previewTopPath, new Uint8Array(await topPreview.arrayBuffer()));
const bottomPreview = await workbook.render({ sheetName: "Jobs", range: `P${Math.max(2, lastRow - 13)}:R${lastRow}`, scale: 1.2, format: "png" });
await fs.writeFile(previewBottomPath, new Uint8Array(await bottomPreview.arrayBuffer()));

function csvCell(value) {
  const text = value == null ? "" : String(value);
  return `"${text.replaceAll('"', '""')}"`;
}

const outputText = outputMatrix.map((row) => row.map(csvCell).join(",")).join("\r\n") + "\r\n";
await fs.writeFile(outputPath, outputText, "utf8");

const rawVerifyValues = parseCsv(outputText);
const sourceById = new Map(values.slice(1).map((row) => [row[jobIdIndex], row.slice(0, headers.length)]));
for (const row of rawVerifyValues.slice(1)) {
  const sourceRow = sourceById.get(row[jobIdIndex]);
  if (!sourceRow || sourceRow.some((value, index) => value !== row[index])) {
    throw new Error(`Original fields changed for job ${row[jobIdIndex]}`);
  }
}

const verifyWorkbook = await Workbook.fromCSV(outputText, { sheetName: "Jobs" });
const verifySheet = verifyWorkbook.worksheets.getItem("Jobs");
const verifyValues = verifySheet.getUsedRange().values;
if (verifyValues.length !== values.length) throw new Error(`Expected ${values.length} rows including header, got ${verifyValues.length}`);
if (verifyValues[0].slice(-3).join("|") !== "Score|Verdict|Why") throw new Error("Triage columns missing");
if (verifyValues.slice(1).some((row) => !String(row[16] ?? "").trim())) throw new Error("A row is missing a verdict");

const counts = verifyValues.slice(1).reduce((acc, row) => {
  const verdict = String(row[16]);
  acc[verdict] = (acc[verdict] ?? 0) + 1;
  return acc;
}, {});

const topCheck = await verifyWorkbook.inspect({
  kind: "table",
  sheetId: "Jobs",
  range: "A1:R8",
  include: "values",
  tableMaxRows: 8,
  tableMaxCols: 18,
  tableMaxCellChars: 90,
  maxChars: 12000,
});
const bottomCheck = await verifyWorkbook.inspect({
  kind: "table",
  sheetId: "Jobs",
  range: `A${Math.max(2, lastRow - 6)}:R${lastRow}`,
  include: "values",
  tableMaxRows: 7,
  tableMaxCols: 18,
  tableMaxCellChars: 90,
  maxChars: 10000,
});

console.log(JSON.stringify({ outputPath, dataRows: verifyValues.length - 1, counts }, null, 2));
console.log(topCheck.ndjson);
console.log(bottomCheck.ndjson);
