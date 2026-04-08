// The buttons to switch between All/Pending/Completed.

const FilterBar = ({ filter, setFilter, count }: { filter: string; setFilter: (filter: string) => void; count: { all: number; pending: number; completed: number } }) => {
  return (
    <div className="filter">
      <button
        className={filter === "all" ? "filter-button active" : "filter-button"}
        onClick={() => setFilter("all")}>
        All {count.all > 0 && <span className="count">({count.all})</span>}
      </button>
      <button
        className={filter === "pending" ? "filter-button active" : "filter-button"}
        onClick={() => setFilter("pending")}>
        Pending {count.pending > 0 && <span className="count">({count.pending})</span>}
      </button>
      <button
        className={filter === "completed" ? "filter-button active" : "filter-button"}
        onClick={() => setFilter("completed")}>
        Completed {count.completed > 0 && <span className="count">({count.completed})</span>}
      </button>
    </div>
  );
};

export default FilterBar;
