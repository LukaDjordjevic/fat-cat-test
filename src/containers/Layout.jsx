import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import constants, { numberOfBoardSquares } from '../constants'
import Board from './Board'

class Layout extends Component {
  constructor(props) {
    super(props)

    this.state = {
      boardSize: 0,
    }

    this.onWindowResize = this.onWindowResize.bind(this)

  }

  setBoardDimensions() {
    if (this.boardDiv) {
      const boardDivRect = this.boardDiv.getBoundingClientRect()
      this.setState({ 
        boardSize: Math.min(boardDivRect.width, boardDivRect.height)
      })
    }
  }

  componentDidMount() {
    this.setBoardDimensions()
    window.addEventListener('resize', this.onWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
  }

  onWindowResize() {
    this.setBoardDimensions()
    console.log('resize', this.boardDiv.getBoundingClientRect())
  }

  render() {
    return (
      <div className="layout">
        <div className="boardDiv" ref={el => this.boardDiv = el}>
          <div className="board" style={{ width: `${this.state.boardSize}px`, height: `${this.state.boardSize}px` }}>
            <Board boardSize={this.state.boardSize}/>
          </div>
        </div>
        
        <div className="game-stats" />
      </div>
    )
  }
}

Layout.defaultProps = {
}

Layout.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = ({ app, board }) => ({
})

export default connect(mapStateToProps)(Layout)
