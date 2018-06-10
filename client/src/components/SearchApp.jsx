
import SearchBox from './SearchBox';
import ErrorBox from './ErrorBox';
import ResultList from './ResultList';
import { searchApi } from '../lib/Api';

export default class SearchApp extends React.Component {
  constructor() {
    super();

    this.state = {
      error: null,
      isSearching: false,
      results: [],
    }

    this.onSearch = this.onSearch.bind(this);
  }

  onSearch(searchString) {
    this.setState({
      isSearching: true,
    });

    searchApi(searchString)
      .then( results => {
        this.setState({
          isSearching: false,
          results: results,
        });
      })
      .catch( error => {
        this.setState({
          error: 'Something went wrong',
          isSearching: false,
        });
      });
  }

  render() {
    return <div id="main">
      {this.state.error ?
        <ErrorBox>{this.state.error}</ErrorBox>
        : null}
      <SearchBox
        isSearching={this.state.isSearching}
        onSearch={this.onSearch}/>
      <ResultList
        results={this.state.results}/>
    </div>;
  }
}
