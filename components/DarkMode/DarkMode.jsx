import React, { useContext, useEffect } from 'react';
import styles from './Darkmode.module.css';
import { ThemeContext } from '../../context/ThemeContext';

const DarkMode = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    useEffect(() => {
        if (typeof document !== 'undefined') {
            const setDarkMode = () => {
                document.querySelector('body').setAttribute('data-theme', 'dark');
            };
            const setLightMode = () => {
                document.querySelector('body').setAttribute('data-theme', 'light');
            };

            if (theme === 'dark') setDarkMode();
            else setLightMode();

        }
    }, [theme]);

    return (
        <div className={styles.dark_mode}>
            <input
                className={styles.dark_mode_input}
                type="checkbox"
                id="darkmode-toggle"
                onClick={toggleTheme}
            />
            <label className={styles.dark_mode_label} htmlFor="darkmode-toggle">
                <img className={styles.sun} src="/assets/svg's/Sun.svg" alt="Sun" />
                <img className={styles.moon} src="/assets/svg's/Moon.svg" alt="Moon" />
            </label>
        </div>
    );
};

export default DarkMode;
