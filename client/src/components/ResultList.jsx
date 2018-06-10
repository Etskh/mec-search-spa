

export default class ResultList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
    };
  }

  render() {
    return <div className="resultList">
      <p>Results will show up here</p>
    </div>;
  }
}
