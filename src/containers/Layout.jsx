import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import constants, { numberOfBoardSquares } from '../constants'
import Board from './Board'
import UserForm from '../components/UserForm'
import DialogueBox from '../components/DialogueBox'
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
    this.stopTimer = this.stopTimer.bind(this)
    this.startNewLevel = this.startNewLevel.bind(this)
    this.handleGameLost = this.handleGameLost.bind(this)
  }

  componentDidMount() {
    this.setBoardDimensions()
    window.addEventListener('resize', this.onWindowResize);
    // localStorage.removeItem('lastUser')
    // localStorage.removeItem('users')
    this.props.dispatch({ type: constants.SET_USER, payload: this.lastUser})
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.selectingInitialSquare && !nextProps.numberOfLegalMoves) {
      this.stopTimer()
    }
    if(this.props.currentMove !== nextProps.currentMove && nextProps.numberOfLegalMoves) {
      this.props.dispatch({ type: constants.SET_TIME, payload: 0 })
    }
    if(this.props.selectingInitialSquare && !nextProps.selectingInitialSquare) {
      this.startTimer()
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

  startNewLevel() {
    if (this.timer) clearInterval(this.timer)
    this.props.dispatch({ type: constants.SET_TIME, payload: 0 })
    this.props.dispatch({ type: constants.SET_LIVES, payload: this.props.lives + 1 })
    this.props.dispatch({ type: constants.SET_CURRENT_LEVEL, payload: this.props.currentLevel + 1 })
    this.props.dispatch({ type: constants.SET_CURRENT_MOVE, payload: 1 })
    this.props.dispatch({ type: constants.SET_SELECTING_INITIAL_SQUARE, payload: true })
    this.props.dispatch({ type: constants.CLEAR_BOARD })
  }

  handleGameLost() {
    // if (this.timer) clearInterval(this.timer)
    this.props.dispatch({ type: constants.SET_TIME, payload: 0 })
    const newLives = this.props.lives - this.props.leftToClick
    this.props.dispatch({ type: constants.SET_CURRENT_MOVE, payload: 1 })
    this.props.dispatch({ type: constants.SET_SELECTING_INITIAL_SQUARE, payload: true })
    this.props.dispatch({ type: constants.CLEAR_BOARD })
    if (newLives > 0) {
      this.props.dispatch({ type: constants.SET_LIVES, payload: newLives })
    } else {
      this.props.dispatch({ type: constants.SET_LIVES, payload: 1 })
      this.props.dispatch({ type: constants.SET_CURRENT_LEVEL, payload: 1 })
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
    this.props.dispatch({ type: constants.SET_TIME, payload: 0 })
    this.timer = setInterval(() => {
      this.props.dispatch({ type: constants.SET_TIME, payload: this.props.moveTime + 1})
    }, 1000)


  }

  stopTimer() {
    console.log('stopping timer')
    if (this.timer) clearInterval(this.timer)
    // this.props.dispatch({ type: constants.SET_TIME, payload: 0 })
  }

  render() {
    return (
      <div className="layout">
        <div className="top-bar" style={{ width: `${Math.max(this.state.boardSize, 350)}px` }}>
          <TopBar showUserForm={this.showUserForm}/>
        </div>
        <div className="board-div" ref={el => this.boardDiv = el}>
          <div className="board" style={{ width: `${this.state.boardSize}px`, height: `${this.state.boardSize}px` }}>
            <Board boardSize={this.state.boardSize} startTimer={this.startTimer} stopTimer={this.stopTimer} />
          </div>
        </div>
        <div className="game-stats" style={{ width: `${Math.max(this.state.boardSize, 350)}px` }}>
          <GameStats />
        </div>
        {this.state.showUserForm ? <UserForm closeForm={this.closeUserForm}/> : null}
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
            additionalText={`You lose ${this.props.leftToClick} lives.`}
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
  moveTime: PropTypes.number.isRequired,
  leftToClick: PropTypes.number,
  currentLevel: PropTypes.number,
  currentMove: PropTypes.number,
  lives: PropTypes.number,
  numberOfLegalMoves: PropTypes.number.isRequired,
  selectingInitialSquare: PropTypes.bool.isRequired,
}

const mapStateToProps = ({ app, board, game }) => ({
  moveTime: game.moveTime,
  currentLevel: game.currentLevel,
  currentMove: game.currentMove,
  leftToClick: game.leftToClick,
  lives: game.lives,
  numberOfLegalMoves: board.numberOfLegalMoves,
  selectingInitialSquare: game.selectingInitialSquare,
})

export default connect(mapStateToProps)(Layout)
