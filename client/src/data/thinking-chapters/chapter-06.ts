/* জীবন-ড্যাশবোর্ড: The Art of Thinking-এর lazy-loaded chapter module. */
import type { BookChapter } from "../book";

const chapter: BookChapter = {
  "id": "06",
  "number": 6,
  "title": "Fact, Opinion নাকি Assumption?",
  "subtitle": "তথ্য · মতামত · অনুমান",
  "readingMinutes": 9,
  "wordCount": 136,
  "sections": [
    {
      "id": "scene",
      "title": "শুরু করার আগে",
      "blocks": [
        {
          "type": "paragraph",
          "content": "একটি social-media পোস্টে লেখা ছিল, “এই সিদ্ধান্তে সবাই ক্ষতিগ্রস্ত।” তৃষা মন্তব্য করতে গিয়ে থামল। “সবাই” কি একটি fact, নাকি লেখকের ক্ষোভের ভেতর থেকে বের হওয়া একটি বড় শব্দ?"
        }
      ]
    },
    {
      "id": "idea",
      "title": "ভাবনাটিকে দেখা",
      "blocks": [
        {
          "type": "paragraph",
          "content": "Fact যাচাই করা যায়। Opinion হলো মূল্যায়ন। Assumption হলো এমন একটি ভিত্তি, যাকে সত্য ধরে নিয়ে আমরা বাকিটা বানাই। ব্যাখ্যা হলো—এই তথ্য আমার কাছে কী অর্থ বহন করছে। চারটি জিনিস একই অনুচ্ছেদে থাকলেও এক নয়।"
        },
        {
          "type": "paragraph",
          "content": "“বাসা ভাড়া বেড়েছে” একটি fact হতে পারে। “এটি অন্যায়” একটি opinion। “মালিক আমাদের সুযোগ নিচ্ছেন” একটি assumption। কোনটির জন্য কী ধরনের উত্তর দরকার, তা বুঝলে আলোচনা পরিষ্কার হয়।"
        }
      ]
    },
    {
      "id": "trap",
      "title": "🪤 THINKING TRAP",
      "blocks": [
        {
          "type": "paragraph",
          "content": "তীব্র ভাষাকে শক্ত প্রমাণ ভাবা। শব্দের তাপমাত্রা তার সত্যতার মাপকাঠি নয়।"
        }
      ]
    },
    {
      "id": "tool",
      "title": "🛠️ THINKING TOOL",
      "blocks": [
        {
          "type": "paragraph",
          "content": "1. বাক্যটি ভাগ করো"
        },
        {
          "type": "paragraph",
          "content": "2. যা যাচাই করা যায় তা চিহ্নিত করো"
        },
        {
          "type": "paragraph",
          "content": "3. মূল্যবিচার আলাদা করো"
        },
        {
          "type": "paragraph",
          "content": "4. লুকানো অনুমান খুঁজে বের করো"
        }
      ]
    },
    {
      "id": "reflect",
      "title": "💭 THINK",
      "blocks": [
        {
          "type": "paragraph",
          "content": "আমি কোন মতামতকে অজান্তে fact হিসেবে ব্যবহার করছি?"
        },
        {
          "type": "subheading",
          "content": "💡 LIFE INSIGHT"
        },
        {
          "type": "paragraph",
          "content": "পরিষ্কার ভাষা শুধু সুন্দর নয়; এটি চিন্তার স্বাস্থ্যবিধি।"
        }
      ]
    }
  ],
  "exercises": [
    {
      "title": "আজকের প্রয়োগ",
      "prompt": "আমি কোন মতামতকে অজান্তে fact হিসেবে ব্যবহার করছি?"
    },
    {
      "title": "Thinking Tool",
      "prompt": "বাক্যটি ভাগ করো → যা যাচাই করা যায় তা চিহ্নিত করো → মূল্যবিচার আলাদা করো → লুকানো অনুমান খুঁজে বের করো"
    }
  ]
};

export default chapter;
