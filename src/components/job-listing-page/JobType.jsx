

import { useDispatch, useSelector } from "react-redux";
import { jobTypeCheck } from "@/features/job/jobSlice";
import { addJobType } from "@/features/filter/filterSlice";

const JobType = () => {
    const { jobTypeList } = useSelector((state) => state.job) || {};
    const dispatch = useDispatch();

    // dispatch job-type
    const jobTypeHandler = (e, id) => {
        dispatch(addJobType(e.target.value));
        dispatch(jobTypeCheck(id));
    };

    return (
        <ul className="switchbox">
            {jobTypeList?.map((item) => (
                <li key={item.id}>
                    <label className="switch">
                        <input
                            type="checkbox"
                            value={item.value}
                            checked={item.isChecked || false}
                            onChange={(e) => jobTypeHandler(e, item.id)}
                        />
                        <span className="slider round"></span>
                        <span className="title">{item.name}</span>
                    </label>
                </li>
            ))}
        </ul>
    );
};

export default JobType;
