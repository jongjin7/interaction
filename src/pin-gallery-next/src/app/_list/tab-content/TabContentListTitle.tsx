import React from 'react';

interface PanelTitleProps {
  title: string;
  subtitle?: string;
  itemLength?: number;
}

const TabContentListTitle: React.FC<PanelTitleProps> = ({ ...props }) => {
  const { title, subtitle, itemLength } = props;
  return (
    <div className="list-header">
      <div className="title">
        <h2 className="font-semibold">
          {title} {!subtitle && itemLength ? `(${itemLength})` : ''}
        </h2>
        {/* ${info.subtitle ? `<small class='text-gray-500'>${info.subtitle}(${info.itemLength})</small>` : ''} */}
      </div>
    </div>
  );
};

export default TabContentListTitle;
