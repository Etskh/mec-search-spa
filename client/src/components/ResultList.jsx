

export default class ResultList extends React.Component {
  constructor(props) {
    super(props);
  }

  renderResult(result) {
    return <div className="result" key={result.name}>
      <div className="resultName">{result.name}</div>
      <div className="resultImage"
      style={{
        backgroundImage: `url(${result.imageUri})`,
      }}></div>
      <div className="colours">
        {result.colours.map((colour) => {
          return <div key={colour}
            className="colourBox" style={{
              background: colour,
            }}></div>
        })}
      </div>
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
