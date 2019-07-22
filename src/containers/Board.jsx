import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { numberOfBoardSquares } from '../constants'

class Board extends Component {
  getSquareColor(x, y) {
    const { boardState } = this.props
    let color = 'white'
    switch (boardState[x][y]) {
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
    return color
  }

  renderBoard() {
    const {
      boardState,
      boardSize,
      selectingInitialSquare,
      handleInitialSquareSelect,
      handleLegalMoveClick,
    } = this.props
    const boardSquares = []
    const squareSize = boardSize ? boardSize / numberOfBoardSquares : 0
    let onClick
    for (let x = 0; x < numberOfBoardSquares; x += 1) {
      for (let y = 0; y < numberOfBoardSquares; y += 1) {
        const isClickable = (boardState[x][y] === 'legalMove') || (selectingInitialSquare)
        const color = this.getSquareColor(x, y)
        if (selectingInitialSquare) {
          onClick = () => handleInitialSquareSelect(x, y)
        } else if (boardState[x][y] === 'legalMove') {
          onClick = () => handleLegalMoveClick(x, y)
        } else {
          onClick = null
        }
        boardSquares.push(
          <div
            key={`${x},${y}`}
            className="board-square"
            onClick={onClick}
            role="presentation"
            style={{
              left: `${squareSize * x}px`,
              top: `${squareSize * y}px`,
              width: `${squareSize}px`,
              height: `${squareSize}px`,
              backgroundColor: color,
              cursor: isClickable ? 'pointer' : 'default',
            }}
          />,
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
  boardSize: PropTypes.number,
  boardState: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  handleLegalMoveClick: PropTypes.func.isRequired,
  handleInitialSquareSelect: PropTypes.func.isRequired,
  selectingInitialSquare: PropTypes.bool.isRequired,
}

const mapStateToProps = ({ board, game }) => ({
  boardState: board.state,
  selectingInitialSquare: game.selectingInitialSquare,
})

export default connect(mapStateToProps)(Board)
