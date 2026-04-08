import { useTranslation } from 'react-i18next';
import CategoryStructure from '../../components/organisms/CategoryStructure/CategoryStructure.jsx';
import DailyStats from '../../components/organisms/DailyStats/DailyStats.jsx';
import QuickStatsTable from '../../components/organisms/QuickStatsTable/QuickStatsTable.jsx';
import './Reports.css';

const Reports = () => {
  const { t } = useTranslation();
  
  return (
    <div className="view-container">
      <h2>{t('reports.title')}</h2>
      <div className="reports-dashboard">
        <CategoryStructure type="expense" title={t('reports.expenses_structure')} />
        <CategoryStructure type="income" title={t('reports.incomes_structure')} />
        <QuickStatsTable />
        <DailyStats />
      </div>
    </div>
  );
};

export default Reports;
