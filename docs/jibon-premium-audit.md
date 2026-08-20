# JIBON Premium Platform Audit

## উদ্দেশ্য

এই audit বর্তমান JIBON codebase-এর কার্যকর অংশ সংরক্ষণ করে premium personal digital library experience-এ যাওয়ার নিরাপদ পথ নির্ধারণ করে। বিদ্যমান তিনটি বই, তাদের lazy-loaded chapter content এবং সকল চালু reader route এই redesign-এ অপরিবর্তিতভাবে ব্যবহার করা হবে।

## বর্তমান product surface

| বিষয় | বর্তমান অবস্থা | Premium redesign-এ সিদ্ধান্ত |
| --- | --- | --- |
| Home | একটিই dashboard/storefront page; continue reading, progress ও তিন বই একই screen-এ | Home থাকবে personal command center হিসেবে; Library ও Store আলাদা route হবে |
| Catalog | `Home.tsx`-এ local `books` array | Shared catalog metadata `data/books.ts`-এ একীভূত করা হবে |
| Reader | Chapter, continuous scroll, PDF page এবং swipe—চারটি mode | Chapter reader হবে primary immersive experience; অন্য modeগুলো supported secondary modes থাকবে |
| Book data | তিনটি book registry, lazy chapter loader, PDF page count | Book definition-এ subtitle, cover, category, description, page/chapter metadata যোগ হবে |
| User data | localStorage-এ progress, bookmarks, notes, exercise state, font size, active chapter | একই local-first model-এ reader theme, line-height, goals, page position, highlights, stats ও journal বাড়ানো হবে |
| Navigation | Header-এর focus হচ্ছে reading mode switches | App shell-এ Home, Library, Store, Progress ও Profile থাকবে; reader-এ distraction-free contextual controls থাকবে |
| PWA | এখনও নেই | Manifest, service worker, app icon ও offline fallback যোগ হবে |

## Current route inventory

| Route | কাজ করছে | নিরাপদ migration |
| --- | --- | --- |
| `/` | বর্তমান combined dashboard/storefront | নতুন Home dashboard |
| `/book/:bookId/chapter/:id` | lazy-loaded chapter reader | Primary immersive reader হিসেবে বজায় থাকবে |
| `/book/:bookId/scroll` | continuous scroll reader | Existing route বজায় থাকবে |
| `/book/:bookId/swipe/:page` | canvas-based PDF page turn | Existing route বজায় থাকবে; raw GitHub PDF source দিয়ে fetch fix করা হয়েছে |
| `/book/:bookId/page/:page` | page-addressable PDF reader | Existing route বজায় থাকবে |
| `/book/:bookId/workbook` | chapter practice / reflection | Tools flow-তে link থাকবে |
| `/chapter/:id` ও `/workbook` | পুরোনো compatibility route | Legacy fallback হিসেবে রাখা হবে |

## Reusable implementation assets

| অংশ | পুনর্ব্যবহারের কারণ |
| --- | --- |
| `data/books.ts` | তিন বইয়ের একক registry, chapter loader, page count ও PDF source আগে থেকেই centralised |
| `ReaderContext.tsx` | local-first persistence এবং old key migration আছে; নতুন fields এই layer-এ বাড়ানো যাবে |
| `ReadingCanvas.tsx` এবং `ChapterPage.tsx` | chapter content lazy-load করে; full-book DOM rendering এড়াতে primary reader-এর জন্য উপযুক্ত |
| `PdfPageCanvas.tsx` ও `SwipePageReader.tsx` | PDF page-specific reading এবং native touch path আগে থেকেই আছে |
| `ChapterSidebar.tsx` | Book Map-এর chapter status / progress pattern-এর ভিত্তি |
| `ContextRail.tsx` | desktop reader tools panel-এর ভিত্তি, কিন্তু richer tools drawer-এ refactor হবে |
| Existing cover assets | ইতিমধ্যে তিন বইয়ের পৃথক visual identity আছে; নতুন catalog-এ সরাসরি ব্যবহার করা যাবে |

## বর্তমান gap ও ঝুঁকি

| ক্ষেত্র | Audit finding | Refactor priority |
| --- | --- | --- |
| Information architecture | Home, Library ও Store এক surface-এ মিলেছে; separate discovery এবং ownership flow নেই | উচ্চ |
| Reader preferences | Global light/dark এবং তিন-size font আছে; four reader themes ও line-height নেই | উচ্চ |
| Position memory | Chapter-level progress আছে; exact page/scroll position নেই | উচ্চ |
| Personal tools | Bookmark ও chapter note আছে; highlight, saved-items views, glossary, journal ও global result grouping নেই | উচ্চ |
| Progress | Percent আছে; goal, activity, streak, reading time ও heatmap নেই | উচ্চ |
| Performance | Scroll reader শেষ পর্যন্ত প্রতিটি chapter DOM-এ mount করে | মাঝারি; primary chapter reader ইতিমধ্যে lazy |
| CSS architecture | Reader/store styles একটি বড় stylesheet-এ জমেছে এবং swipe rules duplicated | মাঝারি; app shell components ও scoped section classes দিয়ে ধাপে ধাপে পরিষ্কার করা হবে |
| Offline | Runtime assets ও reading data cache করার service worker নেই | উচ্চ |
| PDF source | Release redirect-এর বদলে raw GitHub asset branch ব্যবহার করা হয়েছে; PDF.js credential-free fetch আছে | সমাধান হয়েছে; release-পরবর্তী smoke test বজায় রাখতে হবে |

## Implementation sequence

প্রথমে catalog schema ও persistent reader preferences বাড়ানো হবে। এরপর shared JIBON app shell, Home, Library, Store, Book detail, Book Map, Progress এবং Profile surface যোগ হবে। তারপর primary chapter reader-এ four-theme controls ও tools drawer বসবে। শেষ ধাপে PWA, offline fallback, accessibility pass ও route-level quality assurance করা হবে।

## Non-negotiable preservation rules

1. কোনো বইয়ের chapter module, PDF asset, metadata বা working reader route delete করা হবে না।
2. Existing localStorage data নতুন schema-এ safely migrate হবে; refresh-এ user state হারাবে না।
3. PDF page/sweep/scroll mode-কে primary reader-এর বিকল্প হিসেবে রাখা হবে।
4. Mobile app-like density, large Bengali reading type এবং zoom lock বজায় থাকবে।
