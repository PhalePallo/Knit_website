import React from 'react';

const SimpleChart: React.FC = () => {
  const data = [
    { month: 'Jan', value: 4000, height: '80%' },
    { month: 'Feb', value: 3000, height: '60%' },
    { month: 'Mar', value: 5000, height: '100%' },
    { month: 'Apr', value: 2780, height: '56%' },
    { month: 'May', value: 1890, height: '38%' },
    { month: 'Jun', value: 2390, height: '48%' },
  ];
  
  return (
    <div className="bg-surface-50 rounded-xl p-4 border border-surface-200">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-slate-700">Revenue Trend</h4>
        <span className="text-xs text-slate-500">Last 6 months</span>
      </div>
      <div className="flex items-end justify-between h-48 px-2">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div className="w-full max-w-[30px] bg-brand-600 rounded-t" style={{ height: item.height }}>
              <div className="w-full h-full bg-gradient-to-t from-brand-600 to-brand-400 rounded-t"></div>
            </div>
            <span className="text-xs text-slate-600 mt-2">{item.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimpleChart;
