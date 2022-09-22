const textarea = document.querySelector('#text');
let voicelist = document.querySelector('#voice');
let speechbtn = document.querySelector('.submit');

// speechSynthesis é a interface para utilizar a Web Speech API, que possibilita lidar com dados de voz,
let synth = speechSynthesis;
let isSpeaking = true;

function voicespeech() {
    // for par percorrer o objeto que irá ser retornardo do metodo getVoices. Esse objeto contem as vozes disponivel no atual dispositivo, 
    // então ele colocará essa voz que foi retornada como uma opção
    for (let voice of synth.getVoices()) {
        let option = document.createElement('option');
        option.text = voice.name;
        voicelist.add(option);
        console.log(option);
    }
};

synth.addEventListener('voiceschanged', voicespeech);

function texttospeech(text) {
    let utternance = new SpeechSynthesisUtterance(text)
    for (let voice of synth.getVoices()) {
        if (voice.name == voicelist.value) {
            utternance.voice = voice;
        }
    }
    speechSynthesis.speak(utternance);
};

speechbtn.addEventListener('click', (e) => {
    // cancelar o evento de click, caso seja cancelavel
    e.preventDefault()
    if (textarea.value != '') {
        if (!synth.speaking) {
            texttospeech(textarea.value);
        }
        if (textarea.value.length > 80) {
            if (isSpeaking) {
                synth.resume();
                isSpeaking = false;
                speechbtn.innerHTML = 'Pause Speech';
            } else {
                synth.pause();
                isSpeaking = true;
                speechbtn.innerHTML = 'Resume Speech';
            }
            setInterval(() => {
                if (!synth.speaking && !isSpeaking) {
                    isSpeaking = true;
                    speechbtn.innerHTML = 'Convert To Speech';
                }
            })
        } else {
            speechbtn.innerHTML = 'Convert To Speech';
        }
    }
});