import React, { useEffect, useRef, useState } from 'react';
import ApiService from '@/app/_services/ApiService';
import { inputFieldClass, selectClass, buttonSecondaryClass, buttonDisabledClass } from '@/styles/tailwind.component';
import { Category } from '@/app/_types/galleryType';
import useAlbumStore from '@/app/_stores/useAlbumStore';

interface MainFormSelectProps {
  selectProps: {
    selectedCategory: string | undefined;
    setSelectedCategory: React.Dispatch<React.SetStateAction<string | undefined>>;
    disabledForm: boolean;
  };
}

const MainFormSelect: React.FC<MainFormSelectProps> = ({ selectProps }) => {
  const { categories, setCategories } = useAlbumStore();
  const { selectedCategory, setSelectedCategory, disabledForm } = selectProps;
  const [customCategory, setCustomCategory] = useState<string>('');
  const [customCategoryEnabled, setCustomCategoryEnabled] = useState<boolean>(false);
  const selectRef = useRef<HTMLSelectElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue);
    if (selectedValue === 'user_add') {
      setCustomCategoryEnabled(true);
    } else {
      setCustomCategory((prev) => (prev.length ? '' : prev));
      setCustomCategoryEnabled(false);
    }
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

  useEffect(() => {
    selectRef.current?.focus();
    inputRef.current?.focus();
  }, [selectedCategory, disabledForm]);

  return (
    <>
      <div className="flex w-full gap-2">
        <select
          ref={selectRef}
          className={selectClass}
          onChange={handleSelectChange}
          value={selectedCategory ?? ''}
          disabled={disabledForm}
        >
          <option value="">앨범 카테고리 선택</option>
          {categories.length > 0 &&
            categories.map((category) => {
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
        <div className="custom-field w-full">
          <div className="flex gap-2">
            <input
              type="text"
              className={inputFieldClass}
              placeholder="입력하세요"
              value={customCategory}
              onChange={handleChangeCategoryInput}
              ref={inputRef}
            />
            <button
              className={`rounded w-2/4 ${buttonSecondaryClass} ${(customCategory?.length ?? 0) < 1 ? buttonDisabledClass : ''}`}
              onClick={handleAddCategory}
              disabled={customCategory?.length < 1}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MainFormSelect;
