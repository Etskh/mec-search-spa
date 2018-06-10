

export default class ResultList extends React.Component {
  constructor(props) {
    super(props);
  }

  renderResult(result) {
    return <div className="result" style={{
      backgroundImage: `url(${result.imageUri})`,
    }}>
      <span>{result.name}</span>
    </div>
  }

  render() {
    return <div className="resultList">
      {this.props.results.length === 0 ?
        <p className="muted">No results</p>
        : this.props.results.map(this.renderResult)
      }
    </div>;
  }
}
