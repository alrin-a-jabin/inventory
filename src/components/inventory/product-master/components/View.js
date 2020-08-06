import React, { Component, Fragment } from "react";
import RenderFinishedGoodsTable from './partials/RenderFinishedGoodsTable';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
export default class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      finishedGoodsList: [],
      searchString: '',
      totalRows: ''
    }
  }

  componentDidMount() {
    this.props.setHeader("Product Master");
    this.getFinishedGoods();
  }

  getFinishedGoods = () => {
    this.props.ajaxUtil.sendRequest(
      this.props.url_Inventory.PRODUCT_MASTER,
      {},
      (response) => {
        if (!response.status) {
          this.props.setNotification({
            message: response.message,
            hasError: response.status,
            timestamp: new Date().getTime()
          });
        } else {
          this.setState({ totalRows: response.data.totalElements })

          if (response.hasOwnProperty('data')) {
            this.setState({ finishedGoodsList: response.data.content })
          }
        }
      },
      this.props.loadingFunction,
      { method: 'GET', isShowSuccess: false }
    );
  }

  handleChange = (event) => {

    if (event.currentTarget.value.length <= 0) {
      this.getFinishedGoods();
    }
    this.setState({ [event.currentTarget.name]: event.currentTarget.value });

  }
  onSearch = () => {
    const url = this.props.url_Inventory.PRODUCT_MASTER_SEARCH_URL;
    this.props.ajaxUtil.sendRequest(
      url,
      [{
        "booleanValue": true,
        "fromDate": null,
        "key": "descriptionOfMaterial",
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
          this.setState({})
          if (response.hasOwnProperty('data')) {
            this.setState({ finishedGoodsList: response.data.content })
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
        <div class="scroll_-_wraper">
          <div className="tab__fileter__content">
            <div className="tab__filter__left pl-0">
              <div className="all__entries">
                All Entries | <span>{(this.state.totalRows).toString().padStart(2, '0')}</span>
              </div>
              <h4>Finished Goods</h4>
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
            className="table-responsive dataTable_wrapper" data-simplebar
          >
            {/* <div className="dataTable-scrollable"> */}
            <PerfectScrollbar >
              <table className="data-table dataTable-mainTable table table-hover">
                <thead>
                  <tr>
                    <th>SL. No</th>
                    <th>Material code</th>
                    <th>Material type</th>
                    <th>Description of material</th>
                    <th>UOM</th>
                    <th>Sales organization</th>
                    <th>Distribution channel</th>
                    <th>product hierarchy</th>
                    <th>material group</th>
                    <th>gross weight</th>
                    <th>weight unit</th>
                    <th>deletion flag</th>
                    <th>Created date</th>
                  </tr>
                </thead>
                <tbody>
                  <RenderFinishedGoodsTable data={this.state.finishedGoodsList} />
                </tbody>
              </table>

            </PerfectScrollbar>
          </div>
        </div>

      {/* </div> */}
      </div >
    );
  }
}


