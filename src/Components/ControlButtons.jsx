function ControlButtons({gameOver, resetGame}) {
  return (
    <div className="control-buttons">
      {gameOver && 
      <div className="game-over">
        <h2>Game Over</h2>
        <p>Play again?</p>
        <div className="game-over_buttons">
          <button className="restart" role="button" onClick={() => resetGame()}>Reset</button>
          <button className="exit" role="button">Cancel</button>
        </div>
      </div>
      }
    </div>
  )
    
}
export default ControlButtons;