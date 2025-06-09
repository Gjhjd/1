document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const textInput = document.getElementById('text-to-speech');
    const voiceSelect = document.getElementById('voice-select');
    const rateInput = document.getElementById('rate');
    const rateValue = document.getElementById('rate-value');
    const pitchInput = document.getElementById('pitch');
    const pitchValue = document.getElementById('pitch-value');
    const speakBtn = document.getElementById('speak-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const resumeBtn = document.getElementById('resume-btn');
    const stopBtn = document.getElementById('stop-btn');
    
    // SpeechSynthesis object
    const synth = window.speechSynthesis;
    let voices = [];
    
    // Function to populate voices
    function populateVoices() {
        voices = synth.getVoices();
        voiceSelect.innerHTML = '';
        
        voices.forEach(voice => {
            const option = document.createElement('option');
            option.textContent = `${voice.name} (${voice.lang})`;
            option.setAttribute('data-name', voice.name);
            voiceSelect.appendChild(option);
        });
    }
    
    // Initialize voices
    if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = populateVoices;
    }
    
    // Populate voices on page load (some browsers don't support onvoiceschanged)
    populateVoices();
    
    // Update rate and pitch display values
    rateInput.addEventListener('input', () => {
        rateValue.textContent = rateInput.value;
    });
    
    pitchInput.addEventListener('input', () => {
        pitchValue.textContent = pitchInput.value;
    });
    
    // Speak function
    function speak() {
        if (synth.speaking) {
            console.error('SpeechSynthesis is already speaking');
            return;
        }
        
        if (textInput.value !== '') {
            const utterance = new SpeechSynthesisUtterance(textInput.value);
            
            // Set voice
            const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');
            voices.forEach(voice => {
                if (voice.name === selectedVoice) {
                    utterance.voice = voice;
                }
            });
            
            // Set rate and pitch
            utterance.rate = rateInput.value;
            utterance.pitch = pitchInput.value;
            
            // Speak
            synth.speak(utterance);
        }
    }
    
    // Event listeners for buttons
    speakBtn.addEventListener('click', () => {
        speak();
    });
    
    pauseBtn.addEventListener('click', () => {
        synth.pause();
    });
    
    resumeBtn.addEventListener('click', () => {
        synth.resume();
    });
    
    stopBtn.addEventListener('click', () => {
        synth.cancel();
    });
});