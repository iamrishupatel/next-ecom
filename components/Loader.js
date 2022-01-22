const Loader = ({ show, ...props }) =>
  show ? <div className="loader" {...props} /> : null;

export default Loader;
