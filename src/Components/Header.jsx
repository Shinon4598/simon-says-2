const Header = ({turn, gameOver})=>{
    return(
      <header>
        <h1>Simon Says</h1>
        {gameOver && <h2>Game Over</h2>}
        {!gameOver && <h2>{turn ? "Your Turn" : "Simon's Turn"}</h2>}
      </header>
    );
  }
  export default Header;