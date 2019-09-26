import React from 'react'
import { Flex, Box } from '@rebass/grid'
import styled from 'styled-components'
import { FormInputLabel, FormInput, FormSelect } from '../styles/Form'
import { palette } from '../utils/colors'
import { ICampaignTask, TaskFormatType } from '../models/Campaign'
import CheckBox from './CheckBox'

const MIN_DAYS_TO_REVIEW = 10
const MAX_DAYS_TO_REVIEW = 30

const TaskCard = styled.div`
  margin-bottom: 20px;

  .closeButton {
    padding: 5px;
    display: inline-block;
    width: 32px;
    height: 32px;
    text-align: center;
    border-radius: 50%;
    font-size: 2rem;
    transform: translateY(41px);
    margin-left: 10px;
    transition: 0.3s all ease-in-out;
    &:hover:not(:disabled) {
      background: ${palette.grey._100};
    }
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`

interface ITasksFormProps {
  task: ICampaignTask
  setTask: (newTask: ICampaignTask) => any
}

const TasksForm: React.FC<ITasksFormProps> = ({ task, setTask }) => {
  const possibleFormats: TaskFormatType[] = ['Youtube video']
  const toggleReviewFormat = (format: TaskFormatType) => {
    if (task.formats.includes(format)) {
      // Remove format if it's already there
      setTask({ ...task, formats: task.formats.filter(_f => _f !== format) })
    } else {
      // Or add format
      setTask({ ...task, formats: [...task.formats, format] })
    }
  }
  return (
    <TaskCard>
      <Flex flexDirection="row" justifyContent="flex-start" alignItems="flex-start">
        <FormInputLabel>
          Formats acceptés pour la revue
          {possibleFormats.map(_possibleFormat => (
            <CheckBox
              text={_possibleFormat}
              isChecked={task.formats.includes(_possibleFormat)}
              handleClick={() => toggleReviewFormat(_possibleFormat)}
              key={_possibleFormat}
            />
          ))}
        </FormInputLabel>
      </Flex>
      <FormInputLabel>
        Tags et mentions à inclure
        <Box width={[1, 1, 8 / 12]}>
          <FormInput
            value={task.including}
            onChange={e => setTask({ ...task, including: e.target.value })}
            placeholder="@marque #produit"
            hasLabel
          />
        </Box>
      </FormInputLabel>
      <Box mt="1rem">
        <FormSelect
          value={task.daysToReview}
          onChange={e => setTask({ ...task, daysToReview: Number.parseInt(e.target.value) })}
        >
          {[...Array(MAX_DAYS_TO_REVIEW - MIN_DAYS_TO_REVIEW + 1).keys()]
            .map(_number => _number + MIN_DAYS_TO_REVIEW)
            .map(_number => (
              <option value={_number} key={_number}>
                {_number}
              </option>
            ))}
        </FormSelect>
        <span style={{ marginLeft: '1rem' }}>
          jours pour poster la revue une fois le produit envoyé
        </span>
      </Box>
    </TaskCard>
  )
}

export default TasksForm
