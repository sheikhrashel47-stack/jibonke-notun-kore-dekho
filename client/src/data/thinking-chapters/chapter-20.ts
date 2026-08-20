/* জীবন-ড্যাশবোর্ড: The Art of Thinking-এর lazy-loaded chapter module. */
import type { BookChapter } from "../book";

const chapter: BookChapter = {
  "id": "20",
  "number": 20,
  "title": "বড় সমস্যাকে ছোট করো",
  "subtitle": "problem solving · root cause",
  "readingMinutes": 9,
  "wordCount": 122,
  "sections": [
    {
      "id": "scene",
      "title": "শুরু করার আগে",
      "blocks": [
        {
          "type": "paragraph",
          "content": "মাহির বলল, “আমার জীবন এলোমেলো।” কথাটি সত্যি অনুভবের ভাষায়, কিন্তু সমাধানের ভাষায় নয়। ঘুম, টাকা, কাজ, সম্পর্ক, সময়—কোন সুতোটি টানলে গিঁট খুলবে?"
        }
      ]
    },
    {
      "id": "idea",
      "title": "ভাবনাটিকে দেখা",
      "blocks": [
        {
          "type": "paragraph",
          "content": "বড় সমস্যা একসঙ্গে চিন্তা করলে মন ভরে যায়, কিন্তু পথ খোলে না। সমস্যা define করো, লক্ষণ ও কারণ আলাদা করো, অংশ ভাঙো, ছোট পরীক্ষা চালাও, ফল দেখে সংশোধন করো।"
        },
        {
          "type": "paragraph",
          "content": "“পড়াশোনা হচ্ছে না” বলতে কখনো আসল সমস্যা হতে পারে কাজের জায়গা, ঘুম, ভয়, কাজের আকার, অথবা feedback-এর অভাব। root cause সবসময় নাটকীয় নয়।"
        }
      ]
    },
    {
      "id": "trap",
      "title": "🪤 THINKING TRAP",
      "blocks": [
        {
          "type": "paragraph",
          "content": "লক্ষণকে কারণ ভেবে একই জায়গায় বারবার আঘাত করা।"
        }
      ]
    },
    {
      "id": "tool",
      "title": "🛠️ THINKING TOOL",
      "blocks": [
        {
          "type": "paragraph",
          "content": "1. সমস্যা নির্দিষ্ট করো"
        },
        {
          "type": "paragraph",
          "content": "2. লক্ষণ লেখো"
        },
        {
          "type": "paragraph",
          "content": "3. সম্ভাব্য কারণ দাও"
        },
        {
          "type": "paragraph",
          "content": "4. সবচেয়ে ছোট পরীক্ষা বেছে নাও"
        },
        {
          "type": "paragraph",
          "content": "5. ফল দেখে বদলাও"
        }
      ]
    },
    {
      "id": "reflect",
      "title": "💭 THINK",
      "blocks": [
        {
          "type": "paragraph",
          "content": "আমি যে সমস্যার নাম দিচ্ছি, সেটি কি সত্যিই সমস্যা—নাকি তার একটি লক্ষণ?"
        },
        {
          "type": "subheading",
          "content": "💡 LIFE INSIGHT"
        },
        {
          "type": "paragraph",
          "content": "বড় সমস্যাকে ছোট করা তাকে ছোট ভাবা নয়; তাকে ধরার মতো করা।"
        }
      ]
    }
  ],
  "exercises": [
    {
      "title": "আজকের প্রয়োগ",
      "prompt": "আমি যে সমস্যার নাম দিচ্ছি, সেটি কি সত্যিই সমস্যা—নাকি তার একটি লক্ষণ?"
    },
    {
      "title": "Thinking Tool",
      "prompt": "সমস্যা নির্দিষ্ট করো → লক্ষণ লেখো → সম্ভাব্য কারণ দাও → সবচেয়ে ছোট পরীক্ষা বেছে নাও → ফল দেখে বদলাও"
    }
  ]
};

export default chapter;
