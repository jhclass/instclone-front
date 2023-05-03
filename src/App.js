import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';




function App() {
  return (
    <>

      <Router>
        <Switch>
          <Route path="/" exact>
            <h1>Home</h1>
          </Route>
          <Route path="/banana">
            <h1>banana</h1>
          </Route>
        </Switch>

      </Router>

    </>
  );
}

export default App;
