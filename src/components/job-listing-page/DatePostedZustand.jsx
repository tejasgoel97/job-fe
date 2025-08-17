const dateOptions = [
  { id: 1, name: "Last Hour", value: "1h" },
  { id: 2, name: "Last 24 Hours", value: "24h" },
  { id: 3, name: "Last 7 Days", value: "7d" },
  { id: 4, name: "Last 14 Days", value: "14d" },
  { id: 5, name: "Last 30 Days", value: "30d" },
];

const DatePostedZustand = ({ value, onChange }) => {
  return (
    <ul className="checkboxes">
      {dateOptions.map((option) => (
        <li key={option.id}>
          <input
            type="radio"
            name="date-posted"
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange(e.target.value)}
            id={`date-${option.id}`}
          />
          <label htmlFor={`date-${option.id}`}>{option.name}</label>
        </li>
      ))}
    </ul>
  );
};

export default DatePostedZustand;
