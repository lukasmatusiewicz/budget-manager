import Icon from '../../atoms/Icon/Icon.jsx';

const SummaryCard = ({ title, amount, iconName, type }) => {
  return (
    <div className={`card ${type}`}>
      <Icon name={iconName} />
      <div className="card-info">
        <h3>{title}</h3>
        <p className="amount">{amount}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
