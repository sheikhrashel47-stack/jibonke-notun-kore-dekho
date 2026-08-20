/* জীবন-ড্যাশবোর্ড: The Art of Thinking-এর lazy-loaded chapter module. */
import type { BookChapter } from "../book";

const chapter: BookChapter = {
  "id": "29",
  "number": 29,
  "title": "The Thinking Toolkit",
  "subtitle": "toolkit · practice",
  "readingMinutes": 9,
  "wordCount": 134,
  "sections": [
    {
      "id": "scene",
      "title": "শুরু করার আগে",
      "blocks": [
        {
          "type": "paragraph",
          "content": "নোটবুকের শেষ পাতায় মিতু কয়েকটি প্রশ্ন লিখে রেখেছিল। বড় কোনো সিদ্ধান্ত আসলে সে নতুন কোনো দার্শনিক হয়ে উঠত না; শুধু পুরোনো প্রশ্নগুলো বের করত। সেই ছোট toolkit-ই তাকে বারবার নিজের কাছে ফিরিয়ে আনত।"
        }
      ]
    },
    {
      "id": "idea",
      "title": "ভাবনাটিকে দেখা",
      "blocks": [
        {
          "type": "paragraph",
          "content": "চিন্তার tool কোনো জাদুর বোতাম নয়। এগুলো প্রশ্নের collection: bias detector, evidence checker, assumption tester, inversion, second-order scan, decision review। কোনটি লাগবে তা পরিস্থিতি ঠিক করে।"
        },
        {
          "type": "paragraph",
          "content": "একটি online claim-এ evidence checker; চাকরির সিদ্ধান্তে opportunity cost ও decision framework; নতুন পরিকল্পনায় pre-mortem; ঝগড়ায় fact-opinion-assumption split—একই হাতুড়ি দিয়ে সব কাজ হয় না।"
        }
      ]
    },
    {
      "id": "trap",
      "title": "🪤 THINKING TRAP",
      "blocks": [
        {
          "type": "paragraph",
          "content": "একটি model শিখে সব সমস্যাকে সেই model-এর মতো দেখতে শুরু করা।"
        }
      ]
    },
    {
      "id": "tool",
      "title": "🛠️ THINKING TOOL",
      "blocks": [
        {
          "type": "paragraph",
          "content": "1. পরিস্থিতির নাম দাও"
        },
        {
          "type": "paragraph",
          "content": "2. সবচেয়ে দরকারি প্রশ্ন বেছে নাও"
        },
        {
          "type": "paragraph",
          "content": "3. দুইটি tool-এর বেশি নিও না"
        },
        {
          "type": "paragraph",
          "content": "4. লিখে ভাবো"
        },
        {
          "type": "paragraph",
          "content": "5. ফল দেখে toolkit বদলাও"
        }
      ]
    },
    {
      "id": "reflect",
      "title": "💭 THINK",
      "blocks": [
        {
          "type": "paragraph",
          "content": "পরের কঠিন কথোপকথনে আমি কোন একটি tool সঙ্গে নেব?"
        },
        {
          "type": "subheading",
          "content": "💡 LIFE INSIGHT"
        },
        {
          "type": "paragraph",
          "content": "চিন্তার বাক্সে কম জিনিস থাকলেও চলবে; দরকারের সময় সেগুলো হাতে আসা চাই।"
        }
      ]
    }
  ],
  "exercises": [
    {
      "title": "আজকের প্রয়োগ",
      "prompt": "পরের কঠিন কথোপকথনে আমি কোন একটি tool সঙ্গে নেব?"
    },
    {
      "title": "Thinking Tool",
      "prompt": "পরিস্থিতির নাম দাও → সবচেয়ে দরকারি প্রশ্ন বেছে নাও → দুইটি tool-এর বেশি নিও না → লিখে ভাবো → ফল দেখে toolkit বদলাও"
    }
  ]
};

export default chapter;
