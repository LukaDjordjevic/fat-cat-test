import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import constants, { boardSize } from '../constants'

class Board extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectingInitialSquare: false,
      squareSize: window.innerHeight / constants.boardSize,
    }
    this.config = {
      numberOfLevels: 99,
    }
  }

  componentDidMount() {
    this.props.dispatch({ type: constants.SET_PIECE_STATE, payload: { x: 0, y: 0, state: 'finished' }})
    this.props.dispatch({ type: constants.SET_PIECE_STATE, payload: { x: 2, y: 2, state: 'legalMove' }})
    console.log(boardSize, this.props.boardState)
    console.log('size', window.innerHeight, constants.boardSize)
    
    this.setState({ squareSize: window.innerHeight / boardSize })
  }

  getSquareProps(x, y) {
    console.log('get square props')
    const { boardState } = this.props
    let color = 'white'
    // let clickable = false
    let clickActionHandler = null
    console.log('123', boardSize, this.props.boardState, x, y)

    switch(boardState[x][y]) {
      case 'finished':
        color = 'green'
        break
      case 'legalMove':
        color = 'orange'
        clickActionHandler = this.handleLegalMoveClick
        // clickable = true
        break
      default:
    }
    return { color, clickActionHandler, type: boardState[x][y]}
  }

  handleLegalMoveClick(x, y) {
    console.log('legal move field clicked', x, y)
  }

  handleInitialSquareSelect(x, y) {
    console.log('initial square select clicked', x, y)
  }

  renderBoard() {
    
    const { boardState } = this.props
    const boardSquares = []
    let onClick = null
    for (let x = 0; x < boardSize; x++) {
      for (let y = 0; y < boardSize; y++) {
        console.log (x, y)
        
        const { color, clickActionHandler, type } = this.getSquareProps(x, y)
        console.log('render board', this.getSquareProps(x, y));
        if (this.state.selectingInitialSquare) {
          onClick = () => this.handleInitialSquareSelect(x, y)
        } else if (type === 'legalMove') {
          onClick = () => this.handleLegalMoveClick(x, y)
        }
        boardSquares.push(
          <div
            className="board-square"
            onClick={onClick}
            style={{
              left: `${this.state.squareSize * x}px`,
              top: `${this.state.squareSize * y}px`,
              width: `${this.state.squareSize}px`,
              height: `${this.state.squareSize}px`,
              backgroundColor: color,
              cursor: boardState[x][y] === 'legalMove' ? 'pointer' : 'default' }}
          />
        )
      }
    }
    console.log ('board squares', boardSquares)
    return boardSquares
  }

  render() {
    return (
      <div className="board">
        <p>Board123</p>
        {this.renderBoard()}
      </div>
    )
  }
}

Board.defaultProps = {
}

Board.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = ({ app, board }) => ({
  boardState: board.state
})

export default connect(mapStateToProps)(Board)
