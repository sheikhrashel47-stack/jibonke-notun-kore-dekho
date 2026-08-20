/* জীবন-ড্যাশবোর্ড: The Art of Thinking-এর lazy-loaded chapter module. */
import type { BookChapter } from "../book";

const chapter: BookChapter = {
  "id": "19",
  "number": 19,
  "title": "Mental Models",
  "subtitle": "opportunity cost · incentive · feedback",
  "readingMinutes": 9,
  "wordCount": 121,
  "sections": [
    {
      "id": "scene",
      "title": "শুরু করার আগে",
      "blocks": [
        {
          "type": "paragraph",
          "content": "শাওন একটি free workshop-এ নাম লেখাল। তারপর আরেকটি, তারপর আরও তিনটি। প্রতিটিই “ফ্রি”; কিন্তু মাস শেষে সে দেখল সবচেয়ে দামী জিনিস—তার মনোযোগ—টুকরো হয়ে গেছে।"
        }
      ]
    },
    {
      "id": "idea",
      "title": "ভাবনাটিকে দেখা",
      "blocks": [
        {
          "type": "paragraph",
          "content": "Mental model হলো বাস্তবতা দেখার ছোট lens। Opportunity cost বলে, একটি yes-এর ভিতরে অন্য কিছুর no থাকে। Incentive বলে, মানুষের আচরণে কোন লাভ কাজ করছে দেখো। Feedback loop বলে, ফলাফল আবার আচরণকে বদলায়।"
        },
        {
          "type": "paragraph",
          "content": "কোনো app তোমাকে বারবার ফিরিয়ে আনছে কেন? শুধু design নয়, incentive ও feedback দেখো। কোনো অভ্যাস ভালো লাগছে কেন? হয়তো তাৎক্ষণিক reward দীর্ঘমেয়াদি cost ঢেকে রাখছে।"
        }
      ]
    },
    {
      "id": "trap",
      "title": "🪤 THINKING TRAP",
      "blocks": [
        {
          "type": "paragraph",
          "content": "একটি সমস্যাকে একটিমাত্র lens দিয়ে দেখা।"
        }
      ]
    },
    {
      "id": "tool",
      "title": "🛠️ THINKING TOOL",
      "blocks": [
        {
          "type": "paragraph",
          "content": "1. আমি কী পাচ্ছি?"
        },
        {
          "type": "paragraph",
          "content": "2. কী ছাড়ছি?"
        },
        {
          "type": "paragraph",
          "content": "3. কার incentive কী?"
        },
        {
          "type": "paragraph",
          "content": "4. ফল ফিরে এসে কী বদলাচ্ছে?"
        },
        {
          "type": "paragraph",
          "content": "5. আরেকটি lens লাগাও"
        }
      ]
    },
    {
      "id": "reflect",
      "title": "💭 THINK",
      "blocks": [
        {
          "type": "paragraph",
          "content": "আমার সবচেয়ে বড় “free” সিদ্ধান্তটির আসল খরচ কী?"
        },
        {
          "type": "subheading",
          "content": "💡 LIFE INSIGHT"
        },
        {
          "type": "paragraph",
          "content": "ভালো model উত্তর দেয় না; প্রশ্নের মান বাড়ায়।"
        }
      ]
    }
  ],
  "exercises": [
    {
      "title": "আজকের প্রয়োগ",
      "prompt": "আমার সবচেয়ে বড় “free” সিদ্ধান্তটির আসল খরচ কী?"
    },
    {
      "title": "Thinking Tool",
      "prompt": "আমি কী পাচ্ছি? → কী ছাড়ছি? → কার incentive কী? → ফল ফিরে এসে কী বদলাচ্ছে? → আরেকটি lens লাগাও"
    }
  ]
};

export default chapter;
