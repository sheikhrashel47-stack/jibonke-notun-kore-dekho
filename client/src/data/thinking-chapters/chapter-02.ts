/* জীবন-ড্যাশবোর্ড: The Art of Thinking-এর lazy-loaded chapter module. */
import type { BookChapter } from "../book";

const chapter: BookChapter = {
  "id": "02",
  "number": 2,
  "title": "মস্তিষ্ক তোমার জন্য Shortcut নেয়",
  "subtitle": "heuristic · স্বয়ংক্রিয় চিন্তা",
  "readingMinutes": 9,
  "wordCount": 145,
  "sections": [
    {
      "id": "scene",
      "title": "শুরু করার আগে",
      "blocks": [
        {
          "type": "paragraph",
          "content": "বাসস্ট্যান্ডে দাঁড়িয়ে মীরা দেখল দুইটি লাইন। যে লাইনে বেশি মানুষ, সে সেদিকেই গেল। পরে জানল সেটি ছিল ধীরগতির কাউন্টার। সিদ্ধান্তটি নির্বোধ ছিল না; মুহূর্তের ভিড়ে তার মস্তিষ্ক একটি ব্যবহারযোগ্য shortcut নিয়েছিল।"
        }
      ]
    },
    {
      "id": "idea",
      "title": "ভাবনাটিকে দেখা",
      "blocks": [
        {
          "type": "paragraph",
          "content": "প্রতিটি সিদ্ধান্ত শূন্য থেকে ভেবে নেওয়া সম্ভব নয়। মস্তিষ্ক পরিচিত সংকেত, সহজ নিয়ম ও আগের অভিজ্ঞতা দিয়ে দ্রুত উত্তর বানায়। এই shortcut অনেক সময় জীবন সহজ করে; কিন্তু নতুন বা জটিল পরিস্থিতিতে ভুল পথও দেখাতে পারে।"
        },
        {
          "type": "paragraph",
          "content": "দামী মানেই ভালো—এমন ধারণা, বেশি follower মানেই নির্ভরযোগ্য—এমন ধারণা, কিংবা পরিচিত নাম মানেই নিরাপদ—এসব দ্রুত সিদ্ধান্তের সংকেত। এগুলো প্রমাণ নয়; শুধু শুরু করার জায়গা।"
        }
      ]
    },
    {
      "id": "trap",
      "title": "🪤 THINKING TRAP",
      "blocks": [
        {
          "type": "paragraph",
          "content": "দ্রুত উত্তরকে গভীর উত্তর ভেবে নেওয়া। যে চিন্তা সহজে এসেছে, সেটি যে যথেষ্ট যাচাই করা—এমন কোনো নিয়ম নেই।"
        }
      ]
    },
    {
      "id": "tool",
      "title": "🛠️ THINKING TOOL",
      "blocks": [
        {
          "type": "paragraph",
          "content": "1. সংকেতটি চিহ্নিত করো"
        },
        {
          "type": "paragraph",
          "content": "2. জিজ্ঞেস করো: এটি shortcut কি?"
        },
        {
          "type": "paragraph",
          "content": "3. বড় সিদ্ধান্ত হলে ধীর হও"
        },
        {
          "type": "paragraph",
          "content": "4. একটি স্বাধীন উৎস দেখে নাও"
        }
      ]
    },
    {
      "id": "reflect",
      "title": "💭 THINK",
      "blocks": [
        {
          "type": "paragraph",
          "content": "আমি কোন সিদ্ধান্তে সুবিধার জন্য যাচাই বাদ দিচ্ছি?"
        },
        {
          "type": "subheading",
          "content": "💡 LIFE INSIGHT"
        },
        {
          "type": "paragraph",
          "content": "দ্রুততা দরকারি; কিন্তু সব দরজা দৌড়ে পার হওয়া যায় না।"
        }
      ]
    }
  ],
  "exercises": [
    {
      "title": "আজকের প্রয়োগ",
      "prompt": "আমি কোন সিদ্ধান্তে সুবিধার জন্য যাচাই বাদ দিচ্ছি?"
    },
    {
      "title": "Thinking Tool",
      "prompt": "সংকেতটি চিহ্নিত করো → জিজ্ঞেস করো: এটি shortcut কি? → বড় সিদ্ধান্ত হলে ধীর হও → একটি স্বাধীন উৎস দেখে নাও"
    }
  ]
};

export default chapter;
