const body = document.querySelector('body');
const menuSettingsWindow = document.querySelector('.menu-settings-window');
const menuSettings = document.querySelector('.menu-settings');
const searchInput = document.querySelector('.search-input');
const inputClearSpan = document.querySelector('.input-clear-span');
const inputClearIcon = document.querySelector('.input-clear-icon');
const googleSearchFormContainer = document.querySelector('.google-search-form-container');
const voiceIcon = document.querySelector('.voice-icon');
const buttonLucky = document.querySelector('.button-lucky');

menuSettingsWindow.addEventListener('click', () => {
    if (menuSettings.classList.contains('hidden')) {
        menuSettings.classList.remove('hidden');
    } else {
        menuSettings.classList.add('hidden');
    }
});

body.addEventListener('click', () => {
    if (!event.target.classList.contains('menu-settings-window')) {
        menuSettings.classList.add('hidden');
    }

    if (!event.target.classList.contains('focus')) {
        googleSearchFormContainer.classList.remove('focus');
    }
});

searchInput.addEventListener('input', (event) => {
    if(event.target.value) {
        inputClearSpan.classList.remove('hidden');
        inputClearIcon.classList.remove('hidden');
        googleSearchFormContainer.classList.add('focus');
    } else {
        inputClearSpan.classList.add('hidden');
        inputClearIcon.classList.add('hidden');
    }
});

inputClearIcon.addEventListener('click', () => {
    searchInput.value = '';
    searchInput.focus();
    inputClearSpan.classList.add('hidden');
    inputClearIcon.classList.add('hidden');
});

voiceIcon.addEventListener('click', () => {
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.start();
    recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join('')
        .toLowerCase();
        if (event.results[0].isFinal) {
            searchInput.value = transcript;
        }
    };
    
    recognition.onend = () => {
        recognition.stop();
    };
});

buttonLucky.addEventListener('click', () => {
    if(searchInput.value) {
        window.location.href = `https://en.wikipedia.org/wiki/${searchInput.value}`;
    } else {
        window.location.href = `https://www.google.com/doodles/`;
    }
});

