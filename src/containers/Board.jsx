import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import constants, { numberOfBoardSquares } from '../constants'

class Board extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectingInitialSquare: true,
    }
    this.config = {
      numberOfLevels: 99,
    }
  }

  componentDidMount() {
    this.props.dispatch({ type: constants.SET_PIECE_STATE, payload: { x: 0, y: 0, state: 'finished' }})
    this.props.dispatch({ type: constants.SET_PIECE_STATE, payload: { x: 2, y: 2, state: 'legalMove' }})
  }

  getSquareProps(x, y) {
    const { boardState } = this.props
    let color = 'white'

    switch(boardState[x][y]) {
      case 'finished':
        color = 'green'
        break
      case 'legalMove':
        color = 'orange'
        break
      default:
    }
    return { color, type: boardState[x][y]}
  }

  handleLegalMoveClick(x, y) {
    console.log('legal move field clicked', x, y)
  }

  handleInitialSquareSelect(x, y) {
    console.log('initial square select clicked', x, y)
  }

  renderBoard() {
    const { boardState, boardSize } = this.props
    const boardSquares = []
    const squareSize = boardSize ? boardSize / numberOfBoardSquares : 0
    let onClick = null
    for (let x = 0; x < numberOfBoardSquares; x++) {
      for (let y = 0; y < numberOfBoardSquares; y++) {
        const { color, type } = this.getSquareProps(x, y)
        if (this.state.selectingInitialSquare) {
          onClick = () => this.handleInitialSquareSelect(x, y)
        } else if (type === 'legalMove') {
          onClick = () => this.handleLegalMoveClick(x, y)
        }
        boardSquares.push(
          <div
            key={`${x}${y}`}
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
}

const mapStateToProps = ({ app, board }) => ({
  boardState: board.state
})

export default connect(mapStateToProps)(Board)
