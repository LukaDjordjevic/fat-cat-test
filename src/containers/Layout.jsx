import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import actions, { numberOfBoardSquares } from '../constants'
import Board from './Board'
import UserForm from '../components/UserForm'
import DialogueBox from '../components/DialogueBox'
import WelcomeDialogue from '../components/WelcomeDialogue'
import GameStats from '../components/GameStats'
import TopBar from '../components/TopBar'
import { createLevel } from '../util'

class Layout extends Component {
  constructor(props) {
    super(props)
    // *** Clears cache. Useful for debugging purposes
    // localStorage.removeItem('lastUser')
    // localStorage.removeItem('users')

    this.readUsersFromStorage()

    this.state = {
      boardSize: 0,
      showUserForm: !this.lastUser,
      showWelcomeDialogue: this.lastUser,
    }

    this.timer = null
    this.onWindowResize = this.onWindowResize.bind(this)
    this.showUserForm = this.showUserForm.bind(this)
    this.closeWelcomeDialogue = this.closeWelcomeDialogue.bind(this)
    this.closeUserForm = this.closeUserForm.bind(this)
    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    this.startNewLevel = this.startNewLevel.bind(this)
    this.handleGameLost = this.handleGameLost.bind(this)
    this.handleInitialSquareSelect = this.handleInitialSquareSelect.bind(this)
    this.handleLegalMoveClick = this.handleLegalMoveClick.bind(this)
    this.onSelectUser = this.onSelectUser.bind(this)
    this.onCreateUser = this.onCreateUser.bind(this)
  }

  componentDidMount() {
    this.setBoardDimensions()
    window.addEventListener('resize', this.onWindowResize);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.selectingInitialSquare && !nextProps.numberOfLegalMoves) { // Game ended
      this.stopTimer()
    }
    if(this.props.currentMove !== nextProps.currentMove && nextProps.numberOfLegalMoves) { // New move
      this.props.dispatch({ type: actions.SET_TIME, payload: 0 })
    }
    if(this.props.currentUser.name !== nextProps.currentUser.name) { // User has chaged
      this.props.dispatch({ type: actions.CLEAR_BOARD })
      this.props.dispatch({ type: actions.SET_SELECTING_INITIAL_SQUARE, payload: true })
      this.props.dispatch({ type: actions.SET_TIME, payload: 0 })
      this.props.dispatch({ type: actions.SET_LIVES, payload: nextProps.currentUser.lives })
      this.stopTimer()
      this.setState({ showUserForm: false, showWelcomeDialogue: true })
    }
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

  closeWelcomeDialogue(value) {
    this.setState({ showWelcomeDialogue: false })
    this.props.dispatch({ type: actions.SET_CURRENT_LEVEL, payload: parseInt(value) })
  }

  onCreateUser(userName) {
    const newUsers = JSON.parse(JSON.stringify(this.props.users))
    const newUser = {
      name: userName,
      maxCompletedLevel: 0,
      lives: 1,
      levelStats: [],
    }
    newUsers.push(newUser)
    localStorage.setItem('users', JSON.stringify(newUsers))
    localStorage.setItem('lastUser', userName)
    this.props.dispatch({ type: actions.SET_USER, payload: newUser })
    this.props.dispatch({ type: actions.SET_USERS, payload: newUsers })
  }

  onSelectUser(userName) {
    const user = this.props.users.find(user => user.name === userName)
    this.props.dispatch({ type: actions.SET_USER, payload: user})
    localStorage.setItem('lastUser', userName)
  }

  handleInitialSquareSelect(x, y) {
    const level = createLevel(x, y, this.props.currentLevel, numberOfBoardSquares)
    this.props.dispatch({ type: actions.LOAD_LEVEL, payload: level })
    this.props.dispatch({ type: actions.SET_LEFT_TO_CLICK, payload: this.props.currentLevel })
    this.props.dispatch({ type: actions.SET_SELECTING_INITIAL_SQUARE, payload: false })
    this.startTimer()
  }

  handleLegalMoveClick(x, y) {
    this.props.dispatch({ type: actions.UPDATE_BOARD, payload: { x, y } })
    this.props.dispatch({ type: actions.SET_CURRENT_MOVE, payload: this.props.currentMove + 1 })
    this.props.dispatch({ type: actions.SET_LEFT_TO_CLICK, payload: this.props.leftToClick - 1 })
  }

  startNewLevel() {
    if (this.timer) clearInterval(this.timer)
    this.props.dispatch({ type: actions.SET_TIME, payload: 0 })
    this.props.dispatch({ type: actions.SET_LIVES, payload: this.props.lives + 1 })
    this.props.dispatch({ type: actions.SET_CURRENT_LEVEL, payload: this.props.currentLevel + 1 })
    this.props.dispatch({ type: actions.SET_LEFT_TO_CLICK, payload: this.props.currentLevel + 1 })
    this.props.dispatch({ type: actions.SET_CURRENT_MOVE, payload: 1 })
    this.props.dispatch({ type: actions.SET_SELECTING_INITIAL_SQUARE, payload: true })
    this.props.dispatch({ type: actions.CLEAR_BOARD })
    this.updateUser(this.props.currentUser.name, this.props.currentLevel, this.props.lives + 1)
  }

