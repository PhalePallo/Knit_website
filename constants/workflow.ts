export const WORKFLOW_TEXT = {
  AUTO_TYPE_MESSAGE: "I run a private school with 850 students. I need to automate tuition recovery and manage annual enrollments.",
  AUTO_TYPE_SPEED: 50,
  PROCESSING_DELAY: 1000,
  LOG_DELAY: 1500,
  MILESTONE_DELAY: 1500,
  SETUP_TO_OPERATE_DELAY: 2000,
  PROCESSING_TO_SETUP_DELAY: 3000,
} as const;

export const WORKFLOW_LOGS = [
  { id: '1', text: 'Creating Student Schema', time: '0.4s' },
  { id: '2', text: 'Connecting Netcash Pipe', time: '1.2s' },
  { id: '3', text: 'Injecting Schools Act Guardrails', time: 'Processing...' },
] as const;

export const WORKFLOW_MILESTONES = [
  {
    id: 'db',
    title: 'Database Module',
    desc: 'Provisioning relational storage for academic records & ledgers.',
    items: ['PostgreSQL Instance: school-db-primary-01', 'Schema: students, guardians, tuition, enrollment']
  },
  {
    id: 'compliance',
    title: 'Compliance Guardrail Module',
    desc: 'Enforcing South African regulatory standards for educational institutions.',
    items: ['SASA (South African Schools Act)', 'FICA Verification Logic']
  },
  {
    id: 'dashboard',
    title: 'Bursar Dashboard Module',
    desc: 'Configuring front-end management layer for finance teams.',
    items: []
  },
] as const;

export const CHART_DATA = [
  { name: 'Jan', value: 4000, date: '2024-01' },
  { name: 'Feb', value: 3000, date: '2024-02' },
  { name: 'Mar', value: 5000, date: '2024-03' },
  { name: 'Apr', value: 2780, date: '2024-04' },
  { name: 'May', value: 1890, date: '2024-05' },
  { name: 'Jun', value: 2390, date: '2024-06' },
  { name: 'Jul', value: 3490, date: '2024-07' },
] as const;

export const COMPACT_STYLES = {
  transform: 'scale(0.55)',
  transformOrigin: 'top center' as const,
  height: '180%',
  width: '182%',
} as const;
