/* জীবন-ড্যাশবোর্ড: The Art of Thinking-এর lazy-loaded chapter module. */
import type { BookChapter } from "../book";

const chapter: BookChapter = {
  "id": "04",
  "number": 4,
  "title": "তোমার মস্তিষ্ক তোমাকেই কীভাবে ভুল বোঝায়",
  "subtitle": "bias · আত্মপ্রবঞ্চনা",
  "readingMinutes": 9,
  "wordCount": 132,
  "sections": [
    {
      "id": "scene",
      "title": "শুরু করার আগে",
      "blocks": [
        {
          "type": "paragraph",
          "content": "রাব্বি নতুন ফোন কিনে ফেলল, তারপর রাতভর review দেখল—সবই কেন তার সিদ্ধান্ত সঠিক, তার প্রমাণ। যেসব review বিপরীত ছিল, সেগুলোকে সে অদ্ভুতভাবে “অতিরিক্ত খুঁতখুঁতে” বলল।"
        }
      ]
    },
    {
      "id": "idea",
      "title": "ভাবনাটিকে দেখা",
      "blocks": [
        {
          "type": "paragraph",
          "content": "মনের কিছু পরিচিত বাঁক আছে। confirmation bias নিজের মতকে সমর্থন খোঁজে; availability bias সহজে মনে পড়া ঘটনাকে বেশি সাধারণ মনে করে; anchoring প্রথম সংখ্যাকে অতিরিক্ত ওজন দেয়। এগুলো নৈতিক ব্যর্থতা নয়—সতর্ক থাকার জায়গা।"
        },
        {
          "type": "paragraph",
          "content": "প্রথম বেতনের অঙ্ক শুনে পরের অঙ্কগুলোকে আমরা সেই anchor-এর সঙ্গে মাপি। সাম্প্রতিক একটি দুর্ঘটনা দেখে পুরো শহরকে বিপজ্জনক মনে করি। মনে থাকা উদাহরণ, সব উদাহরণ নয়।"
        }
      ]
    },
    {
      "id": "trap",
      "title": "🪤 THINKING TRAP",
      "blocks": [
        {
          "type": "paragraph",
          "content": "নিজের পক্ষপাতকে “আমার অভিজ্ঞতা” বলে নিরাপদ নাম দেওয়া।"
        }
      ]
    },
    {
      "id": "tool",
      "title": "🛠️ THINKING TOOL",
      "blocks": [
        {
          "type": "paragraph",
          "content": "1. আমি কী প্রমাণ খুঁজছি?"
        },
        {
          "type": "paragraph",
          "content": "2. কোন তথ্য আমাকে অস্বস্তিতে ফেলছে?"
        },
        {
          "type": "paragraph",
          "content": "3. প্রথম সংখ্যা/উদাহরণটি কি anchor?"
        },
        {
          "type": "paragraph",
          "content": "4. বিপরীত উদাহরণটি নোট করো"
        }
      ]
    },
    {
      "id": "reflect",
      "title": "💭 THINK",
      "blocks": [
        {
          "type": "paragraph",
          "content": "কোন বিশ্বাসের বিপরীত প্রমাণ আমি ইচ্ছে করে কম দেখছি?"
        },
        {
          "type": "subheading",
          "content": "💡 LIFE INSIGHT"
        },
        {
          "type": "paragraph",
          "content": "মন নিজেকে রক্ষা করতে চায়; সত্যকে দেখতে হলে তাকে মাঝে মাঝে আয়না ধরতে হয়।"
        }
      ]
    }
  ],
  "exercises": [
    {
      "title": "আজকের প্রয়োগ",
      "prompt": "কোন বিশ্বাসের বিপরীত প্রমাণ আমি ইচ্ছে করে কম দেখছি?"
    },
    {
      "title": "Thinking Tool",
      "prompt": "আমি কী প্রমাণ খুঁজছি? → কোন তথ্য আমাকে অস্বস্তিতে ফেলছে? → প্রথম সংখ্যা/উদাহরণটি কি anchor? → বিপরীত উদাহরণটি নোট করো"
    }
  ]
};

export default chapter;
