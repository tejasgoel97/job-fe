const InfoDataPoints = ({header, points}) =>{
    console.log(points)
    return (
          <div className="job-detail">
      <h4>{header}</h4>
      <ul className="list-style-three">
      {points.map((po)=>{
        return  <li>
        {po}
      </li>
      })}
    </ul>
    </div>
    )
}

export default InfoDataPoints