import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { numberOfBoardSquares } from '../constants'

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
          onClick = () => this.props.handleInitialSquareSelect(x, y)
        } else if (type === 'legalMove') {
          onClick = () => this.props.handleLegalMoveClick(x, y)
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
  boardSize: PropTypes.number,
  boardState: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  handleLegalMoveClick: PropTypes.func.isRequired,
  handleInitialSquareSelect: PropTypes.func.isRequired,
}

const mapStateToProps = ({ app, board, game }) => ({
  boardState: board.state,
  selectingInitialSquare: game.selectingInitialSquare,
})

export default connect(mapStateToProps)(Board)
