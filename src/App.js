import AppHeader from "./cmps/AppHeader";
import { Container } from "@material-ui/core";
import SimpleBottomNavigation from "./cmps/main-nav";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import routes from './routes'


 function App() {
  return (
    <>
      <AppHeader />
      <div className="app">
        <Container>
          <Switch>
            {routes.map(route => (
              <Route path={route.path} exact key={route.path} component={route.component} />
            ))}
          </Switch>
        </Container>
      </div>
      <SimpleBottomNavigation />
    </>
  )
}
export default App
