import './css/App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Pages/Layout';
import HomePage from './components/Pages/HomePage';
import Profile from './components/Pages/Profile';
import NotFound from './components/Pages/NotFound';
import Intro from './components/Pages/Games/includes/Intro/IntroIndex';
import Game from './components/Pages/Games/GameIndex';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<HomePage/>} />
          <Route path='games/:gameURL'>
            <Route index element={<Intro/>} />
            <Route path='playfield' element={<Game/>} />
          </Route>
          <Route path='profile/:login' element={<Profile/>} />
          <Route path='*' element={<NotFound/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;