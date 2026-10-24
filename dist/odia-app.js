(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const num = n => String(n).replace(/\d/g, d => '୦୧୨୩୪୫୬୭୮୯'[d]);
  const editions = window.orderVahiniBooks([
    {id:'upanishad',title:'ଉପନିଷଦ ବାହିନୀ',translations:window.UPANISHAD_ODIA},
    {id:'sutra',title:'ସୂତ୍ର ବାହିନୀ',translations:window.SUTRA_ODIA},
    {id:'bhagavata-vahini',title:'ଭାଗବତ ବାହିନୀ',translations:window.BHAGAVATHA_ODIA},
    {id:'geetha-vahini',title:'ଗୀତା ବାହିନୀ',translations:window.GITA_ODIA},
    {id:'ramakatha-rasavahini',title:'ରାମକଥା ରସବାହିନୀ',translations:window.RAMAKATHA_ODIA},
    {id:'jnana-vahini',title:'ଜ୍ଞାନ ବାହିନୀ',translations:window.JNANA_ODIA},
    {id:'sathya-sai',title:'ସତ୍ୟ ସାଇ ବାହିନୀ',translations:window.SATHYA_SAI_ODIA},
    {id:'leela-kaivalya',title:'ଲୀଳା କୈବଲ୍ୟ ବାହିନୀ',translations:window.LEELA_ODIA},
    {id:'sandeha-nivarini',title:'ସନ୍ଦେହ ନିବାରିଣୀ',translations:window.SANDEHA_ODIA},
    {id:'prasnottara',title:'ପ୍ରଶ୍ନୋତ୍ତର ବାହିନୀ',translations:window.PRASNOTTARA_ODIA},
    {id:'prashanthi-vahini',title:'ପ୍ରଶାନ୍ତି ବାହିନୀ',translations:window.PRASANTHI_ODIA},
    {id:'dhyana-vahini',title:'ଧ୍ୟାନ ବାହିନୀ',translations:window.DHYANA_ODIA},
    {id:'dharma-vahini',title:'ଧର୍ମ ବାହିନୀ',translations:window.DHARMA_ODIA},
    {id:'prema-vahini',title:'ପ୍ରେମ ବାହିନୀ',translations:window.PREMA_ODIA},
    {id:'vidya',title:'ବିଦ୍ୟା ବାହିନୀ',translations:window.VIDYA_ODIA}
  ].filter(b => b.translations?.length));
  const books = editions.map(b => {
    const original = window.VAHINI_BOOKS?.find(x => x.id === b.id);
    return {...b, sourceUrl:original.sourceUrl, unitLabel:original.unitLabel, chapters:b.translations.map((t,i) => ({...original.topics[i],...t,
      quiz:t.quiz.map(([q,options,explanation],j)=>({q,options,explanation,correct:original.topics[i].quiz[j].correct}))
    }))};
  });
  let bookIndex = 0, chapters = books[0]?.chapters || [];
  const book = () => books[bookIndex];
  const unit = () => book().unitLabel === 'section' ? 'ଅଂଶ' : 'ଅଧ୍ୟାୟ';
  const bookArtwork = bookId => {
    const covers = {
      'leela-kaivalya':['leela-kaivalya-cover.webp','Leela Kaivalya Vahini book cover featuring Bhagawan Sri Sathya Sai Baba','Leela Kaivalya Vahini · Original book cover'],
      'jnana-vahini':['jnana-vahini-cover.webp','Jnana Vahini book cover featuring Bhagawan Sri Sathya Sai Baba writing','Jnana Vahini · Original book cover'],
      'prashanthi-vahini':['prasanthi-vahini-cover.webp','Prasanthi Vahini book cover featuring Bhagawan Sri Sathya Sai Baba','Prasanthi Vahini · Original book cover'],
      'prasnottara':['prasnottara-vahini-cover.webp','Prasnottara Vahini book cover featuring Bhagawan Sri Sathya Sai Baba','Prasnottara Vahini · Original book cover'],
      'prema-vahini':['prema-vahini-cover.webp','Prema Vahini book cover featuring Krishna with a cow','Prema Vahini · Original book cover'],
      'sandeha-nivarini':['sandeha-nivarini-cover.webp','Sandeha Nivarini book cover featuring Bhagawan Sri Sathya Sai Baba','Sandeha Nivarini · Original book cover'],
      'sathya-sai':['sathya-sai-vahini-cover.webp','Sathya Sai Vahini book cover featuring Bhagawan Sri Sathya Sai Baba','Sathya Sai Vahini · Original book cover'],
      'sutra':['sutra-vahini-cover.webp','Sutra Vahini book cover featuring Bhagawan Sri Sathya Sai Baba','Sutra Vahini · Original book cover'],
      'upanishad':['upanishad-vahini-cover.webp','Upanishad Vahini book cover featuring Shiva in meditation','Upanishad Vahini · Original book cover'],
      'bhagavata-vahini':['bhagavata-vahini-cover.webp','Bhagavatha Vahini book cover featuring child Krishna','Bhagavatha Vahini · Original book cover'],
      'geetha-vahini':['geeta-vahini-cover.webp','Geeta Vahini book cover showing Krishna and Arjuna’s chariot','Geeta Vahini · Original book cover'],
      'ramakatha-rasavahini':['ramakatha-rasavahini-cover.webp','Ramakatha Rasavahini Deluxe Edition book cover','Ramakatha Rasavahini · Original book cover'],
      'dhyana-vahini':['dhyana-vahini-cover.webp','Dhyana Vahini book cover featuring Bhagawan Sri Sathya Sai Baba','Dhyana Vahini · Original book cover'],
      'vidya':['vidya-vahini-cover.webp','Vidya Vahini book cover featuring the goddess of learning','Vidya Vahini · Original book cover'],
      'dharma-vahini':['dharma-vahini-cover.webp','Dharma Vahini book cover displaying symbols of world religions','Dharma Vahini · Original book cover']
    };
    const cover=covers[bookId];
    return cover ? '<figure class="book-art"><img src="assets/'+cover[0]+'" width="256" height="384" alt="'+cover[1]+'"><figcaption>'+cover[2]+'</figcaption></figure>' : '';
  };
  const tabs = {readbook:'ପୁସ୍ତକ ପଢ଼ନ୍ତୁ', summary:'ସାରାଂଶ', questions:'ପ୍ରଶ୍ନୋତ୍ତର', quiz:'ପ୍ରଶ୍ନମାଳା'};
  const isBhagavataReadBook = (bookId=book().id, chapterId=current().id) => (bookId==='bhagavata-vahini' && ['preface','chapter-01','chapter-02','chapter-03','chapter-04','chapter-05','chapter-06','chapter-07','chapter-08','chapter-09','chapter-10','chapter-11','chapter-12','chapter-13','chapter-14','chapter-15','chapter-16','chapter-17','chapter-18','chapter-19','chapter-20','chapter-21','chapter-22','chapter-23','chapter-24','chapter-25','chapter-26','chapter-27','chapter-28','chapter-29','chapter-30','chapter-31','chapter-33','chapter-34','chapter-35','chapter-36','chapter-37','chapter-38','chapter-39','chapter-40','chapter-41','chapter-42'].includes(chapterId)) || (bookId==='geetha-vahini' && ['preface','chapter-01','chapter-02','chapter-03','chapter-04','chapter-05','chapter-06','chapter-07','chapter-08','chapter-09','chapter-10','chapter-11','chapter-12','chapter-13','chapter-14','chapter-15','chapter-16','chapter-17','chapter-18','chapter-19','chapter-20','chapter-21','chapter-22','chapter-23','chapter-24','chapter-25','chapter-26','chapter-27'].includes(chapterId)) || (bookId==='ramakatha-rasavahini' && ['preface','part-1-the-inner-meaning','part-1-chapter-01','part-1-chapter-02','part-1-chapter-03','part-1-chapter-04','part-1-chapter-12','part-1-chapter-14','part-1-chapter-15','part-1-chapter-16','part-1-chapter-17','part-1-chapter-18','part-1-chapter-19','part-2-chapter-01','part-2-chapter-02','part-2-chapter-03','part-2-chapter-04','part-2-chapter-05','part-2-chapter-06'].includes(chapterId));
  const defaultTab = i => isBhagavataReadBook(book().id,chapters[i]?.id) ? 'readbook' : 'summary';
  const readBookText = () => current().id==='preface' ? book().id==='geetha-vahini' ? window.VAHINI_GITA_PREFACE_OR : book().id==='ramakatha-rasavahini' ? window.VAHINI_RAMAKATHA_PREFACE_OR : window.VAHINI_READ_BOOK_OR_PREFACE : (book().id==='ramakatha-rasavahini' && current().id==='part-1-the-inner-meaning') ? window.VAHINI_RAMAKATHA_CH01_OR : (book().id==='ramakatha-rasavahini' && current().id==='part-1-chapter-01') ? window.VAHINI_RAMAKATHA_CH02_OR : (book().id==='ramakatha-rasavahini' && current().id==='part-1-chapter-02') ? window.VAHINI_RAMAKATHA_CH03_OR : (book().id==='ramakatha-rasavahini' && current().id==='part-1-chapter-03') ? window.VAHINI_RAMAKATHA_CH04_OR : (book().id==='ramakatha-rasavahini' && current().id==='part-1-chapter-04') ? window.VAHINI_RAMAKATHA_CH05_OR : (book().id==='ramakatha-rasavahini' && current().id==='part-1-chapter-12') ? window.VAHINI_RAMAKATHA_CH13_OR : (book().id==='ramakatha-rasavahini' && current().id==='part-1-chapter-15') ? window.VAHINI_RAMAKATHA_CH16_OR : (book().id==='ramakatha-rasavahini' && current().id==='part-1-chapter-14') ? window.VAHINI_RAMAKATHA_CH15_OR : (book().id==='ramakatha-rasavahini' && current().id==='part-1-chapter-16') ? window.VAHINI_RAMAKATHA_CH17_OR : (book().id==='ramakatha-rasavahini' && current().id==='part-1-chapter-17') ? window.VAHINI_RAMAKATHA_CH18_OR : (book().id==='ramakatha-rasavahini' && current().id==='part-1-chapter-18') ? window.VAHINI_RAMAKATHA_CH19_OR : (book().id==='ramakatha-rasavahini' && current().id==='part-1-chapter-19') ? window.VAHINI_RAMAKATHA_CH20_OR : (book().id==='ramakatha-rasavahini' && current().id==='part-2-chapter-01') ? window.VAHINI_RAMAKATHA_P2_CH01_OR : (book().id==='ramakatha-rasavahini' && current().id==='part-2-chapter-02') ? window.VAHINI_RAMAKATHA_P2_CH02_OR : (book().id==='ramakatha-rasavahini' && current().id==='part-2-chapter-03') ? window.VAHINI_RAMAKATHA_P2_CH03_OR : (book().id==='ramakatha-rasavahini' && current().id==='part-2-chapter-04') ? window.VAHINI_RAMAKATHA_P2_CH04_OR : (book().id==='ramakatha-rasavahini' && current().id==='part-2-chapter-05') ? window.VAHINI_RAMAKATHA_P2_CH05_OR : (book().id==='ramakatha-rasavahini' && current().id==='part-2-chapter-06') ? window.VAHINI_RAMAKATHA_P2_CH06_OR : (book().id==='geetha-vahini' && current().id==='chapter-01') ? window.VAHINI_GITA_CH01_OR : (book().id==='geetha-vahini' && current().id==='chapter-02') ? window.VAHINI_GITA_CH02_OR : (book().id==='geetha-vahini' && current().id==='chapter-03') ? window.VAHINI_GITA_CH03_OR : (book().id==='geetha-vahini' && current().id==='chapter-05') ? window.VAHINI_GITA_CH05_OR : (book().id==='geetha-vahini' && current().id==='chapter-06') ? window.VAHINI_GITA_CH06_OR : (book().id==='geetha-vahini' && current().id==='chapter-07') ? window.VAHINI_GITA_CH07_OR : (book().id==='geetha-vahini' && current().id==='chapter-08') ? window.VAHINI_GITA_CH08_OR : (book().id==='geetha-vahini' && current().id==='chapter-09') ? window.VAHINI_GITA_CH09_OR : (book().id==='geetha-vahini' && current().id==='chapter-10') ? window.VAHINI_GITA_CH10_OR : (book().id==='geetha-vahini' && current().id==='chapter-11') ? window.VAHINI_GITA_CH11_OR : (book().id==='geetha-vahini' && current().id==='chapter-12') ? window.VAHINI_GITA_CH12_OR : (book().id==='geetha-vahini' && current().id==='chapter-13') ? window.VAHINI_GITA_CH13_OR : (book().id==='geetha-vahini' && current().id==='chapter-14') ? window.VAHINI_GITA_CH14_OR : (book().id==='geetha-vahini' && current().id==='chapter-15') ? window.VAHINI_GITA_CH15_OR : (book().id==='geetha-vahini' && current().id==='chapter-16') ? window.VAHINI_GITA_CH16_OR : (book().id==='geetha-vahini' && current().id==='chapter-17') ? window.VAHINI_GITA_CH17_OR : (book().id==='geetha-vahini' && current().id==='chapter-18') ? window.VAHINI_GITA_CH18_OR : (book().id==='geetha-vahini' && current().id==='chapter-19') ? window.VAHINI_GITA_CH19_OR : (book().id==='geetha-vahini' && current().id==='chapter-20') ? window.VAHINI_GITA_CH20_OR : (book().id==='geetha-vahini' && current().id==='chapter-21') ? window.VAHINI_GITA_CH21_OR : (book().id==='geetha-vahini' && current().id==='chapter-22') ? window.VAHINI_GITA_CH22_OR : (book().id==='geetha-vahini' && current().id==='chapter-23') ? window.VAHINI_GITA_CH23_OR : (book().id==='geetha-vahini' && current().id==='chapter-24') ? window.VAHINI_GITA_CH24_OR : (book().id==='geetha-vahini' && current().id==='chapter-25') ? window.VAHINI_GITA_CH25_OR : (book().id==='geetha-vahini' && current().id==='chapter-26') ? window.VAHINI_GITA_CH26_OR : (book().id==='geetha-vahini' && current().id==='chapter-27') ? window.VAHINI_GITA_CH27_OR : current().id==='chapter-02' ? window.VAHINI_READ_BOOK_OR_CH02 : current().id==='chapter-04' ? window.VAHINI_READ_BOOK_OR_CH04 : current().id==='chapter-05' ? window.VAHINI_READ_BOOK_OR_CH05 : current().id==='chapter-06' ? window.VAHINI_READ_BOOK_OR_CH06 : current().id==='chapter-07' ? window.VAHINI_READ_BOOK_OR_CH07 : current().id==='chapter-08' ? window.VAHINI_READ_BOOK_OR_CH08 : current().id==='chapter-09' ? window.VAHINI_READ_BOOK_OR_CH09 : current().id==='chapter-10' ? window.VAHINI_READ_BOOK_OR_CH10 : current().id==='chapter-11' ? window.VAHINI_READ_BOOK_OR_CH11 : current().id==='chapter-12' ? window.VAHINI_READ_BOOK_OR_CH12 : current().id==='chapter-13' ? window.VAHINI_READ_BOOK_OR_CH13 : current().id==='chapter-14' ? window.VAHINI_READ_BOOK_OR_CH14 : current().id==='chapter-15' ? window.VAHINI_READ_BOOK_OR_CH15 : current().id==='chapter-16' ? window.VAHINI_READ_BOOK_OR_CH16 : current().id==='chapter-17' ? window.VAHINI_READ_BOOK_OR_CH17 : current().id==='chapter-18' ? window.VAHINI_READ_BOOK_OR_CH18 : current().id==='chapter-19' ? window.VAHINI_READ_BOOK_OR_CH19 : current().id==='chapter-20' ? window.VAHINI_READ_BOOK_OR_CH20 : current().id==='chapter-21' ? window.VAHINI_READ_BOOK_OR_CH21 : current().id==='chapter-22' ? window.VAHINI_READ_BOOK_OR_CH22 : current().id==='chapter-23' ? window.VAHINI_READ_BOOK_OR_CH23 : current().id==='chapter-24' ? window.VAHINI_READ_BOOK_OR_CH24 : current().id==='chapter-25' ? window.VAHINI_READ_BOOK_OR_CH25 : current().id==='chapter-26' ? window.VAHINI_READ_BOOK_OR_CH26 : current().id==='chapter-27' ? window.VAHINI_READ_BOOK_OR_CH27 : current().id==='chapter-28' ? window.VAHINI_READ_BOOK_OR_CH28 : current().id==='chapter-29' ? window.VAHINI_READ_BOOK_OR_CH29 : current().id==='chapter-30' ? window.VAHINI_READ_BOOK_OR_CH30 : current().id==='chapter-31' ? window.VAHINI_READ_BOOK_OR_CH31 : current().id==='chapter-33' ? window.VAHINI_READ_BOOK_OR_CH33 : current().id==='chapter-34' ? window.VAHINI_READ_BOOK_OR_CH34 : current().id==='chapter-35' ? window.VAHINI_READ_BOOK_OR_CH35 : current().id==='chapter-36' ? window.VAHINI_READ_BOOK_OR_CH36 : current().id==='chapter-37' ? window.VAHINI_READ_BOOK_OR_CH37 : current().id==='chapter-38' ? window.VAHINI_READ_BOOK_OR_CH38 : current().id==='chapter-39' ? window.VAHINI_READ_BOOK_OR_CH39 : current().id==='chapter-40' ? window.VAHINI_READ_BOOK_OR_CH40 : current().id==='chapter-41' ? window.VAHINI_READ_BOOK_OR_CH41 : current().id==='chapter-42' ? window.VAHINI_READ_BOOK_OR_CH42 : window.VAHINI_READ_BOOK_OR;
  const tabEntries = () => Object.entries(tabs).filter(([id])=>book().id==='ramakatha-rasavahini'&&['preface','part-1-the-inner-meaning'].includes(current().id)?id==='readbook':id!=='readbook'||isBhagavataReadBook());
  const attempts = new Map();
  let index = 0, tab = 'summary';
  const current = () => chapters[index];
  const attemptKey = () => `${book().id}/${current().id}`;
  const attempt = () => { if (!attempts.has(attemptKey())) attempts.set(attemptKey(), {answers:[], checked:false}); return attempts.get(attemptKey()); };
  const pdfLink = t => `${(t.sourceUrl || book().sourceUrl).split('#')[0]}#page=${t.pdfStartPage}`;
  const source = t => `<a href="${pdfLink(t)}" target="_blank" rel="noopener noreferrer">ମୂଳ ପାଠ: PDF ପୃଷ୍ଠା ${num(t.pdfStartPage)}–${num(t.pdfEndPage)} ↗</a>`;
  const focusActivity = () => { $('activity').focus({preventScroll:true}); $('activity').scrollIntoView({block:'start'}); };
  function go(i, nextTab = defaultTab(i)) {
    if (!chapters[i] || !Object.hasOwn(tabs, nextTab) || (nextTab==='readbook'&&!isBhagavataReadBook(book().id,chapters[i].id))) return;
    index = i; tab = nextTab;
    const hash = `#${book().id}/${current().id}/${tab}`;
    history.replaceState(null, '', hash);
    $('english-link').href = `./${hash}`;
    $('hindi-link').href = `hindi.html${hash}`;
    document.querySelector('.collection-source').href = `./${hash}`;
    render();
    $('announcement').textContent = `${current().title}। ${tabs[tab]}।`;
  }
  function readHash() {
    if (location.hash === '#study') { $('study').focus(); return; }
    const [bookId, chapter, activity] = location.hash.slice(1).split('/');
    const bi = books.findIndex(b => b.id === bookId);
    bookIndex = bi < 0 ? 0 : bi; chapters = book().chapters;
    const i = chapters.findIndex(t => t.id === chapter);
    const chapterIndex=i<0?0:i;
    const requestedTab=!Object.hasOwn(tabs,activity)?defaultTab(chapterIndex):activity;
    go(chapterIndex,requestedTab==='readbook'&&!isBhagavataReadBook(book().id,chapters[chapterIndex]?.id)?'summary':requestedTab);
  }
  function render() {
    const t = current();
    document.querySelector('label[for="chapter-select"]').textContent = `ଅଧ୍ୟୟନ ${unit()}`;
    document.querySelector('.topic-section').setAttribute('aria-label', `${unit()} ବାଛନ୍ତୁ`);
    document.querySelector('.topic-section .chapter-guide').textContent = `ପୁସ୍ତକର ମୂଳ କ୍ରମରେ · ପ୍ରତି ${unit()}ରେ ୫ଟି ପ୍ରଶ୍ନ`;
    $('previous-topic').textContent = `← ପୂର୍ବ ${unit()}`;
    $('next-topic').textContent = `ପରବର୍ତ୍ତୀ ${unit()} →`;
    document.title = `${t.title} — ${book().title}`;
    $('odia-book').innerHTML=books.map((b,i)=>`<option value="${i}" ${i===bookIndex?'selected':''}>${esc(b.title)}</option>`).join('');
    document.querySelector('.book-header h2').textContent=book().title;
    const art=bookArtwork(book().id);
    document.querySelector('.book-header').classList.toggle('with-art',!!art);
    document.querySelector('.book-header').innerHTML='<div class="book-copy"><p class="eyebrow">'+(book().title)+'</p><h2>'+esc(book().title)+'</h2><p class="description"></p><div class="book-meta"><span>ଓଡ଼ିଆ ଅଧ୍ୟୟନ ସଂସ୍କରଣ</span><a href="'+esc((t.sourceUrl || book().sourceUrl).split('#')[0])+'" target="_blank" rel="noopener noreferrer">ମୂଳ ଇଂରାଜୀ ପୁସ୍ତକ (PDF) ↗</a></div></div>'+art;
    const topicOffset=['bhagavata-vahini','geetha-vahini','ramakatha-rasavahini'].includes(book().id)?1:0;
    document.querySelector('.book-header .description').textContent=`ମୂଳ ପୁସ୍ତକର କ୍ରମରେ ${num(chapters.length-topicOffset)}ଟି ${unit()}। ପ୍ରତି ${unit()}ରେ ସାରାଂଶ, ପାଞ୍ଚଟି ପ୍ରଶ୍ନୋତ୍ତର ଓ ପାଞ୍ଚଟି ବହୁବିକଳ୍ପ ପ୍ରଶ୍ନ ରହିଛି।`;
    document.querySelector('.book-meta a').href=(t.sourceUrl || book().sourceUrl).split('#')[0];
    $('chapter-list').innerHTML = chapters.map((c,i) => `<button class="book-item ${i===index?'active':''}" data-chapter="${i}" ${i===index?'aria-current="true"':''}><span class="book-number">${c.id==='preface'?'ପ୍ର':num(i+1-topicOffset)}</span><span class="book-name">${esc(c.title)}</span></button>`).join('');
    $('chapter-select').innerHTML = chapters.map((c,i) => `<option value="${i}" ${i===index?'selected':''}>${c.id==='preface'?'ପ୍ରସ୍ତାବନା':`${num(i+1-topicOffset)} · ${esc(c.title)}`}</option>`).join('');
    $('topic-position').textContent = current().id==='preface'?'ପ୍ରସ୍ତାବନା':`${unit()} ${num(index+1-topicOffset)} / ${num(chapters.length-topicOffset)}`;
    $('study-tabs').innerHTML = tabEntries().map(([id,label]) => `<button id="tab-${id}" class="tab" role="tab" aria-controls="activity" aria-selected="${tab===id}" tabindex="${tab===id?0:-1}" data-tab="${id}">${label}</button>`).join('');
    $('activity').setAttribute('aria-labelledby',`tab-${tab}`);
    $('previous-topic').disabled = index === 0;
    $('next-topic').disabled = index === chapters.length-1;
    renderActivity();
  }
  function renderActivity() {
    const t = current(), heading = `<h3 class="activity-title">${esc(t.title)}</h3>`;
    if (tab === 'readbook' && isBhagavataReadBook()) {
      const paragraphs=String(readBookText()||'').split(/\n\s*\n/).filter(Boolean);
      $('activity').innerHTML = `${heading}<p class="qa-intro">${current().id==='preface'?'ପ୍ରସ୍ତାବନା · ଓଡ଼ିଆ':'ସମ୍ପୂର୍ଣ୍ଣ ଅଧ୍ୟାୟ · ଓଡ଼ିଆ ଅନୁବାଦ'}</p><div class="read-book-text">${paragraphs.map(p=>`<p class="summary-text">${esc(p)}</p>`).join('')}</div>`;
    } else if (tab === 'summary') {
      $('activity').innerHTML = `${heading}<div class="summary-grid"><div>${t.summary.split('\n\n').map(p=>`<p class="summary-text">${esc(p)}</p>`).join('')}<div class="action-row"><button class="primary-button" data-tab="questions">ପ୍ରଶ୍ନୋତ୍ତର ପଢ଼ନ୍ତୁ</button><button class="secondary-button" data-tab="quiz">ପ୍ରଶ୍ନମାଳା ଚେଷ୍ଟା କରନ୍ତୁ</button></div><p class="study-note">ପ୍ରଦତ୍ତ ପୁସ୍ତକ ଉପରେ ଆଧାରିତ ଅଧ୍ୟୟନ ସାରାଂଶର ଓଡ଼ିଆ ରୂପାନ୍ତର।</p></div><aside class="source-card"><p class="eyebrow">ମୂଳ ପୁସ୍ତକ ପଢ଼ନ୍ତୁ</p><h4>${unit()} ${num(index+1)} · ${esc(t.title)}</h4><p>ସମ୍ପୂର୍ଣ୍ଣ ଶିକ୍ଷା ଓ ପ୍ରସଙ୍ଗ ପାଇଁ ପ୍ରଦତ୍ତ ଇଂରାଜୀ ପୁସ୍ତକ ପଢ଼ନ୍ତୁ।</p>${source(t)}</aside></div>`;
      $('activity').innerHTML += window.renderRamakathaStudy(book().id,t,'or');    } else if (tab === 'questions') {
      $('activity').innerHTML = `${heading}<p class="qa-intro">ପ୍ରତି ପ୍ରଶ୍ନ ଉପରେ ଚିନ୍ତନ କରନ୍ତୁ, ତାପରେ ଉତ୍ତର ଖୋଲନ୍ତୁ।</p>${t.quiz.map(q=>`<details><summary>${esc(q.q)}</summary><p>${esc(q.options[q.correct])}। ${esc(q.explanation)}</p></details>`).join('')}<p class="study-note">${source(t)}</p><div class="action-row"><button class="primary-button" data-tab="quiz">ନିଜ ବୁଝାମଣା ପରଖନ୍ତୁ</button></div>`;
    } else if (tab === 'quiz') {
      const a = attempt(), answered = a.answers.filter(Number.isInteger).length, score = t.quiz.filter((q,i)=>q.correct===a.answers[i]).length;
      $('activity').innerHTML = `${heading}<p class="quiz-intro">ଏହି ${unit()}ର ପାଠ ଉପରେ ଆଧାରିତ ପାଞ୍ଚଟି ପ୍ରଶ୍ନ। ପ୍ରତି ପ୍ରଶ୍ନ ପାଇଁ ଗୋଟିଏ ଉତ୍ତର ବାଛନ୍ତୁ।</p>${a.checked?`<div class="quiz-result" role="status"><strong>୫ଟିରୁ ${num(score)}ଟି ସଠିକ୍</strong>${score===5?'ଭଲ କରିଛନ୍ତି। ଶିଖିଥିବା ବିଷୟ ଉପରେ ଚିନ୍ତନ କରନ୍ତୁ।':'ବ୍ୟାଖ୍ୟା ଓ ମୂଳ ପାଠ ପଢ଼ି ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ।'}</div>`:''}<p id="answer-progress" class="chapter-guide">୫ଟିରୁ ${num(answered)}ଟିର ଉତ୍ତର ଦିଆଯାଇଛି</p><progress id="quiz-progress" max="5" value="${answered}" aria-label="ଉତ୍ତର ଦିଆଯାଇଥିବା ପ୍ରଶ୍ନ"></progress><form id="quiz-form">${t.quiz.map((q,i)=>`<fieldset class="quiz-question"><legend><span class="qnumber">${num(i+1)}</span>${esc(q.q)}</legend><div class="options">${q.options.map((o,j)=>`<label class="option ${a.checked&&j===q.correct?'correct':''} ${a.checked&&a.answers[i]===j&&j!==q.correct?'wrong':''}"><input type="radio" name="question-${i}" value="${j}" data-question="${i}" ${a.answers[i]===j?'checked':''} ${a.checked?'disabled':''}><span>${esc(o)}${a.checked&&j===q.correct?' ✓':''}</span></label>`).join('')}</div>${a.checked?`<p class="feedback ${a.answers[i]===q.correct?'':'incorrect'}"><strong>${a.answers[i]===q.correct?'ସଠିକ୍।':'ସଠିକ୍ ଉତ୍ତର: '+esc(q.options[q.correct])+'।'}</strong> ${esc(q.explanation)} ${source(t)}</p>`:''}</fieldset>`).join('')}<div class="action-row">${a.checked?'<button type="button" id="retry-quiz" class="secondary-button">ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ</button>':'<button type="submit" class="primary-button">ପାଞ୍ଚଟି ଉତ୍ତର ଯାଞ୍ଚ କରନ୍ତୁ</button>'}</div><p id="quiz-error" class="form-error" role="alert"></p></form><p class="study-note">ଆପଣଙ୍କ ଉତ୍ତର ଓ ଫଳାଫଳ କେବଳ ଏହି ଥରର ଅଧ୍ୟୟନ ସମୟରେ ରହିବ। ${source(t)}</p>`;
    }
  }
  document.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b || b.disabled) return;
    if (b.dataset.chapter !== undefined) {go(Number(b.dataset.chapter));focusActivity();}
    else if (b.dataset.tab) {go(index,b.dataset.tab);$('tab-'+tab).focus({preventScroll:true});}
    else if (b.id === 'previous-topic') {go(index-1);focusActivity();}
    else if (b.id === 'next-topic') {go(index+1);focusActivity();}
    else if (b.id === 'retry-quiz') {attempts.delete(attemptKey());renderActivity();focusActivity();}
  });
  $('chapter-select').addEventListener('change', e => {go(Number(e.target.value));$('chapter-select').focus({preventScroll:true});});
  $('odia-book').addEventListener('change', e => {bookIndex=Number(e.target.value);chapters=book().chapters;go(0);});
  document.addEventListener('change', e => {
    if (!e.target.matches('input[data-question]')) return;
    attempt().answers[Number(e.target.dataset.question)] = Number(e.target.value);
    const count = attempt().answers.filter(Number.isInteger).length;
    $('answer-progress').textContent = `୫ଟିରୁ ${num(count)}ଟିର ଉତ୍ତର ଦିଆଯାଇଛି`;
    $('quiz-progress').value = count; $('quiz-error').textContent = '';
  });
  document.addEventListener('submit', e => {
    if (e.target.id !== 'quiz-form') return; e.preventDefault();
    const a = attempt(), missing = current().quiz.findIndex((_,i)=>!Number.isInteger(a.answers[i]));
    if (missing >= 0) {
      $('quiz-error').textContent = `ପ୍ରଥମେ ପାଞ୍ଚଟିଯାକ ପ୍ରଶ୍ନର ଉତ୍ତର ଦିଅନ୍ତୁ। ପ୍ରଶ୍ନ ${num(missing+1)}ର ଉତ୍ତର ବାକି ଅଛି।`;
      document.querySelector(`input[name="question-${missing}"]`).focus(); return;
    }
    a.checked = true; renderActivity(); focusActivity();
  });
  $('study-tabs').addEventListener('keydown', e => {
    if (!['ArrowLeft','ArrowRight','Home','End'].includes(e.key)) return;
    e.preventDefault(); const keys=tabEntries().map(([id])=>id), i=keys.indexOf(tab);
    go(index,keys[e.key==='Home'?0:e.key==='End'?keys.length-1:(i+(e.key==='ArrowRight'?1:-1)+keys.length)%keys.length]);
    $('tab-'+tab).focus();
  });
  window.addEventListener('hashchange',readHash);
  if (!chapters.length) { $('activity').textContent='ଅଧ୍ୟୟନ ସାମଗ୍ରୀ ଖୋଲିପାରିଲା ନାହିଁ। ପୃଷ୍ଠାଟି ପୁଣି ଖୋଲନ୍ତୁ।'; return; }
  readHash();
})();





