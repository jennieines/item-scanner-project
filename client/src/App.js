import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import SavedItems from './components/SavedItems';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          {/* Define routes for your components */}
          <Route path="/home" component={Home} />
          <Route path="/saved-items" component={SavedItems} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

