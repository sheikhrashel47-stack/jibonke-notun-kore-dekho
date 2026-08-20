/* জীবন-ড্যাশবোর্ড: The Art of Thinking-এর lazy-loaded chapter module. */
import type { BookChapter } from "../book";

const chapter: BookChapter = {
  "id": "30",
  "number": 30,
  "title": "The Thinking Mind",
  "subtitle": "চর্চা · জীবন · ফিরে দেখা",
  "readingMinutes": 9,
  "wordCount": 159,
  "sections": [
    {
      "id": "scene",
      "title": "শুরু করার আগে",
      "blocks": [
        {
          "type": "paragraph",
          "content": "বহুদিন পরে রাফি পুরোনো এক ডায়েরি খুলল। সেখানে তার কিছু নিশ্চিত কথা ছিল। আজ সেগুলোর কয়েকটি দেখে সে হাসল, কয়েকটির জন্য কৃতজ্ঞ হলো। ভুলগুলো তাকে ছোট করেনি; তারা দেখিয়েছে সে পথে ছিল।"
        }
      ]
    },
    {
      "id": "idea",
      "title": "ভাবনাটিকে দেখা",
      "blocks": [
        {
          "type": "paragraph",
          "content": "ভালো চিন্তা এমন কোনো অবস্থান নয় যেখানে আর ভুল হয় না। এটি একটি চর্চা: নিজেকে ধরা, প্রমাণ দেখা, প্রশ্নের মান বাড়ানো, সিদ্ধান্তকে review করা, আর মানুষের জটিলতাকে একটু বেশি জায়গা দেওয়া।"
        },
        {
          "type": "paragraph",
          "content": "যে মানুষ নিজের চিন্তার সীমা জানে, সে অন্যের কথাও একটু মন দিয়ে শোনে। যে মানুষ সিদ্ধান্তের trade-off দেখে, সে নিজের জীবনেও কম নাটক, বেশি দায়িত্ব আনে।"
        }
      ]
    },
    {
      "id": "trap",
      "title": "🪤 THINKING TRAP",
      "blocks": [
        {
          "type": "paragraph",
          "content": "এই বইয়ের কোনো একটি বাক্যকে নতুন কঠোর belief বানানো। চিন্তার শিল্প নিজেই একটি খোলা অনুশীলন।"
        }
      ]
    },
    {
      "id": "tool",
      "title": "🛠️ THINKING TOOL",
      "blocks": [
        {
          "type": "paragraph",
          "content": "1. আজকের একটি বিশ্বাস লেখো"
        },
        {
          "type": "paragraph",
          "content": "2. একটি assumption খুঁজো"
        },
        {
          "type": "paragraph",
          "content": "3. একটি ভালো প্রশ্ন করো"
        },
        {
          "type": "paragraph",
          "content": "4. একটি ছোট সিদ্ধান্ত review করো"
        },
        {
          "type": "paragraph",
          "content": "5. আগামীকাল আবার দেখো"
        }
      ]
    },
    {
      "id": "reflect",
      "title": "💭 THINK",
      "blocks": [
        {
          "type": "paragraph",
          "content": "আমি কি নিজের মনকে এমন প্রশ্ন করি, যেটি অন্য কাউকে করলে করতাম?"
        },
        {
          "type": "subheading",
          "content": "💡 LIFE INSIGHT"
        },
        {
          "type": "paragraph",
          "content": "প্রথম প্রশ্নটি ছিল—তুমি যা ভাবছো, সব কি সত্যি? শেষ উত্তরটি হয়তো এই: সত্যের দিকে হাঁটা শুরু হয় নিজের মনে নরম একটি প্রশ্ন রাখার মাধ্যমে।"
        }
      ]
    }
  ],
  "exercises": [
    {
      "title": "আজকের প্রয়োগ",
      "prompt": "আমি কি নিজের মনকে এমন প্রশ্ন করি, যেটি অন্য কাউকে করলে করতাম?"
    },
    {
      "title": "Thinking Tool",
      "prompt": "আজকের একটি বিশ্বাস লেখো → একটি assumption খুঁজো → একটি ভালো প্রশ্ন করো → একটি ছোট সিদ্ধান্ত review করো → আগামীকাল আবার দেখো"
    }
  ]
};

export default chapter;
