import './App.css';
import { BrowserRouter as Router , Switch , Route } from 'react-router-dom'
import Landing from './modules/landing/landing.component';
import Home from './modules/home/home.component';

function App() {
  return (
    <Router>
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Landing/>
        </Route>
        {/* <Route path="/api/create">
          <CreateGame/>
        </Route>
        <Route path="/api/:id">
          <Details/>
        </Route> */}
        <Route path="/dogs">
          <Home/>
        </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
