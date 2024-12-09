import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Импортируем маршруты

// Импортируем главную страницу
import Home from './views/Home';

const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />  {/* Рендерим App для страницы входа */}
        <Route path="/home" element={<Home />} />  {/* Главная страница после логина */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
