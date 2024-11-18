import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ListeningTest from './pages/ListeningTest';
import ReadingTest from './pages/ReadingTest';
import WritingTest from './pages/WritingTest';
import SpeakingTest from './pages/SpeakingTest';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listening" element={<ListeningTest />} />
        <Route path="/reading" element={<ReadingTest />} />
        <Route path="/writing" element={<WritingTest />} />
        <Route path="/speaking" element={<SpeakingTest />} />
      </Routes>
    </Router>
  );
}

export default App;