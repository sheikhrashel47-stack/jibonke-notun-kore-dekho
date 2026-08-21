# সমাজের আয়না — স্থানীয় QA নোট

- নতুন catalog detail route `/store/book/somajer-aina` সফলভাবে লোড হয়েছে। বাংলা title, subtitle, description, cover, 94 অধ্যায়, PDF link, book map এবং first-chapter link দৃশ্যমান।
- নতুন reader route `/book/somajer-aina/chapter/001` সফলভাবে লোড হয়েছে। 94 অধ্যায়ের sidebar, বাংলা content, chapter navigation, reading controls, reflection/note areas দৃশ্যমান।
- special-section route `/book/somajer-aina/chapter/091` সফলভাবে লোড হয়েছে। “সমাজ বনাম বাস্তবতা” feature section-এর entry formatting এবং দীর্ঘ content reader-এ দৃশ্যমান।
- Generated manuscript manifest: 94 chapter modules; মোট আনুমানিক 92,377 শব্দ।
- Generated PDF: `public/somajer-aina.pdf`, 611 pages, A5 page size, approximately 7.8 MB.
- Build passed after adding the new book ID to `ReaderContext` defaults.
