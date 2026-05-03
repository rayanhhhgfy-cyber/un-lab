import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const fixtureFiles = [
  "src/data/__tests__/fixtures/chemCalc.reference.ts",
];

let failed = false;

for (const relativePath of fixtureFiles) {
  const absolutePath = resolve(process.cwd(), relativePath);
  const content = readFileSync(absolutePath, "utf8");
  const blocks = content.split(/\n\s*\{\n/g).slice(1).map((b) => `{\n${b}`);

  blocks.forEach((block, index) => {
    const idMatch = block.match(/id:\s*"([^"]+)"/);
    const caseId = idMatch?.[1] ?? `${relativePath}#${index + 1}`;
    const hasCitation = /citation:\s*"[^"]+"/.test(block);
    const hasReferenceId = /referenceId:\s*"[^"]+"/.test(block);
    const hasReferenceUrl = /referenceUrl:\s*"https?:\/\/[^"]+"/.test(block);

    if (!hasCitation || !hasReferenceId || !hasReferenceUrl) {
      failed = true;
      const missing = [
        hasCitation ? null : "citation",
        hasReferenceId ? null : "referenceId",
        hasReferenceUrl ? null : "referenceUrl",
      ].filter(Boolean);
      console.error(`Missing ${missing.join(", ")} in scientific fixture case: ${caseId}`);
    }
  });
}

if (failed) {
  process.exit(1);
}

console.log("Scientific citation check passed.");

