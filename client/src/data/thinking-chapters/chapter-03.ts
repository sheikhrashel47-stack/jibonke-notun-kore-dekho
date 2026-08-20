/* জীবন-ড্যাশবোর্ড: The Art of Thinking-এর lazy-loaded chapter module. */
import type { BookChapter } from "../book";

const chapter: BookChapter = {
  "id": "03",
  "number": 3,
  "title": "Emotion যখন চিন্তার Steering Wheel ধরে",
  "subtitle": "ভয় · রাগ · আকাঙ্ক্ষা",
  "readingMinutes": 9,
  "wordCount": 128,
  "sections": [
    {
      "id": "scene",
      "title": "শুরু করার আগে",
      "blocks": [
        {
          "type": "paragraph",
          "content": "রাগের মাথায় তানভীর একটি চাকরির প্রস্তাবকে অসম্মান মনে করে ফিরিয়ে দিয়েছিল। রাতে সে দেখল প্রস্তাবটি খারাপ ছিল না; খারাপ ছিল সেই দিনের মিটিংয়ে তার অনুভূতিটা।"
        }
      ]
    },
    {
      "id": "idea",
      "title": "ভাবনাটিকে দেখা",
      "blocks": [
        {
          "type": "paragraph",
          "content": "অনুভূতি তথ্য দেয়—কিছু গুরুত্বপূর্ণ মনে হচ্ছে, কিছু হুমকির মতো লাগছে, কিছু খুব কাঙ্ক্ষিত। কিন্তু অনুভূতি সবসময় সিদ্ধান্তের মানচিত্র নয়। ভয় ঝুঁকি বড় করে দেখাতে পারে, উত্তেজনা খরচ ছোট করে দেখাতে পারে।"
        },
        {
          "type": "paragraph",
          "content": "সম্পর্কে একটি ছোট দেরি কখনো অবহেলার প্রমাণ মনে হয়, বিনিয়োগে হঠাৎ লাভ কখনো নিশ্চিত ভবিষ্যৎ মনে হয়। অনুভূতি উঠলেই সিদ্ধান্ত নষ্ট হয় না; সিদ্ধান্তের সময় অনুভূতিকে একা চালক করলে সমস্যা হয়।"
        }
      ]
    },
    {
      "id": "trap",
      "title": "🪤 THINKING TRAP",
      "blocks": [
        {
          "type": "paragraph",
          "content": "“আমি এমন অনুভব করছি, তাই নিশ্চয়ই এমনই ঘটছে”—এই emotional reasoning।"
        }
      ]
    },
    {
      "id": "tool",
      "title": "🛠️ THINKING TOOL",
      "blocks": [
        {
          "type": "paragraph",
          "content": "1. থামো"
        },
        {
          "type": "paragraph",
          "content": "2. অনুভূতির নাম দাও"
        },
        {
          "type": "paragraph",
          "content": "3. তথ্য ও অনুমান আলাদা করো"
        },
        {
          "type": "paragraph",
          "content": "4. একটু সময় নিয়ে সিদ্ধান্ত দাও"
        }
      ]
    },
    {
      "id": "reflect",
      "title": "💭 THINK",
      "blocks": [
        {
          "type": "paragraph",
          "content": "আমার বর্তমান অনুভূতি কোন সিদ্ধান্তকে তাড়াহুড়ো করাচ্ছে?"
        },
        {
          "type": "subheading",
          "content": "💡 LIFE INSIGHT"
        },
        {
          "type": "paragraph",
          "content": "অনুভূতিকে শোনো; কিন্তু গাড়ির চাবি সবসময় তার হাতে দিও না।"
        }
      ]
    }
  ],
  "exercises": [
    {
      "title": "আজকের প্রয়োগ",
      "prompt": "আমার বর্তমান অনুভূতি কোন সিদ্ধান্তকে তাড়াহুড়ো করাচ্ছে?"
    },
    {
      "title": "Thinking Tool",
      "prompt": "থামো → অনুভূতির নাম দাও → তথ্য ও অনুমান আলাদা করো → একটু সময় নিয়ে সিদ্ধান্ত দাও"
    }
  ]
};

export default chapter;
