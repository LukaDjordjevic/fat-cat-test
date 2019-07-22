import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const TopBar = (props) => {
  const { user, showUserForm } = props
  return (
    <React.Fragment>
      <div
        className="stats-item"
        style={{ cursor: 'pointer' }}
        onClick={showUserForm}
        role="presentation"
      >
        {`Player: ${user.name}`}
      </div>
    </React.Fragment>
  )
}

TopBar.defaultProps = {
  user: '',
}

TopBar.propTypes = {
  showUserForm: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
}

const mapStateToProps = ({ app }) => ({
  user: app.currentUser,
})

export default connect(mapStateToProps)(TopBar)
