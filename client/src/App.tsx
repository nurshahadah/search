import React from 'react';
import './App.css';
import SearchBox from './domain/SearchBox/SearchBox';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import DetailPage from './screen/DetailPage/DetailPage';

function App() {
  return (
    <div className='App'>
      <Router>
        <SearchBox />
        <Switch>
          <Route path='/newfeed/:id' exact={true} component={DetailPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
