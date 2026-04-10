import styles from "./Cards.module.css";

interface CardsProps {
  title: string;
  icon: React.ElementType;
  iconClass: string;
  name: string;
  descIcon: React.ElementType;
  descClass: string;
  description: string;
}

const Cards = ({
  title,
  icon: Icon,
  iconClass,
  name,
  descIcon: DescIcon,
  descClass,
  description,
}: CardsProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <p className={styles.title}>{title}</p>
        <div className={`${styles.iconWrapper} ${styles[iconClass]}`}>
          <Icon className={styles.icon} />
        </div>
      </div>

      <div className={styles.body}>
        <p className={styles.name}>{name}</p>
        <div className={styles.desc}>
          <DescIcon className={`${styles.descIcon} ${styles[descClass]}`} />
          <span>{description}</span>
        </div>
      </div>
    </div>
  );
};

export default Cards;
