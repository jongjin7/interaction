import React, { useContext } from 'react';
import { AlbumContext } from '@/app/_data/CategoryProvider';
import Link from 'next/link';

interface Category {
  id: string;
  title: string;
}

const Tabs: React.FC = () => {
  const { categories } = useContext(AlbumContext);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, category: Category) => {
    event.preventDefault();
    console.log(`Category clicked: ${category.title}`);
    // 여기서 다른 동작을 수행할 수 있습니다.
  };

  return (
    <div className="tabs">
      <div className="tab-nav text-gray-400">
        <Link href="#all" onClick={(e) => handleClick(e, { id: 'all', title: '전체' })}>
          전체
        </Link>
        {categories.map((category) => (
          <Link href={`#${category.id}`} key={category.id} onClick={(e) => handleClick(e, category)}>
            {category.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
