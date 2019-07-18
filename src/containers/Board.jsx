import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import constants, { numberOfBoardSquares } from '../constants'
import { createLevel, getLegalMoves } from '../util'

class Board extends Component {
  constructor(props) {
    super(props)

    this.state = {
    }
    this.config = {
      numberOfLevels: 99,
    }

    // this.loadLevel = this.loadLevel.bind(this)
  }

  componentDidMount() {
    // this.props.dispatch({ type: constants.SET_PIECE_STATE, payload: { x: 0, y: 0, state: 'finished' }})
    // this.props.dispatch({ type: constants.SET_PIECE_STATE, payload: { x: 3, y: 3, state: 'legalMove' }})
  }

  getSquareProps(x, y) {
    const { boardState } = this.props
    let color = 'white'
    switch(boardState[x][y]) {
      case 'finished':
        color = '#0F0'
        break
      case 'legalMove':
        color = 'orange'
        break
      case 'unfinished':
        color = 'darkgreen'
        break
      default:
    }
    return { color, type: boardState[x][y]}
  }

  handleLegalMoveClick(x, y) {
    const boardState = JSON.parse(JSON.stringify(this.props.boardState))
    this.props.dispatch({ type: constants.SET_PIECE_STATE, payload: { x, y, state: 'finished' }})
    const legalMoves = getLegalMoves(x, y, numberOfBoardSquares)
    console.log('legal moves', legalMoves)

    legalMoves.forEach(field => {
      if (boardState[field[0]][field[1]] === 'unfinished') {
        this.props.dispatch({ type: constants.SET_PIECE_STATE, payload: { x: field[0], y: field[1], state: 'legalMove' }})
      }
    })
    if (this.props.leftToClick === 1) { // Game end
      console.log('Wiiiii!!!!')
    }
    this.props.dispatch({ type: constants.SET_LEFT_TO_CLICK, payload: this.props.leftToClick - 1 })
    this.props.dispatch({ type: constants.SET_TIME, payload: 0 })

  }

  handleInitialSquareSelect(x, y) {
    const level = createLevel(x, y, this.props.currentLevel, numberOfBoardSquares)
    this.props.dispatch({ type: constants.LOAD_LEVEL, payload: level })
    this.props.dispatch({ type: constants.SET_LEFT_TO_CLICK, payload: this.props.currentLevel })
    this.props.dispatch({ type: constants.SET_SELECTING_INITIAL_SQUARE, payload: false })
    // this.timer = setInterval(() => {
    //   this.props.dispatch({ type: constants.SET_TIME, payload: this.props.moveTime + 1})
    // }, 1000)
  }

  renderBoard() {
    const { boardState, boardSize } = this.props
    const boardSquares = []
    const squareSize = boardSize ? boardSize / numberOfBoardSquares : 0
    let onClick
    for (let x = 0; x < numberOfBoardSquares; x++) {
      for (let y = 0; y < numberOfBoardSquares; y++) {
        const { color, type } = this.getSquareProps(x, y)
        if (this.props.selectingInitialSquare) {
          onClick = () => this.handleInitialSquareSelect(x, y)
        } else if (type === 'legalMove') {
          console.log('found legal move')
          onClick = () => this.handleLegalMoveClick(x, y)
        } else {
          onClick = null
        }
        boardSquares.push(
          <div
            key={`${x},${y}`}
            className="board-square"
            onClick={onClick}
            style={{
              left: `${squareSize * x}px`,
              top: `${squareSize * y}px`,
              width: `${squareSize}px`,
              height: `${squareSize}px`,
              backgroundColor: color,
              cursor: boardState[x][y] === 'legalMove' ? 'pointer' : 'default' }}
          />
        )
      }
    }
    return boardSquares
  }

  render() {
    return (
      <React.Fragment>
        {this.renderBoard()}
      </React.Fragment>
    )
  }
}

Board.defaultProps = {
  boardSize: 0,
}

Board.propTypes = {
  dispatch: PropTypes.func.isRequired,
  boardSize: PropTypes.number,
  currentLevel: PropTypes.number,
  leftToClick: PropTypes.number,
  moveTime: PropTypes.number,
  selectingInitialSquare: PropTypes.bool.isRequired,
}

const mapStateToProps = ({ app, board, game }) => ({
  boardState: board.state,
  currentLevel: game.currentLevel,
  leftToClick: game.leftToClick,
  moveTime: game.moveTime,
  selectingInitialSquare: game.selectingInitialSquare
})

export default connect(mapStateToProps)(Board)
