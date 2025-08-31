const JobDetailsDescriptions = ({ description, keyResponsibilities, requiredSkills }) => {
  return (
    <div className="job-detail p-4">
      <h4>Job Description</h4>
      <p>{description}</p>
 {keyResponsibilities?.length > 0 && (
        <>
          <h4>Key Responsibilities</h4>
          <ul className="list-style-two">
            {keyResponsibilities.map((responsibility, index) => (
              <li key={index}>{responsibility}</li>
            ))}
          </ul>
        </>
      )}

      {requiredSkills?.length > 0 && (
        <>
          <h4>Required Skills</h4>
          <ul className="list-style-one">
            {requiredSkills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default JobDetailsDescriptions;
