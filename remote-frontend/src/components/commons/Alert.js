import "./Alert.css";

const Alert = ({ children, type }) => {
  const className = `alert alert-${type}`;
  return <div className={className}>{children}</div>;
};

export default Alert;
