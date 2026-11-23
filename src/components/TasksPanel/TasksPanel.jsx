// TasksPanel - the tasks of the selected member, with messages for the empty states.
import styles from './TasksPanel.module.css'
import Notice from '../Notice/Notice.jsx'
/**
 * @param {object} props
 * @param {{id: number, name: string, role: string, isActive: boolean} | null} props.member - the selected member, or null
 * @param {Array<{id: number, title: string, done: boolean, assignedTo: number}>} props.tasks - the tasks of the selected member
 * @param {(taskId: number) => void} props.onToggleTask - call it with task.id when a task checkbox is clicked
 */
export default function TasksPanel({ member, tasks, onToggleTask }) {
  // TODO: no member selected -> "Select a member to see their tasks"
  // TODO: the member has no tasks -> "No tasks yet"
  // TODO: otherwise, a loop over tasks: a checkbox (checked = done) + the title, inside a <label>
  // אין חברה שנבחרה
  if (!member) {
    return (
      <Notice type="info">
        Select a member to see their tasks
      </Notice>
    )
  }

  // אין משימות לחברה
  if (tasks.length === 0) {
    return (
      <Notice type="info">
        No tasks yet
      </Notice>
    )
  }

  // יש חברה ויש לה משימות
  return (
    <div className={styles.tasksPanel}>
      <h2>{member.name}</h2>

      {tasks.map(task => (
        <label key={task.id}>
          <input
            type="checkbox"
            checked={task.done}
            onChange={() => onToggleTask(task.id)}
          />
          {task.title}
        </label>
      ))}
    </div>
  )
}
