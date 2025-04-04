import Header from './Components/Header';
import  GameBoard  from './Components/Game-board';
import ColorButton from './Components/ColorButton';
import './app.css';
import { useSimonSays } from './CustomHooks/UseSimonSays';
import ControlButtons from './Components/ControlButtons';
import ThemeOption from './Components/ThemeOption';
import Score from './Components/Score';
import {buttons} from './utils/gameLogic';


export function App() {
  const {playerTurn, activeButton, gameOver, round, resetGame, handleClick} = useSimonSays();
  return (
    <>
      <Header gameOver={gameOver} turn = {playerTurn}></Header>
      <div className='theme-options'> 
        <ThemeOption theme='light' />
        <ThemeOption theme='dark' />
        <ThemeOption theme='pink' />
        <ThemeOption theme='purple' />
      </div>
      <GameBoard>
        {buttons.map((button) => (
          <ColorButton onClick={() => handleClick(button.id)} active={activeButton == button.id} key={button.id} color={button.color}/>
        ))}
      </GameBoard>
      <Score score={round}/>
      <ControlButtons resetGame={resetGame} gameOver={gameOver}></ControlButtons>
    </>
  )
}
