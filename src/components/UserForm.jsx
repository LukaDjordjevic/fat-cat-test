import React from 'react'
import PropTypes from 'prop-types'
import { Input, Select, Button, Icon } from 'antd'

class UserForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
    }
  }

  render() {
    const { Option } = Select
    const users = this.props.users.length ? this.props.users.map(
      user => (
        <Option key={user.name} value={user.name}>
          {user.name}
        </Option>
      )
    ) : null
    return (
      <div className="modal">
        <div className="basic-form" style={{ width: '260px' }}>
        {this.props.users.length ?
        <div>
          <Icon type="close" onClick={this.props.closeForm} />
          <div style={{ height: '10px' }} />
        </div>: null}
          {this.props.users.length ?
            <div>
              <div className="form-headline">Click to choose a player</div>
              <Select
                showSearch
                size="default"
                style={{ width: 150 }}
                placeholder="Select player"
                onChange={(value) => this.props.onSelectUser(value)}
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
              disabled={!this.state.user}
              className="button"
              size="small"
              onClick={() => this.props.onCreateUser(this.state.user)}
            >
              Create player
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

UserForm.propTypes = {
  closeForm: PropTypes.func.isRequired,
  onSelectUser: PropTypes.func.isRequired,
  onCreateUser: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.object.isRequired),
}

export default UserForm
