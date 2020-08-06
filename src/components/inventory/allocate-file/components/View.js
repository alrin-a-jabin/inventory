import React, { Component, Fragment } from "react";
import RenderAllocationFileListTable from './partials/RenderAllocationFileListTable';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
export default class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allocationFileList: [],
      searchString: '',
      totalRows: '',
      pageSize: '',
      pageOfItems: ''
    }
    this.onChangePage = this.onChangePage.bind(this)
  }

  async componentDidMount() {
    this.props.setHeader("Allocation File List");
    await this.getAllocationFileList();
  }

  getAllocationFileList = () => {
    this.props.ajaxUtil.sendRequest(
      this.props.url_Inventory.ALLOCATION_FILE_LIST_URL,
      {},
      (response) => {
        console.log(this.props.url_Inventory.ALLOCATION_FILE_LIST_URL)
        if (!response.status) {
          this.props.setNotification({
            message: response.message,
            hasError: response.status,
            timestamp: new Date().getTime()
          });
        } else {
          this.setState({ totalRows: response.data.totalElements })
          this.setState({ pageSize: response.data.pageSize })
          if (response.hasOwnProperty('data')) {
            this.setState({ allocationFileList: response.data.content })
            console.log(response.data);
          }
        }
      },
      this.props.loadingFunction,
      { method: 'GET', isShowSuccess: false }
    );
  }


  onChangePage=(value)=> {
    console.log(value)

    // this.getAllocationFileList(pageOfItems)
    this.props.ajaxUtil.sendRequest(
      this.props.url_Inventory.ALLOCATION_FILE_LIST_URL,
      {},
      (response) => {
        console.log(this.props.url_Inventory.ALLOCATION_FILE_LIST_URL + `&pageNo=${value}`)
        if (!response.status) {
          this.props.setNotification({
            message: response.message,
            hasError: response.status,
            timestamp: new Date().getTime()
          });
        } else {
          if (response.hasOwnProperty('data')) {
            this.setState({ allocationFileList: response.data.content })
            console.log(response.data);
          }
        }
      },
      this.props.loadingFunction,
      { method: 'GET', isShowSuccess: false }
    );

  }

  handleChange = (event) => {
    if (event.currentTarget.value.length <= 0) {
      this.getAllocationFileList();
    }
    this.setState({ [event.currentTarget.name]: event.currentTarget.value });
  }


  onSearch = () => {
    const url = this.props.url_Inventory.ALLOCATION_FILE_SEARCH_URL;
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
            this.setState({ allocationFileList: response.data.content })
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
            <h4>Allocation File List</h4>
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
          <PerfectScrollbar>
            <table className="data-table dataTable-mainTable table table-hover">
              <thead>
                <tr>
                  <th>SL. No</th>
                  <th>FG DESCRIPTION</th>
                  <th>ICCID / SN</th>
                  <th>MDN</th>
                  <th>FG CODE</th>
                  <th>PRICE</th>
                  <th>REGION</th>
                  <th>CMD CODE</th>
                  <th>SHIP TO CODE</th>
                  <th>SHIP TO ADDRESS</th>
                  <th>DO DATE</th>
                  <th>CLUSTER NO.</th>
                  <th>CMD DESCRIPTION</th>
                  <th>DO NO.</th>
                  <th>MEID</th>
                  <th>CHANNEL NO.</th>
                  <th>CUSTOMER GROUP</th>
                  <th>MASTER BOX ID</th>
                  <th>BOX ID</th>
                  <th>PO NUMBER</th>
                </tr>
              </thead>
              <tbody>
                <RenderAllocationFileListTable data={this.state.allocationFileList} />
              </tbody>
            </table>
          </PerfectScrollbar>

          {/* <Pagination items={this.state.exampleItems} onChangePage={this.onChangePage} /> */}
        </div>
      </div>
    );
  }
}


