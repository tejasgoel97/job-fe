const jobTypeList = [
  { id: 1, name: "Full Time", value: "full_time" },
  { id: 2, name: "Part Time", value: "part_time" },
  { id: 3, name: "Contract", value: "contract" },
  { id: 4, name: "Freelance", value: "freelance" },
];

const JobTypeZustand = ({ values = [], onChange }) => {
  const handleChange = (value) => {
    const newValues = values.includes(value)
      ? values.filter(v => v !== value)
      : [...values, value];
    onChange(newValues);
  };

  return (
    <ul className="switchbox">
      {jobTypeList.map((item) => (
        <li key={item.id}>
          <label className="switch">
            <input
              type="checkbox"
              value={item.value}
              checked={values.includes(item.value)}
              onChange={() => handleChange(item.value)}
            />
            <span className="slider round"></span>
            <span className="title">{item.name}</span>
          </label>
        </li>
      ))}
    </ul>
  );
};

export default JobTypeZustand;
