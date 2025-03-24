function ControlButtons({gameOver}) {
  return (
    <div className="control-buttons">
      {gameOver && <button onClick={() => window.location.reload()}>Play Again</button>}
    </div>
  )
    
}
export default ControlButtons;