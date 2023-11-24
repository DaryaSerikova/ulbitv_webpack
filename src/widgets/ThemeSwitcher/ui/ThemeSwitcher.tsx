import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import cls from './ThemeSwitcher.module.scss';

import LightIcon from "../../../shared/assets/icons/theme-light.svg";
import DarkIcon from "../../../shared/assets/icons/theme-dark.svg";

// import { Theme } from 'app/providers/ThemeProvider/lib/ThemeContext';

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = ({className}: ThemeSwitcherProps) => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      className={classNames(cls.ThemeSwitcher, {}, [className])}
      onClick={toggleTheme}
    >

        {/* TOGGLE */}
        {/* {theme === Theme.DARK}<DarkIcon /> */}

    </button>
  )
}

