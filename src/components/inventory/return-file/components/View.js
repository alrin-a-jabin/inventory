import React, { Component, Fragment } from "react";
import RenderReturnsListTable from './partials/RenderReturnsListTable';

export default class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      returnList: [],
      searchString: '',
      totalRows:''
    }
  }

  componentDidMount() {
    this.props.setHeader("Return File List");
    this.getReturnList();
  }

  getReturnList = () => {
    this.props.ajaxUtil.sendRequest(
      this.props.url_Inventory.RETURN_FILE_LIST_URL,
      {},
      (response) => {
        if (!response.status) {
          this.props.setNotification({
            message: response.message,
            hasError: response.status,
            timestamp: new Date().getTime()
          });
        } else {
          if (response.hasOwnProperty('data')) {
            this.setState({totalRows:response.data.totalElements})
            this.setState({ returnList: response.data.content })
          }
        }
      },
      this.props.loadingFunction,
      { method: 'GET', isShowSuccess: false }
    );
  }

  handleChange = (event) => {
    if (event.currentTarget.value.length <= 0) {
      this.getReturnList();
    }
    this.setState({ [event.currentTarget.name]: event.currentTarget.value });
  }
  onSearch = () => {
    const url = this.props.url_Inventory.RETURN_FILE_SEARCH_URL;
    this.props.ajaxUtil.sendRequest(
      url,
      [{
        "booleanValue": true,
        "fromDate": null,
        "key": "iccid",
        "toDate": null,
        "value": this.state.searchString
      }],
      (response) => {
        if (!response.status) {
          this.props.setNotification({
            message: response.message,
            hasError: response.status,
            timestamp: new Date().getTime()
          });
        } else {
          if (response.hasOwnProperty('data')) {
            this.setState({ returnList: response.data.content })
          }
        }
      },
      this.props.loadingFunction,
      { method: 'POST', isShowSuccess: false }
    );
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="tab__fileter__content">
          <div className="tab__filter__left pl-0">
            <div className="all__entries">
              All Entries | <span>{(this.state.totalRows).toString().padStart(2, '0')}</span>
            </div>
            <h4>Return file</h4>
          </div>
          <div className="tab__filter__right pl-0">
            <div className="form__wrapper">
              <div className="search__form">
                <input
                  type="text"
                  name="searchString"
                  placeholder="Search"
                  value={this.state.searchString}
                  onChange={this.handleChange}
                  className="form-control border__animate"
                />
                <span className="focus-border"></span>
                <i onClick={this.onSearch} className="fa fa-search" aria-hidden="true"></i>
              </div>
              <div className="filter__button">
                <button>
                  <i className="fa fa-filter" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="table-responsive dataTable_wrapper">
          <div className="dataTable-scrollable">
            <table className="data-table dataTable-mainTable table table-hover">
              <thead>
                <tr>
                  <th>SL. No</th>
                  <th>ICCID / SN</th>
                  <th>MDN</th>
                  <th>FG Code</th>
                  <th>DO NUMBER</th>
                </tr>
              </thead>
              <tbody>
                <RenderReturnsListTable data={this.state.returnList} />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}


