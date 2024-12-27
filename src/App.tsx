import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TestSections from './pages/TestSections';
import ListeningTest from './pages/ListeningTest';
import ReadingTest from './pages/ReadingTest';
import WritingTest from './pages/WritingTest';
import SpeakingTest from './pages/SpeakingTest';
import ScoreScreen from './pages/ScoreScreen';
import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test/:testId/sections" element={
          <>
            <SignedIn>
              <TestSections />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        } />
        <Route path="/test/:testId/listening" element={
          <>
            <SignedIn>
              <ListeningTest />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        } />
        <Route path="/test/:testId/reading" element={
          <>
            <SignedIn>
              <ReadingTest />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        } />
        <Route path="/test/:testId/writing" element={
          <>
            <SignedIn>
              <WritingTest />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        } />
        <Route path="/test/:testId/speaking" element={
          <>
            <SignedIn>
              <SpeakingTest />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        } />
        <Route path="/test/:testId/score" element={
          <>
            <SignedIn>
              <ScoreScreen />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;