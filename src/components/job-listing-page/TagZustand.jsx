const tagOptions = [
  "App",
  "Administrative",
  "Android",
  "WordPress",
  "Design",
  "React",
  "Javascript",
  "Python",
  "Node.js"
];

const TagZustand = ({ values = [], onChange }) => {
  const handleChange = (tag) => {
    const newValues = values.includes(tag)
      ? values.filter(v => v !== tag)
      : [...values, tag];
    onChange(newValues);
  };

  return (
    <div className="checkbox-outer">
      {tagOptions.map((tag) => (
        <div key={tag} className="filter-tag">
          <input
            type="checkbox"
            id={`tag-${tag}`}
            checked={values.includes(tag)}
            onChange={() => handleChange(tag)}
          />
          <label htmlFor={`tag-${tag}`}>{tag}</label>
        </div>
      ))}
    </div>
  );
};

export default TagZustand;
