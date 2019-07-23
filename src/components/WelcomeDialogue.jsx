import React from 'react'
import PropTypes from 'prop-types'
import { Select } from 'antd'
import { range } from '../util'
import { minLevel, numberOfBoardSquares } from '../constants'

const WelcomeDialogue = (props) => {
  const { Option } = Select
  const { user, closeForm } = props
  const maxCompletedLevel = user.maxCompletedLevel || 0
  const maxFields = (numberOfBoardSquares * numberOfBoardSquares) - 1
  const maxLevel = maxCompletedLevel + 1 > maxFields ? maxFields : Math.max(minLevel, maxCompletedLevel + 1)
  const levels = range(minLevel, maxLevel + 1).map(level => <Option key={level}>{level}</Option>)

  return (
    <div className="modal">
      <div className="basic-form" style={{ width: '260px' }}>
        <div>
          <div className="form-headline">
            {`Welcome ${user.name}`}
          </div>
          <div style={{ height: '10px' }} />
        </div>
        <div className="flex-row">
          Select level
          <Select
            showSearch
            size="small"
            style={{ width: 100 }}
            placeholder="Select level"
            onChange={value => closeForm(value)}
          >
            {levels}
          </Select>
        </div>
      </div>
    </div>
  )
}

WelcomeDialogue.defaultProps = {
}

WelcomeDialogue.propTypes = {
  closeForm: PropTypes.func.isRequired,
  user: PropTypes.shape({
    maxCompletedLevel: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
}

export default WelcomeDialogue
