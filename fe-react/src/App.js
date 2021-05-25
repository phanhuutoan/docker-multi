import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Fib } from "./pages/Fib";
import { OtherPage } from "./pages/OtherPages";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Link to="/">Home page</Link>
          <Link to="/other-page">OtherPage</Link>
        </header>
        <Switch>
          <Route path="/" component={Fib} exact></Route>
          <Route path="/other-page" component={OtherPage}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
