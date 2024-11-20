// Countries' denotation script
const countries = {
    "am-ET": "Amharic",
    "ar-SA": "Arabic",
    "be-BY": "Bielarus",
    "bem-ZM": "Bemba",
    "bi-VU": "Bislama",
    "bjs-BB": "Bajan",
    "bn-IN": "Bengali",
    "bo-CN": "Tibetan",
    "br-FR": "Breton",
    "bs-BA": "Bosnian",
    "ca-ES": "Catalan",
    "cop-EG": "Coptic",
    "cs-CZ": "Czech",
    "cy-GB": "Welsh",
    "da-DK": "Danish",
    "dz-BT": "Dzongkha",
    "de-DE": "German",
    "dv-MV": "Maldivian",
    "el-GR": "Greek",
    "en-GB": "English",
    "es-ES": "Spanish",
    "et-EE": "Estonian",
    "eu-ES": "Basque",
    "fa-IR": "Persian",
    "fi-FI": "Finnish",
    "fn-FNG": "Fanagalo",
    "fo-FO": "Faroese",
    "fr-FR": "French",
    "gl-ES": "Galician",
    "gu-IN": "Gujarati",
    "ha-NE": "Hausa",
    "he-IL": "Hebrew",
    "hi-IN": "Hindi",
    "hr-HR": "Croatian",
    "hu-HU": "Hungarian",
    "id-ID": "Indonesian",
    "is-IS": "Icelandic",
    "it-IT": "Italian",
    "ja-JP": "Japanese",
    "kk-KZ": "Kazakh",
    "km-KM": "Khmer",
    "kn-IN": "Kannada",
    "ko-KR": "Korean",
    "ku-TR": "Kurdish",
    "ky-KG": "Kyrgyz",
    "la-VA": "Latin",
    "lo-LA": "Lao",
    "lv-LV": "Latvian",
    "men-SL": "Mende",
    "mg-MG": "Malagasy",
    "mi-NZ": "Maori",
    "ms-MY": "Malay",
    "mt-MT": "Maltese",
    "my-MM": "Burmese",
    "ne-NP": "Nepali",
    "niu-NU": "Niuean",
    "nl-NL": "Dutch",
    "no-NO": "Norwegian",
    "ny-MW": "Nyanja",
    "ur-PK": "Pakistani",
    "pau-PW": "Palauan",
    "pa-IN": "Panjabi",
    "ps-PK": "Pashto",
    "pis-SB": "Pijin",
    "pl-PL": "Polish",
    "pt-PT": "Portuguese",
    "rn-BI": "Kirundi",
    "ro-RO": "Romanian",
    "ru-RU": "Russian",
    "sg-CF": "Sango",
    "si-LK": "Sinhala",
    "sk-SK": "Slovak",
    "sm-WS": "Samoan",
    "sn-ZW": "Shona",
    "so-SO": "Somali",
    "sq-AL": "Albanian",
    "sr-RS": "Serbian",
    "sv-SE": "Swedish",
    "sw-SZ": "Swahili",
    "ta-LK": "Tamil",
    "te-IN": "Telugu",
    "tet-TL": "Tetum",
    "tg-TJ": "Tajik",
    "th-TH": "Thai",
    "ti-TI": "Tigrinya",
    "tk-TM": "Turkmen",
    "tl-PH": "Tagalog",
    "tn-BW": "Tswana",
    "to-TO": "Tongan",
    "tr-TR": "Turkish",
    "uk-UA": "Ukrainian",
    "uz-UZ": "Uzbek",
    "vi-VN": "Vietnamese",
    "wo-SN": "Wolof",
    "xh-ZA": "Xhosa",
    "yi-YD": "Yiddish",
    "zu-ZA": "Zulu"
};

// DOM Elements
const fromText = document.querySelector(".from-text"),
    toText = document.querySelector(".to-text"),
    exchageIcon = document.querySelector(".exchange"),
    selectTag = document.querySelectorAll("select"),
    icons = document.querySelectorAll(".row i"),
    translateBtn = document.querySelector("button"),
    hamburger = document.querySelector(".hamburger"),
    navMenu = document.querySelector(".nav-menu");

