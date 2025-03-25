import Header from './Components/Header';
import  GameBoard  from './Components/Game-board';
import ColorButton from './Components/ColorButton';
import './app.css';
import { useSimonSays } from './CustomHooks/UseSimonSays';
import ControlButtons from './Components/ControlButtons';
import ThemeOption from './Components/ThemeOption';

const buttons = [
  {id:1, color:"red"}, 
  {id:2, color:"green"}, 
  {id:3, color:"blue"}, 
  {id:4, color:"yellow"}
];

export function App() {
  const {playerTurn, activeButton, gameOver, resetGame, handleClick} = useSimonSays();
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
      <ControlButtons resetGame={resetGame} gameOver={gameOver}></ControlButtons>
    </>
  )
}
