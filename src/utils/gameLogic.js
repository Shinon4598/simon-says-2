import redSound from '../assets/sounds/red.mp3';
import greenSound from '../assets/sounds/green.mp3';
import blueSound from '../assets/sounds/blue.mp3';
import yellowSound from '../assets/sounds/yellow.mp3';
import wrongSound from '../assets/sounds/wrong.mp3';
import winSound from '../assets/sounds/win.mp3';


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
  1: redSound,
  2: greenSound,
  3: blueSound,
  4: yellowSound,
  5: wrongSound,
  6: winSound
};


let audio = null;
export function playSound(id) {
    if (!sounds[id]) {
        console.error(`No sound found for ID: ${id}`);
        return;
    }

    if (audio) {
        audio.pause();
        audio.currentTime = 0;
    }
    audio = new Audio(sounds[id]);
    audio.playbackRate = 1.5;
    audio.play().catch((error) => {
        console.error("Error playing sound:", error);
    });
}
