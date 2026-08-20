/* জীবন-ড্যাশবোর্ড: The Art of Thinking-এর lazy-loaded chapter module. */
import type { BookChapter } from "../book";

const chapter: BookChapter = {
  "id": "23",
  "number": 23,
  "title": "Sunk Cost Trap",
  "subtitle": "অতীত খরচ · ভবিষ্যৎ মূল্য",
  "readingMinutes": 9,
  "wordCount": 135,
  "sections": [
    {
      "id": "scene",
      "title": "শুরু করার আগে",
      "blocks": [
        {
          "type": "paragraph",
          "content": "একটি সিনেমা খারাপ লাগছিল, তবু ফারিয়া বসে রইল। টিকিটের টাকা তো দেওয়া হয়ে গেছে। ঘণ্টাখানেক পরে সে বুঝল—টাকাটি আর ফেরত আসবে না; কিন্তু নিজের সময়টা এখনও তার হাতে আছে।"
        }
      ]
    },
    {
      "id": "idea",
      "title": "ভাবনাটিকে দেখা",
      "blocks": [
        {
          "type": "paragraph",
          "content": "Sunk cost হলো যা ইতিমধ্যে খরচ হয়েছে এবং ফেরত আনা যাবে না। সমস্যা হয় যখন অতীতের খরচকে ভবিষ্যৎ সিদ্ধান্তের একমাত্র কারণ বানাই। প্রশ্নটি হওয়া উচিত: আজ থেকে সামনে এগোলে কোন পথের মূল্য বেশি?"
        },
        {
          "type": "paragraph",
          "content": "ভুল কোর্স, পুরোনো project, অচল সম্পর্ক—এসব ক্ষেত্রে অতীতকে অস্বীকার নয়, শিক্ষা হিসেবে রাখা দরকার। কিন্তু কেবল অনেকটা এসেছি বলে আরও খারাপ পথে যাওয়া যুক্তি নয়।"
        }
      ]
    },
    {
      "id": "trap",
      "title": "🪤 THINKING TRAP",
      "blocks": [
        {
          "type": "paragraph",
          "content": "“এত দূর এসেছি” বাক্যকে ভবিষ্যতের কম্পাস বানানো।"
        }
      ]
    },
    {
      "id": "tool",
      "title": "🛠️ THINKING TOOL",
      "blocks": [
        {
          "type": "paragraph",
          "content": "1. কি খরচ হয়ে গেছে?"
        },
        {
          "type": "paragraph",
          "content": "2. কী ফেরত আসবে না?"
        },
        {
          "type": "paragraph",
          "content": "3. আজ নতুন করে শুরু করলে কী বেছে নিতাম?"
        },
        {
          "type": "paragraph",
          "content": "4. আগামী খরচ কী?"
        },
        {
          "type": "paragraph",
          "content": "5. শেখাটা কী?"
        }
      ]
    },
    {
      "id": "reflect",
      "title": "💭 THINK",
      "blocks": [
        {
          "type": "paragraph",
          "content": "আমি কি অতীতের খরচ বাঁচাতে গিয়ে ভবিষ্যতের খরচ বাড়াচ্ছি?"
        },
        {
          "type": "subheading",
          "content": "💡 LIFE INSIGHT"
        },
        {
          "type": "paragraph",
          "content": "ফিরে আসা সবসময় হার নয়; কখনো সেটিই পথ হারানো বন্ধ করা।"
        }
      ]
    }
  ],
  "exercises": [
    {
      "title": "আজকের প্রয়োগ",
      "prompt": "আমি কি অতীতের খরচ বাঁচাতে গিয়ে ভবিষ্যতের খরচ বাড়াচ্ছি?"
    },
    {
      "title": "Thinking Tool",
      "prompt": "কি খরচ হয়ে গেছে? → কী ফেরত আসবে না? → আজ নতুন করে শুরু করলে কী বেছে নিতাম? → আগামী খরচ কী? → শেখাটা কী?"
    }
  ]
};

export default chapter;
