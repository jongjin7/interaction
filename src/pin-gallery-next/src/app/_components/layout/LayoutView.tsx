'use client';

import React, { useEffect, useState } from 'react';
import { LoadingBasic as Loading } from '../loading/Loading';

const LayoutView = ({ containerId, pages, currentPage }) => {
  const [loadingElement, setLoadingElement] = useState(null);

  useEffect(() => {
    // Equivalent to attaching the loading element to the DOM
    if (!loadingElement) {
      // setLoadingElement(Loading('app-loading'));
    }
  }, [loadingElement]);

  useEffect(() => {
    // Append loading element to the body
    if (loadingElement) {
      // document.body.append(DomParser(loadingElement));
    }
  }, [loadingElement]);

  useEffect(() => {
    // Update the current page
    if (currentPage) {
      document.body.dataset.currentPage = currentPage;
    }
  }, [currentPage]);

  return (
    <div id={containerId}>
      {pages.map((page) => (
        <div key={page.id} id={page.id} className={`page-panel ${page.className}`}>
          <div className="page-container"></div>
        </div>
      ))}
    </div>
  );
};

export default LayoutView;
