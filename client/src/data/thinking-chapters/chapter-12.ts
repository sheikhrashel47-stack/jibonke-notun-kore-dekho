/* জীবন-ড্যাশবোর্ড: The Art of Thinking-এর lazy-loaded chapter module. */
import type { BookChapter } from "../book";

const chapter: BookChapter = {
  "id": "12",
  "number": 12,
  "title": "Logical Fallacy-এর অদৃশ্য ফাঁদ",
  "subtitle": "fallacy · যুক্তির ভুল",
  "readingMinutes": 9,
  "wordCount": 128,
  "sections": [
    {
      "id": "scene",
      "title": "শুরু করার আগে",
      "blocks": [
        {
          "type": "paragraph",
          "content": "এক তর্কে কেউ বলল, “তুমি তো নিজেই কখনো দেরি করো, তাই সময় নিয়ে কথা বলার অধিকার তোমার নেই।” কথাটি আঘাত করল, কিন্তু আসল প্রশ্ন—সময়মতো কাজ দরকার কি না—সেখানে রইল।"
        }
      ]
    },
    {
      "id": "idea",
      "title": "ভাবনাটিকে দেখা",
      "blocks": [
        {
          "type": "paragraph",
          "content": "Fallacy মানে সবসময় মিথ্যা conclusion নয়; ভুল পথে conclusion-এ পৌঁছানো। ad hominem মানুষকে আক্রমণ করে, strawman কথাকে বিকৃত করে, false dilemma কেবল দুই দরজা দেখায়, circular reasoning নিজের কথাকেই প্রমাণ বানায়।"
        },
        {
          "type": "paragraph",
          "content": "কোনো বক্তার আত্মবিশ্বাস বা জনপ্রিয়তা তার কথার প্রমাণ নয়। আবার বক্তার ব্যক্তিগত ত্রুটিও একটি দাবিকে নিজে থেকে ভুল করে না। দাবিকে দাবির জায়গায় পরীক্ষা করো।"
        }
      ]
    },
    {
      "id": "trap",
      "title": "🪤 THINKING TRAP",
      "blocks": [
        {
          "type": "paragraph",
          "content": "তর্কের শব্দে মুগ্ধ হয়ে প্রশ্নের ঠিকানা হারিয়ে ফেলা।"
        }
      ]
    },
    {
      "id": "tool",
      "title": "🛠️ THINKING TOOL",
      "blocks": [
        {
          "type": "paragraph",
          "content": "1. মূল দাবিটি লেখো"
        },
        {
          "type": "paragraph",
          "content": "2. প্রমাণটি চিহ্নিত করো"
        },
        {
          "type": "paragraph",
          "content": "3. মানুষ নয়, যুক্তি দেখো"
        },
        {
          "type": "paragraph",
          "content": "4. লুকানো বিকল্প খুঁজো"
        },
        {
          "type": "paragraph",
          "content": "5. প্রশ্নে ফিরে যাও"
        }
      ]
    },
    {
      "id": "reflect",
      "title": "💭 THINK",
      "blocks": [
        {
          "type": "paragraph",
          "content": "শেষ কোন তর্কে কথার উত্তাপ আমাকে আসল প্রশ্ন থেকে সরিয়েছিল?"
        },
        {
          "type": "subheading",
          "content": "💡 LIFE INSIGHT"
        },
        {
          "type": "paragraph",
          "content": "ভুল যুক্তি অনেক সময় খুব চতুর পোশাক পরে আসে।"
        }
      ]
    }
  ],
  "exercises": [
    {
      "title": "আজকের প্রয়োগ",
      "prompt": "শেষ কোন তর্কে কথার উত্তাপ আমাকে আসল প্রশ্ন থেকে সরিয়েছিল?"
    },
    {
      "title": "Thinking Tool",
      "prompt": "মূল দাবিটি লেখো → প্রমাণটি চিহ্নিত করো → মানুষ নয়, যুক্তি দেখো → লুকানো বিকল্প খুঁজো → প্রশ্নে ফিরে যাও"
    }
  ]
};

export default chapter;
