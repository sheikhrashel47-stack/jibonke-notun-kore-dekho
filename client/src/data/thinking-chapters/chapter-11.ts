/* জীবন-ড্যাশবোর্ড: The Art of Thinking-এর lazy-loaded chapter module. */
import type { BookChapter } from "../book";

const chapter: BookChapter = {
  "id": "11",
  "number": 11,
  "title": "একটি ভালো Argument কীভাবে তৈরি হয়?",
  "subtitle": "claim · evidence · reasoning",
  "readingMinutes": 9,
  "wordCount": 124,
  "sections": [
    {
      "id": "scene",
      "title": "শুরু করার আগে",
      "blocks": [
        {
          "type": "paragraph",
          "content": "টিম মিটিংয়ে নীলা বলল, “আমাদের সময়সূচি বদলানো উচিত।” বস জিজ্ঞেস করলেন, “কেন?” নীলা বুঝল তার কাছে উত্তর আছে, কিন্তু যুক্তির সেতুটি এখনও তৈরি হয়নি।"
        }
      ]
    },
    {
      "id": "idea",
      "title": "ভাবনাটিকে দেখা",
      "blocks": [
        {
          "type": "paragraph",
          "content": "একটি ভালো argument চারটি জিনিসে দাঁড়ায়: claim—তুমি কী বলছ; evidence—কী দেখাচ্ছ; reasoning—প্রমাণটি কেন দাবিকে সমর্থন করে; conclusion—তাই কী করা যুক্তিযুক্ত। শুধু মত থাকলে argument হয় না।"
        },
        {
          "type": "paragraph",
          "content": "“Remote কাজ ভালো” একটি claim। উৎপাদনশীলতা ও ব্যয় সম্পর্কিত নির্ভরযোগ্য তথ্য evidence হতে পারে। কাজের ধরন অনুযায়ী তা কেন প্রযোজ্য, সেটি reasoning। তারপর সীমাসহ সিদ্ধান্ত।"
        }
      ]
    },
    {
      "id": "trap",
      "title": "🪤 THINKING TRAP",
      "blocks": [
        {
          "type": "paragraph",
          "content": "উপসংহারকে প্রমাণের পোশাক পরানো। “সবাই জানে” বা “বোঝাই যাচ্ছে” যুক্তির বদলি নয়।"
        }
      ]
    },
    {
      "id": "tool",
      "title": "🛠️ THINKING TOOL",
      "blocks": [
        {
          "type": "paragraph",
          "content": "1. দাবি এক বাক্যে লেখো"
        },
        {
          "type": "paragraph",
          "content": "2. প্রমাণ জোগাড় করো"
        },
        {
          "type": "paragraph",
          "content": "3. সংযোগ ব্যাখ্যা করো"
        },
        {
          "type": "paragraph",
          "content": "4. সীমা বলো"
        },
        {
          "type": "paragraph",
          "content": "5. বিকল্প উত্তর দাও"
        }
      ]
    },
    {
      "id": "reflect",
      "title": "💭 THINK",
      "blocks": [
        {
          "type": "paragraph",
          "content": "আমার সবচেয়ে গুরুত্বপূর্ণ মতটির প্রমাণ আর reasoning আলাদা করে বলা যায় কি?"
        },
        {
          "type": "subheading",
          "content": "💡 LIFE INSIGHT"
        },
        {
          "type": "paragraph",
          "content": "যুক্তি জেতার অস্ত্র নয়; একই বাস্তবতার দিকে দুজনের হাঁটার সেতু।"
        }
      ]
    }
  ],
  "exercises": [
    {
      "title": "আজকের প্রয়োগ",
      "prompt": "আমার সবচেয়ে গুরুত্বপূর্ণ মতটির প্রমাণ আর reasoning আলাদা করে বলা যায় কি?"
    },
    {
      "title": "Thinking Tool",
      "prompt": "দাবি এক বাক্যে লেখো → প্রমাণ জোগাড় করো → সংযোগ ব্যাখ্যা করো → সীমা বলো → বিকল্প উত্তর দাও"
    }
  ]
};

export default chapter;
