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