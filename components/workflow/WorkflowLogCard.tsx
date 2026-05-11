import React from 'react';
import { Database, RefreshCw, Shield } from 'lucide-react';
import { WorkflowLog } from '../../types/workflow';

interface WorkflowLogCardProps {
  log: WorkflowLog;
}

const WorkflowLogCard: React.FC<WorkflowLogCardProps> = ({ log }) => {
  const getIcon = (id: string) => {
    switch (id) {
      case '1': return <Database size={16} />;
      case '2': return <RefreshCw size={16} />;
      case '3': return <Shield size={16} />;
      default: return <Database size={16} />;
    }
  };

  const getIconStyles = (status: WorkflowLog['status']) => {
    const baseStyles = "p-2 rounded-lg border";
    return status === 'done' 
      ? `${baseStyles} bg-surface-50 border-surface-200 text-slate-400`
      : `${baseStyles} bg-brand-50 border-brand-100 text-brand-600`;
  };

  const getTextStyles = (status: WorkflowLog['status']) => {
    return status === 'processing' 
      ? 'text-sm font-medium text-brand-900'
      : 'text-sm font-medium text-slate-700';
  };

  return (
    <div className="flex gap-4 items-start animate-in fade-in slide-in-from-left-2 duration-300">
      <div className={getIconStyles(log.status)}>
        {getIcon(log.id)}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <span className={getTextStyles(log.status)}>
            {log.text}
          </span>
          <span className="text-[10px] font-mono text-slate-400">{log.time}</span>
        </div>
        {log.id === '1' && (
          <div className="text-xs text-slate-500 font-mono">
            Initializing PostgreSQL tables for 850 students. Mapping fields: <span className="bg-surface-100 text-brand-600 px-1 rounded">student_id</span>, <span className="bg-surface-100 text-brand-600 px-1 rounded">parent_kyc</span>
          </div>
        )}
        {log.id === '2' && (
          <div className="text-xs text-slate-500 font-mono">
            Establishing secure debit order gateway. Verifying bank-grade service keys.
          </div>
        )}
        {log.id === '3' && log.status === 'processing' && (
          <div className="mt-2 flex gap-2">
            <div className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-1 rounded border border-emerald-100">SASA_COMPLIANT</div>
            <div className="text-[10px] bg-surface-100 text-slate-600 px-2 py-1 rounded border border-surface-200">AUTO_DRAFT</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkflowLogCard;
