// Dropdown Menu========================================>

let menuToggle = document.querySelector('.menuToggle');
let navigation = document.querySelector('.navigation');

menuToggle.onclick = function () {
  navigation.classList.toggle('active');
};

class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll('.pad');
    this.playBtn = document.querySelector('.play');
    this.currentKick = '../sounds/kick-classic.wav';
    this.currentSnare = '../sounds/snare-acoustic01.wav';
    this.currentHihat = '../sounds/hihat-acoustic01.wav';
    this.kickAudio = document.querySelector('.kick-sound');
    this.snareAudio = document.querySelector('.snare-sound');
    this.hihatAudio = document.querySelector('.hihat-sound');
    this.index = 0;
    this.bpm = 150;
    this.isPlaying = null;
    this.selects = document.querySelectorAll('select');
    // this.muteBtns = document.querySelectorAll('.mute');
    this.tempoSlider = document.querySelector('.tempo-slider');
    this.volumeControls =
      document.querySelectorAll('.volume-control');
    this.muteCheckboxes = document.querySelectorAll('.mute-checkbox');
    // this is going to track our actual track here
  }
  activePad() {
    this.classList.toggle('active');
  }
  repeat() {
    let step = this.index % 9;
    const activeBars = document.querySelectorAll(`.b${step}`);
    // Loop over the pads
    activeBars.forEach((bar) => {
      bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
      const led = bar.querySelector('.led');
      // check if pads arc active
      if (bar.classList.contains('active')) {
        if (led) led.classList.add('active'); // Activate LED
        // check each sound
        if (bar.classList.contains('kick-pad')) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (bar.classList.contains('snare-pad')) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (bar.classList.contains('hihat-pad')) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
      } else {
        if (led) led.classList.remove('active'); // Deactivate LED
      }
    });
    this.index++;
  }
  strart() {
    const interval = (60 / this.bpm) * 1000;
    // Check if it's playing
    // NULL
    if (this.isPlaying) {
      // claer the interval
      clearInterval(this.isPlaying);
      console.log(this.isPlaying);
      this.isPlaying = null;
    } else {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    }
  }
  updateBtn() {
    // NULL
    if (!this.isPlaying) {
      this.playBtn.innerText = 'Stop';
      this.playBtn.classList.add('active');
    } else {
      this.playBtn.innerText = 'Play';
      this.playBtn.classList.remove('active');
    }
  }
  changeSound(e) {
    const selectionName = e.target.name;
    const selectionValue = e.target.value;
    console.log(selectionName);
    switch (selectionName) {
      case 'kick-select':
        this.kickAudio.src = selectionValue;
        break;
      case 'snare-select':
        this.snareAudio.src = selectionValue;
        break;
      case 'hihat-select':
        this.hihatAudio.src = selectionValue;
        break;
    }
  }
  volumeControl(e) {
    const volumeIndex = e.target.getAttribute('data-track');
    const volumeValue = e.target.value;
    const isMuted = document.querySelector(
      `.mute-checkbox[data-track="${volumeIndex}"]`
    ).checked;

    switch (volumeIndex) {
      case '0':
        this.kickAudio.volume = isMuted ? 0 : volumeValue;
        break;
      case '1':
        this.snareAudio.volume = isMuted ? 0 : volumeValue;
        break;
      case '2':
        this.hihatAudio.volume = isMuted ? 0 : volumeValue;
        break;
    }
  }
  toggleMute(e) {
    const muteIndex = e.target.getAttribute('data-track');
    const isMuted = e.target.checked;
    const volumeControl = document.querySelector(
      `.volume-control[data-track="${muteIndex}"]`
    );

    switch (muteIndex) {
      case '0':
        this.kickAudio.volume = isMuted ? 0 : volumeControl.value;
        break;
      case '1':
        this.snareAudio.volume = isMuted ? 0 : volumeControl.value;
        break;
      case '2':
        this.hihatAudio.volume = isMuted ? 0 : volumeControl.value;
        break;
    }
  }
  changeTempo(e) {
    const tempoText = document.querySelector('.tempo-nr');
    tempoText.innerHTML = e.target.value;
    // console.log(e);
  }
  updateTempo(e) {
    this.bpm = e.target.value;
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    const palyBtn = document.querySelector('.paly');
    if (palyBtn.classList.contains('active')) {
      this.strart();
    }
  }
}
// Initialize DrumKit
const drumKit = new DrumKit();

// Event Listeners

drumKit.pads.forEach((pad) => {
  pad.addEventListener('click', drumKit.activePad);
  pad.addEventListener('animationend', function () {
    this.style.animation = '';
  });
});

drumKit.playBtn.addEventListener('click', function () {
  drumKit.updateBtn();
  drumKit.strart();
});

drumKit.selects.forEach((select) => {
  select.addEventListener('change', function (e) {
    drumKit.changeSound(e);
  });
});

drumKit.volumeControls.forEach((control) => {
  control.addEventListener('input', function (e) {
    drumKit.volumeControl(e);
  });
});

drumKit.muteCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', function (e) {
    drumKit.toggleMute(e);
  });
});
drumKit.tempoSlider.addEventListener('input', function (e) {
  drumKit.changeTempo(e);
});
drumKit.tempoSlider.addEventListener('chane', function (e) {
  drumKit.updateTempo(e);
});
