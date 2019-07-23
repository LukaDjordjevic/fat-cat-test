import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { numberOfBoardSquares } from '../constants'
import Board from './Board'
import UserForm from '../components/UserForm'
import DialogueBox from '../components/DialogueBox'
import WelcomeDialogue from '../components/WelcomeDialogue'
import GameStats from '../components/GameStats'
import TopBar from '../components/TopBar'
import { createLevel } from '../util'
import * as appActions from '../store/app/actions'
import * as boardActions from '../store/board/actions'
import * as gameActions from '../store/game/actions'

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
    window.addEventListener('resize', this.onWindowResize)
  }

  componentWillReceiveProps(nextProps) {
    const {
      setTime,
      clearBoard,
      setSelectingInitialSquare,
      setLives,
      currentMove,
      currentUser,
    } = this.props
    if (!nextProps.selectingInitialSquare && !nextProps.numberOfLegalMoves) { // Game ended
      this.stopTimer()
    }
    if (currentMove !== nextProps.currentMove && nextProps.numberOfLegalMoves) { // New move
      setTime(0)
    }
    if (currentUser.name !== nextProps.currentUser.name) { // User has chaged
      clearBoard()
      setSelectingInitialSquare(true)
      setTime(0)
      setLives(nextProps.currentUser.lives)
      this.stopTimer()
      this.setState({ showUserForm: false, showWelcomeDialogue: true })
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize)
  }

  onWindowResize() {
    this.setBoardDimensions()
  }

  // Save user to local storage & store.
  onCreateUser(userName) {
    const { users, setUser, setUsers } = this.props
    const newUsers = JSON.parse(JSON.stringify(users))
    const newUser = {
      name: userName,
      maxCompletedLevel: 0,
      lives: 1,
      levelStats: [],
    }
    newUsers.push(newUser)
    localStorage.setItem('users', JSON.stringify(newUsers))
    localStorage.setItem('lastUser', userName)
    setUser(newUser)
    setUsers(newUsers)
  }

  // User has selected player from dropdow.
  onSelectUser(userName) {
    const { users, setUser } = this.props
    const user = users.find(u => u.name === userName)
    setUser(user) // write to store
    localStorage.setItem('lastUser', userName) // and to local storage.
  }

  // Calculates board size based on parent div. Called on mount & window resize.
  setBoardDimensions() {
    if (this.boardDiv) {
      const boardDivRect = this.boardDiv.getBoundingClientRect()
      this.setState({
        boardSize: Math.min(boardDivRect.width, boardDivRect.height),
      })
    }
  }

  closeWelcomeDialogue(value) {
    const { setCurrentLevel } = this.props
    this.setState({ showWelcomeDialogue: false })
    setCurrentLevel(parseInt(value, 10))
  }

  // User has selected initial square and the level starts.
  handleInitialSquareSelect(x, y) {
    const {
      loadLevel,
      setLeftToClick,
      setSelectingInitialSquare,
      currentLevel,
    } = this.props
    const level = createLevel(x, y, currentLevel, numberOfBoardSquares)
    loadLevel(level)
    setLeftToClick(currentLevel)
    setSelectingInitialSquare(false)
    this.startTimer()
  }

  handleLegalMoveClick(x, y) {
    const {
      updateBoard,
      setCurrentMove,
      setLeftToClick,
      currentMove,
      leftToClick,
    } = this.props
    updateBoard(x, y)
    setCurrentMove(currentMove + 1)
    setLeftToClick(leftToClick - 1)
  }

  // User has clicked on 'Ok' after successfully completing a level.
  startNewLevel() {
    const {
      setTime,
      setLives,
      setCurrentLevel,
      setLeftToClick,
      setCurrentMove,
      setSelectingInitialSquare,
      clearBoard,
      currentLevel,
      currentUser,
      lives,
    } = this.props
    if (this.timer) clearInterval(this.timer)
    setTime(0)
    setLives(lives + 1)
    setCurrentLevel(currentLevel + 1)
    setLeftToClick(currentLevel + 1)
    setCurrentMove(1)
    setSelectingInitialSquare(true)
    clearBoard()
    this.updateUser(currentUser.name, currentLevel, lives + 1)
  }

  // User has clicked on 'Ok' after losing a level.
  handleGameLost() {
    const {
      setTime,
      setLives,
      setCurrentLevel,
      setLeftToClick,
      setCurrentMove,
      setSelectingInitialSquare,
      clearBoard,
      lives,
      leftToClick,
      currentLevel,
      currentUser,
    } = this.props
    const newLives = lives - leftToClick
    setTime(0)
    setCurrentMove(1)
    setSelectingInitialSquare(true)
    clearBoard()
    if (newLives > 0) {
      setLives(newLives)
      setLeftToClick(currentLevel + 1)
      this.updateUser(currentUser.name, 0, newLives)
    } else {
      setLives(1)
      setCurrentLevel(1)
      setLeftToClick(1)
      this.updateUser(currentUser.name, 0, 1)
    }
  }

  // Read users from storage and write them in store.
  readUsersFromStorage() {
    const { setUser, setUsers, setLives } = this.props
    let users = localStorage.getItem('users')
    const lastUser = localStorage.getItem('lastUser')
    if (users) {
      users = JSON.parse(users)
      const user = users.find(u => u.name === lastUser)
      if (user) {
        setUser(user)
        setLives(user.lives)
      }
      setUsers(users)
    }
  }

  // Update user's maxCompletedLevel & lives in localStorage & store
  updateUser(userName, levelCompleted, lives) {
    const { setUser, setUsers } = this.props
    let users = localStorage.getItem('users')
    if (users) {
      users = JSON.parse(users)
      const userIdx = users.findIndex(user => user.name === userName)
      const user = { ...users[userIdx] }
      if (user.maxCompletedLevel < levelCompleted) user.maxCompletedLevel = levelCompleted
      users[userIdx] = user
      user.lives = lives
      localStorage.setItem('users', JSON.stringify(users))
      setUser(user)
      setUsers(users)
    }
  }

  closeUserForm() {
    this.setState({ showUserForm: false })
  }

  showUserForm() {
    this.setState({ showUserForm: true })
  }

  startTimer() {
    const { setTime, moveTime } = this.props
    setTime(0)
    this.timer = setInterval(() => {
      setTime(moveTime + 1)
    }, 1000)
  }

  stopTimer() {
    if (this.timer) clearInterval(this.timer)
  }

  render() {
    const {
      boardSize,
      showUserForm,
      showWelcomeDialogue,
    } = this.state
    const {
      users,
      numberOfLegalMoves,
      currentLevel,
      currentUser,
      leftToClick,
      selectingInitialSquare,
    } = this.props
    return (
      <div className="layout">
        <div className="top-bar" style={{ width: `${Math.max(boardSize, 350)}px` }}>
          <TopBar showUserForm={this.showUserForm} />
        </div>
        <div className="board-div" ref={(el) => { this.boardDiv = el }}>
          <div className="board" style={{ width: `${boardSize}px`, height: `${boardSize}px` }}>
            <Board
              boardSize={boardSize}
              handleInitialSquareSelect={this.handleInitialSquareSelect}
              handleLegalMoveClick={this.handleLegalMoveClick}
            />
          </div>
        </div>
        <div className="game-stats" style={{ width: `${Math.max(boardSize, 350)}px` }}>
          <GameStats />
        </div>
        {showUserForm
          ? (
            <UserForm
              closeForm={this.closeUserForm}
              users={users}
              onSelectUser={this.onSelectUser}
              onCreateUser={this.onCreateUser}
            />
          ) : null}
        {showWelcomeDialogue
          ? (
            <WelcomeDialogue
              closeForm={this.closeWelcomeDialogue}
              user={currentUser}
            />
          ) : null}
        {!selectingInitialSquare && !numberOfLegalMoves && !leftToClick
          ? (
            <DialogueBox
              onClick={this.startNewLevel}
              headline={`You have completed level ${currentLevel}.`}
              additionalText="You gain one life."
              buttonText="Ok"
            />
          ) : null}
        {!selectingInitialSquare && !numberOfLegalMoves && leftToClick
          ? (
            <DialogueBox
              onClick={this.handleGameLost}
              headline="You have lost the game."
              additionalText={`You lose ${leftToClick} ${leftToClick === 1 ? 'life.' : 'lives.'}`}
              buttonText="Ok"
            />
          ) : null}
      </div>
    )
  }
}

