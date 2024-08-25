import React from 'react';

interface ListTitleProps {
  title: string;
  subTitle: string | undefined;
  itemLength?: number;
}

const TabContentListTitle: React.FC<ListTitleProps> = ({ ...props }) => {
  const { title, subTitle, itemLength } = props;
  return (
    <div className="list-header">
      <div className="title">
        <h2 className="font-semibold">
          {title} {!subTitle && itemLength ? `(${itemLength})` : ''}
        </h2>
        {subTitle ? (
          <small className="text-gray-500">
            {subTitle}
            {` (${itemLength})`}
          </small>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default TabContentListTitle;
