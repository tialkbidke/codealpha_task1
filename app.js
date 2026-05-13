/**
 * LinguaFlow — Language Translation Tool
 * Uses MyMemory Free Translation API (no API key needed)
 * Features: translate, detect language, copy, text-to-speech, swap languages
 */

// ============================================================
//  LANGUAGE LIST
// ============================================================
const LANGUAGES = [
  { code: 'af', name: 'Afrikaans' },
  { code: 'sq', name: 'Albanian' },
  { code: 'am', name: 'Amharic' },
  { code: 'ar', name: 'Arabic' },
  { code: 'hy', name: 'Armenian' },
  { code: 'az', name: 'Azerbaijani' },
  { code: 'eu', name: 'Basque' },
  { code: 'be', name: 'Belarusian' },
  { code: 'bn', name: 'Bengali' },
  { code: 'bs', name: 'Bosnian' },
  { code: 'bg', name: 'Bulgarian' },
  { code: 'ca', name: 'Catalan' },
  { code: 'ceb', name: 'Cebuano' },
  { code: 'zh', name: 'Chinese (Simplified)' },
  { code: 'zh-TW', name: 'Chinese (Traditional)' },
  { code: 'co', name: 'Corsican' },
  { code: 'hr', name: 'Croatian' },
  { code: 'cs', name: 'Czech' },
  { code: 'da', name: 'Danish' },
  { code: 'nl', name: 'Dutch' },
  { code: 'en', name: 'English' },
  { code: 'eo', name: 'Esperanto' },
  { code: 'et', name: 'Estonian' },
  { code: 'fi', name: 'Finnish' },
  { code: 'fr', name: 'French' },
  { code: 'fy', name: 'Frisian' },
  { code: 'gl', name: 'Galician' },
  { code: 'ka', name: 'Georgian' },
  { code: 'de', name: 'German' },
  { code: 'el', name: 'Greek' },
  { code: 'gu', name: 'Gujarati' },
  { code: 'ht', name: 'Haitian Creole' },
  { code: 'ha', name: 'Hausa' },
  { code: 'haw', name: 'Hawaiian' },
  { code: 'he', name: 'Hebrew' },
  { code: 'hi', name: 'Hindi' },
  { code: 'hmn', name: 'Hmong' },
  { code: 'hu', name: 'Hungarian' },
  { code: 'is', name: 'Icelandic' },
  { code: 'ig', name: 'Igbo' },
  { code: 'id', name: 'Indonesian' },
  { code: 'ga', name: 'Irish' },
  { code: 'it', name: 'Italian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'jv', name: 'Javanese' },
  { code: 'kn', name: 'Kannada' },
  { code: 'kk', name: 'Kazakh' },
  { code: 'km', name: 'Khmer' },
  { code: 'ko', name: 'Korean' },
  { code: 'ku', name: 'Kurdish' },
  { code: 'ky', name: 'Kyrgyz' },
  { code: 'lo', name: 'Lao' },
  { code: 'la', name: 'Latin' },
  { code: 'lv', name: 'Latvian' },
  { code: 'lt', name: 'Lithuanian' },
  { code: 'lb', name: 'Luxembourgish' },
  { code: 'mk', name: 'Macedonian' },
  { code: 'mg', name: 'Malagasy' },
  { code: 'ms', name: 'Malay' },
  { code: 'ml', name: 'Malayalam' },
  { code: 'mt', name: 'Maltese' },
  { code: 'mi', name: 'Maori' },
  { code: 'mr', name: 'Marathi' },
  { code: 'mn', name: 'Mongolian' },
  { code: 'my', name: 'Myanmar (Burmese)' },
  { code: 'ne', name: 'Nepali' },
  { code: 'no', name: 'Norwegian' },
  { code: 'ny', name: 'Nyanja (Chichewa)' },
  { code: 'or', name: 'Odia (Oriya)' },
  { code: 'ps', name: 'Pashto' },
  { code: 'fa', name: 'Persian' },
  { code: 'pl', name: 'Polish' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'pa', name: 'Punjabi' },
  { code: 'ro', name: 'Romanian' },
  { code: 'ru', name: 'Russian' },
  { code: 'sm', name: 'Samoan' },
  { code: 'gd', name: 'Scots Gaelic' },
  { code: 'sr', name: 'Serbian' },
  { code: 'st', name: 'Sesotho' },
  { code: 'sn', name: 'Shona' },
  { code: 'sd', name: 'Sindhi' },
  { code: 'si', name: 'Sinhala' },
  { code: 'sk', name: 'Slovak' },
  { code: 'sl', name: 'Slovenian' },
  { code: 'so', name: 'Somali' },
  { code: 'es', name: 'Spanish' },
  { code: 'su', name: 'Sundanese' },
  { code: 'sw', name: 'Swahili' },
  { code: 'sv', name: 'Swedish' },
  { code: 'tl', name: 'Tagalog (Filipino)' },
  { code: 'tg', name: 'Tajik' },
  { code: 'ta', name: 'Tamil' },
  { code: 'tt', name: 'Tatar' },
  { code: 'te', name: 'Telugu' },
  { code: 'th', name: 'Thai' },
  { code: 'tr', name: 'Turkish' },
  { code: 'tk', name: 'Turkmen' },
  { code: 'uk', name: 'Ukrainian' },
  { code: 'ur', name: 'Urdu' },
  { code: 'ug', name: 'Uyghur' },
  { code: 'uz', name: 'Uzbek' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'cy', name: 'Welsh' },
  { code: 'xh', name: 'Xhosa' },
  { code: 'yi', name: 'Yiddish' },
  { code: 'yo', name: 'Yoruba' },
  { code: 'zu', name: 'Zulu' },
];

// ============================================================
//  DOM REFERENCES
// ============================================================
const sourceLangEl   = document.getElementById('source-lang');
const targetLangEl   = document.getElementById('target-lang');
const swapBtn        = document.getElementById('swap-btn');
const inputTextEl    = document.getElementById('input-text');
const outputTextEl   = document.getElementById('output-text');
const translateBtn   = document.getElementById('translate-btn');
const clearBtn       = document.getElementById('clear-btn');
const copyBtn        = document.getElementById('copy-btn');
const speakInputBtn  = document.getElementById('speak-input-btn');
const speakOutputBtn = document.getElementById('speak-output-btn');
const charCountEl    = document.getElementById('char-count');
const loadingOverlay = document.getElementById('loading-overlay');
const detectedBadge  = document.getElementById('detected-lang');
const toastEl        = document.getElementById('toast');
const inputLangName  = document.getElementById('input-lang-name');
const outputLangName = document.getElementById('output-lang-name');
const chipsRow       = document.getElementById('chips-row');

// ============================================================
//  STATE
// ============================================================
let isSpeakingInput  = false;
let isSpeakingOutput = false;
let toastTimer       = null;
let translateTimer   = null;
let currentTranslation = '';
let detectedLangCode   = '';

// ============================================================
//  INIT — POPULATE SELECTS
// ============================================================
function populateSelects() {
  LANGUAGES.forEach(lang => {
    // Source (with auto-detect at top already in HTML)
    const optSrc = document.createElement('option');
    optSrc.value = lang.code;
    optSrc.textContent = lang.name;
    sourceLangEl.appendChild(optSrc);

    // Target
    const optTgt = document.createElement('option');
    optTgt.value = lang.code;
    optTgt.textContent = lang.name;
    targetLangEl.appendChild(optTgt);
  });

  // Default target: Spanish
  targetLangEl.value = 'es';
  updateLangLabels();
}

function getLangName(code) {
  if (code === 'auto') return 'Detect Language';
  const found = LANGUAGES.find(l => l.code === code);
  return found ? found.name : code;
}

function updateLangLabels() {
  const srcCode = sourceLangEl.value;
  const tgtCode = targetLangEl.value;
  inputLangName.textContent  = getLangName(srcCode);
  outputLangName.textContent = getLangName(tgtCode);
}

// ============================================================
//  CHARACTER COUNT
// ============================================================
function updateCharCount() {
  const len = inputTextEl.value.length;
  charCountEl.textContent = `${len} / 5000`;
  charCountEl.classList.toggle('warn',  len > 3500 && len <= 4800);
  charCountEl.classList.toggle('limit', len > 4800);

  clearBtn.disabled     = len === 0;
  speakInputBtn.disabled = len === 0;
}

// ============================================================
//  TRANSLATE — MyMemory API
// ============================================================
async function translate() {
  const text = inputTextEl.value.trim();
  if (!text) {
    showToast('Please enter some text to translate.', 'info');
    return;
  }

  let srcLang = sourceLangEl.value;
  const tgtLang = targetLangEl.value;

  // For auto-detect, MyMemory accepts 'autodetect|target'
  const apiSrc = srcLang === 'auto' ? 'autodetect' : srcLang;

  const langPair = `${apiSrc}|${tgtLang}`;
  const apiUrl   = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langPair}`;

  // UI: loading state
  showLoading(true);
  translateBtn.disabled = true;
  translateBtn.classList.add('loading');
  translateBtn.querySelector('.btn-label').textContent = 'Translating';

  detectedBadge.style.display = 'none';

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

    const data = await response.json();

    if (data.responseStatus !== 200 && data.responseStatus !== 206) {
      throw new Error(data.responseMessage || 'Translation failed');
    }

    const translated = data.responseData.translatedText;

    // Detect language info if auto
    if (sourceLangEl.value === 'auto' && data.responseData.detectedLanguage) {
      const detCode = data.responseData.detectedLanguage;
      detectedLangCode = detCode;
      const detName = getLangName(detCode.toLowerCase().split('-')[0]);
      detectedBadge.textContent = `🔍 Detected: ${detName}`;
      detectedBadge.style.display = 'inline-flex';
    }

    // Display result
    currentTranslation = translated;
    outputTextEl.innerHTML = '';
    outputTextEl.textContent = translated;
    outputTextEl.style.direction = isRTL(tgtLang) ? 'rtl' : 'ltr';

    copyBtn.disabled      = false;
    speakOutputBtn.disabled = false;

    // Subtle fade-in animation on the output
    outputTextEl.animate([{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'translateY(0)' }], {
      duration: 300, easing: 'ease', fill: 'forwards'
    });

    showToast('Translation complete! ✨', 'success');

  } catch (err) {
    console.error('Translation error:', err);
    outputTextEl.innerHTML = '<span class="output-placeholder">Translation failed. Please check your internet connection and try again.</span>';
    showToast('Translation failed. Try again.', 'error');
    copyBtn.disabled      = true;
    speakOutputBtn.disabled = true;
  } finally {
    showLoading(false);
    translateBtn.disabled = false;
    translateBtn.classList.remove('loading');
    translateBtn.querySelector('.btn-label').textContent = 'Translate';
  }
}

// ============================================================
//  HELPERS
// ============================================================
function showLoading(visible) {
  loadingOverlay.classList.toggle('visible', visible);
  loadingOverlay.setAttribute('aria-hidden', String(!visible));
}

function isRTL(code) {
  return ['ar', 'he', 'fa', 'ur', 'yi', 'sd', 'ug', 'ps'].includes(code);
}

// ============================================================
//  SWAP LANGUAGES
// ============================================================
function swapLanguages() {
  const srcVal = sourceLangEl.value;
  const tgtVal = targetLangEl.value;

  if (srcVal === 'auto') {
    // Swap text content: move translation to input
    if (currentTranslation) {
      inputTextEl.value = currentTranslation;
      outputTextEl.innerHTML = '<span class="output-placeholder">Translation will appear here…</span>';
      currentTranslation = '';
      copyBtn.disabled      = true;
      speakOutputBtn.disabled = true;
      updateCharCount();
    }
    // Set source to previous target lang
    sourceLangEl.value = tgtVal;
    targetLangEl.value = 'en';
  } else {
    // Swap language codes
    sourceLangEl.value = tgtVal;
    targetLangEl.value = srcVal;

    // Swap text
    const inputVal = inputTextEl.value;
    if (currentTranslation) {
      inputTextEl.value = currentTranslation;
      outputTextEl.innerHTML = '<span class="output-placeholder">Translation will appear here…</span>';
      currentTranslation = '';
      copyBtn.disabled      = true;
      speakOutputBtn.disabled = true;
    }
    updateCharCount();
  }

  updateLangLabels();
  detectedBadge.style.display = 'none';
  updateActiveChip();
}

// ============================================================
//  COPY TO CLIPBOARD
// ============================================================
async function copyTranslation() {
  if (!currentTranslation) return;

  try {
    await navigator.clipboard.writeText(currentTranslation);
    copyBtn.classList.add('copied');
    const prevIcon = copyBtn.innerHTML;
    copyBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`;
    showToast('Copied to clipboard! 📋', 'success');
    setTimeout(() => {
      copyBtn.classList.remove('copied');
      copyBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" stroke-width="1.8"/>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor" stroke-width="1.8"/>
        </svg>`;
    }, 2000);
  } catch {
    // Fallback
    const range = document.createRange();
    const sel = window.getSelection();
    const temp = document.createElement('textarea');
    temp.value = currentTranslation;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand('copy');
    document.body.removeChild(temp);
    showToast('Copied to clipboard! 📋', 'success');
  }
}

// ============================================================
//  TEXT-TO-SPEECH
// ============================================================
function speakText(text, langCode, btn, stateRef) {
  if (!('speechSynthesis' in window)) {
    showToast('Text-to-speech is not supported in your browser.', 'error');
    return;
  }

  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
    document.querySelectorAll('.icon-btn.speaking').forEach(b => b.classList.remove('speaking'));
    isSpeakingInput  = false;
    isSpeakingOutput = false;
    if (stateRef === 'input' && isSpeakingInput === false) return;
    if (stateRef === 'output' && isSpeakingOutput === false) return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = langCode === 'auto' ? 'en' : langCode;
  utterance.rate = 0.9;
  utterance.pitch = 1;

  utterance.onstart = () => {
    btn.classList.add('speaking');
  };
  utterance.onend = utterance.onerror = () => {
    btn.classList.remove('speaking');
    if (stateRef === 'input')  isSpeakingInput  = false;
    if (stateRef === 'output') isSpeakingOutput = false;
  };

  if (stateRef === 'input')  isSpeakingInput  = true;
  if (stateRef === 'output') isSpeakingOutput = true;

  window.speechSynthesis.speak(utterance);
}

// ============================================================
//  CLEAR INPUT
// ============================================================
function clearInput() {
  inputTextEl.value = '';
  outputTextEl.innerHTML = '<span class="output-placeholder">Translation will appear here…</span>';
  currentTranslation = '';
  detectedBadge.style.display = 'none';
  copyBtn.disabled      = true;
  speakInputBtn.disabled = true;
  speakOutputBtn.disabled = true;
  updateCharCount();
  inputTextEl.focus();
  if (window.speechSynthesis.speaking) window.speechSynthesis.cancel();
}

// ============================================================
//  TOAST NOTIFICATIONS
// ============================================================
function showToast(message, type = 'info') {
  if (toastTimer) clearTimeout(toastTimer);
  toastEl.textContent = message;
  toastEl.className = `toast ${type} show`;
  toastTimer = setTimeout(() => {
    toastEl.classList.remove('show');
  }, 3000);
}

// ============================================================
//  QUICK LANGUAGE CHIPS
// ============================================================
function updateActiveChip() {
  const currentTarget = targetLangEl.value;
  document.querySelectorAll('.chip').forEach(chip => {
    chip.classList.toggle('active', chip.dataset.lang === currentTarget);
  });
}

chipsRow.addEventListener('click', e => {
  const chip = e.target.closest('.chip');
  if (!chip) return;
  targetLangEl.value = chip.dataset.lang;
  updateLangLabels();
  updateActiveChip();
  showToast(`Target language set to ${getLangName(chip.dataset.lang)}`, 'info');
  // Auto-retranslate if there is text
  if (inputTextEl.value.trim().length > 0) {
    if (translateTimer) clearTimeout(translateTimer);
    translateTimer = setTimeout(() => translate(), 400);
  }
});

// ============================================================
//  AUTO TRANSLATE ON TYPING (debounced, 800ms)
// ============================================================
inputTextEl.addEventListener('input', () => {
  updateCharCount();
  if (translateTimer) clearTimeout(translateTimer);
  if (inputTextEl.value.trim().length > 2) {
    translateTimer = setTimeout(() => translate(), 800);
  }
});

// ============================================================
//  EVENT LISTENERS
// ============================================================
translateBtn.addEventListener('click', () => translate());

swapBtn.addEventListener('click', () => swapLanguages());

clearBtn.addEventListener('click', () => clearInput());

copyBtn.addEventListener('click', () => copyTranslation());

speakInputBtn.addEventListener('click', () => {
  const text = inputTextEl.value.trim();
  if (!text) return;
  speakText(text, sourceLangEl.value, speakInputBtn, 'input');
});

speakOutputBtn.addEventListener('click', () => {
  if (!currentTranslation) return;
  speakText(currentTranslation, targetLangEl.value, speakOutputBtn, 'output');
});

sourceLangEl.addEventListener('change', () => {
  updateLangLabels();
  if (inputTextEl.value.trim().length > 0) {
    if (translateTimer) clearTimeout(translateTimer);
    translateTimer = setTimeout(() => translate(), 400);
  }
});
targetLangEl.addEventListener('change', () => {
  updateLangLabels();
  updateActiveChip();
  if (inputTextEl.value.trim().length > 0) {
    if (translateTimer) clearTimeout(translateTimer);
    translateTimer = setTimeout(() => translate(), 400);
  }
});

// Keyboard shortcut: Ctrl+Enter to translate
inputTextEl.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    e.preventDefault();
    translate();
  }
});

// ============================================================
//  INIT
// ============================================================
populateSelects();
updateCharCount();
updateActiveChip();

console.log(
  '%c LinguaFlow %c Translation Tool Ready 🌍',
  'background:#6366f1;color:#fff;padding:4px 8px;border-radius:4px 0 0 4px;font-weight:700',
  'background:#111;color:#a5b4fc;padding:4px 8px;border-radius:0 4px 4px 0'
);
