import hiImage from "../assets/hi.png";

const EmptyState = ({ filter } : {filter: string}) => {
  const messages = {
    pending: "No pending tasks! Great job!",
    completed: "No completed tasks yet",
    all: "No tasks? Suspicious. Add one."
  };

  return (
    <div className="empty-state">
      <div className="hi-image"><img src={hiImage} alt="Empty state" /></div>
      <p className="empty-text">{messages[filter] || messages.all}</p>
    </div>
  );
};

export default EmptyState;
