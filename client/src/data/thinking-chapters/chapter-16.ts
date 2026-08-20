/* জীবন-ড্যাশবোর্ড: The Art of Thinking-এর lazy-loaded chapter module. */
import type { BookChapter } from "../book";

const chapter: BookChapter = {
  "id": "16",
  "number": 16,
  "title": "First Principles Thinking",
  "subtitle": "মূল সত্য · ভাঙা · পুনর্গঠন",
  "readingMinutes": 9,
  "wordCount": 125,
  "sections": [
    {
      "id": "scene",
      "title": "শুরু করার আগে",
      "blocks": [
        {
          "type": "paragraph",
          "content": "রোজা বলেছিল, “আমি coding শিখতে পারব না; সবাই বলে শুরুটা কঠিন।” তার শিক্ষক জিজ্ঞেস করলেন, “কঠিন—কোন অংশ? অক্ষর, যুক্তি, সময়, নাকি ভয়?” এক বিশাল দেয়াল ছোট ইটে ভাঙতে শুরু করল।"
        }
      ]
    },
    {
      "id": "idea",
      "title": "ভাবনাটিকে দেখা",
      "blocks": [
        {
          "type": "paragraph",
          "content": "First principles thinking পরিচিত নিয়ম থেকে শুরু করে না; প্রশ্ন করে—সবচেয়ে মৌলিকভাবে কী সত্য? কোন assumption আমরা বিনা পরীক্ষায় গ্রহণ করেছি? তারপর সেখান থেকে নতুন সমাধান তৈরি করে।"
        },
        {
          "type": "paragraph",
          "content": "“ভালো কাজ পেতে এই ডিগ্রি লাগবেই”—এটি একটি প্রচলিত নিয়ম হতে পারে। কিন্তু কাজটির আসল skill, portfolio, network, সময় ও দরকার কী—সেগুলো ভেঙে দেখলে অন্য পথও দেখা দিতে পারে।"
        }
      ]
    },
    {
      "id": "trap",
      "title": "🪤 THINKING TRAP",
      "blocks": [
        {
          "type": "paragraph",
          "content": "প্রচলিত উত্তরকে প্রকৃতির নিয়ম ভাবা।"
        }
      ]
    },
    {
      "id": "tool",
      "title": "🛠️ THINKING TOOL",
      "blocks": [
        {
          "type": "paragraph",
          "content": "1. সমস্যা এক লাইনে লেখো"
        },
        {
          "type": "paragraph",
          "content": "2. কোন assumption আছে?"
        },
        {
          "type": "paragraph",
          "content": "3. কী সত্যি অপরিহার্য?"
        },
        {
          "type": "paragraph",
          "content": "4. অংশে ভাঙো"
        },
        {
          "type": "paragraph",
          "content": "5. নতুনভাবে জোড়া দাও"
        }
      ]
    },
    {
      "id": "reflect",
      "title": "💭 THINK",
      "blocks": [
        {
          "type": "paragraph",
          "content": "আমি কোন নিয়মকে শুধু প্রচলিত বলে অপরিবর্তনীয় ভাবছি?"
        },
        {
          "type": "subheading",
          "content": "💡 LIFE INSIGHT"
        },
        {
          "type": "paragraph",
          "content": "কখনো সমাধান খুঁজতে হয় না; আগে সমস্যার বানানো দেয়ালটি ভাঙতে হয়।"
        }
      ]
    }
  ],
  "exercises": [
    {
      "title": "আজকের প্রয়োগ",
      "prompt": "আমি কোন নিয়মকে শুধু প্রচলিত বলে অপরিবর্তনীয় ভাবছি?"
    },
    {
      "title": "Thinking Tool",
      "prompt": "সমস্যা এক লাইনে লেখো → কোন assumption আছে? → কী সত্যি অপরিহার্য? → অংশে ভাঙো → নতুনভাবে জোড়া দাও"
    }
  ]
};

export default chapter;
