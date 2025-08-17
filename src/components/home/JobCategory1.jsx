import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/api/axiosInstance";
import jobCatContent from "../../data/job-catergories";

// Optional: fallback icon if you don't have per-category icons
const FALLBACK_ICON = "flaticon-briefcase";

// Optional: simple icon picker per category (extend as you like)
const iconForCategory = (name = "") => {
  const n = name.toLowerCase();
  if (n.includes("design")) return "flaticon-vector";
  if (n.includes("marketing")) return "flaticon-megaphone";
  if (n.includes("health")) return "flaticon-heart";
  if (n.includes("engineering") || n.includes("dev")) return "flaticon-web-programming";
  if (n.includes("finance")) return "flaticon-money-1";
  return FALLBACK_ICON;
};

const JobCategorie1 = () => {
  const [cats, setCats] = useState([]); // [{category, totalJobCount}]
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      setErr("");
      try {
        const { data } = await axiosInstance.get("/main/jobs-by-expertise");
        const list = Array.isArray(data?.data) ? data.data : [];
        // keep only needed fields and sort by count desc
        const normalized = list
          .map((c) => ({
            category: c?.category ?? "Uncategorized",
            totalJobCount: Number(c?.totalJobCount ?? 0),
          }))
          .sort((a, b) => b.totalJobCount - a.totalJobCount);

        setCats(normalized);
      } catch (e) {
        setErr(e?.response?.data?.message || e?.message || "Failed to load categories");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <>
        {Array.from({ length: 6 }).map((_, i) => (
          <div className="category-block col-lg-4 col-md-6 col-sm-12" key={`sk-${i}`}>
            <div className="inner-box">
              <div className="content">
                <span className={`icon ${FALLBACK_ICON}`}></span>
                <h4 className="placeholder-glow">
                  <span className="placeholder col-8">Loading…</span>
                </h4>
                <p className="placeholder-glow">
                  <span className="placeholder col-6"> </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }

  if (err) {
    return <div className="col-12 py-3 text-danger">{err}</div>;
  }

  if (!cats.length) {
    return <div className="col-12 py-3">No categories available.</div>;
  }

  return (
    <>
      {cats.map((item) => (
        <div
          className="category-block col-lg-4 col-md-6 col-sm-12"
          key={item.category}
        >
          <div className="inner-box">
            <div className="content">
              <span className={`icon ${iconForCategory(item.category)}`}></span>
              <h4>
                {/* Link with query param to preselect this category on the jobs list page */}
                <Link to={`/job-list?searchText=&location=&category=${encodeURIComponent(item.category)}`}>
                  {item.category}
                </Link>
              </h4>
              <p>({item.totalJobCount} open positions)</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default JobCategorie1;
