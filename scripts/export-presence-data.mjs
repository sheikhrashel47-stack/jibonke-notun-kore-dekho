import { presenceChapters as phase1 } from "../client/src/data/presence-book.ts";
import { presencePhase2Chapters as phase2 } from "../client/src/data/presence-book-phase2.ts";
import { presencePhase3Chapters as phase3 } from "../client/src/data/presence-book-phase3.ts";

const chapters = [...phase1, ...phase2, ...phase3];
process.stdout.write(JSON.stringify({ chapters }, null, 2));

console.error(`Exported ${chapters.length} chapters.`);

