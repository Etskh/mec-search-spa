

export default class SearchBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchString: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  onChange(event) {
    if( event.key === 'Enter' ) {
      return this.onSearch();
    }

    this.setState({
      searchString: event.target.value,
    });
  }

  onSearch() {
    // If we're already searching, dont search again!
    if( !this.props.isSearching ) {
      this.props.onSearch(this.state.searchString);
    }
  }

  render() {
    return <div className="searchBox">
      <input
        readOnly={this.props.isSearching}
        className="searchInput"
        type='text'
        placeholder='Search for something...'
        onKeyUp={this.onChange}
      />
      <a className={`button searchButton ${this.props.isSearching?'disabled':''}`}
        onClick={this.onSearch}>
        {this.props.isSearching ?
          <i className="fa fa-spinner fa-pulse"></i>
          : <i className="fa fa-search"></i>}
      </a>
    </div>;
  }
}
