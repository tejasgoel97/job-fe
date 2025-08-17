const experienceLevels = [
  { id: 1, name: "Fresh", value: "fresh" },
  { id: 2, name: "1 Year", value: "1y" },
  { id: 3, name: "2 Years", value: "2y" },
  { id: 4, name: "3 Years", value: "3y" },
  { id: 5, name: "4 Years", value: "4y" },
  { id: 6, name: "5+ Years", value: "5y+" },
];

const ExperienceLevelZustand = ({ values = [], onChange }) => {
  const handleChange = (value) => {
    const newValues = values.includes(value)
      ? values.filter(v => v !== value)
      : [...values, value];
    onChange(newValues);
  };

  return (
    <ul className="checkboxes">
      {experienceLevels.map((level) => (
        <li key={level.id}>
          <input
            type="checkbox"
            name="experience"
            value={level.value}
            checked={values.includes(level.value)}
            onChange={() => handleChange(level.value)}
            id={`experience-${level.id}`}
          />
          <label htmlFor={`experience-${level.id}`}>{level.name}</label>
        </li>
      ))}
    </ul>
  );
};

export default ExperienceLevelZustand;
