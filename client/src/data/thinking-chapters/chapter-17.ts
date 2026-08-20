/* জীবন-ড্যাশবোর্ড: The Art of Thinking-এর lazy-loaded chapter module. */
import type { BookChapter } from "../book";

const chapter: BookChapter = {
  "id": "17",
  "number": 17,
  "title": "Second-Order Thinking",
  "subtitle": "পরিণতি · এরপর কী",
  "readingMinutes": 9,
  "wordCount": 130,
  "sections": [
    {
      "id": "scene",
      "title": "শুরু করার আগে",
      "blocks": [
        {
          "type": "paragraph",
          "content": "একটি দোকান হঠাৎ সবকিছুর দাম কমাল। প্রথম সপ্তাহে ভিড় বাড়ল। তৃতীয় সপ্তাহে কর্মীরা কমে গেল, service খারাপ হলো, পুরোনো ক্রেতা সরে গেল। প্রথম ফলটা চোখে পড়েছিল; পরের ফলগুলো ধীরে এসেছিল।"
        }
      ]
    },
    {
      "id": "idea",
      "title": "ভাবনাটিকে দেখা",
      "blocks": [
        {
          "type": "paragraph",
          "content": "First-order thinking জিজ্ঞেস করে: এখন কী হবে? Second-order thinking জিজ্ঞেস করে: তারপর কী? আর তারও পরে? প্রতিটি সিদ্ধান্তের প্রতিক্রিয়া, incentive ও নতুন পরিস্থিতি তৈরি হয়।"
        },
        {
          "type": "paragraph",
          "content": "কাউকে সবসময় সাহায্য করা দয়ালু মনে হতে পারে। কিন্তু তা যদি তার নিজের দক্ষতা তৈরির সুযোগ কমায়, তবে দ্বিতীয় ফলটি ভাবা দরকার। সহায়তা আর নির্ভরতা এক নয়।"
        }
      ]
    },
    {
      "id": "trap",
      "title": "🪤 THINKING TRAP",
      "blocks": [
        {
          "type": "paragraph",
          "content": "তাৎক্ষণিক লাভকে পুরো ফলাফল ভাবা।"
        }
      ]
    },
    {
      "id": "tool",
      "title": "🛠️ THINKING TOOL",
      "blocks": [
        {
          "type": "paragraph",
          "content": "1. তাৎক্ষণিক ফল লেখো"
        },
        {
          "type": "paragraph",
          "content": "2. তারপর কার আচরণ বদলাবে?"
        },
        {
          "type": "paragraph",
          "content": "3. নতুন incentive কী?"
        },
        {
          "type": "paragraph",
          "content": "4. সবচেয়ে ভালো ও খারাপ দ্বিতীয় ফল?"
        },
        {
          "type": "paragraph",
          "content": "5. সময় দিয়ে আবার দেখো"
        }
      ]
    },
    {
      "id": "reflect",
      "title": "💭 THINK",
      "blocks": [
        {
          "type": "paragraph",
          "content": "এই সিদ্ধান্তের পরে কী বদলাবে—আমি কি তা সত্যি ভেবেছি?"
        },
        {
          "type": "subheading",
          "content": "💡 LIFE INSIGHT"
        },
        {
          "type": "paragraph",
          "content": "দূরের ফল আগে থেকে দেখা ভবিষ্যৎ বলা নয়; নিজের অন্ধ জায়গা একটু ছোট করা।"
        }
      ]
    }
  ],
  "exercises": [
    {
      "title": "আজকের প্রয়োগ",
      "prompt": "এই সিদ্ধান্তের পরে কী বদলাবে—আমি কি তা সত্যি ভেবেছি?"
    },
    {
      "title": "Thinking Tool",
      "prompt": "তাৎক্ষণিক ফল লেখো → তারপর কার আচরণ বদলাবে? → নতুন incentive কী? → সবচেয়ে ভালো ও খারাপ দ্বিতীয় ফল? → সময় দিয়ে আবার দেখো"
    }
  ]
};

export default chapter;
