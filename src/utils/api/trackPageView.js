// hooks/useHourlyPageView.ts
import { useEffect } from "react";
import axiosInstance from "./axiosInstance";



function getHourKey(visitorId, pageType, pageId) {
  const now = new Date();
  const y = now.getUTCFullYear();
  const m = String(now.getUTCMonth() + 1).padStart(2, "0");
  const d = String(now.getUTCDate()).padStart(2, "0");
  const h = String(now.getUTCHours()).padStart(2, "0");
  return `pv:${visitorId}:${pageType}:${pageId}:${y}${m}${d}${h}`;
}

export function useHourlyPageView(pageType, pageId) {
  useEffect(() => {
    if (!pageType || !pageId) return;
    console.log("Tracking page view:", pageType, pageId);
    const authStorageString = localStorage.getItem("auth-storage");

    // console.log("Auth Storage String:", JSON.parse(authStorageString));

    const visitorId = authStorageString
      ? JSON.parse(authStorageString)?.state?.user?.userId : getOrCreateVisitorId();

      console.log("Visitor ID:", visitorId);
      const visitorType = authStorageString ? JSON.parse(authStorageString)?.state?.user?.role[0] : "guest";
    function getOrCreateVisitorId() {
        const KEY = "visitor_id";
        let id = localStorage.getItem(KEY);
        if (!id) {
            id = crypto.randomUUID();
            localStorage.setItem(KEY, id);
        }
        return id;
    }
    const hourKey = getHourKey(visitorId, pageType, pageId);

    // frontend throttle — avoid hitting API more than once per hour for this page
    // if (sessionStorage.getItem(hourKey) === "1") return;

    axiosInstance.post("/track/page-view", {
       visitorId, pageType, pageId, visitorType 
    }).catch(() => {});

    sessionStorage.setItem(hourKey, "1");
  }, [pageType, pageId]);
}
