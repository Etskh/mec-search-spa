import { Switch, Route } from 'react-router-dom';
import SearchApp from './SearchApp';

export class App extends React.Component {
  render() {
    return <div id="page">
      <Switch>
        <Route exact path='/mec/*' component={SearchApp}/>
      </Switch>
    </div>;
  }
}
