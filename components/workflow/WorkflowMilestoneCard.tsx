import React from 'react';
import { Database, Shield, LayoutDashboard, Check } from 'lucide-react';
import { WorkflowMilestone } from '../../types/workflow';

interface WorkflowMilestoneCardProps {
  milestone: WorkflowMilestone;
}

const WorkflowMilestoneCard: React.FC<WorkflowMilestoneCardProps> = ({ milestone }) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'db': return <Database size={20} />;
      case 'compliance': return <Shield size={20} />;
      case 'dashboard': return <LayoutDashboard size={20} />;
      default: return <Database size={20} />;
    }
  };

  const getStatusColor = (status: WorkflowMilestone['status']) => {
    switch (status) {
      case 'done': return 'text-emerald-600';
      case 'processing': return 'text-brand-600';
      case 'pending': return 'text-slate-400';
      default: return 'text-slate-400';
    }
  };

  const getStatusIcon = (status: WorkflowMilestone['status']) => {
    return status === 'done' ? <Check size={16} /> : null;
  };

  return (
    <div className="bg-white rounded-xl border border-surface-200 p-6 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getStatusColor(milestone.status)}`}>
          {getIcon(milestone.id)}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-brand-950 mb-2 flex items-center gap-2">
            {milestone.title}
            {getStatusIcon(milestone.status)}
          </h4>
          <p className="text-sm text-slate-600 mb-4">{milestone.desc}</p>
          {milestone.items.length > 0 && (
            <div className="space-y-2">
              {milestone.items.map((item, index) => (
                <div key={index} className="text-xs text-slate-500 font-mono bg-surface-50 px-3 py-2 rounded border border-surface-100">
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkflowMilestoneCard;
