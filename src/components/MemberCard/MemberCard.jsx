// MemberCard - avatar (initials), name, role badge and a small role-colored action button.
import styles from './MemberCard.module.css'

/**
 * @param {object} props
 * @param {{id: number, name: string, role: "Leader" | "Member" | "Guest", isActive: boolean}} props.member
 * @param {boolean} props.isSelected - true when this is the selected member (the card gets styles.selected)
 * @param {(memberId: number) => void} props.onSelect - call it with member.id when the card is clicked
 */
export default function MemberCard({ member, isSelected, onSelect }) {
  // TODO: avatar with the initials ("Noa Levi" -> "NL")
  // TODO: name + role badge
  // TODO: button colored by role (Leader=blue, Member=green, Guest=purple), disabled if inactive
  // TODO: inactive member -> the card also gets styles.inactive (faded)
  return (
    <div
      className={`${styles.card} ${!member.isActive ? styles.inactive : ""} ${isSelected ? styles.selected : ""}`}
      onClick={() => onSelect(member.id)}
    >
      <div className={styles.avatar}>
        {member.name.split(" ").map(word => word[0]).join("").toUpperCase()}
      </div>
      <div>
        <div className={styles.name}>
          {member.name}
        </div>

        <span className={styles.badge}>
          {member.role}
        </span>
      </div>
      <button className={`${styles.roleButton} ${styles[member.role.toLowerCase()]}`} disabled={!member.isActive}>
        Contact
      </button>
    </div>
  )
}
