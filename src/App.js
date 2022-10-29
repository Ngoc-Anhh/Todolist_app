import './App.css';
import TodoList from './components/TodoList';
import About from './components/About';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";

function App() {
  return (
    <div className="todo-app">
      <h1>TODO APP</h1>
      <Router>
        <div style={{ color: '#6495ed', }}>
          <OldSchoolMenuLink
            activeOnlyWhenExact={true}
            to="/"
            label="Home"
          />
          <OldSchoolMenuLink to="/about" label="About" />

          <hr />

          <Switch>
            <Route exact path="/">
              <TodoList />
            </Route>
            <Route path="/about">
              <About />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}
function OldSchoolMenuLink({ label, to, activeOnlyWhenExact }) {
  let match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact
  });

  return (
    <div className={match ? "active" : ""}>
      {match && "> "}
      <Link to={to}>{label}</Link>
    </div>
  );
}

export default App;