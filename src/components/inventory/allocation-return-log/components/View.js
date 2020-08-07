import React, { Component } from "react";
import RenderAllocationAndReturnsListTable from './partials/RenderAllocationAndReturnsListTable';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
export default class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allocationAndReturnList: [],
      searchString: '',
      totalRows:'',
      retryRowData:''
    }
  }

  componentDidMount() {
    this.props.setHeader("Allocation & Return File Log");
    this.getAllocationAndRList();
  }

  getAllocationAndRList = () => {
    this.props.ajaxUtil.sendRequest(
      this.props.url_Inventory.ALLOCATION_RETURN_LOG_URL,
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
            this.setState({ allocationAndReturnList: response.data.content })
          }
        }
      },
      this.props.loadingFunction,
      { method: 'GET', isShowSuccess: false }
    );
  }

  handleChange = (event) => {
    if (event.currentTarget.value.length <= 0) {
      this.getAllocationAndRList();
    }
    this.setState({ [event.currentTarget.name]: event.currentTarget.value });
  }
  onSearch = () => {
    const url = this.props.url_Inventory.ALLOCATION_RETURN_LOG_SEARCH_URL;
    this.props.ajaxUtil.sendRequest(
      url,
      [{
        "booleanValue": true,
        "fromDate": null,
        "key": "fileName",
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
            this.setState({ allocationAndReturnList: response.data.content })
          }
        }
      },
      this.props.loadingFunction,
      { method: 'POST', isShowSuccess: false }
    );
  }
  retry=(id)=>{
    console.log(id);
    alert(id)
    // api-     /allocationReturnLog/retryProcess/{id}
    this.props.ajaxUtil.sendRequest(
      this.props.url_Inventory.ALLOCATION_RETURN_LOG_RETRY_URL +`/${id}`,
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
            this.setState({ retryRowData: response.data })
            console.log(this.state.retryRowData);

          }
        }
      },
      this.props.loadingFunction,
      { method: 'GET', isShowSuccess: false }
    );


  }

  render() {
    return (
      <div className="container-fluid">
        <div className="tab__fileter__content">
          <div className="tab__filter__left pl-0">
            <div className="all__entries">
              All Entries | <span>{(this.state.allocationAndReturnList.length).toString().padStart(2, '0')}</span>
            </div>
            <h4>Allocation & Return File Log</h4>
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
          <PerfectScrollbar >
            <table className="data-table dataTable-mainTable table table-hover">
              <thead>
                <tr>
                  <th>SL. No</th>
                  <th>File NAme</th>
                  <th>Date</th>
                  <th>File Type</th>
                  <th>Total Records</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <RenderAllocationAndReturnsListTable data={this.state.allocationAndReturnList} 
                retry={(id) => this.retry(id)}
                />
              </tbody>
            </table>
          </PerfectScrollbar>
        </div>
      </div>
    );
  }
}


