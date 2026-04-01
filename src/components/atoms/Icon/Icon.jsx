const Icon = ({ name, className = '' }) => {
  return (
    <svg className={`icon ${className}`}>
      <use href={`/icons.svg#${name}`} />
    </svg>
  );
};

export default Icon;
