import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import constants, { numberOfBoardSquares } from '../constants'
import Board from './Board'
import UserForm from '../components/UserForm'
import GameStats from '../components/GameStats'

class Layout extends Component {
  constructor(props) {
    super(props)

    this.state = {
      boardSize: 0,
      showUserForm: true,
    }

    this.onWindowResize = this.onWindowResize.bind(this)
    this.closeUserForm = this.closeUserForm.bind(this)

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
  }

  closeUserForm() {
    this.setState({ showUserForm: false })
  }
  
  setBoardDimensions() {
    if (this.boardDiv) {
      const boardDivRect = this.boardDiv.getBoundingClientRect()
      this.setState({ 
        boardSize: Math.min(boardDivRect.width, boardDivRect.height)
      })
    }
  }

  render() {
    return (
      <div className="layout">
        <div className="game-stats" style={{ width: `${Math.max(this.state.boardSize, 350)}px` }}>
          <GameStats />
        </div>
        <div className="board-div" ref={el => this.boardDiv = el}>
          <div className="board" style={{ width: `${this.state.boardSize}px`, height: `${this.state.boardSize}px` }}>
            <Board boardSize={this.state.boardSize}/>
          </div>
        </div>
        <div className="game-stats" style={{ width: `${Math.max(this.state.boardSize, 350)}px` }}>
          <GameStats />
        </div>
        {this.state.showUserForm ? <UserForm closeForm={this.closeUserForm}/> : null}
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
