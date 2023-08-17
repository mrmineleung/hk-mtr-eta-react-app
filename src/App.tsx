import React, { useEffect, useState, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import MTRNextTrain from './MTRNextTrain'
import './App.css';
import { Button, Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';



function App() {

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);


  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || ''
  );

  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  const toggleTheme = () => {
    if (theme === '') {
      setTheme('dark');
    } else {
      setTheme('');
    }
  };

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme;
  }, [theme]);

  return (
    <div className={`App ${theme}`}>
      <Suspense fallback="loading">
        <Row className="justify-content-md-end">
          <Col xs="auto">
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle caret>
                {t('lang_label')}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={(lang) => changeLanguage('zh')}>{t('lang_zh_hk_label')}</DropdownItem>
                <DropdownItem onClick={(lang) => changeLanguage('en')}>{t('lang_en_label')}</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Col>
          <Col xs="auto">
            <Button onClick={toggleTheme} color={theme === 'dark' ? 'secondary' : 'dark'}>{theme === 'dark' ? `☀️ ${t('light_mode_label')}` : `🌙 ${t('dark_mode_label')}`}</Button>
          </Col>
        </Row>
        <MTRNextTrain theme={theme}></MTRNextTrain>
      </Suspense>
    </div>
  );
}

export default App;
