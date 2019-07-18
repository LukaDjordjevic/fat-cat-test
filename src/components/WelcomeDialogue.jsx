import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Input, Select, Button } from 'antd'
import { range } from '../util'
import constants, { minLevel } from '../constants'

class WelcomeDialogue extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      level: null,
    }
  }

  componentDidMount() {
  }

  onChangeLevel(value) {
    this.setState({ level: value })
  }

  render() {
    const { Option } = Select
    const maxCompletedLevel = this.props.user.maxCompletedLevel || 0
    const maxLevel = Math.max(minLevel, maxCompletedLevel + 1)
    const levels = range(minLevel, maxLevel + 1).map(level => <Option key={level}>{level}</Option>)

    return (
      <div className="modal">
        <div className="basic-form" style={{ width: '260px' }}>
          <div>
            <div className="form-headline">Welcome {this.props.user.name}</div>
            <div style={{ height: '10px' }} />
          </div>
          <div className="flex-row">
            Select level
            <Select
              showSearch
              size="small"
              style={{ width: 100 }}
              placeholder="Select level"
              onChange={(value) => this.props.closeForm(value)}
            >
              {levels}
            </Select>
          </div>
        </div>
      </div>
    )
  }
}

WelcomeDialogue.defaultProps = {
}

WelcomeDialogue.propTypes = {
  dispatch: PropTypes.func.isRequired,
  closeForm: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

const mapStateToProps = ({ app, board, game }) => ({
})

export default connect(mapStateToProps)(WelcomeDialogue)
