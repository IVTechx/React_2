import styles from "./ActivityCard.module.css";

interface ActivityProps {
  title: string;

  icon: React.ElementType;
  name: string;
  descIcon: React.ElementType;
  descClass: string;
}

const ActivityCard = ({
  title,
  icon: Icon,
  name,
  descIcon: DescIcon,
  descClass,
}: ActivityProps) => {
  return (
    <div className={`${styles.card} ${styles[descClass + "Bg"]}`}>
      <div className={styles.left}>
        <div className={styles.dot}></div>
        <div className={styles.content}>
          <h3>{title}</h3>
          <div className={styles.meta}>
            {}
            <Icon className={styles.icon} />
            <span>{name}</span>
          </div>
        </div>
      </div>
      {}
      <DescIcon className={styles[descClass]} />
    </div>
  );
};

export default ActivityCard;
