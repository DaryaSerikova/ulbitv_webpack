import React, { Suspense } from 'react'
import { Routes, Route, Link } from 'react-router-dom';

import { AppRouter } from './providers/router';
import { useTheme } from 'app/providers/ThemeProvider/';
import { Navbar } from 'widgets/Navbar';
import { classNames } from 'shared/lib/classNames/classNames';
import './styles/index.scss';
import { Sidebar } from 'widgets/Sidebar';
// import { Sidebar } from 'widgets/Sidebar/ui/Sidebar/Sidebar';



const App = () => {
  const {theme, toggleTheme} = useTheme();

  return (
    <div className={classNames('app', {}, [theme])}>
      <Navbar />
      <div className='content-page'>
        <Sidebar />
        <AppRouter />
      </div>
    </div>
  )
}

export default App;
