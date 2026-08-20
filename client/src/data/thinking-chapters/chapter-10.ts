/* জীবন-ড্যাশবোর্ড: The Art of Thinking-এর lazy-loaded chapter module. */
import type { BookChapter } from "../book";

const chapter: BookChapter = {
  "id": "10",
  "number": 10,
  "title": "আমি কীভাবে ভুল হতে পারি?",
  "subtitle": "নম্রতা · belief updating",
  "readingMinutes": 9,
  "wordCount": 129,
  "sections": [
    {
      "id": "scene",
      "title": "শুরু করার আগে",
      "blocks": [
        {
          "type": "paragraph",
          "content": "একটি পুরোনো বিতর্কের কথা মনে করে রুমি হঠাৎ খেয়াল করল—সে বছরখানেক আগে যে কথাটি খুব নিশ্চিত হয়ে বলেছিল, আজ তার বিপরীত তথ্যই বেশি বিশ্বাসযোগ্য মনে হচ্ছে। সে অস্বস্তি পেল, তারপর হালকা লাগল।"
        }
      ]
    },
    {
      "id": "idea",
      "title": "ভাবনাটিকে দেখা",
      "blocks": [
        {
          "type": "paragraph",
          "content": "নিজের বিশ্বাস বদলানো মানে চরিত্রহীন হওয়া নয়; নতুন তথ্যকে জায়গা দেওয়া। বুদ্ধিবৃত্তিক নম্রতা মানে নিজের কথা ছোট করা নয়—নিজের নিশ্চিততার সীমা জানা।"
        },
        {
          "type": "paragraph",
          "content": "“আমি ভুল” বলা কঠিন হয় কারণ পরিচয় জড়িয়ে যায়। কিন্তু “আমি তখনকার তথ্য দিয়ে এটাই ভেবেছিলাম; এখন নতুন তথ্য দেখছি”—এই বাক্য চিন্তাকে রক্ষা করে, অহংকে নয়।"
        }
      ]
    },
    {
      "id": "trap",
      "title": "🪤 THINKING TRAP",
      "blocks": [
        {
          "type": "paragraph",
          "content": "ভুল স্বীকার করলে সবাই দুর্বল ভাববে—এই ভয়। আসলে যুক্তিযুক্ত revision বিশ্বস্ততা বাড়ায়।"
        }
      ]
    },
    {
      "id": "tool",
      "title": "🛠️ THINKING TOOL",
      "blocks": [
        {
          "type": "paragraph",
          "content": "1. বিশ্বাসটি লিখো"
        },
        {
          "type": "paragraph",
          "content": "2. কী প্রমাণে এটি বদলাবে?"
        },
        {
          "type": "paragraph",
          "content": "3. সবচেয়ে শক্ত counterargument পড়ো"
        },
        {
          "type": "paragraph",
          "content": "4. নতুন ভাষায় অবস্থান লিখো"
        }
      ]
    },
    {
      "id": "reflect",
      "title": "💭 THINK",
      "blocks": [
        {
          "type": "paragraph",
          "content": "আমার কোন বিশ্বাসটি প্রমাণের চেয়ে পরিচয়ের সঙ্গে বেশি বাঁধা?"
        },
        {
          "type": "subheading",
          "content": "💡 LIFE INSIGHT"
        },
        {
          "type": "paragraph",
          "content": "মনের দরজা খোলা রাখা মানে বাতাসে উড়ে যাওয়া নয়; দরজার কাছে দাঁড়িয়ে পাহারা দেওয়া।"
        }
      ]
    }
  ],
  "exercises": [
    {
      "title": "আজকের প্রয়োগ",
      "prompt": "আমার কোন বিশ্বাসটি প্রমাণের চেয়ে পরিচয়ের সঙ্গে বেশি বাঁধা?"
    },
    {
      "title": "Thinking Tool",
      "prompt": "বিশ্বাসটি লিখো → কী প্রমাণে এটি বদলাবে? → সবচেয়ে শক্ত counterargument পড়ো → নতুন ভাষায় অবস্থান লিখো"
    }
  ]
};

export default chapter;
