import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowTrendUp,
  faRightFromBracket,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import {
  faUser,
  faCalendar,
  faEnvelope,
  faClock,
  faCircleCheck,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";

/** Sparkle logo icon — blue gradient box */
const LogoIcon = () => (
  <div
    style={{
      width: 30,
      height: 30,
      background: "linear-gradient(135deg, var(--color-cyan-500), var(--color-blue-600))",
      borderRadius: "var(--radius-md)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    }}>
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--color-white)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
      <path d="M20 3v4" />
      <path d="M22 5h-4" />
      <path d="M4 17v2" />
      <path d="M5 18H3" />
    </svg>
  </div>
);

/** Wave / activity icon */
const WaveIcon = ({ stroke = "currentColor", ...props }: any) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke={stroke}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}>
    <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
  </svg>
);

/** Purple to Pink gradient box */
const ActivityHeaderIcon = ({ className }: { className?: string }) => (
  <div
    className={className}
    style={{
      width: 40,
      height: 40,
      borderRadius: "var(--radius-md)",
      background: "linear-gradient(135deg, var(--color-purple-500), var(--color-pink-600))",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    }}>
    <WaveIcon stroke="var(--color-white)" />
  </div>
);

export const Icons = {
  Logo: LogoIcon,
  ActivityHeader: ActivityHeaderIcon,
  Wave: WaveIcon,

  Profile: (props: any) => <FontAwesomeIcon icon={faUser} {...props} />,
  Email: (props: any) => <FontAwesomeIcon icon={faEnvelope} {...props} />,
  Calendar: (props: any) => <FontAwesomeIcon icon={faCalendar} {...props} />,
  Time: (props: any) => <FontAwesomeIcon icon={faClock} {...props} />,
  CheckCircle: (props: any) => <FontAwesomeIcon icon={faCircleCheck} {...props} />,
  Edit: (props: any) => <FontAwesomeIcon icon={faPenToSquare} {...props} />,
  Trash: (props: any) => <FontAwesomeIcon icon={faTrashCan} {...props} />,

  TrendUp: (props: any) => <FontAwesomeIcon icon={faArrowTrendUp} {...props} />,
  Logout: (props: any) => <FontAwesomeIcon icon={faRightFromBracket} {...props} />,
};
