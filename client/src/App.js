import './css/App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Pages/Layout';
import HomePage from './components/Pages/HomePage/HomePage';
import Profile from './components/Pages/Profile/Profile';
import NotFound from './components/Pages/NotFound';
import Intro from './components/Pages/Games/Intro/Intro';
import Playfield from './components/Pages/Games/Playfield/Playfield';
import Games from './components/Pages/Games/Index/Games';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='games'element={<Games />} />
          <Route path='games/:gameURL'>
            <Route index element={<Intro />} />
            <Route path='playfield' element={<Playfield />} />
          </Route>
          <Route path='profile/:login' element={<Profile />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
