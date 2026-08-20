/* জীবন-ড্যাশবোর্ড: The Art of Thinking-এর lazy-loaded chapter module. */
import type { BookChapter } from "../book";

const chapter: BookChapter = {
  "id": "09",
  "number": 9,
  "title": "একটা গল্প দিয়ে কি সত্য প্রমাণ হয়?",
  "subtitle": "anecdote · selection bias",
  "readingMinutes": 9,
  "wordCount": 140,
  "sections": [
    {
      "id": "scene",
      "title": "শুরু করার আগে",
      "blocks": [
        {
          "type": "paragraph",
          "content": "এক উদ্যোক্তার সাফল্যের গল্প শুনে হাবিব ভাবল, চাকরি ছেড়ে দিলেই বুঝি পথ খুলে যায়। গল্পটি সত্যি ছিল। শুধু তার পাশে আরও বহু অসমাপ্ত গল্প ছিল, যাদের কেউ মঞ্চে ডাকেনি।"
        }
      ]
    },
    {
      "id": "idea",
      "title": "ভাবনাটিকে দেখা",
      "blocks": [
        {
          "type": "paragraph",
          "content": "গল্প আমাদের মনে থাকে কারণ গল্প মানুষকে কাছে আনে। কিন্তু একটি ঘটনা কোনো প্রবণতার পুরো মানচিত্র নয়। সফল উদাহরণ দেখা যায়; ব্যর্থ বা নীরব উদাহরণ অনেক সময় দেখা যায় না—এখানেই selection ও survivorship bias কাজ করতে পারে।"
        },
        {
          "type": "paragraph",
          "content": "একজন বন্ধু একটি পদ্ধতিতে উপকার পেয়েছে—এটি তার জন্য গুরুত্বপূর্ণ। কিন্তু অন্য সবার জন্য একই ফল হবে, এমন দাবি করার আগে context, cost এবং ব্যতিক্রম দেখা দরকার।"
        }
      ]
    },
    {
      "id": "trap",
      "title": "🪤 THINKING TRAP",
      "blocks": [
        {
          "type": "paragraph",
          "content": "আবেগময় উদাহরণকে পরিসংখ্যানের বিকল্প ভাবা। একটি ভালো গল্প প্রশ্ন জাগায়; উত্তর বন্ধ করে না।"
        }
      ]
    },
    {
      "id": "tool",
      "title": "🛠️ THINKING TOOL",
      "blocks": [
        {
          "type": "paragraph",
          "content": "1. গল্পটি কার?"
        },
        {
          "type": "paragraph",
          "content": "2. কার গল্প অনুপস্থিত?"
        },
        {
          "type": "paragraph",
          "content": "3. এটি কতটা সাধারণ?"
        },
        {
          "type": "paragraph",
          "content": "4. কোন context বদলালে ফল বদলাবে?"
        },
        {
          "type": "paragraph",
          "content": "5. আরও তথ্য খুঁজো"
        }
      ]
    },
    {
      "id": "reflect",
      "title": "💭 THINK",
      "blocks": [
        {
          "type": "paragraph",
          "content": "কোন সাফল্যের গল্প আমাকে অসম্পূর্ণ ছবির দিকে টানছে?"
        },
        {
          "type": "subheading",
          "content": "💡 LIFE INSIGHT"
        },
        {
          "type": "paragraph",
          "content": "একটি গল্প জানালা খুলতে পারে; পুরো শহর দেখাতে পারে না।"
        }
      ]
    }
  ],
  "exercises": [
    {
      "title": "আজকের প্রয়োগ",
      "prompt": "কোন সাফল্যের গল্প আমাকে অসম্পূর্ণ ছবির দিকে টানছে?"
    },
    {
      "title": "Thinking Tool",
      "prompt": "গল্পটি কার? → কার গল্প অনুপস্থিত? → এটি কতটা সাধারণ? → কোন context বদলালে ফল বদলাবে? → আরও তথ্য খুঁজো"
    }
  ]
};

export default chapter;
