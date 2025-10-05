// tts_say.js (for browser)

document.addEventListener("DOMContentLoaded", function () {
  const speakBtn = document.getElementById("speak");
  const txtArea = document.getElementById("txt");
  const voiceSelect = document.getElementById("voiceSelect");
  const voiceInfo = document.getElementById("voiceInfo");

  // Populate voices
  function populateVoices() {
    const voices = speechSynthesis.getVoices();
    voiceSelect.innerHTML = "";
    voices.forEach((voice, i) => {
      const option = document.createElement("option");
      option.value = i;
      option.textContent = `${voice.name} (${voice.lang})${voice.default ? " [default]" : ""}`;
      voiceSelect.appendChild(option);
    });
    // Show info for the first voice by default
    showVoiceInfo();
  }

  function showVoiceInfo() {
    const voices = speechSynthesis.getVoices();
    const selectedVoice = voices[voiceSelect.value];
    if (selectedVoice) {
      voiceInfo.innerHTML = `
        <strong>Voice:</strong> ${selectedVoice.name}<br>
        <strong>Language:</strong> ${selectedVoice.lang}<br>
        ${selectedVoice.default ? "<strong>Default voice</strong>" : ""}
      `;
    } else {
      voiceInfo.innerHTML = "";
    }
  }

  populateVoices();
  // Some browsers load voices asynchronously
  window.speechSynthesis.onvoiceschanged = populateVoices;

  voiceSelect.addEventListener("change", showVoiceInfo);

  speakBtn.addEventListener("click", function () {
    const text = txtArea.value;
    if (!window.speechSynthesis) {
      alert("Speech Synthesis not supported in this browser.");
      return;
    }
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 1;
    utter.pitch = 1;
    const voices = speechSynthesis.getVoices();
    const selectedVoice = voices[voiceSelect.value];
    if (selectedVoice) utter.voice = selectedVoice;
    speechSynthesis.cancel(); // Stop any current speech
    speechSynthesis.speak(utter);
  });
});
