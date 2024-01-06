import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import SavedItems from './components/SavedItems';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* Define routes for your components */}
          <Route path="/Home" component={Home} />
          <Route path="/SavedItems" component={SavedItems} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

