/* জীবন-ড্যাশবোর্ড: The Art of Thinking-এর lazy-loaded chapter module. */
import type { BookChapter } from "../book";

const chapter: BookChapter = {
  "id": "24",
  "number": 24,
  "title": "Risk, Probability & Uncertainty",
  "subtitle": "সম্ভাবনা · ঝুঁকি · অজানা",
  "readingMinutes": 9,
  "wordCount": 115,
  "sections": [
    {
      "id": "scene",
      "title": "শুরু করার আগে",
      "blocks": [
        {
          "type": "paragraph",
          "content": "একটি সিদ্ধান্তে জুবায়ের বলল, “ঝুঁকি নেই।” পাশে বসা মানুষটি হাসল, “ঝুঁকি নেই, নাকি ঝুঁকিটা তুমি দেখতে পাচ্ছ না?” দুই বাক্যের ব্যবধানটুকুই অনিশ্চয়তার শিক্ষা।"
        }
      ]
    },
    {
      "id": "idea",
      "title": "ভাবনাটিকে দেখা",
      "blocks": [
        {
          "type": "paragraph",
          "content": "Risk-এ কিছু সম্ভাব্য ফল ও ক্ষতি অনুমান করা যায়। Uncertainty-তে ছবিটাই অসম্পূর্ণ। Probability আমাদের সংখ্যা দিতে পারে, কিন্তু প্রতিটি ব্যক্তিগত ঘটনার ভবিষ্যৎ নিশ্চয়তা দিতে পারে না।"
        },
        {
          "type": "paragraph",
          "content": "বড় সিদ্ধান্তে base rate, best case, worst case, এবং সহ্য করার সীমা দেখা সাহায্য করে। লক্ষ্য ঝুঁকি শূন্য করা নয়; অন্ধ ঝুঁকিকে চিনে নেওয়া।"
        }
      ]
    },
    {
      "id": "trap",
      "title": "🪤 THINKING TRAP",
      "blocks": [
        {
          "type": "paragraph",
          "content": "একটি সম্ভব ফলকে নিশ্চিত, অথবা একটি ভয়ের ফলকে অনিবার্য ভাবা।"
        }
      ]
    },
    {
      "id": "tool",
      "title": "🛠️ THINKING TOOL",
      "blocks": [
        {
          "type": "paragraph",
          "content": "1. কী জানা?"
        },
        {
          "type": "paragraph",
          "content": "2. কী অজানা?"
        },
        {
          "type": "paragraph",
          "content": "3. ভালো/খারাপ ফল কী?"
        },
        {
          "type": "paragraph",
          "content": "4. কতটা ক্ষতি সহ্য করতে পারি?"
        },
        {
          "type": "paragraph",
          "content": "5. ছোট test সম্ভব?"
        }
      ]
    },
    {
      "id": "reflect",
      "title": "💭 THINK",
      "blocks": [
        {
          "type": "paragraph",
          "content": "আমি কি অনিশ্চয়তাকে ভয় বলছি, নাকি তথ্যের ঘাটতি?"
        },
        {
          "type": "subheading",
          "content": "💡 LIFE INSIGHT"
        },
        {
          "type": "paragraph",
          "content": "ভবিষ্যৎ পরিষ্কার না হলেও, পরের পদক্ষেপ পরিষ্কার হতে পারে।"
        }
      ]
    }
  ],
  "exercises": [
    {
      "title": "আজকের প্রয়োগ",
      "prompt": "আমি কি অনিশ্চয়তাকে ভয় বলছি, নাকি তথ্যের ঘাটতি?"
    },
    {
      "title": "Thinking Tool",
      "prompt": "কী জানা? → কী অজানা? → ভালো/খারাপ ফল কী? → কতটা ক্ষতি সহ্য করতে পারি? → ছোট test সম্ভব?"
    }
  ]
};

export default chapter;
