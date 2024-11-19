import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TestSections from './pages/TestSections';
import ListeningTest from './pages/ListeningTest';
import ReadingTest from './pages/ReadingTest';
import WritingTest from './pages/WritingTest';
import SpeakingTest from './pages/SpeakingTest';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test/:testId/sections" element={<TestSections />} />
        <Route path="/test/:testId/listening" element={<ListeningTest />} />
        <Route path="/test/:testId/reading" element={<ReadingTest />} />
        <Route path="/test/:testId/writing" element={<WritingTest />} />
        <Route path="/test/:testId/speaking" element={<SpeakingTest />} />
      </Routes>
    </Router>
  );
}

export default App;