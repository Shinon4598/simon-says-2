function ControlButtons({gameOver, resetGame}) {
  return (
    <div className="control-buttons">
      {gameOver && <button onClick={() => resetGame()}>Play Again</button>}
    </div>
  )
    
}
export default ControlButtons;