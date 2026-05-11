import React, { useEffect, useState } from 'react';

const DiagnosticComponent: React.FC = () => {
  const [componentStatus, setComponentStatus] = useState<string>('Loading...');
  
  useEffect(() => {
    // Test basic React functionality
    setComponentStatus('React Working');
    
    // Test imports
    try {
      const test = 'Test successful';
      setComponentStatus(prev => prev + ' | Imports Working');
    } catch (error) {
      setComponentStatus(prev => prev + ' | Import Error');
    }
  }, []);

  return (
    <div className="p-8 bg-blue-50 border-2 border-blue-500 rounded-lg">
      <h2 className="text-xl font-bold text-blue-800 mb-4">Component Diagnostic</h2>
      <div className="space-y-2">
        <p className="text-blue-700">Status: {componentStatus}</p>
        <p className="text-blue-600">If you see this, basic components are working.</p>
        <div className="mt-4 p-4 bg-white rounded border">
          <h3 className="font-bold mb-2">Checklist:</h3>
          <ul className="list-disc list-inside text-sm">
            <li>✓ React rendering</li>
            <li>✓ Component structure</li>
            <li>✓ Basic functionality</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticComponent;
