import React from 'react'
import PropTypes from 'prop-types'
import {
  Input,
  Select,
  Button,
  Icon,
} from 'antd'

class UserForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '',
    }
  }

  render() {
    const { Option } = Select
    const {
      users,
      closeForm,
      onSelectUser,
      onCreateUser,
    } = this.props
    const { userName } = this.state
    const usersList = users.length ? users.map(
      user => (
        <Option key={user.name} value={user.name}>
          {user.name}
        </Option>
      ),
    ) : null
    return (
      <div className="modal">
        <div className="basic-form" style={{ width: '260px' }}>
          {users.length
            ? (
              <div>
                <Icon type="close" onClick={closeForm} />
                <div style={{ height: '10px' }} />
              </div>
            )
            : null}
          {users.length
            ? (
              <div>
                <div className="form-headline">Click to choose a player</div>
                <Select
                  showSearch
                  size="default"
                  style={{ width: 150 }}
                  placeholder="Select player"
                  onChange={value => onSelectUser(value)}
                >
                  {usersList}
                </Select>
                <div style={{ height: '10px' }} />
                <div className="form-headline">or</div>
                <div style={{ height: '10px' }} />
              </div>
            )
            : null}
          <div className="form-headline">Add new player</div>
          <Input
            placeholder="New player name"
            className=""
            onChange={(e) => {
              this.setState({ userName: e.target.value })
            }}
          />
          <div style={{ height: '20px' }} />
          <div className="flex-row">
            <Button
              disabled={!userName}
              className="button"
              size="small"
              onClick={() => onCreateUser(userName)}
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
  users: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
}

export default UserForm
