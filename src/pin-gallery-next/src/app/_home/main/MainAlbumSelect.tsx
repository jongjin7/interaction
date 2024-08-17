import React, { useContext, useState } from 'react';
import { CategoryContext } from '@/app/_data/CategoryProvider';
import { inputFieldClass } from '@/styles/tailwind.component';

interface Category {
  id: string;
  title: string;
}

const MainAlbumSelect: React.FC = () => {
  const { categories } = useContext(CategoryContext);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [customCategory, setCustomCategory] = useState<string>('');
  const [customCategoryEnabled, setCustomCategoryEnabled] = useState<boolean>(false);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedCategory(selectedValue);
    setCustomCategoryEnabled(selectedValue === 'user_add');
  };

  const handleCustomCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomCategory(e.target.value);
  };

  const handleAddCategory = () => {
    if (customCategory.trim()) {
      categories.push({ id: customCategory, title: customCategory });
      setSelectedCategory(customCategory);
      setCustomCategory('');
      setCustomCategoryEnabled(false);
    }
  };

  return (
    <>
      <div className="flex w-full gap-2">
        <select id="category-select" className={inputFieldClass} onChange={handleSelectChange} value={selectedCategory}>
          <option value="">앨범을 선택하세요</option>
          {categories.map((category: Category) => (
            <option value={category.id} key={category.id}>
              {category.title}
            </option>
          ))}
          <option value="user_add">신규 카테고리 직접 입력</option>
        </select>
      </div>

      {customCategoryEnabled && (
        <div className="custom-field w-full mt-2">
          <div className="flex gap-2">
            <input
              type="text"
              id="add-category"
              className={inputFieldClass}
              placeholder="입력하세요"
              value={customCategory}
              onChange={handleCustomCategoryChange}
            />
            <button className="rounded border border-stroke w-2/4" onClick={handleAddCategory}>
              확인
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MainAlbumSelect;
