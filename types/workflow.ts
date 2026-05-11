export type Phase = 'input' | 'setup' | 'operate';

export interface WorkflowLog {
  id: string;
  text: string;
  status: 'pending' | 'processing' | 'done';
  time?: string;
}

export interface WorkflowMilestone {
  id: string;
  title: string;
  desc: string;
  status: 'pending' | 'processing' | 'done';
  items: string[];
}

export interface KnitWorkflowDemoProps {
  compact?: boolean;
  headless?: boolean;
}

export interface ChartData {
  name: string;
  value: number;
  date: string;
}

export type ChartDataArray = readonly ChartData[];