// Translation dictionary (example)
const translations = {
    "hello": {
        "es-ES": "hola",
        "fr-FR": "bonjour",
        "de-DE": "hallo",
        "hi-IN": "नमस्ते",
        "ja-JP": "こんにちは"
    },
    "good morning": {
        "es-ES": "buenos días",
        "fr-FR": "bonjour",
        "de-DE": "guten Morgen",
        "hi-IN": "सुप्रभात",
        "ja-JP": "おはよう"
    }
};

// Hamburger Menu Toggle - Fix for the issue
document.addEventListener("DOMContentLoaded", function () {
    // Ensure hamburger and navMenu are not null before adding event listener
    if (hamburger && navMenu) {
        hamburger.addEventListener("click", function () {
            // Toggle the "active" class to show/hide the nav menu
            navMenu.classList.toggle("active");
            // Toggle the "active" class on the hamburger icon itself for animation
            hamburger.classList.toggle("active");
        });
    } else {
        console.error("Hamburger or navMenu element not found.");
    }
});

// Populate language dropdown
selectTag.forEach((tag, id) => {
    for (let country_code in countries) {
        let selected = id == 0 ? country_code == "en-GB" ? "selected" : "" : country_code == "hi-IN" ? "selected" : "";
        let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
});

// Normalize the text
function normalizeText(text) {
    text = text.trim().replace(/\s+/g, ' ').toLowerCase();
    return text;
}

// Exchange languages and texts
exchageIcon.addEventListener("click", () => {
    let tempText = fromText.value,
        tempLang = selectTag[0].value;
    fromText.value = toText.value;
    toText.value = tempText;
    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = tempLang;
});

// Clear translation if no input
fromText.addEventListener("keyup", () => {
    if (!fromText.value) {
        toText.value = "";
    }
});

// Translate Button Event
translateBtn.addEventListener("click", () => {
    let text = fromText.value.trim(),
        translateFrom = selectTag[0].value,
        translateTo = selectTag[1].value;

    if (!text) return;

    text = normalizeText(text);

    // Check for translation in dictionary
    let translatedText = translations[text] ? translations[text][translateTo] : "Translation not available";

    toText.value = translatedText;
});

// Copy or Speak functionality
icons.forEach(icon => {
    icon.addEventListener("click", ({ target }) => {
        if (!fromText.value || !toText.value) return;

        if (target.classList.contains("fa-copy")) {
            if (target.id == "from") {
                navigator.clipboard.writeText(fromText.value);
            } else {
                navigator.clipboard.writeText(toText.value);
            }
        } else {
            let utterance;
            if (target.id == "from") {
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = selectTag[0].value;
            } else {
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang = selectTag[1].value;
            }
            speechSynthesis.speak(utterance);
        }
    });
});
// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".sidebar");
    const overlay = document.querySelector(".sidebar-overlay");

    // If hamburger and navMenu are found in the DOM
    if (hamburger && navMenu) {
        // Handle hamburger click
        hamburger.addEventListener("click", function () {
            navMenu.classList.toggle("active"); // Toggle the sidebar visibility
            document.body.classList.toggle("no-scroll"); // Optional: Prevent body scrolling when menu is open
        });

        // Handle overlay click to close the menu
        overlay.addEventListener("click", function () {
            navMenu.classList.remove("active");
            document.body.classList.remove("no-scroll");
        });

        // Handle sidebar close button click
        const closeBtn = navMenu.querySelector(".fa-times");
        closeBtn.addEventListener("click", function () {
            navMenu.classList.remove("active");
            document.body.classList.remove("no-scroll");
        });
    } else {
        console.error("Hamburger or navMenu element not found.");
    }
});
// Set current year dynamically
document.addEventListener("DOMContentLoaded", function () {
    const currentYear = new Date().getFullYear(); // Get the current year
    const yearSpan = document.getElementById("current-year"); // Find the element with the ID 'current-year'

    if (yearSpan) {
      yearSpan.textContent = currentYear; // Set the current year in the element
    }
  });
