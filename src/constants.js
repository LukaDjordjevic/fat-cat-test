import keykey from 'keykey'

export default keykey([
  // App
  'SET_USER',
  'SET_USERS',

  // Board
  'CLEAR_BOARD',
  'LOAD_LEVEL',
  'UPDATE_BOARD',

  // Game
  'SET_TIME',
  'SET_LEFT_TO_CLICK',
  'SET_SELECTING_INITIAL_SQUARE',
  'SET_CURRENT_MOVE',
  'SET_CURRENT_LEVEL',
  'SET_LIVES',
])

export const numberOfBoardSquares = 10 // Number of board row squares
export const minLevel = 6 // Minimal playable level