Layout.defaultProps = {
  users: [],
  currentUser: {
    name: '',
    lives: 1,
  },
  leftToClick: null,
  currentLevel: 1,
  lives: 1,
  currentMove: 1,
}

Layout.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
  currentUser: PropTypes.shape({
    name: PropTypes.string,
    lives: PropTypes.number,
  }),
  currentLevel: PropTypes.number,
  lives: PropTypes.number,
  leftToClick: PropTypes.number,
  currentMove: PropTypes.number,
  moveTime: PropTypes.number.isRequired,
  numberOfLegalMoves: PropTypes.number.isRequired,
  selectingInitialSquare: PropTypes.bool.isRequired,
  setTime: PropTypes.func.isRequired,
  setLives: PropTypes.func.isRequired,
  setLeftToClick: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  setUsers: PropTypes.func.isRequired,
  setCurrentLevel: PropTypes.func.isRequired,
  setCurrentMove: PropTypes.func.isRequired,
  clearBoard: PropTypes.func.isRequired,
  loadLevel: PropTypes.func.isRequired,
  setSelectingInitialSquare: PropTypes.func.isRequired,
  updateBoard: PropTypes.func.isRequired,
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

const mapDispatchToProps = {
  ...appActions,
  ...boardActions,
  ...gameActions,
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
