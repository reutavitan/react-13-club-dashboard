// App - keeps all the state (useState) and builds the page from the components.
import { initialMembers, initialTasks } from './data.js'
import styles from './App.module.css'
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import FilterBar from './components/FilterBar/FilterBar.jsx'
import MemberList from './components/MembersList/MembersList.jsx'
import { useState } from 'react'
import Notice from './components/Notice/Notice.jsx'
import TasksPanel from './components/TasksPanel/TasksPanel.jsx'
export default function App() {

  const [members, setMembers] = useState(initialMembers)
  const [tasks, setTasks] = useState(initialTasks)
  const [selectedMemberId, setSelectedMemberId] = useState(null)
  const [showOnlyActive, setShowOnlyActive] = useState(false)
  const [layout, setLayout] = useState("list")
  const handleToggleActive = () => {
    setShowOnlyActive(!showOnlyActive)
  }
  const handleLayoutChange = (newLayout) => {
    setLayout(newLayout)
  }
  const visibleMembers = showOnlyActive
    ? members.filter(member => member.isActive)
    : members

  const selectedMember = members.find(
    member => member.id === selectedMemberId
  ) || null
const isInactiveSelected = selectedMember && !selectedMember.isActive
  const memberTasks = tasks.filter(
    task => task.assignedTo === selectedMemberId
  )
  const handleToggleTask = (taskId) => {
  setTasks(prevTasks =>
    prevTasks.map(task =>
      task.id === taskId
        ? { ...task, done: !task.done }
        : task
    )
  )
}
  // TODO: compute the members to show, the selected member and their tasks
  return (
    <div className={styles.app}>
      <Header />
      <FilterBar
        showOnlyActive={showOnlyActive}
        onToggleActive={handleToggleActive}
        layout={layout}
        onLayoutChange={handleLayoutChange}
      />
        {isInactiveSelected && (
  <Notice type="warning">
    This member is inactive
  </Notice>
)} 
      <div className={styles.content}>
        <div className={styles.right }>
      <MemberList members={visibleMembers}
        layout={layout}
        selectedMemberId={selectedMemberId}
        onSelect={setSelectedMemberId}
      />
      </div>
      <div className={styles.left}>
      <TasksPanel
        member={selectedMember}
        tasks={memberTasks}
        onToggleTask={handleToggleTask}
      />
      </div>
      </div>
      <Footer />
    </div>
  )
}
