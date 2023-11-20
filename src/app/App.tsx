import React, { Suspense } from 'react'
import { Routes, Route, Link } from 'react-router-dom';

// import { AboutPageAsync } from 'pages/AboutPage/ui/AboutPage.async';
// import { MainPageAsync } from 'pages/MainPage/ui/MainPage.async';

import { AboutPage } from 'pages/AboutPage';
import { MainPage } from 'pages/MainPage';
import { useTheme } from 'app/providers/ThemeProvider/';
import { classNames } from 'shared/lib/classNames/classNames';
import './styles/index.scss';



const App = () => {
  const {theme, toggleTheme} = useTheme();

  return (
    <div className={classNames('app', {}, [theme])}>
      <button onClick={toggleTheme}>TOGGLE</button>
      <Link to='/'>Главная</Link>
      <Link to='/about'>О сайте</Link>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>

          <Route path={'/about'} element={<AboutPage/>}/>
          <Route path={'/'} element={<MainPage/>}/>

        </Routes>
      </Suspense>
    </div>
  )
}

export default App;
