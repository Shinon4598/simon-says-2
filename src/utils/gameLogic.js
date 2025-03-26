import light_red from '../assets/theme-light/red.mp3';
import light_green from '../assets/theme-light/green.mp3';
import light_blue from '../assets/theme-light/blue.mp3';
import light_yellow from '../assets/theme-light/yellow.mp3';
import wrong from '../assets/wrong.mp3';
import win from '../assets/win.mp3';
import pink_red from '../assets/theme-pink/red.mp3';
import pink_green from '../assets/theme-pink/green.mp3';
import pink_blue from '../assets/theme-pink/blue.mp3';
import pink_yellow from '../assets/theme-pink/yellow.mp3';
import dark_red from '../assets/theme-dark/red.mp3';
import dark_green from '../assets/theme-dark/green.mp3';
import dark_blue from '../assets/theme-dark/blue.mp3';
import dark_yellow from '../assets/theme-dark/yellow.mp3';
import purple_red from '../assets/theme-purple/red.mp3';
import purple_green from '../assets/theme-purple/green.mp3';
import purple_blue from '../assets/theme-purple/blue.mp3';
import purple_yellow from '../assets/theme-purple/yellow.mp3';


export const buttons = [
  {id:1, color:"red"}, 
  {id:2, color:"green"}, 
  {id:3, color:"blue"}, 
  {id:4, color:"yellow"}
];

export function isSequenceCorrect (playerSequence, gameSequence) {
    return playerSequence.every((id, index) => gameSequence[index] === id)
};

export function generateNextSequence() {
    const randomIndex = Math.floor(Math.random() * buttons.length);
    const button = buttons[randomIndex];
    return button.id;
}

const sounds = {
  "light":{
    1: light_red,
    2: light_green,
    3: light_blue,
    4: light_yellow,
    5: wrong,
    6: win
  },
  "pink": {
    1: pink_red,
    2: pink_green,
    3: pink_blue,
    4: pink_yellow,
    5: wrong,
    6: win
  },
  "dark": {
    1: dark_red,
    2: dark_green,
    3: dark_blue,
    4: dark_yellow,
    5: wrong,
    6: win
  },
  "purple": {
    1: purple_red,
    2: purple_green,
    3: purple_blue,
    4: purple_yellow,
    5: wrong,
    6: win
  }
};


let audio = null;
export function playSound(id) {
    let theme = localStorage.getItem('theme');
    if (!theme) {
        theme = 'light';
    }
    if (!sounds[theme] || !sounds[theme][id]) {
        console.error(`No sound found for ID: ${id}`);
        return;
    }

    if (audio) {
        audio.pause();
        audio.currentTime = 0;
    }
    audio = new Audio(sounds[theme][id]);
    audio.playbackRate = 1.5;
    audio.play().catch((error) => {
        console.error("Error playing sound:", error);
    });
}
