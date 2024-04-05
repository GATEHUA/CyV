const Label = ({ children, className = "", ...props }) => {
  return (
    <label
      {...props}
      className={`block text-sm font-medium text-gray-900 dark:text-white mb-2 ${className}`}
    >
      {children}
    </label>
  );
};

export default Label;
