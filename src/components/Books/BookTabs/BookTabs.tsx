import React, { useState } from 'react';
import { IBook } from '../../../types';

interface BookTabsProps {
  selectedBook: IBook;
}

const BookTabs: React.FC<BookTabsProps> = ({ selectedBook }) => {
  const [activeTab, setActiveTab] = useState('description');
  const handleTab = (tabId: string) => {
    setActiveTab(tabId);
  };
  return (
    <div className="book-main-description">
      <nav className="tabs-nav">
        <div
          className={`tab__header-block ${activeTab === 'description' ? 'tab__header-block_active' : ''}`}
        >
          <span
            className={`tab__header-block-title ${activeTab === 'description' ? 'tab__header-block-title_active' : ''}`}
            onClick={() => handleTab('description')}
          >
            Description
          </span>
        </div>
        <div
          className={`tab__header-block ${activeTab === 'authors' ? 'tab__header-block_active' : ''}`}
        >
          <span
            className={`tab__header-block-title ${activeTab === 'authors' ? 'tab__header-block-title_active' : ''}`}
            onClick={() => handleTab('authors')}
          >
            Authors
          </span>
        </div>
        <div
          className={`tab__header-block ${activeTab === 'reviews' ? 'tab__header-block_active' : ''}`}
        >
          <span
            className={`tab__header-block-title ${activeTab === 'reviews' ? 'tab__header-block-title_active' : ''}`}
            onClick={() => handleTab('reviews')}
          >
            Reviews
          </span>
        </div>
      </nav>

      <div className="tabs__body">
        <div className="tabs__body-item" id="description">
          <div
            className={`tab__body-content ${activeTab === 'description' ? 'active-tab' : ''}`}
          >
            {selectedBook.desc}
          </div>
        </div>
        <div className="tabs__body-item" id="authors">
          <div
            className={`tab__body-content ${activeTab === 'authors' ? 'active-tab' : ''}`}
          >
            {selectedBook.authors}
          </div>
        </div>
        <div className="tabs__body-item" id="reviews">
          <div
            className={`tab__body-content ${activeTab === 'reviews' ? 'active-tab' : ''}`}
          >
            There are not any review yet
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookTabs;
