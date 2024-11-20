// Countries' denotation Script
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

// Translation Script
const fromText = document.querySelector(".from-text"),
    toText = document.querySelector(".to-text"),
    exchageIcon = document.querySelector(".exchange"),
    selectTag = document.querySelectorAll("select"),
    icons = document.querySelectorAll(".row i"),
    translateBtn = document.querySelector("button");

// Populate language dropdown
selectTag.forEach((tag, id) => {
    for (let country_code in countries) {
        let selected = id == 0 ? country_code == "en-GB" ? "selected" : "" : country_code == "hi-IN" ? "selected" : "";
        let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
});

// Normalize the text: Remove extra spaces, convert to lowercase, handle punctuation.
function normalizeText(text) {
    // Remove extra spaces
    text = text.trim().replace(/\s+/g, ' ');

    // Convert text to lowercase for better matching (case insensitive)
    text = text.toLowerCase();

    // Handle punctuation (optional)
    text = text.replace(/[^\w\s]|_/g, "")  // Remove underscores and other punctuations
               .replace(/\s+/g, " ");     // Normalize spaces

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

    // Normalize input text
    text = normalizeText(text);

    toText.setAttribute("placeholder", "Translating...");
    let apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${translateFrom}|${translateTo}`;

    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            if (data.responseData) {
                toText.value = data.responseData.translatedText;
            } else {
                toText.value = "Translation failed.";
            }
        })
        .catch(error => {
            console.error("Translation error:", error);
            toText.value = "Error: Unable to translate.";
        })
        .finally(() => {
            toText.setAttribute("placeholder", "Translation");
        });
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

// Function to detect possible errors or inconsistencies in input text
function detectTextErrors(text) {
    const errors = [];
    // Check if input is too short or invalid for translation
    if (text.length < 3) {
        errors.push("Input is too short. Please enter a longer phrase.");
    }
    // Regex to check for any special characters that might confuse translation
    if (/[^a-zA-Z0-9\s]/.test(text)) {
        errors.push("Input contains unsupported characters.");
    }
    return errors;
}

// Function to handle language-specific settings or features
function handleLanguageSpecificFeatures(language) {
    if (language === 'ar-SA') {
        // Special case for Arabic, reverse text direction
        fromText.style.direction = 'rtl';
        toText.style.direction = 'rtl';
    } else {
        // Default left-to-right text direction
        fromText.style.direction = 'ltr';
        toText.style.direction = 'ltr';
    }
}

// Language change event listener to handle language-specific features
selectTag.forEach(tag => {
    tag.addEventListener('change', () => {
        let fromLang = selectTag[0].value;
        let toLang = selectTag[1].value;

        // Check for errors in text inputs
        let errors = detectTextErrors(fromText.value);
        if (errors.length > 0) {
            alert(errors.join("\n"));
        }

        // Handle special language-specific features
        handleLanguageSpecificFeatures(fromLang);
        handleLanguageSpecificFeatures(toLang);
    });
});
