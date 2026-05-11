import React from 'react';

const TestComponent: React.FC = () => {
  return (
    <div className="p-8 bg-green-100 border-2 border-green-500 rounded-lg">
      <h2 className="text-xl font-bold text-green-800">Test Component Working</h2>
      <p className="text-green-700">This component is rendering correctly.</p>
    </div>
  );
};

export default TestComponent;
