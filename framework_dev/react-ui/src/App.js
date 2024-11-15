import './App.scss';
import useSWR from 'swr';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import NaverGreenDot from './components/NaverGreenDot';
import MainSearch from '@pattern/MainSearch';
import { useEffect, useState } from 'react';
import { getStorage, hasStorage, removeStorage, setStorage } from './utils/storage';
import { fetchBooks } from './api/book';

function App() {
  const [data, setData] = useState(null);

  //도서
  const [query, setQuery] = useState('');
  const {
    data: bookData = [],
    error,
    isLoading,
  } = useSWR(query ? ['books', query] : null, () => fetchBooks(query), {
    revalidateOnFocus: false, // 포커싱 시 재요청 방지
  });

  console.log('bookData ==>', bookData);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = e.target.search.value.trim();
    setQuery(searchTerm);
  };

  useEffect(() => {
    // localStorage에서 데이터 가져오기
    const storedData = getStorage('userData');
    if (storedData) {
      setData(storedData);
    }

    // sessionStorage에 데이터 저장
    setStorage('sessionKey', { user: 'John Doe' }, true); // sessionStorage에 저장

    // localStorage에 저장
    setStorage('userData', { name: 'Alice', age: 30 });

    // localStorage에서 데이터 삭제
    // removeStorage('userData');

    // localStorage 전체 삭제
    // clearStorage();
  }, []);

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
        <MainSearch />

        {/* 스토리지 테스트 */}
        <p>{data ? `User: ${data.name}, Age: ${data.age}` : 'No data stored'}</p>
        <button onClick={() => removeStorage('userData')}>Remove User Data</button>
        <button onClick={() => alert(hasStorage('userData') ? 'Data exists' : 'No data')}>Check if data exists</button>

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

      <fieldset>
        <legend>Book Search</legend>
        <form onSubmit={handleSearch}>
          <input type="text" name="search" placeholder="Enter book title" defaultValue={query} autoComplete="off" />
          <button type="submit">Search</button>
        </form>

        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}

        <ul>
          {bookData?.documents?.map((book, index) => (
            <li key={index}>
              <img src={book.thumbnail} alt={book.title} />
              <p>{book.title}</p>
              <p>{book.authors.join(', ')}</p>
            </li>
          ))}
        </ul>
      </fieldset>
    </div>
  );
}

export default App;
