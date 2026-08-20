/* জীবন-ড্যাশবোর্ড: The Art of Thinking-এর lazy-loaded chapter module. */
import type { BookChapter } from "../book";

const chapter: BookChapter = {
  "id": "21",
  "number": 21,
  "title": "সঠিক সিদ্ধান্ত বনাম ভালো ফল",
  "subtitle": "process · uncertainty · luck",
  "readingMinutes": 9,
  "wordCount": 122,
  "sections": [
    {
      "id": "scene",
      "title": "শুরু করার আগে",
      "blocks": [
        {
          "type": "paragraph",
          "content": "দুই বন্ধু একই প্রশ্নপত্রে অনুমান করল। একজনের অনুমান মিলল, আরেকজনের মিলল না। ফল আলাদা, কিন্তু তাদের সিদ্ধান্তের প্রক্রিয়া কি সত্যিই আলাদা ছিল?"
        }
      ]
    },
    {
      "id": "idea",
      "title": "ভাবনাটিকে দেখা",
      "blocks": [
        {
          "type": "paragraph",
          "content": "ভালো ফল সবসময় ভালো সিদ্ধান্তের প্রমাণ নয়, যেমন খারাপ ফল সবসময় খারাপ সিদ্ধান্তের প্রমাণ নয়। অনিশ্চয়তার জায়গায় decision quality দেখা হয় তথ্য, বিকল্প, trade-off এবং process দিয়ে।"
        },
        {
          "type": "paragraph",
          "content": "কোনো পরিকল্পনা সফল হলে জিজ্ঞেস করো: আমরা কি ভালোমতো ভেবেছিলাম, নাকি ভাগ্য সাহায্য করেছে? ব্যর্থ হলে জিজ্ঞেস করো: process-এ কী শেখা যায়? এতে অহং ও হতাশা—দুটিই কমে।"
        }
      ]
    },
    {
      "id": "trap",
      "title": "🪤 THINKING TRAP",
      "blocks": [
        {
          "type": "paragraph",
          "content": "Outcome দেখে অতীতের সিদ্ধান্তকে অতিরিক্ত মহিমান্বিত বা অপমান করা।"
        }
      ]
    },
    {
      "id": "tool",
      "title": "🛠️ THINKING TOOL",
      "blocks": [
        {
          "type": "paragraph",
          "content": "1. তথ্য কী ছিল?"
        },
        {
          "type": "paragraph",
          "content": "2. বিকল্প কী ছিল?"
        },
        {
          "type": "paragraph",
          "content": "3. আমি কী risk জানতাম?"
        },
        {
          "type": "paragraph",
          "content": "4. কী অজানা ছিল?"
        },
        {
          "type": "paragraph",
          "content": "5. পরেরবার কী বদলাব?"
        }
      ]
    },
    {
      "id": "reflect",
      "title": "💭 THINK",
      "blocks": [
        {
          "type": "paragraph",
          "content": "আমার সাম্প্রতিক সফলতার মধ্যে কতটা process, কতটা সুযোগ ছিল?"
        },
        {
          "type": "subheading",
          "content": "💡 LIFE INSIGHT"
        },
        {
          "type": "paragraph",
          "content": "ফলাফল গল্পের শেষ দৃশ্য; সিদ্ধান্তের মান বোঝার জন্য পুরো দৃশ্যপট দেখতে হয়।"
        }
      ]
    }
  ],
  "exercises": [
    {
      "title": "আজকের প্রয়োগ",
      "prompt": "আমার সাম্প্রতিক সফলতার মধ্যে কতটা process, কতটা সুযোগ ছিল?"
    },
    {
      "title": "Thinking Tool",
      "prompt": "তথ্য কী ছিল? → বিকল্প কী ছিল? → আমি কী risk জানতাম? → কী অজানা ছিল? → পরেরবার কী বদলাব?"
    }
  ]
};

export default chapter;
