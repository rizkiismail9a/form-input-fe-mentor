import "./toast-message.css";
import { motion } from "framer-motion";

type Props = {
  message: string;
};

const framerOptions = {
  initial: { opacity: 0, y: -100 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -100 },
  transition: { duration: 0.2 },
};

export const ToastMessage = ({ message }: Props) => {
  return (
    <motion.div {...framerOptions}>
      <div className="toast-container">
        <div className="toast-header">
          <i className="fa-regular fa-circle-check"></i>
          <span>Message Sent!</span>
        </div>
        <div className="toast-message">{message}</div>
      </div>
    </motion.div>
  );
};
