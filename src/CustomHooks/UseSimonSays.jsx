import {useState, useEffect, useRef, useCallback, useReducer} from 'react';
import {buttons, isSequenceCorrect, generateNextSequence} from '../utils/gameLogic';
const initialState = {
  playerSequence: [],
  gameSequence: [],
  playerTurn: false,
  activeButton: 0,
  gameOver: false
};

function gameReducer(state,action) {
  switch(action.type) {
    case 'RESET_GAME':
      return initialState;
    case 'SET_PLAYER_SEQUENCE':
      return {...state, playerSequence: action.payload};
    case 'SET_GAME_SEQUENCE':
      return {...state, gameSequence: [...state.gameSequence, action.payload]};
    case 'TOGGLE_PLAYER_TURN':
      return {...state, playerTurn: !state.playerTurn};
    case 'SET_ACTIVE_BUTTON':
      return {...state, activeButton: action.payload};
    case 'SET_GAME_OVER':
      return {...state, gameOver: true, playerTurn: false, playerSequence: [], gameSequence: []};
    default:
      return state;
  }
}
export function useSimonSays() {
    const [state, dispatch] = useReducer(gameReducer, initialState);
    const timerRef = useRef(null);

  //Funcion para limpiar los timers
  const clearTimers = useCallback(() => {
    clearTimeout(timerRef.current);
  }, []);


  //Reiniciar el juego
  const resetGame = useCallback(() => {
    dispatch({type: 'RESET_GAME'});
    clearTimers();
  }, []);

  //Manejar secuencia incorrecta
  const handleIncorrectSequence = useCallback(() => {
    dispatch({type: 'SET_GAME_OVER'});
  }, []);

  //Manejar secuencia correcta
  const handleCorrectSequence = useCallback(() => {
    clearTimers();
    //Esperar antes de desactivar el boton activo
    timerRef.current = setTimeout(() => {
      dispatch({type: 'SET_ACTIVE_BUTTON', payload: 0});
      //Agregar un nuevo color despues de un breve retraso
      timerRef.current = setTimeout(() => {
        dispatch({type: 'TOGGLE_PLAYER_TURN'});
        dispatch({type: 'SET_PLAYER_SEQUENCE', payload: []});
        addColorToSequence();        
      }, 500)},300);
  }, []);

  //Manejar click del jugador
  const handleClick = useCallback( (button) => {
    if (state.gameOver || !state.playerTurn) return;

    const newPlayerSequence = [...state.playerSequence, button];
    dispatch({type: 'SET_ACTIVE_BUTTON', payload: button});

    //Apagar el botón después de un breve tiempo en 100ms
    timerRef.current=setTimeout(() => {
      dispatch({type: 'SET_ACTIVE_BUTTON', payload: []});
    }, 150);

    // Verificar si la secuencia del jugador es correcta
    if (!isSequenceCorrect (newPlayerSequence, state.gameSequence)) {
      handleIncorrectSequence();
      return;
    }
    
    // Agregar el botón presionado a la secuencia del jugador
    dispatch({type: 'SET_PLAYER_SEQUENCE', payload: newPlayerSequence});


    // Verificar si ya se completó la secuencia del jugador
    if (newPlayerSequence.length === state.gameSequence.length) {
      handleCorrectSequence();
    }
  }, [state.playerSequence, state.playerTurn]);

  //Reproducir la secuencia del juego
  const playSequence = useCallback((sequence) => {
    if (state.gameOver) return;
      
    let index = 0;
    const showNext = ()=> {
      if (index < sequence.length) {
        dispatch({type: 'SET_ACTIVE_BUTTON', payload: 0});

        timerRef.current = setTimeout(() => {
          dispatch({type: 'SET_ACTIVE_BUTTON', payload: sequence[index]});
          index++;
          timerRef.current = setTimeout(() => { 
            dispatch({type: 'SET_ACTIVE_BUTTON', payload: 0});
            showNext();
          }, 500);
        }, 150);
      }
      else {
        clearTimers();
        //Habilitar el turno del jugador después de mostrar la secuencia
        dispatch({type: 'TOGGLE_PLAYER_TURN'});
      }
    }
    showNext();
  }, [state.gameOver, state.gameSequence]);
  
  const addColorToSequence = useCallback(() => {
    const nextColor = generateNextSequence();
    dispatch({type: 'SET_GAME_SEQUENCE', payload:  nextColor});
  }
  , []);

  useEffect(() => {
    if (state.gameSequence.length > 0) {
      playSequence(state.gameSequence);
    }
  }, [state.gameSequence]);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      addColorToSequence();
    }, 500);
    return () => {
      clearTimers();
    };
  }
  , []);
  
  return { gameOver: state.gameOver, playerTurn: state.playerTurn, activeButton: state.activeButton, resetGame, handleClick };
}