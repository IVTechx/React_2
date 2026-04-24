import { Icons } from "./Icons";
import styles from "./card.module.css";

interface type {
  icon: keyof typeof Icons;
  title: string;
  intro: string;
}

const Card = ({ icon, title, intro }: type) => {
  const IconComponent = Icons[icon];
  return (
    <div className={styles.card}>
      {IconComponent && <IconComponent className={styles.icon} />}
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.intro}>{intro}</p>
    </div>
  );
};

export default Card;
