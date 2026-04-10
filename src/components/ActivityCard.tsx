import styles from "./ActivityCard.module.css";

interface ActivityProps {
  title: string;
  // Use React.ElementType for components from your Icons.tsx
  icon: React.ElementType; 
  name: string;
  descIcon: React.ElementType;
  descClass: string;
}

// Capitalize 'icon' to 'Icon' and 'descIcon' to 'DescIcon' 
// so React knows to treat them as components.
const ActivityCard = ({ title, icon: Icon, name, descIcon: DescIcon, descClass }: ActivityProps) => {
  return (
    /* Uses the dynamic background class based on the prop */
    <div className={`${styles.card} ${styles[descClass + "Bg"]}`}>
      <div className={styles.left}>
        <div className={styles.dot}></div>
        <div className={styles.content}>
          <h3>{title}</h3>
          <div className={styles.meta}>
            {/* Render directly as a component, NOT inside FontAwesomeIcon */}
            <Icon className={styles.icon} />
            <span>{name}</span>
          </div>
        </div>
      </div>
      {/* Render directly as a component */}
      <DescIcon className={styles[descClass]} />
    </div>
  );
};

export default ActivityCard;