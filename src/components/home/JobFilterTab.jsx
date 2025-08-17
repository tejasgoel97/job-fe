import { Link, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import axiosInstance from "@/utils/api/axiosInstance";

const FALLBACK_LOGO =
  "https://www.shutterstock.com/image-vector/metallurgy-foundry-badge-logo-design-260nw-1848406672.jpg";

const JobFilterTab = () => {
  const location = useLocation();

  const [tabs, setTabs] = useState([
    { id: "all", name: "All", isActive: true }, // will be expanded with API categories
  ]);
  const [activeTabId, setActiveTabId] = useState("all");

  const [categories, setCategories] = useState([]); // raw API "data" array
  const [jobs, setJobs] = useState([]); // jobs to show for the active tab
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // derive initial category from querystring (?category=Design)
  const qsCategory = useMemo(() => {
    const p = new URLSearchParams(location.search);
    return (p.get("category") || "").trim();
  }, [location.search]);

  // Fetch categories + topJobs from API
  useEffect(() => {
    (async () => {
      setLoading(true);
      setErr("");
      try {
        const { data } = await axiosInstance.get("/main/jobs-by-expertise");
        const apiItems = Array.isArray(data?.data) ? data.data : [];

        // Build tabs from categories
        const categoryTabs = apiItems.map((c) => ({
          id: c.category,
          name: c.category,
          isActive: false,
        }));

        // Decide initial active tab:
        const initial =
          (qsCategory &&
            categoryTabs.find((t) => t.id.toLowerCase() === qsCategory.toLowerCase())?.id) ||
          "all";

        setTabs((prev) => {
          const merged = [
            { id: "all", name: "All", isActive: initial === "all" },
            ...categoryTabs.map((t) => ({ ...t, isActive: t.id === initial })),
          ];
          return merged;
        });

        setActiveTabId(initial);
        setCategories(apiItems);
      } catch (e) {
        setErr(e?.response?.data?.message || e?.message || "Failed to load jobs");
      } finally {
        setLoading(false);
      }
    })();
  }, [qsCategory]);

  // Compute jobs to show when activeTabId or categories change
  useEffect(() => {
    if (!categories?.length) {
      setJobs([]);
      return;
    }

    if (activeTabId === "all") {
      // Flatten all topJobs across categories (keep up to 6 per category as API promises)
      const flat = categories.flatMap((c) =>
        (c.topJobs || []).map((j) => ({ ...j, __category: c.category, __total: c.totalJobCount }))
      );
      setJobs(flat);
    } else {
      const picked = categories.find((c) => c.category === activeTabId);
      const list = (picked?.topJobs || []).map((j) => ({
        ...j,
        __category: picked?.category,
        __total: picked?.totalJobCount,
      }));
      setJobs(list);
    }
  }, [activeTabId, categories]);

  // tab handler
  const tabHandler = (id) => {
    setTabs((old) =>
      old.map((tab) => ({
        ...tab,
        isActive: tab.id === id,
      }))
    );
    setActiveTabId(id);
  };

  return (
    <>
      <ul className="tab-buttons">
        {tabs.map((tab) => (
          <li
            onClick={() => tabHandler(tab.id)}
            key={tab.id}
            className={`${tab.isActive ? "active-btn" : ""} tab-btn`}
          >
            {tab.name}
          </li>
        ))}
      </ul>

      <div className="tab active-tab" data-aos="fade-up">
        {loading && <div className="py-4">Loading jobs…</div>}
        {err && !loading && <div className="py-4 text-danger">{err}</div>}

        {!loading && !err && (
          <div className="row">
            {jobs.map((item) => {
              // Map new API shape → UI fields
              const id = item.id;
              const title = item.title;
              const companyName = item?.company?.name || "—";
              const companyLogo = item?.company?.logo || FALLBACK_LOGO;
              const city = item?.location?.city || "";
              const state = item?.location?.state || "";
              const country = item?.location?.country || "";
              const locText = [city, state, country].filter(Boolean).join(", ");
              const jobType = item?.jobType || "";
              const salaryFrom = item?.salary?.from ?? "";
              const salaryTo = item?.salary?.to ?? "";
              const currency = item?.salary?.currency || "";
              const createdAt = item?.createdAt;

              const formattedTime = createdAt
                ? new Date(createdAt).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "";

              const expertiseBadges =
                Array.isArray(item?.expertise) && item.expertise.length
                  ? item.expertise
                  : [];

              return (
                <div className="job-block col-lg-6 col-md-12 col-sm-12" key={id}>
                  <div className="inner-box">
                    <div className="content">
                      <span className="company-logo">
                        <img src={companyLogo} alt="item brand" />
                      </span>
                      <h4>
                        <Link to={`/job/${id}`}>
                          {title}
                          {companyName ? `, ${companyName}` : ""}
                        </Link>
                      </h4>

                      <ul className="job-info">
                        <li>
                          <span className="icon flaticon-briefcase"></span>
                          {companyName}
                        </li>
                        <li>
                          <span className="icon flaticon-map-locator"></span>
                          {locText || "Remote / Unspecified"}
                        </li>
                        <li>
                          <span className="icon flaticon-clock-3"></span> {formattedTime}
                        </li>
                        <li>
                          <span className="icon flaticon-money"></span>{" "}
                          {salaryFrom !== "" || salaryTo !== ""
                            ? `${currency} ${salaryFrom || "—"}${
                                salaryTo !== "" ? ` - ${salaryTo}` : ""
                              }`
                            : "Not disclosed"}
                        </li>
                      </ul>

                      <ul className="job-other-info">
                        {jobType && <li className="required">Type: {jobType}</li>}

                        {expertiseBadges.map((ex, i) => (
                          <li key={i} className="time">
                            {ex?.category || "Expertise"}
                            {Array.isArray(ex?.subcategories) && ex.subcategories.length
                              ? ` • ${ex.subcategories.join(", ")}`
                              : ""}
                          </li>
                        ))}
                      </ul>

                      <button className="bookmark-btn" aria-label="Bookmark">
                        <span className="flaticon-bookmark"></span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {!jobs.length && (
              <div className="col-12 py-4">No jobs found in this category.</div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default JobFilterTab;
