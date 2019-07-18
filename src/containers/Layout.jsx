import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import constants, { numberOfBoardSquares } from '../constants'
import Board from './Board'
import UserForm from '../components/UserForm'
import GameStats from '../components/GameStats'
import TopBar from '../components/TopBar'

class Layout extends Component {
  constructor(props) {
    super(props)

    this.lastUser = localStorage.getItem('lastUser')
    this.state = {
      boardSize: 0,
      showUserForm: !this.lastUser,
    }
    this.timer = null

    this.onWindowResize = this.onWindowResize.bind(this)
    this.showUserForm = this.showUserForm.bind(this)
    this.closeUserForm = this.closeUserForm.bind(this)
    this.startTimer = this.startTimer.bind(this)
  }

  componentDidMount() {
    this.setBoardDimensions()
    window.addEventListener('resize', this.onWindowResize);
    // localStorage.removeItem('lastUser')
    // localStorage.removeItem('users')
    this.props.dispatch({ type: constants.SET_USER, payload: this.lastUser})
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
  }
  
  onWindowResize() {
    this.setBoardDimensions()
  }

  showUserForm() {
    this.setState({ showUserForm: true })
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

  startTimer() {
    this.timer = setInterval(() => {
      this.props.dispatch({ type: constants.SET_TIME, payload: this.props.moveTime + 1})
    }, 1000)
  }

  render() {
    return (
      <div className="layout">
        <div className="top-bar" style={{ width: `${Math.max(this.state.boardSize, 350)}px` }}>
          <TopBar showUserForm={this.showUserForm}/>
        </div>
        <div className="board-div" ref={el => this.boardDiv = el}>
          <div className="board" style={{ width: `${this.state.boardSize}px`, height: `${this.state.boardSize}px` }}>
            <Board boardSize={this.state.boardSize} startTimer={this.startTimer}/>
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
  moveTime: PropTypes.number.isRequired,
}

const mapStateToProps = ({ app, board, game }) => ({
  moveTime: game.moveTime,
})

export default connect(mapStateToProps)(Layout)
