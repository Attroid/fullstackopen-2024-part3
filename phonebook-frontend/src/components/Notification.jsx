const Notification = ({ message, type }) => {
  if (!message) {
    return null;
  }

  let className = "notification";

  if (type === "error") {
    className += " notification-error";
  } else if (type === "success") {
    className += " notification-success";
  }

  return <div className={className}>{message}</div>;
};

export default Notification;
