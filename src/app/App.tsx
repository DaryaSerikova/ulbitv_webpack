import React, { Suspense } from 'react'
import { Routes, Route, Link } from 'react-router-dom';

import { AppRouter } from './providers/router';
import { useTheme } from 'app/providers/ThemeProvider/';
import { Navbar } from 'widgets/Navbar';
import { classNames } from 'shared/lib/classNames/classNames';
import './styles/index.scss';



const App = () => {
  const {theme, toggleTheme} = useTheme();

  return (
    <div className={classNames('app', {}, [theme])}>
      <Navbar />
      <AppRouter />
    </div>
  )
}

export default App;
