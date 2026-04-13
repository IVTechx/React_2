import Cards from "./Cards";
import ActivityCard from "./ActivityCard";
import Header from "./Header";
import { todayDate } from "../lib";
import { useUserContext } from "../context/user-context";
import styles from "./DashboardView.module.css";
import { Icons } from "./Icons";

const DashboardView = () => {
  const { currentUser, isLoggedIn } = useUserContext();

  if (!isLoggedIn || !currentUser) return null;

  return (
    <div className={styles.dashboardWrapper}>
      <div className={styles.dashboardContent}>
        <div className={styles.headerSection}>
          <Header title={`Welcome back, ${currentUser.name}!`} content={todayDate(isLoggedIn)} />
        </div>

        <div className={styles.statsGrid}>
          <Cards
            title="Profile"
            icon={Icons.Profile}
            iconClass="blue"
            name={currentUser.name}
            descIcon={Icons.CheckCircle}
            descClass="descGreen"
            description="Active user"
          />
          <Cards
            title="Email"
            icon={Icons.Email}
            iconClass="orange"
            name={currentUser.email}
            descIcon={Icons.CheckCircle}
            descClass="descGreen"
            description="Verified account"
          />
          <Cards
            title="Last Login"
            icon={Icons.Calendar}
            iconClass="green"
            name="Today"
            descIcon={Icons.Time}
            descClass="descBlue"
            description="Session active"
          />
        </div>

        <div className={styles.activitySection}>
          <div className={styles.activityTitleRow}>
            <Icons.ActivityHeader />
            <h2 className={styles.activityTitle}>Recent Activity</h2>
          </div>
          <p className={styles.activitySubtitle}>Your recent dashboard activities</p>

          <ActivityCard
            title="Successfully logged in"
            icon={Icons.Time}
            name="Just now"
            descIcon={Icons.TrendUp}
            descClass="descGreen"
          />
          <ActivityCard
            title="Dashboard accessed"
            icon={Icons.Time}
            name="Just now"
            descIcon={Icons.Wave}
            descClass="descBlue"
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
