/* জীবন-ড্যাশবোর্ড: The Art of Thinking-এর lazy-loaded chapter module. */
import type { BookChapter } from "../book";

const chapter: BookChapter = {
  "id": "08",
  "number": 8,
  "title": "একটা ঘটনা কি সত্যিই আরেকটার কারণ?",
  "subtitle": "correlation · causation",
  "readingMinutes": 9,
  "wordCount": 132,
  "sections": [
    {
      "id": "scene",
      "title": "শুরু করার আগে",
      "blocks": [
        {
          "type": "paragraph",
          "content": "পরীক্ষার আগে শহরে বৃষ্টি হয়েছিল, আর কয়েকজনের ফল ভালো হয়েছিল। কেউ মজা করে বলল, “বৃষ্টি পড়লে পড়াশোনা জমে।” হাসির ভেতরেও মানুষের পুরোনো অভ্যাস আছে—একসঙ্গে ঘটাকে কারণ ভাবা।"
        }
      ]
    },
    {
      "id": "idea",
      "title": "ভাবনাটিকে দেখা",
      "blocks": [
        {
          "type": "paragraph",
          "content": "দুটি ঘটনা একসঙ্গে ঘটলে তাদের সম্পর্ক থাকতে পারে, নাও থাকতে পারে। তৃতীয় কোনো কারণও দুটিকে একসঙ্গে নড়াতে পারে। correlation প্রশ্ন তোলে; causation দাবি করে বেশি কঠিন প্রমাণ।"
        },
        {
          "type": "paragraph",
          "content": "যে দল বেশি অনুশীলন করে তারা ভালো করে—এখানে অনুশীলন গুরুত্বপূর্ণ হতে পারে। কিন্তু একই সঙ্গে তাদের coach, সুযোগ, পূর্বদক্ষতা বা দলগত পরিবেশও ভূমিকা রাখতে পারে। একটি ব্যাখ্যায় আটকে যেও না।"
        }
      ]
    },
    {
      "id": "trap",
      "title": "🪤 THINKING TRAP",
      "blocks": [
        {
          "type": "paragraph",
          "content": "পরিচিত pattern দেখে কারণ ঘোষণা করা। মানুষ গল্প পছন্দ করে; বাস্তবতা কখনো একাধিক কারণে লেখা।"
        }
      ]
    },
    {
      "id": "tool",
      "title": "🛠️ THINKING TOOL",
      "blocks": [
        {
          "type": "paragraph",
          "content": "1. কী একসঙ্গে ঘটেছে?"
        },
        {
          "type": "paragraph",
          "content": "2. সময়ের ক্রম কী?"
        },
        {
          "type": "paragraph",
          "content": "3. তৃতীয় কারণ আছে কি?"
        },
        {
          "type": "paragraph",
          "content": "4. বিপরীত উদাহরণ খুঁজো"
        },
        {
          "type": "paragraph",
          "content": "5. দাবির ভাষা নরম করো"
        }
      ]
    },
    {
      "id": "reflect",
      "title": "💭 THINK",
      "blocks": [
        {
          "type": "paragraph",
          "content": "আমি কোথায় “এর পরে”কে “এর কারণে” ভেবেছি?"
        },
        {
          "type": "subheading",
          "content": "💡 LIFE INSIGHT"
        },
        {
          "type": "paragraph",
          "content": "একসঙ্গে ঘটার মধ্যে ইঙ্গিত আছে; প্রমাণের শেষ কথা নেই।"
        }
      ]
    }
  ],
  "exercises": [
    {
      "title": "আজকের প্রয়োগ",
      "prompt": "আমি কোথায় “এর পরে”কে “এর কারণে” ভেবেছি?"
    },
    {
      "title": "Thinking Tool",
      "prompt": "কী একসঙ্গে ঘটেছে? → সময়ের ক্রম কী? → তৃতীয় কারণ আছে কি? → বিপরীত উদাহরণ খুঁজো → দাবির ভাষা নরম করো"
    }
  ]
};

export default chapter;
