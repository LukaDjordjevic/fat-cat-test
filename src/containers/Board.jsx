import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import constants, { numberOfBoardSquares } from '../constants'
import { createLevel } from '../util'

class Board extends Component {
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

  handleInitialSquareSelect(x, y) {
    const level = createLevel(x, y, this.props.currentLevel, numberOfBoardSquares)
    this.props.dispatch({ type: constants.LOAD_LEVEL, payload: level })
    this.props.dispatch({ type: constants.SET_LEFT_TO_CLICK, payload: this.props.currentLevel })
    this.props.dispatch({ type: constants.SET_SELECTING_INITIAL_SQUARE, payload: false })
  }

  handleLegalMoveClick(x, y) {
    this.props.dispatch({ type: constants.UPDATE_BOARD, payload: { x, y } })
    this.props.dispatch({ type: constants.SET_CURRENT_MOVE, payload: this.props.currentMove + 1 })
    this.props.dispatch({ type: constants.SET_LEFT_TO_CLICK, payload: this.props.leftToClick - 1 })
  }

  renderBoard() {
    const { boardState, boardSize } = this.props
    const boardSquares = []
    const squareSize = boardSize ? boardSize / numberOfBoardSquares : 0
    let onClick
    for (let x = 0; x < numberOfBoardSquares; x++) {
      for (let y = 0; y < numberOfBoardSquares; y++) {
        const isClickable = (boardState[x][y] === 'legalMove') || (this.props.selectingInitialSquare)
        const { color, type } = this.getSquareProps(x, y)
        if (this.props.selectingInitialSquare) {
          onClick = () => this.handleInitialSquareSelect(x, y)
        } else if (type === 'legalMove') {
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
              cursor: isClickable ? 'pointer' : 'default' }}
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
  startTimer: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
  boardSize: PropTypes.number,
  currentLevel: PropTypes.number,
  leftToClick: PropTypes.number,
  currentMove: PropTypes.number,
  moveTime: PropTypes.number,
  selectingInitialSquare: PropTypes.bool.isRequired,
}

const mapStateToProps = ({ app, board, game }) => ({
  boardState: board.state,
  currentLevel: game.currentLevel,
  leftToClick: game.leftToClick,
  moveTime: game.moveTime,
  currentMove: game.currentMove,
  selectingInitialSquare: game.selectingInitialSquare,
})

export default connect(mapStateToProps)(Board)
