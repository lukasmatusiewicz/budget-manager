import Skeleton from '../../atoms/Skeleton/Skeleton.jsx';
import './DashboardSkeleton.css';

const DashboardSkeleton = () => {
  return (
    <div className="dashboard-skeleton">
      <div className="summary-grid-skeleton">
        {[1, 2, 3].map(i => (
          <div key={i} className="card-skeleton">
            <Skeleton width="40px" height="40px" borderRadius="50%" />
            <div className="card-info-skeleton">
              <Skeleton width="100px" height="0.8rem" />
              <Skeleton width="150px" height="1.8rem" />
            </div>
          </div>
        ))}
      </div>
      <div className="recent-activity-skeleton">
        <Skeleton width="200px" height="1.5rem" className="title-skeleton" />
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="list-item-skeleton">
            <div className="item-info-skeleton">
              <Skeleton width="150px" height="1rem" />
              <Skeleton width="80px" height="0.7rem" />
            </div>
            <Skeleton width="100px" height="1.2rem" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardSkeleton;
