import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Input, Select, Button, Icon } from 'antd'
import { range } from '../util'
import constants, { numberOfBoardSquares, minLevel } from '../constants'

class UserForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      level: null,
    }

    const users = localStorage.getItem('users')
    this.users = users ? JSON.parse(localStorage.getItem('users')) : null
    this.onCreateUser = this.onCreateUser.bind(this)
    this.onSelectUser = this.onSelectUser.bind(this)
    this.onChangeLevel = this.onChangeLevel.bind(this)
  }

  onSelectUser(value) {
    this.props.dispatch({ type: constants.SET_USER, payload: value})
    localStorage.setItem('lastUser', value)
  }

  onCreateUser() {
    const users = this.users ? JSON.parse(JSON.stringify(this.users)) : []
    users.push({ 
      name: this.state.user,
      maxCompletedLevel: 0,
      levelStats: [],
    })
    localStorage.setItem('users', JSON.stringify(users))
    localStorage.setItem('lastUser', this.state.user)
    this.props.dispatch({ type: constants.SET_USER, payload: this.state.user })
    this.props.dispatch({ type: constants.SET_CURRENT_LEVEL, payload: minLevel })
  }

  onChangeLevel(value) {
    this.setState({ level: value })
  }
  
  render() {
    const { Option } = Select
    const levels = range(1, numberOfBoardSquares * numberOfBoardSquares).map(level => <Option key={level}>{level}</Option>)
    const users = this.users ? this.users.map(
      user => (
        <Option key={user.name} value={user.name}>
          {user.name}
        </Option>
      )
    ) : null
    return (
      <div className="modal">
        <div className="basic-form" style={{ width: '260px' }}>
          <Icon type="close" onClick={this.props.closeForm} />
          <div style={{ height: '10px' }} />
          {this.users ? 
            <div>
              <div className="form-headline">Click to choose a player</div>
              <Select
                showSearch
                size="default"
                style={{ width: 150 }}
                placeholder="Select player"
                onChange={this.onSelectUser}
              >
                {users}
              </Select>
              <div style={{ height: '10px' }} />
              <div className="form-headline">or</div>
              <div style={{ height: '10px' }} />
            </div>
            : null}
          <div className="form-headline">Add new player</div>
          <Input
            placeholder="New player name"
            className=""
            onChange={(e) => {
              this.setState({ user: e.target.value })
            }}
          />
          <div style={{ height: '20px' }} />
          <div className="flex-row">
            <Button
              disabled={!this.state.user || !this.state.level}
              className="button"
              size="small"
              onClick={this.onCreateUser}
            >
              Create player
            </Button>
            <Select
              showSearch
              size="small"
              style={{ width: 100 }}
              placeholder="Select level"
              onChange={this.onChangeLevel}
            >
              {levels}
            </Select>
          </div>
        </div>
      </div>
    )
  }
}

UserForm.defaultProps = {
}

UserForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  closeForm: PropTypes.func.isRequired,
}

const mapStateToProps = ({ app, board, game }) => ({
})

export default connect(mapStateToProps)(UserForm)
