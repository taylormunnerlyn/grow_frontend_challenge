import React from 'react';


var RESULTS = [];

var RESULTS_LENGTH = RESULTS.length;

var REP_FIRST_NAME = "";
var REP_LAST_NAME = "";
var REP_DISTRICT = "";
var REP_PHONE = "";
var REP_OFFICE = "";

export class SearchResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {displayRepDetail: false,}

        this.renderRepDetail = this.renderRepDetail.bind(this);
        this.renderSearchResults = this.renderSearchResults.bind(this);
    }

    renderRepDetail(this_result, event) {

        var n = this_result.name.split(" ");

        REP_FIRST_NAME = n[0];
        REP_LAST_NAME = n[n.length -1];
        REP_DISTRICT = this_result.district;
        REP_PHONE = this_result.phone;
        REP_OFFICE = this_result.office;

        this.setState({displayRepDetail: true});

    }

    renderSearchResults(this_result, i) {
        return (
            <tr key={i} className="rep-list-item" onClick={this.renderRepDetail.bind(null, this_result)}>
                <td className="col-xs-9"><a>{this_result.name}</a></td>
                <td className="col-xs-3">{this_result.party.charAt(0)}</td>
            </tr>
        );
    }

    componentDidUpdate() {
        if (RESULTS_LENGTH !== RESULTS.length) {
            RESULTS_LENGTH = RESULTS.length;
            this.setState({displayRepDetail: false});
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.submitUrl !== ''){
            var url = nextProps.submitUrl;
            fetch(url)
            .then(res => {
              return res.json();
            })
            .then(data => { 
              RESULTS = data.results;
              this.setState(this.state);
            });
        }
    }
    render() {
        var displayRepDetail = this.state.displayRepDetail

        let searchResults;

        if (RESULTS.length > 0) {
            searchResults = (
                <div>
                <h2>List / <span className="rep-list-blue-h2-text">Representatives</span></h2>
                <table className="table table-hover">
                    <thead>
                        <tr className="active">
                            <th className="col-xs-9">Name</th>
                            <th className="col-xs-3">Party</th>
                        </tr>
                    </thead>
                    <tbody>
                        {RESULTS.map(this.renderSearchResults)}
                    </tbody>
                </table>
                </div>
            );
        }

        let repDetail;

        if (displayRepDetail) {
            repDetail = (
                <div>
                <h2>Info</h2>
                <input className="form-control rep-detail-item" value={REP_FIRST_NAME} readOnly />
                <input className="form-control rep-detail-item" value={REP_LAST_NAME} readOnly />
                <input className="form-control rep-detail-item" value={REP_DISTRICT ? REP_DISTRICT : "none"} readOnly />
                <input className="form-control rep-detail-item" value={REP_PHONE} readOnly />
                <input className="form-control rep-detail-item" value={REP_OFFICE} readOnly />
                </div>
            );
        }

        return (
            <div>
            <div className="col-xs-6">
                {searchResults}
            </div>
            <div className="col-xs-6">
                {repDetail}
            </div>
            </div>
        );
    }
}