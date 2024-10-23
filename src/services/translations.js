const PROJECT_ID = 'cm2l4u6s90001t8hocy5seeyw';

// Definir los idiomas directamente en este archivo
const ES_AR = 'es-AR';
const EN_US = 'en-US';
const PT_BR = 'pt-BR';
const DE_DE = 'de-DE';

let translations = null;
let language = ES_AR; // Idioma predeterminado

export async function getTranslations(lang, callback) {
    localStorage.clear();
    translations = null;
    language = lang;
    
    // No hacer fetch si el idioma es español argentino
    if (language === ES_AR) {
        return callback ? callback() : false;
    }

    try {
        const response = await fetch(`https://traducila.vercel.app/api/translations/${PROJECT_ID}/${language}
`, { mode: 'cors' });
        const data = await response.json(); // Aquí se debe definir 'data'
        localStorage.setItem('translations', JSON.stringify(data));
        translations = data;
        if (callback) callback();
    } catch (error) {
        console.error('Error fetching translations:', error);
    }
}

export function getPhrase(key) {
    if (!translations) {
        const locals = localStorage.getItem('translations');
        translations = locals ? JSON.parse(locals) : null;
    }

    let phrase = key; // Si no encuentra la traducción, devuelve la clave original
    if (translations && translations[key]) {
        phrase = translations[key];
    }

    return phrase;
}

function isAllowedLanguage(language) {
    // Definir los idiomas permitidos directamente en el archivo
    const allowedLanguages = [ES_AR, EN_US, PT_BR, DE_DE];
    return allowedLanguages.includes(language);
}

export function getLanguageConfig() {
    let languageConfig;

    // Obtener el idioma desde la URL o el navegador
    console.log(window.location.href);

    const path = window.location.pathname !== '/' ? window.location.pathname : null;
    const params = new URL(window.location.href).searchParams;
    const queryLang = params.get('lang');

    languageConfig = path ?? queryLang;

    if (languageConfig && isAllowedLanguage(languageConfig)) {
        return languageConfig;
    }

    const browserLanguage = window.navigator.language;
    if (isAllowedLanguage(browserLanguage)) {
        return browserLanguage;
    }

    return ES_AR; // Idioma por defecto
}