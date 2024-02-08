import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import SavedItems from './components/SavedItems';
import SearchResults from './components/SearchResults';
import './styles.css'

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/SavedItems" element={<SavedItems/>} />
          <Route path="/SearchResults" element={<SearchResults/>} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;

