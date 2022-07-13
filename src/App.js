import './css/App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Pages/Layout';
import HomePage from './components/Pages/HomePage';
import Profile from './components/Pages/Profile';
import NotFound from './components/Pages/NotFound';
import Game1 from './components/Pages/Games/Includes/Playfield/Game1';
import Game2 from './components/Pages/Games/Includes/Playfield/Game2';
import Game3 from './components/Pages/Games/Includes/Playfield/Game3';
import Game from './components/Pages/Games/Index';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<HomePage/>} />
          <Route path='games/:game' element={<Game/>}>
            {/* <Route path='1' element={<Game1/>} />
            <Route path='2' element={<Game2/>} />
            <Route path='3' element={<Game3/>} /> */}
          </Route>
          <Route path='profile/:login' element={<Profile/>} />
          <Route path='*' element={<NotFound/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
