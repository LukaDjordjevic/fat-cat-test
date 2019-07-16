import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import constants from '../constants'

class Board extends Component {
  constructor(props) {
    super(props)
    this.config = {
      numberOfLevels: 99,
    }
  }

  componentDidMount() {
    this.props.dispatch({ type: constants.SET_BOARD_STATE, payload: [2, 3]})
  }

  render() {
    return (
      <div className="board">
        <p>Board</p>
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
