import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import './App.css'
import Count from './Count.jsx'
import List from "./List.jsx";
import MyMenu from "./Menu.jsx";

function App() {
    return (
        <>
            <BrowserRouter>
                <h1 className="text-3xl font-bold underline text-primary">
                    Hello world!
                </h1>
                <div style={{display:"flex", gap:'0.5rem', border:'2px dotted green', width: 300, justifyContent:'center'}}>
                    <Link to="/Count">
                        카운트
                    </Link>
                    |
                    <Link to="/List" >
                        리스트
                    </Link>
                </div>
                <h1>Vite + React 테스트</h1>
                <MyMenu style={{marginLeft: 'auto'}}></MyMenu>

                <Routes>
                    <Route path="/Count" element={<Count/>}></Route>
                    <Route path="/List" element={<List/>}></Route>
                    <Route path="*" element={<h3>메뉴를 골라라.</h3>}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
