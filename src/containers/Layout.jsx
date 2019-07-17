import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import constants, { numberOfBoardSquares } from '../constants'
import Board from './Board'

class Layout extends Component {
  constructor(props) {
    super(props)

    this.state = {
      boardDivRect: null,
      boardSize: 0,
    }

    this.onWindowResize = this.onWindowResize.bind(this)

  }

  setBoardDimensions() {
    console.log('set board dimensions')
    
    if (this.boardDiv) {
      console.log('ima boardDv')
      const boardDivRect = this.boardDiv.getBoundingClientRect()
      console.log('boarddivrect', boardDivRect)
      this.setState({ 
        boardDivRect,
        boardSize: Math.min(boardDivRect.width, boardDivRect.height)
      })
    }
  }

  componentDidMount() {
    this.setBoardDimensions()
    console.log('did mount', this.boardDiv.getBoundingClientRect())
    window.addEventListener('resize', this.onWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
  }

  onWindowResize() {
    this.setBoardDimensions()
    // if (this.boardDiv) this.setState({ boardDivRect: this.boardDiv.getBoundingClientRect() })
    console.log('resize', this.boardDiv.getBoundingClientRect())
  }

  render() {
    // if (this.boardDiv) this.boardDivRect = this.boardDiv.getBoundingClientRect()
    console.log('render', this.state.boardDivRect)

    // if(!this.parectDivRet) return null
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
