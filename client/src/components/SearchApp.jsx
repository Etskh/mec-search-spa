import axios from 'axios';
import SearchBox from './SearchBox';
import ResultList from './ResultList';


export default class SearchApp extends React.Component {
  constructor() {
    super();

    this.state = {
      error: null,
      isSearching: false,
    }

    this.onSearch = this.onSearch.bind(this);
  }

  onSearch(searchString) {
    this.setState({
      isSearching: true,
    });

    // TODO: pull this out
    // Api.search('');
    axios.get('/api')
      .then((response) => {
        console.log(response);
        this.setState({
          isSearching: false,
        });
      })
      .catch((error) => {
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
      <ResultList/>
    </div>;
  }
}
