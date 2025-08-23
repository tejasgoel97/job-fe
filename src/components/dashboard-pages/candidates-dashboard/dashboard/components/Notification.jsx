import axiosInstance from "@/utils/api/axiosInstance";
import { useEffect, useState } from "react";

function formatNotification(notification) {
  let title = "";
  let message = "";
  let colorClass = "secondary"; // default gray

  if (notification.alertType === "NewJob") {
    title = "New Job Alert";
    message = `${notification.companyName} posted a new ${notification.jobTitle} position in ${notification.jobLocation}`;
    colorClass = "info"; // bootstrap blue
  } else if (notification.alertType === "ApplicationStatusChange") {
    title = "Application Status Update";
    message = `Your application for ${notification.jobTitle} at ${notification.companyName} has been ${notification.changedStatus}`;
    colorClass =
      notification.changedStatus === "rejected" ? "danger" : "success";
  } else {
    title = "Notification";
    message = `${notification.companyName || "A company"} sent you an update.`;
  }

  return {
    id: notification.jobId,
    title,
    message,
    colorClass,
    date: notification.date || new Date().toISOString(), // fallback
  };
}


const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axiosInstance.get("/notifications/candidate-notifications");
        if(!res.data || !res.data.success || !res.data.notifications.length) {
          console.log("No notifications found");
          return;
        }
        // map backend response into simplified array
  const formatted = res.data.notifications.map((n) => formatNotification(n));
        setNotifications(formatted);
        setNotifications(formatted);
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
      }
    };

    fetchNotifications();
  }, []);

  return (
<ul className="list-group">
      {notifications.length === 0 ? (
        <li className="list-group-item">No notifications yet.</li>
      ) : (
        notifications.map((n) => (
          <li
            key={n.id}
            className={`list-group-item list-group-item-${n.colorClass}`}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <strong>{n.title}</strong>
                <div>{n.message}</div>
              </div>
              <small className="text-muted">
                {new Date(n.date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </small>
            </div>
          </li>
        ))
      )}
    </ul>
  );
};

export default Notification;
