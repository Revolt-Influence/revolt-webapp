import React from 'react'
import equal from 'fast-deep-equal'
import { FormInputLabel, FormInput } from '../styles/Form'
import { Row } from '../utils/grid'
import { ICampaignTask } from '../models/Campaign'
import TaskForm from './TaskForm'
import SplitView from './SplitView'

const mandatoryRules: string[] = ['Identifier @revolt.club sur les publications Instagram']

const defaultRules = ['Les posts devront être gardés au moins 90 jours sur la page']

interface ICampaignBriefTaskProps {
  task: ICampaignTask
  setTask: (newTask: ICampaignTask) => void
}

const CampaignBriefTask: React.FC<ICampaignBriefTaskProps> = ({ task, setTask }) => (
  <div>
    <Row justify="space-between" verticalAlign="flex-start">
      <SplitView title="Livrables" ratio={4 / 12} stacked>
        <TaskForm task={task} setTask={setTask} />
      </SplitView>
    </Row>
    <SplitView ratio={4 / 12} title="Règles" stacked>
      <div>
        {/* Loop through all items and add an empty one */}
        {[...task.rules, ''].map((rule, index) => (
          <FormInputLabel key={index}>
            Règle {index + 1}
            <FormInput
              value={rule}
              disabled={index < mandatoryRules.length}
              onChange={e => {
                // Update rule if field is not blank
                if (e.target.value.length > 0) {
                  // Replace rule being edited
                  const newRules = [...task.rules]
                  newRules[index] = e.target.value
                  setTask({ ...task, rules: newRules })
                } else {
                  // Field is blank, remove field
                  setTask({
                    ...task,
                    rules: [
                      // All rules except the one being modified
                      ...task.rules.filter((_, allIndex) => index !== allIndex),
                    ],
                  })
                }
              }}
              hasLabel
              placeholder="Ajouter une règle"
            />
          </FormInputLabel>
        ))}
      </div>
    </SplitView>
  </div>
)

export { mandatoryRules, defaultRules }
export default React.memo(CampaignBriefTask, (prevProps, newProps) =>
  equal(prevProps.task, newProps.task)
)
