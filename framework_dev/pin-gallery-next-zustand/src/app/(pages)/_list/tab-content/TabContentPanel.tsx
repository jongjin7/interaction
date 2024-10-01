import React from 'react';

interface TabContentPanelProps {
  children: React.ReactNode;
  index?: number;
}
const TabContentPanel: React.FC<TabContentPanelProps> = ({ children, index = 0 }) => {
  return (
    <div className="tab-panel" id={`tab-panel-${index}`}>
      {children}
    </div>
  );
};

export default TabContentPanel;
