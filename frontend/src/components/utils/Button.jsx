const Button = ({ children, onClick, className, ...props }) => {
  return (
    <button
      onClick={onClick}
      {...props}
      className={`text-white focus:outline-none rounded-lg text-center  focus:ring-4
        ${className}
        `}
    >
      {children}
    </button>
  );
};

export default Button;
