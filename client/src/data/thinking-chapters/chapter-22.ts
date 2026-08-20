/* জীবন-ড্যাশবোর্ড: The Art of Thinking-এর lazy-loaded chapter module. */
import type { BookChapter } from "../book";

const chapter: BookChapter = {
  "id": "22",
  "number": 22,
  "title": "Opportunity Cost",
  "subtitle": "yes-এর ভিতরের no",
  "readingMinutes": 9,
  "wordCount": 129,
  "sections": [
    {
      "id": "scene",
      "title": "শুরু করার আগে",
      "blocks": [
        {
          "type": "paragraph",
          "content": "শুক্রবার রাতে রিফাত একটি নতুন কাজ “হ্যাঁ” বলল। কাজটি খারাপ ছিল না। কিন্তু সেই হ্যাঁ বলার মানে ছিল সে নিজের লেখা শেষ করতে পারবে না, যেটি অনেক দিন ধরে তার কাছে জরুরি ছিল।"
        }
      ]
    },
    {
      "id": "idea",
      "title": "ভাবনাটিকে দেখা",
      "blocks": [
        {
          "type": "paragraph",
          "content": "Opportunity cost মানে শুধু টাকা নয়। সময়, মনোযোগ, শক্তি, সম্পর্ক ও শেখার জায়গাতেও প্রতিটি সিদ্ধান্ত অন্য কিছুর সম্ভাবনা সরিয়ে দেয়। তাই “এটি ভালো কি?”-র সঙ্গে “এর বদলে কী ছাড়ছি?” জুড়তে হয়।"
        },
        {
          "type": "paragraph",
          "content": "একটি অতিরিক্ত দায়িত্ব সম্মানজনক হতে পারে, কিন্তু তা যদি বিশ্রাম বা মূল দক্ষতা গড়ার জায়গা খেয়ে ফেলে, তবে তার আসল খরচ দেখা দরকার।"
        }
      ]
    },
    {
      "id": "trap",
      "title": "🪤 THINKING TRAP",
      "blocks": [
        {
          "type": "paragraph",
          "content": "শুধু পাওয়া জিনিস গোনা; না-পাওয়া জিনিসকে অদৃশ্য ধরে নেওয়া।"
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
          "content": "3. এই না-টি কি গুরুত্বপূর্ণ?"
        },
        {
          "type": "paragraph",
          "content": "4. সিদ্ধান্তটি ফেরানো যাবে?"
        },
        {
          "type": "paragraph",
          "content": "5. কম খরচের পথ আছে?"
        }
      ]
    },
    {
      "id": "reflect",
      "title": "💭 THINK",
      "blocks": [
        {
          "type": "paragraph",
          "content": "আমার এই হ্যাঁ-এর ভেতরে কোন দরকারি না লুকিয়ে আছে?"
        },
        {
          "type": "subheading",
          "content": "💡 LIFE INSIGHT"
        },
        {
          "type": "paragraph",
          "content": "সময়কে খরচ না ভাবলে, সময়ই একদিন বিল পাঠায়।"
        }
      ]
    }
  ],
  "exercises": [
    {
      "title": "আজকের প্রয়োগ",
      "prompt": "আমার এই হ্যাঁ-এর ভেতরে কোন দরকারি না লুকিয়ে আছে?"
    },
    {
      "title": "Thinking Tool",
      "prompt": "আমি কী পাচ্ছি? → কী ছাড়ছি? → এই না-টি কি গুরুত্বপূর্ণ? → সিদ্ধান্তটি ফেরানো যাবে? → কম খরচের পথ আছে?"
    }
  ]
};

export default chapter;
