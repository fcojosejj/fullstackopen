import { useSelector } from "react-redux";

const Message = () => {
  const message = useSelector((state) => state.notification);

  if (message === '') {
    return null;
  }

  return <div className="message">{message}</div>;
};

export default Message;
