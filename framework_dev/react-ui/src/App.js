import './App.scss';
import useSWR from 'swr';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import NaverGreenDot from './components/NaverGreenDot';
import MainSearch from './components/MainSearch';

import BookList from './components/BookList';
import { useState } from 'react';

function App() {
  const [query, setQuery] = useState('');

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery); // 검색어 업데이트
  };

  // 페이지 컴포넌트
  function Home() {
    return <h2>Home Page</h2>;
  }

  function About() {
    return <h2>About Page</h2>;
  }

  function Contact() {
    return <h2>Contact Page</h2>;
  }

  return (
    <div className="App">
      <Router>
        <MainSearch onSearch={handleSearch} />
        <BookList query={query} />

        {/* 네비게이션 메뉴 */}
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>

        {/* 라우터 설정 */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
