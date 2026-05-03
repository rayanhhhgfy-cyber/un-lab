# Scientific Accuracy Regression Checklist

Use this checklist before releasing scientific-content changes.

## 1) Automated test gate

Run:

- `npm run test:accuracy`

This currently verifies:

- chemistry reference fixtures and tolerances,
- validated math/physics formula utilities and domain guards,
- biology/earth model invariants for consistency,
- citation provenance fields (`citation`, `referenceId`, `referenceUrl`) in scientific fixtures.

## 2) Domain guard review

Confirm invalid inputs are blocked with clear messages (no silent Infinity/NaN output):

- division by zero,
- negative/zero distances for inverse-square laws,
- invalid relativistic velocity domain (`v >= c`),
- invalid gas-law domains (`T <= 0`, `V <= 0`).

## 3) Model validity messaging

For educational approximation labs (biology and earth science), ensure the UI displays the model-validity note and does not imply research-grade precision.

## 4) Unit/citation sanity pass

For every newly added formula:

- verify units shown in UI match computation units,
- add or update reference citations in fixture/test metadata,
- choose explicit tolerance (`absTol` and/or `relTol`) and justify it.
- confirm constants originate from approved references (`NIST/CODATA`, `CRC`, `IUPAC`).

## 5) Constant diff audit

- Review changes to `src/lib/science/constants.ts`.
- Any modified constant requires:
  - updated source citation,
  - updated fixture expectations,
  - updated tolerance rationale when needed.

## 6) Output consistency pass

Confirm:

- same input -> same deterministic output,
- language switch does not alter numeric results,
- displayed precision does not exceed meaningful model certainty.

