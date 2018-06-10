import { Switch, Route } from 'react-router-dom';


const Main = () => {
  return <div id="">
    This is the page.
  </div>
}

export class App extends React.Component {
  render() {
    return <div id="page">
      <Switch>
        <Route exact path='/' component={Main}/>
      </Switch>
    </div>;
  }
}
