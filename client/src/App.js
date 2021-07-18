import './App.css';
import { BrowserRouter as Router , Switch , Route } from 'react-router-dom'
import Landing from './modules/landing/landing.component';
import Home from './modules/home/home.component';
import DogDetail from './modules/dog-detail/dog-detail.component';
import CreateDog from './modules/create-dog/create-dog.component';

function App() {
  return (
    <Router>
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Landing/>
        </Route>
        <Route path="/dogs/create">
          <CreateDog/>
        </Route>
        <Route path="/dogs/:id">
          <DogDetail/>
        </Route>
        <Route path="/dogs">
          <Home/>
        </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