  handleGameLost() {
    const newLives = this.props.lives - this.props.leftToClick
    this.props.dispatch({ type: actions.SET_TIME, payload: 0 })
    this.props.dispatch({ type: actions.SET_CURRENT_MOVE, payload: 1 })
    this.props.dispatch({ type: actions.SET_SELECTING_INITIAL_SQUARE, payload: true })
    this.props.dispatch({ type: actions.CLEAR_BOARD })
    if (newLives > 0) {
      this.props.dispatch({ type: actions.SET_LIVES, payload: newLives })
      this.props.dispatch({ type: actions.SET_LEFT_TO_CLICK, payload: this.props.currentLevel + 1 })
      this.updateUser(this.props.currentUser.name, 0, newLives)
    } else {
      this.props.dispatch({ type: actions.SET_LIVES, payload: 1 })
      this.props.dispatch({ type: actions.SET_CURRENT_LEVEL, payload: 1 })
      this.props.dispatch({ type: actions.SET_LEFT_TO_CLICK, payload: 1 })
      this.updateUser(this.props.currentUser.name, 0, 1)
    }
  }

  readUsersFromStorage() {
    let users = localStorage.getItem('users')
    const lastUser = localStorage.getItem('lastUser')
    if (users) {
      users = JSON.parse(users)
      const user = users.find(user => user.name === lastUser)
      if (user) {
        this.props.dispatch({ type: actions.SET_USER, payload: user })
        this.props.dispatch({ type: actions.SET_LIVES, payload: user.lives })
      }
      this.props.dispatch({ type: actions.SET_USERS, payload: users })
    }
  }

  // Update user's maxCompletedLevel & lives in localStorage & store
  updateUser(userName, levelCompleted, lives) {
    let users = localStorage.getItem('users')
    if (users) {
      users = JSON.parse(users)
      const userIdx = users.findIndex(user => user.name === userName)
      const user = { ...users[userIdx] }
      if (user.maxCompletedLevel < levelCompleted) user.maxCompletedLevel = levelCompleted
      users[userIdx] = user
      user.lives = lives
      localStorage.setItem('users', JSON.stringify(users))
      this.props.dispatch({ type: actions.SET_USER, payload: user})
      this.props.dispatch({ type: actions.SET_USERS, payload: users})
    }
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
    this.props.dispatch({ type: actions.SET_TIME, payload: 0 })
    this.timer = setInterval(() => {
      this.props.dispatch({ type: actions.SET_TIME, payload: this.props.moveTime + 1})
    }, 1000)
  }

  stopTimer() {
    if (this.timer) clearInterval(this.timer)
  }

  render() {
    return (
      <div className="layout">
        <div className="top-bar" style={{ width: `${Math.max(this.state.boardSize, 350)}px` }}>
          <TopBar showUserForm={this.showUserForm}/>
        </div>
        <div className="board-div" ref={el => this.boardDiv = el}>
          <div className="board" style={{ width: `${this.state.boardSize}px`, height: `${this.state.boardSize}px` }}>
            <Board
              boardSize={this.state.boardSize}
              handleInitialSquareSelect={this.handleInitialSquareSelect}
              handleLegalMoveClick={this.handleLegalMoveClick}
             />
          </div>
        </div>
        <div className="game-stats" style={{ width: `${Math.max(this.state.boardSize, 350)}px` }}>
          <GameStats />
        </div>
        {this.state.showUserForm ?
          <UserForm
            closeForm={this.closeUserForm}
            users={this.props.users}
            onSelectUser={this.onSelectUser}
            onCreateUser={this.onCreateUser}
          /> : null}
        {this.state.showWelcomeDialogue ?
          <WelcomeDialogue
            closeForm={this.closeWelcomeDialogue}
            user={this.props.currentUser}
          /> : null}
        {!this.props.selectingInitialSquare && !this.props.numberOfLegalMoves && !this.props.leftToClick ? 
          <DialogueBox 
            onClick={this.startNewLevel}
            headline={`You have completed level ${this.props.currentLevel}.`}
            additionalText="You gain one life."
            buttonText="Ok"
          /> : null}
        {!this.props.selectingInitialSquare && !this.props.numberOfLegalMoves && this.props.leftToClick ? 
          <DialogueBox 
            onClick={this.handleGameLost}
            headline="You have lost the game."
            additionalText={`You lose ${this.props.leftToClick} ${this.props.leftToClick === 1 ? 'life.' : 'lives.'}`}
            buttonText="Ok"
          /> : null}
      </div>
    )
  }
}

Layout.defaultProps = {
  leftToClick: null,
}

Layout.propTypes = {
  dispatch: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.object),
  currentUser: PropTypes.object,
  currentLevel: PropTypes.number,
  lives: PropTypes.number,
  leftToClick: PropTypes.number,
  currentMove: PropTypes.number,
  moveTime: PropTypes.number.isRequired,
  numberOfLegalMoves: PropTypes.number.isRequired,
  selectingInitialSquare: PropTypes.bool.isRequired,
}

const mapStateToProps = ({ app, board, game }) => ({
  users: app.users,
  currentUser: app.currentUser,
  moveTime: game.moveTime,
  currentLevel: game.currentLevel,
  currentMove: game.currentMove,
  leftToClick: game.leftToClick,
  lives: game.lives,
  numberOfLegalMoves: board.numberOfLegalMoves,
  selectingInitialSquare: game.selectingInitialSquare,
})

export default connect(mapStateToProps)(Layout)
