import React, { useContext, useState } from 'react';
import ApiService from '@/app/_services/ApiService';
import { AlbumContext } from '@/app/_providers/AlbumProvider';
import { inputFieldClass } from '@/styles/tailwind.component';
import { Category } from '@/app/_types/galleryType';

interface MainFormSelectProps {
  selectProps: {
    selectedCategory: string | undefined;
    setSelectedCategory: React.Dispatch<React.SetStateAction<string | undefined>>;
    disabledForm: boolean;
  };
}

const MainFormSelect: React.FC<MainFormSelectProps> = ({ selectProps }) => {
  const albumContext = useContext(AlbumContext);

  if (!albumContext) {
    throw new Error('AlbumContext must be used within an AlbumProvider');
  }
  const { categories, setCategories } = albumContext;
  const { selectedCategory, setSelectedCategory, disabledForm } = selectProps;
  const [customCategory, setCustomCategory] = useState<string>('');
  const [customCategoryEnabled, setCustomCategoryEnabled] = useState<boolean>(false);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue);
    setCustomCategoryEnabled(selectedValue === 'user_add');
  };

  const handleChangeCategoryInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomCategory(e.target.value);
  };

  const handleAddCategory = async () => {
    if (customCategory.trim()) {
      const formData = new FormData();
      formData.append('title', customCategory);
      formData.append('description', `${customCategory} 이름으로 만든 앨범입니다.`);
      const res = await ApiService.addNewCategory(formData);
      const newCategory = { id: res.data.id, title: customCategory, name: '' };
      setCategories([...categories, newCategory]); // 기존 카테고리에 새 카테고리를 추가
      setSelectedCategory(newCategory.id);
      setCustomCategory('');
      setCustomCategoryEnabled(false);
    }
  };

  return (
    <>
      <div className="flex w-full gap-2">
        <select
          className={inputFieldClass}
          onChange={handleSelectChange}
          value={selectedCategory ?? ''}
          disabled={disabledForm}
        >
          <option value="">앨범을 선택하세요</option>
          {categories.map((category) => {
            const normalizedCategory: Category = {
              id: category.id,
              title: category.title || category.name,
              name: category.name,
            };
            return (
              <option value={normalizedCategory.id} key={normalizedCategory.id}>
                {normalizedCategory.title}
              </option>
            );
          })}
          <option value="user_add">신규 카테고리 직접 입력</option>
        </select>
      </div>

      {customCategoryEnabled && (
        <div className="custom-field w-full mt-2">
          <div className="flex gap-2">
            <input
              type="text"
              className={inputFieldClass}
              placeholder="입력하세요"
              value={customCategory}
              onChange={handleChangeCategoryInput}
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

export default MainFormSelect;
