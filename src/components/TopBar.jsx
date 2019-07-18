import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const TopBar = (props) => {
  return (
    <React.Fragment>
      <div className='stats-item' style={{ cursor: 'pointer' }} onClick={props.showUserForm}>
        {`Player: ${props.user}`}
      </div>
    </React.Fragment>
  )
}

TopBar.defaultProps = {
  user: '',
}

TopBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  showUserForm: PropTypes.func.isRequired,
  user: PropTypes.string
}

const mapStateToProps = ({ app, board, game }) => ({
  user: app.currentUser
})

export default connect(mapStateToProps)(TopBar)
