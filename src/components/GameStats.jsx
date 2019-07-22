import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const GameStats = (props) => {
  const {
    timer,
    leftToClick,
    lives,
    level,
  } = props
  return (
    <React.Fragment>
      <div className="stats-item">
        {`Timer: ${timer} seconds`}
      </div>
      <div className="stats-item">
        {`Left to click: ${leftToClick || '-'}`}
      </div>
      <div className="stats-item">
        {`Lives: ${lives}`}
      </div>
      <div className="stats-item">
        {`Level: ${level}`}
      </div>
    </React.Fragment>
  )
}

GameStats.defaultProps = {
  leftToClick: 0,
}

GameStats.propTypes = {
  timer: PropTypes.number.isRequired,
  leftToClick: PropTypes.number,
  lives: PropTypes.number.isRequired,
  level: PropTypes.number.isRequired,
}

const mapStateToProps = ({ game }) => ({
  timer: game.moveTime,
  leftToClick: game.leftToClick,
  lives: game.lives,
  level: game.currentLevel,
})

export default connect(mapStateToProps)(GameStats)
