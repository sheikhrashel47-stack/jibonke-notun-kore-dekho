import { presenceExpandedChapters as chapters } from "../client/src/data/presence-book-expanded.ts";
process.stdout.write(JSON.stringify({ chapters }, null, 2));

console.error(`Exported ${chapters.length} chapters.`);

