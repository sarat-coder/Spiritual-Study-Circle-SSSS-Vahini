(() => {
  'use strict';
  const books = window.orderVahiniBooks(window.VAHINI_BOOKS || []);
  const $ = id => document.getElementById(id);
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const sourceLink = value => {
    if (/^assets\/(?:bhagavatha-vahini|ramakatha-rasavahini-part-[12]|upanishad-vahini|sutra-vahini|sathya-sai-vahini|sandeha-nivarini|prema-vahini|prasnothara-vahini|prasanthi-vahini|leela-kaivalya|jnana-vahini|gita-vahini|dhyana-vahini|dharma-vahini|vidya-vahini)\.pdf(?:#page=[1-9]\d{0,2})?$/.test(value)) return escape(value);
    try { const u = new URL(value); return u.protocol === 'https:' && ['vahini.org','www.vahini.org'].includes(u.hostname) ? escape(u.href) : 'https://www.vahini.org/downloads.html'; }
    catch { return 'https://www.vahini.org/downloads.html'; }
  };
  const activityNames = {readbook:'Read the book',summary:'Summary',questions:'Questions & answers',quiz:'Quiz'};
  const isBhagavataReadBook = (bookId=currentBook().id, topicId=currentTopic().id) => (bookId==='bhagavata-vahini' && ['preface','chapter-01','chapter-02','chapter-03','chapter-04','chapter-05','chapter-06','chapter-07','chapter-08','chapter-09','chapter-10','chapter-11','chapter-12','chapter-13','chapter-14','chapter-15','chapter-16','chapter-17','chapter-18','chapter-19','chapter-20','chapter-21','chapter-22','chapter-23','chapter-24','chapter-25','chapter-26','chapter-27','chapter-28','chapter-29','chapter-30','chapter-31','chapter-33','chapter-34','chapter-35','chapter-36','chapter-37','chapter-38','chapter-39','chapter-40','chapter-41','chapter-42'].includes(topicId)) || (bookId==='geetha-vahini' && ['preface','chapter-01','chapter-02','chapter-03','chapter-04','chapter-05','chapter-06','chapter-07','chapter-08','chapter-09','chapter-10','chapter-11','chapter-12','chapter-13','chapter-14','chapter-15','chapter-16','chapter-17','chapter-18','chapter-19','chapter-20','chapter-21','chapter-22','chapter-23','chapter-24','chapter-25','chapter-26','chapter-27'].includes(topicId)) || (bookId==='ramakatha-rasavahini' && ['preface','part-1-the-inner-meaning','part-1-chapter-01','part-1-chapter-02','part-1-chapter-03','part-1-chapter-04','part-1-chapter-05','part-1-chapter-06','part-1-chapter-07','part-1-chapter-08','part-1-chapter-09','part-1-chapter-10','part-1-chapter-11','part-1-chapter-12','part-1-chapter-13','part-1-chapter-14','part-1-chapter-15','part-1-chapter-16','part-1-chapter-17','part-1-chapter-18','part-1-chapter-19','part-2-chapter-01','part-2-chapter-02','part-2-chapter-03','part-2-chapter-04','part-2-chapter-05','part-2-chapter-06','part-2-chapter-07','part-2-chapter-08'].includes(topicId));
  const defaultTab = (bi,ti) => isBhagavataReadBook(books[bi]?.id,books[bi]?.topics[ti]?.id) ? 'readbook' : 'summary';
  const readBookText = () => currentTopic().id==='preface' ? currentBook().id==='geetha-vahini' ? window.VAHINI_GITA_PREFACE_EN : currentBook().id==='ramakatha-rasavahini' ? window.VAHINI_RAMAKATHA_PREFACE_EN : window.VAHINI_READ_BOOK_EN_PREFACE : (currentBook().id==='ramakatha-rasavahini' && currentTopic().id==='part-1-the-inner-meaning') ? window.VAHINI_RAMAKATHA_CH01_EN : (currentBook().id==='ramakatha-rasavahini' && currentTopic().id==='part-1-chapter-01') ? window.VAHINI_RAMAKATHA_CH02_EN : (currentBook().id==='ramakatha-rasavahini' && currentTopic().id==='part-1-chapter-02') ? window.VAHINI_RAMAKATHA_CH03_EN : (currentBook().id==='ramakatha-rasavahini' && currentTopic().id==='part-1-chapter-03') ? window.VAHINI_RAMAKATHA_CH04_EN : (currentBook().id==='ramakatha-rasavahini' && currentTopic().id==='part-1-chapter-04') ? window.VAHINI_RAMAKATHA_CH05_EN : (currentBook().id==='ramakatha-rasavahini' && currentTopic().id==='part-1-chapter-05') ? window.VAHINI_RAMAKATHA_CH06_EN : (currentBook().id==='ramakatha-rasavahini' && currentTopic().id==='part-1-chapter-06') ? window.VAHINI_RAMAKATHA_CH07_EN : (currentBook().id==='ramakatha-rasavahini' && currentTopic().id==='part-1-chapter-07') ? window.VAHINI_RAMAKATHA_CH08_EN : (currentBook().id==='ramakatha-rasavahini' && currentTopic().id==='part-1-chapter-08') ? window.VAHINI_RAMAKATHA_CH09_EN : (currentBook().id==='ramakatha-rasavahini' && currentTopic().id==='part-1-chapter-09') ? window.VAHINI_RAMAKATHA_CH10_EN : (currentBook().id==='ramakatha-rasavahini' && currentTopic().id==='part-1-chapter-10') ? window.VAHINI_RAMAKATHA_CH11_EN : (currentBook().id==='ramakatha-rasavahini' && currentTopic().id==='part-1-chapter-11') ? window.VAHINI_RAMAKATHA_CH12_EN : (currentBook().id==='ramakatha-rasavahini' && currentTopic().id==='part-1-chapter-12') ? window.VAHINI_RAMAKATHA_CH13_EN : (currentBook().id==='ramakatha-rasavahini' && currentTopic().id==='part-1-chapter-13') ? window.VAHINI_RAMAKATHA_CH14_EN : (currentBook().id==='ramakatha-rasavahini' && currentTopic().id==='part-1-chapter-15') ? window.VAHINI_RAMAKATHA_CH16_EN : (currentBook().id==='ramakatha-rasavahini' && currentTopic().id==='part-1-chapter-14') ? window.VAHINI_RAMAKATHA_CH15_EN : (currentBook().id==='ramakatha-rasavahini' && currentTopic().id==='part-1-chapter-16') ? window.VAHINI_RAMAKATHA_CH17_EN : (currentBook().id==='ramakatha-rasavahini' && currentTopic().id==='part-1-chapter-17') ? window.VAHINI_RAMAKATHA_CH18_EN : (currentBook().id==='ramakatha-rasavahini' && currentTopic().id==='part-1-chapter-18') ? window.VAHINI_RAMAKATHA_CH19_EN : (currentBook().id==='ramakatha-rasavahini' && currentTopic().id==='part-1-chapter-19') ? window.VAHINI_RAMAKATHA_CH20_EN : (currentBook().id==='ramakatha-rasavahini' && currentTopic().id==='part-2-chapter-01') ? window.VAHINI_RAMAKATHA_P2_CH01_EN : (currentBook().id==='ramakatha-rasavahini' && currentTopic().id==='part-2-chapter-02') ? window.VAHINI_RAMAKATHA_P2_CH02_EN : (currentBook().id==='ramakatha-rasavahini' && currentTopic().id==='part-2-chapter-03') ? window.VAHINI_RAMAKATHA_P2_CH03_EN : (currentBook().id==='ramakatha-rasavahini' && currentTopic().id==='part-2-chapter-04') ? window.VAHINI_RAMAKATHA_P2_CH04_EN : (currentBook().id==='ramakatha-rasavahini' && currentTopic().id==='part-2-chapter-05') ? window.VAHINI_RAMAKATHA_P2_CH05_EN : (currentBook().id==='ramakatha-rasavahini' && currentTopic().id==='part-2-chapter-06') ? window.VAHINI_RAMAKATHA_P2_CH06_EN : (currentBook().id==='ramakatha-rasavahini' && currentTopic().id==='part-2-chapter-07') ? window.VAHINI_RAMAKATHA_P2_CH07_EN : (currentBook().id==='ramakatha-rasavahini' && currentTopic().id==='part-2-chapter-08') ? window.VAHINI_RAMAKATHA_P2_CH08_EN : (currentBook().id==='geetha-vahini' && currentTopic().id==='chapter-01') ? window.VAHINI_GITA_CH01_EN : (currentBook().id==='geetha-vahini' && currentTopic().id==='chapter-02') ? window.VAHINI_GITA_CH02_EN : (currentBook().id==='geetha-vahini' && currentTopic().id==='chapter-03') ? window.VAHINI_GITA_CH03_EN : (currentBook().id==='geetha-vahini' && currentTopic().id==='chapter-05') ? window.VAHINI_GITA_CH05_EN : (currentBook().id==='geetha-vahini' && currentTopic().id==='chapter-06') ? window.VAHINI_GITA_CH06_EN : (currentBook().id==='geetha-vahini' && currentTopic().id==='chapter-07') ? window.VAHINI_GITA_CH07_EN : (currentBook().id==='geetha-vahini' && currentTopic().id==='chapter-08') ? window.VAHINI_GITA_CH08_EN : (currentBook().id==='geetha-vahini' && currentTopic().id==='chapter-09') ? window.VAHINI_GITA_CH09_EN : (currentBook().id==='geetha-vahini' && currentTopic().id==='chapter-10') ? window.VAHINI_GITA_CH10_EN : (currentBook().id==='geetha-vahini' && currentTopic().id==='chapter-11') ? window.VAHINI_GITA_CH11_EN : (currentBook().id==='geetha-vahini' && currentTopic().id==='chapter-12') ? window.VAHINI_GITA_CH12_EN : (currentBook().id==='geetha-vahini' && currentTopic().id==='chapter-13') ? window.VAHINI_GITA_CH13_EN : (currentBook().id==='geetha-vahini' && currentTopic().id==='chapter-14') ? window.VAHINI_GITA_CH14_EN : (currentBook().id==='geetha-vahini' && currentTopic().id==='chapter-15') ? window.VAHINI_GITA_CH15_EN : (currentBook().id==='geetha-vahini' && currentTopic().id==='chapter-16') ? window.VAHINI_GITA_CH16_EN : (currentBook().id==='geetha-vahini' && currentTopic().id==='chapter-17') ? window.VAHINI_GITA_CH17_EN : (currentBook().id==='geetha-vahini' && currentTopic().id==='chapter-18') ? window.VAHINI_GITA_CH18_EN : (currentBook().id==='geetha-vahini' && currentTopic().id==='chapter-19') ? window.VAHINI_GITA_CH19_EN : (currentBook().id==='geetha-vahini' && currentTopic().id==='chapter-20') ? window.VAHINI_GITA_CH20_EN : (currentBook().id==='geetha-vahini' && currentTopic().id==='chapter-21') ? window.VAHINI_GITA_CH21_EN : (currentBook().id==='geetha-vahini' && currentTopic().id==='chapter-22') ? window.VAHINI_GITA_CH22_EN : (currentBook().id==='geetha-vahini' && currentTopic().id==='chapter-23') ? window.VAHINI_GITA_CH23_EN : (currentBook().id==='geetha-vahini' && currentTopic().id==='chapter-24') ? window.VAHINI_GITA_CH24_EN : (currentBook().id==='geetha-vahini' && currentTopic().id==='chapter-25') ? window.VAHINI_GITA_CH25_EN : (currentBook().id==='geetha-vahini' && currentTopic().id==='chapter-26') ? window.VAHINI_GITA_CH26_EN : (currentBook().id==='geetha-vahini' && currentTopic().id==='chapter-27') ? window.VAHINI_GITA_CH27_EN : currentTopic().id==='chapter-02' ? window.VAHINI_READ_BOOK_EN_CH02 : currentTopic().id==='chapter-04' ? window.VAHINI_READ_BOOK_EN_CH04 : currentTopic().id==='chapter-05' ? window.VAHINI_READ_BOOK_EN_CH05 : currentTopic().id==='chapter-06' ? window.VAHINI_READ_BOOK_EN_CH06 : currentTopic().id==='chapter-07' ? window.VAHINI_READ_BOOK_EN_CH07 : currentTopic().id==='chapter-08' ? window.VAHINI_READ_BOOK_EN_CH08 : currentTopic().id==='chapter-09' ? window.VAHINI_READ_BOOK_EN_CH09 : currentTopic().id==='chapter-10' ? window.VAHINI_READ_BOOK_EN_CH10 : currentTopic().id==='chapter-11' ? window.VAHINI_READ_BOOK_EN_CH11 : currentTopic().id==='chapter-12' ? window.VAHINI_READ_BOOK_EN_CH12 : currentTopic().id==='chapter-13' ? window.VAHINI_READ_BOOK_EN_CH13 : currentTopic().id==='chapter-14' ? window.VAHINI_READ_BOOK_EN_CH14 : currentTopic().id==='chapter-15' ? window.VAHINI_READ_BOOK_EN_CH15 : currentTopic().id==='chapter-16' ? window.VAHINI_READ_BOOK_EN_CH16 : currentTopic().id==='chapter-17' ? window.VAHINI_READ_BOOK_EN_CH17 : currentTopic().id==='chapter-18' ? window.VAHINI_READ_BOOK_EN_CH18 : currentTopic().id==='chapter-19' ? window.VAHINI_READ_BOOK_EN_CH19 : currentTopic().id==='chapter-20' ? window.VAHINI_READ_BOOK_EN_CH20 : currentTopic().id==='chapter-21' ? window.VAHINI_READ_BOOK_EN_CH21 : currentTopic().id==='chapter-22' ? window.VAHINI_READ_BOOK_EN_CH22 : currentTopic().id==='chapter-23' ? window.VAHINI_READ_BOOK_EN_CH23 : currentTopic().id==='chapter-24' ? window.VAHINI_READ_BOOK_EN_CH24 : currentTopic().id==='chapter-25' ? window.VAHINI_READ_BOOK_EN_CH25 : currentTopic().id==='chapter-26' ? window.VAHINI_READ_BOOK_EN_CH26 : currentTopic().id==='chapter-27' ? window.VAHINI_READ_BOOK_EN_CH27 : currentTopic().id==='chapter-28' ? window.VAHINI_READ_BOOK_EN_CH28 : currentTopic().id==='chapter-29' ? window.VAHINI_READ_BOOK_EN_CH29 : currentTopic().id==='chapter-30' ? window.VAHINI_READ_BOOK_EN_CH30 : currentTopic().id==='chapter-31' ? window.VAHINI_READ_BOOK_EN_CH31 : currentTopic().id==='chapter-33' ? window.VAHINI_READ_BOOK_EN_CH33 : currentTopic().id==='chapter-34' ? window.VAHINI_READ_BOOK_EN_CH34 : currentTopic().id==='chapter-35' ? window.VAHINI_READ_BOOK_EN_CH35 : currentTopic().id==='chapter-36' ? window.VAHINI_READ_BOOK_EN_CH36 : currentTopic().id==='chapter-37' ? window.VAHINI_READ_BOOK_EN_CH37 : currentTopic().id==='chapter-38' ? window.VAHINI_READ_BOOK_EN_CH38 : currentTopic().id==='chapter-39' ? window.VAHINI_READ_BOOK_EN_CH39 : currentTopic().id==='chapter-40' ? window.VAHINI_READ_BOOK_EN_CH40 : currentTopic().id==='chapter-41' ? window.VAHINI_READ_BOOK_EN_CH41 : currentTopic().id==='chapter-42' ? window.VAHINI_READ_BOOK_EN_CH42 : window.VAHINI_READ_BOOK_EN;
  const tabEntries = () => Object.entries(activityNames).filter(([id])=>currentBook().id==='ramakatha-rasavahini'&&['preface','part-1-the-inner-meaning'].includes(currentTopic().id)?id==='readbook':id!=='readbook'||isBhagavataReadBook());
  function artwork(bookId) {
    if(bookId==='vidya') return '<figure class="book-art"><img src="assets/vidya-vahini-cover.webp" width="256" height="384" alt="Vidya Vahini book cover featuring the goddess of learning"><figcaption>Vidya Vahini · Original book cover</figcaption></figure>';
    if(bookId==='dharma-vahini') return '<figure class="book-art"><img src="assets/dharma-vahini-cover.webp" width="256" height="384" alt="Dharma Vahini book cover displaying the Om symbol and symbols of world religions"><figcaption>Dharma Vahini · Original book cover</figcaption></figure>';
    if(bookId==='leela-kaivalya') return '<figure class="book-art"><img src="assets/leela-kaivalya-cover.webp" width="256" height="384" alt="Leela Kaivalya Vahini book cover featuring Bhagawan Sri Sathya Sai Baba"><figcaption>Leela Kaivalya Vahini · Original book cover</figcaption></figure>';
    if(bookId==='jnana-vahini') return '<figure class="book-art"><img src="assets/jnana-vahini-cover.webp" width="256" height="384" alt="Jnana Vahini book cover featuring Bhagawan Sri Sathya Sai Baba writing"><figcaption>Jnana Vahini · Original book cover</figcaption></figure>';
    if(bookId==='prashanthi-vahini') return '<figure class="book-art"><img src="assets/prasanthi-vahini-cover.webp" width="256" height="384" alt="Prasanthi Vahini book cover featuring Bhagawan Sri Sathya Sai Baba"><figcaption>Prasanthi Vahini · Original book cover</figcaption></figure>';
    if(bookId==='prasnottara') return '<figure class="book-art"><img src="assets/prasnottara-vahini-cover.webp" width="256" height="384" alt="Prasnottara Vahini book cover featuring Bhagawan Sri Sathya Sai Baba"><figcaption>Prasnottara Vahini · Original book cover</figcaption></figure>';
    if(bookId==='prema-vahini') return '<figure class="book-art"><img src="assets/prema-vahini-cover.webp" width="256" height="384" alt="Prema Vahini book cover featuring Krishna with a cow"><figcaption>Prema Vahini · Original book cover</figcaption></figure>';
    if(bookId==='sandeha-nivarini') return '<figure class="book-art"><img src="assets/sandeha-nivarini-cover.webp" width="256" height="384" alt="Sandeha Nivarini book cover featuring Bhagawan Sri Sathya Sai Baba"><figcaption>Sandeha Nivarini · Original book cover</figcaption></figure>';
    if(bookId==='sathya-sai') return '<figure class="book-art"><img src="assets/sathya-sai-vahini-cover.webp" width="256" height="384" alt="Sathya Sai Vahini book cover featuring Bhagawan Sri Sathya Sai Baba"><figcaption>Sathya Sai Vahini · Original book cover</figcaption></figure>';
    if(bookId==='sutra') return '<figure class="book-art"><img src="assets/sutra-vahini-cover.webp" width="256" height="384" alt="Sutra Vahini book cover featuring Bhagawan Sri Sathya Sai Baba"><figcaption>Sutra Vahini · Original book cover</figcaption></figure>';
    if(bookId==='upanishad') return '<figure class="book-art"><img src="assets/upanishad-vahini-cover.webp" width="256" height="384" alt="Upanishad Vahini book cover featuring Shiva in meditation"><figcaption>Upanishad Vahini · Original book cover</figcaption></figure>';
    if(bookId==='dhyana-vahini') return '<figure class="book-art"><img src="assets/dhyana-vahini-cover.webp" width="256" height="384" alt="Dhyana Vahini book cover featuring Bhagawan Sri Sathya Sai Baba"><figcaption>Dhyana Vahini · Original book cover</figcaption></figure>';
    if(bookId==='bhagavata-vahini') return '<figure class="book-art"><img src="assets/bhagavata-vahini-cover.webp" width="256" height="384" alt="Bhagavatha Vahini book cover featuring child Krishna"><figcaption>Bhagavatha Vahini · Original book cover</figcaption></figure>';
    if(bookId==='geetha-vahini') return '<figure class="book-art"><img src="assets/geeta-vahini-cover.webp" width="256" height="384" alt="Geeta Vahini book cover showing Krishna and Arjuna’s chariot"><figcaption>Geeta Vahini · Original book cover</figcaption></figure>';
    if(bookId==='ramakatha-rasavahini') return '<figure class="book-art"><img src="assets/ramakatha-rasavahini-cover.webp" width="256" height="384" alt="Ramakatha Rasavahini Deluxe Edition book cover"><figcaption>Book cover · <a href="https://www.ssssahitya.org/vahinis/ramakatha-rasavahini" target="_blank" rel="noopener noreferrer">Sri Sathya Sai Sahitya ↗</a></figcaption></figure>';
    return '';
  }
  let bookIndex = 0, topicIndex = 0, activeTab = 'summary';
  const attempts = new Map();
  const currentBook = () => books[bookIndex];
  const currentTopic = () => currentBook().topics[topicIndex];
  const key = () => `${currentBook().id}/${currentTopic().id}`;
  const announce = message => { $('announcement').textContent = message; };
  function focusActivity() {
    $('activity').scrollIntoView({block:'start'});
    $('activity').focus({preventScroll:true});
  }
  function getAttempt() {
    if (!attempts.has(key())) attempts.set(key(), {answers:[],checked:false,page:0});
    return attempts.get(key());
  }
  function updateHash() {
    const hash = `#${currentBook().id}/${currentTopic().id}/${activeTab}`;
    if (location.hash !== hash) history.replaceState(null, '', hash);
  }
  function setStudy(bi,ti=0,tab=defaultTab(bi,ti),moveFocus=false) {
    if (!Number.isInteger(bi) || !books[bi] || !Number.isInteger(ti) || !books[bi].topics[ti] || !activityNames[tab] || (tab==='readbook' && !isBhagavataReadBook(books[bi].id,books[bi].topics[ti].id))) throw new Error('Choose an existing book, topic and activity.');
    bookIndex=bi; topicIndex=ti; activeTab=tab;
    render(); updateHash();
    if(moveFocus) { $('study').scrollIntoView({block:'start'}); $('study').focus({preventScroll:true}); }
    announce(`${currentBook().title}: ${currentTopic().title}. ${activityNames[activeTab]}.`);
  }
  function readHash() {
    if (location.hash === '#study') { $('study').focus(); return; }
    const [b,t,a] = location.hash.slice(1).split('/');
    const bi = books.findIndex(x=>x.id===b);
    const ti = bi < 0 ? -1 : books[bi].topics.findIndex(x=>x.id===t);
    const requestedTab=!activityNames[a]?defaultTab(bi,ti):a;
    const safeTab=requestedTab==='readbook'&&!(bi>=0&&ti>=0&&isBhagavataReadBook(books[bi].id,books[bi].topics[ti].id))?'summary':requestedTab;
    setStudy(bi < 0 ? 0 : bi,ti < 0 ? 0 : ti,safeTab);
  }
  function render() {
    const b=currentBook(),t=currentTopic();
    const chapterMode=b.organization==='chapters', unit=b.unitLabel==='section'?'section':chapterMode?'chapter':'topic';
    $('book-count').textContent=books.length;
    $('library-count').textContent=`${books.length} works`;
    $('book-list').innerHTML=books.map((x,i)=>`<button class="book-item ${i===bookIndex?'active':''}" data-book="${i}" ${i===bookIndex?'aria-current="true"':''}><span class="book-number">${String(i+1).padStart(2,'0')}</span><span class="book-name">${escape(x.title)}<span class="book-subtitle">${escape(x.subtitle)}</span></span></button>`).join('');
    $('mobile-book').innerHTML=books.map((x,i)=>`<option value="${i}" ${i===bookIndex?'selected':''}>${escape(x.title)}</option>`).join('');
    const art=artwork(b.id);
    $('book-header').classList.toggle('with-art',!!art);
    const originalLinks=chapterMode&&b.pdfUrls?b.pdfUrls.map(p=>`<a href="${sourceLink(p.url)}" target="_blank" rel="noopener noreferrer">${escape(p.label)} PDF ↗</a>`).join(''):`<a href="${sourceLink(b.sourceUrl)}" target="_blank" rel="noopener noreferrer">Read original book ↗</a>${chapterMode?'':(b.pdfUrls || (b.pdfUrl?[{label:'Book',url:b.pdfUrl}]:[])).map(p=>`<a href="${sourceLink(p.url)}" target="_blank" rel="noopener noreferrer">${escape(p.label)} PDF ↗</a>`).join('')}`;
    const route=`${b.id}/${t.id}/${activeTab}`;
    const odiaLink=`<a href="odia.html#${route}" lang="or">ଓଡ଼ିଆରେ ପଢ଼ନ୍ତୁ →</a>`;
    document.querySelector('.language').innerHTML=`<a href="./#${route}" lang="en" aria-current="page">English</a> · <a href="odia.html#${route}" lang="or">ଓଡ଼ିଆ</a> · <a href="hindi.html#${route}" lang="hi" title="हिंदी अध्ययन संग्रह">हिंदी</a>`;
    $('book-header').innerHTML=`<div class="book-copy"><p class="eyebrow">THE VAHINI SERIES · ENGLISH STUDY</p><h2>${escape(b.title)}</h2><p class="description">${escape(b.description)}</p><div class="book-meta"><span>${b.topics.length-(b.id==='ramakatha-rasavahini'?1:0)} ${chapterMode?unit+'s':'study topics'}</span><span class="meta-divider" aria-hidden="true"></span>${originalLinks}${odiaLink}</div></div>${art}`;
    $('topics-heading').textContent=`Study ${unit}s`;
    const topicOffset=['bhagavata-vahini','geetha-vahini','ramakatha-rasavahini'].includes(b.id)?1:0;
    $('topic-position').textContent=t.id==='preface'?'Preface':t.part?`Part ${t.part} · Chapter ${t.chapterNumber} · ${topicIndex+1-topicOffset} of ${b.topics.length-topicOffset}`:`${unit[0].toUpperCase()+unit.slice(1)} ${topicIndex+1-topicOffset} of ${b.topics.length-topicOffset}`;
    $('previous-topic').textContent=`← Previous ${unit}`;
    $('next-topic').textContent=`Next ${unit} →`;
    const chapterOption=(x,i)=>`<option value="${i}" ${i===topicIndex?'selected':''}>${x.id==='preface'?'Preface':`${x.part?`Part ${x.part} · Chapter ${x.chapterNumber}`:String(i+1-topicOffset).padStart(2,'0')} · ${escape(x.title)}`}</option>`;
    const chapterOptions=t.part?[...new Set(b.topics.map(x=>x.part))].map(part=>`<optgroup label="Part ${part}">${b.topics.map((x,i)=>x.part===part?chapterOption(x,i):'').join('')}</optgroup>`).join(''):b.topics.map(chapterOption).join('');
    $('topics').innerHTML=chapterMode?`<label class="sr-only" for="chapter-select">Choose a ${unit}</label><select id="chapter-select" class="chapter-select">${chapterOptions}</select><p class="chapter-guide">${t.part?'Both parts in their original chapter order':'In the book’s original order'} · 5 questions per ${unit}</p>`:b.topics.map((x,i)=>`<button data-topic="${i}" class="topic-button ${i===topicIndex?'active':''}" aria-pressed="${i===topicIndex}"><span>${String(i+1).padStart(2,'0')}</span>${escape(x.title)}</button>`).join('');
    if(activeTab==='readbook'&&!isBhagavataReadBook()) activeTab='summary';
    $('study-tabs').innerHTML=tabEntries().map(([id,label])=>`<button id="tab-${id}" class="tab" role="tab" aria-controls="activity" aria-selected="${activeTab===id}" tabindex="${activeTab===id?'0':'-1'}" data-tab="${id}">${label}${id==='quiz'?`<span class="tab-count">${t.quiz.length}</span>`:''}</button>`).join('');
    $('activity').setAttribute('aria-labelledby',`tab-${activeTab}`);
    $('previous-topic').disabled=topicIndex===0;
    $('next-topic').disabled=topicIndex===b.topics.length-1;
    document.title=`${b.title} — Vahini Study Circle`;
    renderActivity();
  }
  function referenceCard(t) {
    return `<aside class="source-card"><p class="eyebrow">READ AT THE SOURCE</p><h4>${escape(t.chapter)}</h4><p>${t.pdfStartPage?`Supplied ${t.part?`Part ${t.part}`:'book'} · PDF pages ${t.pdfStartPage}–${t.pdfEndPage}. `:''}Return to the original text for the full teaching and context.</p><a href="${sourceLink(t.sourceUrl)}" target="_blank" rel="noopener noreferrer">${t.pdfStartPage?`Open ${currentBook().unitLabel==='section'?'section':'chapter'} in PDF`:'Open source text'} ↗</a></aside>`;
  }
  function renderActivity() {
    const t=currentTopic(), title=`<h3 class="activity-title">${escape(t.title)}</h3>`;
    if(activeTab==='readbook' && isBhagavataReadBook()) {
      const paragraphs=String(readBookText()||'').split(/\n\s*\n/).filter(Boolean);
      $('activity').innerHTML=`${title}<p class="qa-intro">${currentTopic().id==='preface'?'Preface · English':'Full chapter text · English'}</p><div class="read-book-text">${paragraphs.map(p=>`<p class="summary-text">${escape(p)}</p>`).join('')}</div>`;
    } else if(activeTab==='summary') {
      $('activity').innerHTML=`${title}<div class="summary-grid"><div>${t.summary.split(/\n\s*\n/).map(p=>`<p class="summary-text">${escape(p)}</p>`).join('')}<div class="action-row"><button class="primary-button" data-tab="questions">Explore the questions</button><button class="secondary-button" data-tab="quiz">Try the quiz</button></div><p class="study-note">${t.pdfStartPage?`A ${currentBook().unitLabel==='section'?'section':'chapter'} summary based only on the supplied ${escape(currentBook().title)} ${t.part?`Part ${t.part} `:''}PDF, written in our own words.`:'A brief study summary based on the linked Vahini text.'}</p></div>${referenceCard(t)}</div>`;
      $('activity').innerHTML += window.renderRamakathaStudy(currentBook().id,t,'en');    } else if(activeTab==='questions') {
      $('activity').innerHTML=`${title}<p class="qa-intro">Reflect on each question, then open the answer.</p>${t.qa.map((q,i)=>`<details><summary>${escape(q.q)}</summary><p>${escape(q.a)}</p></details>`).join('')}<p class="study-note">Study questions written from <a href="${sourceLink(t.sourceUrl)}" target="_blank" rel="noopener noreferrer">${escape(t.chapter)}</a>.</p><div class="action-row"><button class="primary-button" data-tab="quiz">Test your understanding</button></div>`;
    } else if(activeTab==='quiz') {
      const attempt=getAttempt();
      const score=t.quiz.filter((q,i)=>attempt.answers[i]===q.correct).length;
      const page=attempt.page||0, pages=Math.ceil(t.quiz.length/5), start=page*5, end=Math.min(start+5,t.quiz.length);
      const answered=t.quiz.filter((q,i)=>Number.isInteger(attempt.answers[i])).length;
      const pageButtons=Array.from({length:pages},(_,i)=>`<button type="button" class="quiz-page ${page===i?'active':''}" data-quiz-page="${i}" aria-label="Questions ${i*5+1} to ${Math.min(i*5+5,t.quiz.length)}" ${page===i?'aria-current="page"':''}>${i+1}</button>`).join('');
      $('activity').innerHTML=`${title}<p class="quiz-intro">${t.quiz.length} questions · Choose one answer for each. ${pages>1?'Your selections stay in place as you move between pages.':`All five questions are based on this ${currentBook().unitLabel==='section'?'section':'chapter'} in the supplied book.`}</p>${t.quiz.some(q=>q.type==='application')?'<p class="exercise-note">Practice scenarios are imagined situations based on this topic’s teaching; they are not events or quotations from the book.</p>':''}${attempt.checked?`<div class="quiz-result" role="status"><strong>${score} of ${t.quiz.length} correct</strong>${score===t.quiz.length?'Well done. Take a moment to reflect on what you learned.':'Review the explanations on each page, revisit the text, and try again.'}</div>`:''}<div class="quiz-toolbar"><div><strong>Questions ${start+1}–${end} of ${t.quiz.length}</strong><span id="answer-progress">${answered} of ${t.quiz.length} answered</span></div>${pages>1?`<nav class="quiz-pages" aria-label="Quiz pages">${pageButtons}</nav>`:''}</div><progress id="quiz-progress" max="${t.quiz.length}" value="${answered}" aria-label="Questions answered"></progress><form id="quiz-form">${t.quiz.slice(start,end).map((q,offset)=>{
        const i=start+offset;
        return `<fieldset class="quiz-question"><legend><span class="qnumber">${String(i+1).padStart(2,'0')}</span>${escape(q.q)}</legend><p class="question-type">${q.type==='application'?'Practice scenario':q.type==='understanding'?'Understanding the teaching':'Study check'}</p><div class="options">${q.options.map((o,j)=>`<label class="option ${attempt.checked && j===q.correct?'correct':''} ${attempt.checked && attempt.answers[i]===j && j!==q.correct?'wrong':''}"><input type="radio" name="question-${i}" value="${j}" data-question="${i}" ${attempt.answers[i]===j?'checked':''} ${attempt.checked?'disabled':''}><span>${escape(o)}${attempt.checked && j===q.correct?' ✓':''}</span></label>`).join('')}</div>${attempt.checked?`<p class="feedback ${attempt.answers[i]!==q.correct?'incorrect':''}"><strong>${attempt.answers[i]===q.correct?'Correct.':'Correct answer: '+escape(q.options[q.correct])+'.'}</strong> ${escape(q.explanation)} <a href="${sourceLink(q.sourceUrl||t.sourceUrl)}" target="_blank" rel="noopener noreferrer">Source: ${escape(q.sourceLabel||t.chapter)} ↗</a></p>`:''}</fieldset>`;
      }).join('')}<div class="quiz-pagination" ${pages===1?'hidden':''}><button type="button" class="secondary-button" data-quiz-page="${page-1}" ${page===0?'disabled':''}>← Previous questions</button><button type="button" class="secondary-button" data-quiz-page="${page+1}" ${page===pages-1?'disabled':''}>Next questions →</button></div><div class="action-row">${attempt.checked?'<button class="secondary-button" type="button" id="retry-quiz">Try again</button>':`<button class="primary-button" type="submit">Check all ${t.quiz.length} answers</button>`}</div><p id="quiz-error" class="form-error" role="alert"></p></form><p class="study-note">Based on <a href="${sourceLink(t.sourceUrl)}" target="_blank" rel="noopener noreferrer">${escape(t.chapter)}</a>. Your quiz selections and score are kept only during this visit.</p>`;
    }
  }
  document.addEventListener('click',event=>{
    const button=event.target.closest('button');
    if(!button || button.disabled) return;
    if(button.dataset.book!==undefined) { const bi=Number(button.dataset.book); setStudy(bi,0,defaultTab(bi,0),true); }
    else if(button.dataset.topic!==undefined) { const ti=Number(button.dataset.topic); setStudy(bookIndex,ti,defaultTab(bookIndex,ti)); }
    else if(button.dataset.tab) {setStudy(bookIndex,topicIndex,button.dataset.tab);$('tab-'+activeTab).focus({preventScroll:true});}
    else if(button.id==='previous-topic') {setStudy(bookIndex,topicIndex-1);focusActivity();}
    else if(button.id==='next-topic') {setStudy(bookIndex,topicIndex+1);focusActivity();}
    else if(button.dataset.quizPage!==undefined) {
      const page=Number(button.dataset.quizPage);
      if(Number.isInteger(page)&&page>=0&&page<Math.ceil(currentTopic().quiz.length/5)) {
        getAttempt().page=page;renderActivity();focusActivity();announce(`Questions ${page*5+1} to ${Math.min(page*5+5,currentTopic().quiz.length)}.`);
      }
    }
    else if(button.id==='retry-quiz') {attempts.delete(key());renderActivity();focusActivity();announce('Quiz reset. Choose your answers.');}
  });
  $('mobile-book').addEventListener('change',e=>{const bi=Number(e.target.value);setStudy(bi,0,defaultTab(bi,0),true);});
  document.addEventListener('change',e=>{
    if(e.target.id==='chapter-select') {const ti=Number(e.target.value);setStudy(bookIndex,ti,defaultTab(bookIndex,ti));$('chapter-select').focus({preventScroll:true});}
    if(e.target.matches('input[data-question]')) {
      getAttempt().answers[Number(e.target.dataset.question)]=Number(e.target.value);
      const answered=currentTopic().quiz.filter((q,i)=>Number.isInteger(getAttempt().answers[i])).length;
      $('answer-progress').textContent=`${answered} of ${currentTopic().quiz.length} answered`;
      $('quiz-progress').value=answered;
      $('quiz-error').textContent='';
    }
  });
  document.addEventListener('submit',e=>{
    if(e.target.id!=='quiz-form') return;
    e.preventDefault();
    const attempt=getAttempt();
    if(!currentTopic().quiz.every((q,i)=>Number.isInteger(attempt.answers[i]))) {
      const i=currentTopic().quiz.findIndex((q,i)=>!Number.isInteger(attempt.answers[i]));
      attempt.page=Math.floor(i/5);renderActivity();
      $('quiz-error').textContent=`Please answer all ${currentTopic().quiz.length} questions before checking. Question ${i+1} is still unanswered.`;
      document.querySelector(`input[name="question-${i}"]`).focus();
      return;
    }
    attempt.checked=true;attempt.page=0;renderActivity();focusActivity();
  });
  $('study-tabs').addEventListener('keydown',e=>{
    if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key)) return;
    e.preventDefault();
    const ids=tabEntries().map(([id])=>id);let i=ids.indexOf(activeTab);
    i=e.key==='Home'?0:e.key==='End'?ids.length-1:(i+(e.key==='ArrowRight'?1:-1)+ids.length)%ids.length;
    setStudy(bookIndex,topicIndex,ids[i]);$('tab-'+activeTab).focus();
  });
  window.addEventListener('hashchange',readHash);
  if(!books.length) { $('activity').innerHTML='<h2>The study collection could not load.</h2><p>Please refresh this page.</p>';return; }
  readHash();
  const context=document.modelContext;
  if(context?.registerTool) {
    const lifecycle=new AbortController();
    const register=tool=>{try{Promise.resolve(context.registerTool(tool,{signal:lifecycle.signal})).catch(()=>{});}catch{}};
    register({name:'list_vahini_topics',description:'Read the available Vahini books and study topics.',inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:true},execute:()=>books.map(b=>({id:b.id,title:b.title,topics:b.topics.map(t=>({id:t.id,title:t.title}))}))});
    register({name:'open_vahini_topic',description:'Open a Vahini study topic and its reading, summary, questions, or quiz.',inputSchema:{type:'object',properties:{bookId:{type:'string'},topicId:{type:'string'},activity:{enum:Object.keys(activityNames)}},required:['bookId','topicId'],additionalProperties:false},annotations:{readOnlyHint:false},execute:input=>{
      const bi=books.findIndex(b=>b.id===input?.bookId);const ti=books[bi]?.topics.findIndex(t=>t.id===input?.topicId)??-1;
      setStudy(bi,ti,input.activity||defaultTab(bi,ti));return {book:currentBook().title,topic:currentTopic().title,activity:activeTab};
    }});
    window.addEventListener('pagehide',()=>lifecycle.abort(),{once:true});
  }
})();





