import React, { useEffect, useState } from 'react';
import MTRNextTrain from './MTRNextTrain'
import './App.css';
import { Button, Row, Col } from 'reactstrap';



function App() {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || ''
  );

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
      <Row className="justify-content-md-end">
        <Col xs="auto">
          <Button onClick={toggleTheme} color={theme === 'dark' ? 'secondary' : 'dark'}>{theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}</Button>
        </Col>
      </Row>
      <MTRNextTrain theme={theme}></MTRNextTrain>
    </div>
  );
}

export default App;
