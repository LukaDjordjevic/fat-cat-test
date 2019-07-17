import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
// import constants, { numberOfBoardSquares } from '../constants'

const GameStats = (props) => {
  return (
    <React.Fragment>
      <div className='stats-item'>
        {`Timer: ${props.timer} seconds`}
      </div>
      <div className='stats-item'>
        {`Left to click: ${props.leftToClick ? props.leftToClick : '-'}`}
      </div>
      <div className='stats-item'>
        {`Lives: ${props.lives}`}
      </div>
      <div className='stats-item'>
        {`Level: ${props.level}`}
      </div>
    </React.Fragment>

  )
}

GameStats.defaultProps = {
  leftToClick: 0,
}

GameStats.propTypes = {
  dispatch: PropTypes.func.isRequired,
  timer: PropTypes.number.isRequired,
  leftToClick: PropTypes.number,
  lives: PropTypes.number.isRequired,
  level: PropTypes.number.isRequired,
}

const mapStateToProps = ({ app, board, game }) => ({
  timer: game.moveTime,
  leftToClick: game.leftToClick,
  lives: game.lives,
  level: game.currentLevel,
})

export default connect(mapStateToProps)(GameStats)
