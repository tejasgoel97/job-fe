const PopularSearch = ({expertiseData}) => {
  return (
    <div className="popular-searches" data-aos="fade-up" data-aos-delay="1000">
      <span className="title">Popular Searches : </span>
      {expertiseData.map((exp) => (
        <>
        <a href="#">{exp.name}</a>,{" "}
        </>
      ))}
      <a href="#">Designer</a>, <a href="#">Developer</a>, <a href="#">Web</a>,
      <a href="#"> IOS</a>, <a href="#">PHP</a>, <a href="#">Senior</a>,
      <a href="#"> Engineer</a>,
    </div>
  );
};

export default PopularSearch;
