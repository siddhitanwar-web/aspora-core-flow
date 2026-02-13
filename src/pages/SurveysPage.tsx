import { SurveysTab } from '@/components/performance/SurveysTab';
import { PageHeader } from '@/components/common/PageHeader';

export default function SurveysPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader
        title="Surveys"
        description="Employee engagement and pulse surveys"
      />
      <SurveysTab />
    </div>
  );
}
