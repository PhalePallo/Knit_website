import { useState, useEffect, useCallback } from 'react';
import { Phase, WorkflowLog, WorkflowMilestone } from '../types/workflow';
import { WORKFLOW_TEXT, WORKFLOW_LOGS, WORKFLOW_MILESTONES } from '../constants/workflow';

export const useWorkflowDemo = () => {
  const [phase, setPhase] = useState<Phase>('input');
  const [inputValue, setInputValue] = useState('');
  const [logs, setLogs] = useState<WorkflowLog[]>([]);
  const [milestones, setMilestones] = useState<WorkflowMilestone[]>([]);

  const resetDemo = useCallback(() => {
    setPhase('input');
    setInputValue('');
    setLogs([]);
    setMilestones([]);
  }, []);

  const startProcessing = useCallback(() => {
    setLogs([]);
    
    WORKFLOW_LOGS.forEach((step, index) => {
      setTimeout(() => {
        setLogs(prev => [...prev, { 
          ...step, 
          status: index === WORKFLOW_LOGS.length - 1 ? 'processing' : 'done' 
        }]);
        
        if (index === WORKFLOW_LOGS.length - 1) {
          setTimeout(() => setPhase('setup'), WORKFLOW_TEXT.PROCESSING_TO_SETUP_DELAY);
        }
      }, WORKFLOW_TEXT.LOG_DELAY * index);
    });
  }, []);

  // Auto-typing effect
  useEffect(() => {
    if (phase === 'input') {
      setInputValue('');
      let i = 0;
      const timer = setInterval(() => {
        setInputValue(WORKFLOW_TEXT.AUTO_TYPE_MESSAGE.substring(0, i + 1));
        i++;
        if (i >= WORKFLOW_TEXT.AUTO_TYPE_MESSAGE.length) {
          clearInterval(timer);
          setTimeout(startProcessing, WORKFLOW_TEXT.PROCESSING_DELAY);
        }
      }, WORKFLOW_TEXT.AUTO_TYPE_SPEED);
      
      return () => clearInterval(timer);
    }
  }, [phase, startProcessing]);

  // Setup phase animation
  useEffect(() => {
    if (phase === 'setup') {
      setMilestones([]);
      const initialMilestones = WORKFLOW_MILESTONES.map(m => ({ ...m, status: 'pending' as const }));
      setMilestones(initialMilestones);

      let current = 0;
      const interval = setInterval(() => {
        setMilestones(prev => prev.map((m, idx) => {
          if (idx === current) return { ...m, status: 'processing' as const };
          if (idx < current) return { ...m, status: 'done' as const };
          return m;
        }));

        current++;
        if (current > initialMilestones.length) {
          clearInterval(interval);
          setTimeout(() => setPhase('operate'), WORKFLOW_TEXT.SETUP_TO_OPERATE_DELAY);
        }
      }, WORKFLOW_TEXT.MILESTONE_DELAY);
      
      return () => clearInterval(interval);
    }
  }, [phase]);

  return {
    phase,
    inputValue,
    logs,
    milestones,
    resetDemo,
  };
};
