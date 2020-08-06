import React, { Component } from "react";
import RenderBuyBackConfigurationListTable from './partials/RenderBuyBackConfigurationListTable';
import { Popup, POPUP_ALIGN } from '@6d-ui/popup';
import AddEditBuyBack from './AddEditBuyBack';
import Details from './Details';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

export default class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buyBackConfigurationList: [],
      searchString: '',
      buybackEdit: false,
      showModal: '',
      buybackData: '',
      totalRows: '',
      rowId: '',
      buyBackConfigurationListById: ''
    }
  }

  componentDidMount() {
    this.props.setHeader("Buyback Configuration");
    this.getBuyBackConf();
  }

  getBuyBackConf = () => {
    this.props.ajaxUtil.sendRequest(
      this.props.url_Inventory.BUYBACK_CONFIG_LIST_URL,
      {},
      (response) => {
        this.setState({ totalRows: response.data.totalElements });
        if (!response.status) {
          this.props.setNotification({
            message: response.message,
            hasError: response.status,
            timestamp: new Date().getTime()
          });
        } else {
          if (response.hasOwnProperty('data')) {
            this.setState({ buyBackConfigurationList: response.data.content })
          }
        }

      },
      this.props.loadingFunction,
      { method: 'GET', isShowSuccess: false }
    );
  }

  handleChange = (event) => {
    if (event.currentTarget.value.length <= 0) {
      this.getBuyBackConf();
    }
    this.setState({ [event.currentTarget.name]: event.currentTarget.value });
  }
  onSearch = () => {
    const url = this.props.url_Inventory.BUYBACK_CONFIG_SEARCH_URL;
    this.props.ajaxUtil.sendRequest(
      url,
      [{
        "booleanValue": true,
        "fromDate": null,
        "key": "fgCode",
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
            this.setState({ buyBackConfigurationList: response.data.content })
          }
        }

      },
      this.props.loadingFunction,
      { method: 'POST', isShowSuccess: false }
    );
  }
  openBuybackModal = (status) => {
    this.setState({
      showModal: 'ADD',
      buybackEdit: status
    })
  }
  closeBuybackModal = (status) => {
    this.setState({
      showModal: ''
    })

  }
  openViewModel = (row) => {
    this.setState({
      showModal: 'VIEW',
      buybackData: row
    })
    console.log(this.state.buybackData);
  }


  openEditModel = (id) => {
    this.setState({
      showModal: 'ADD',
      // buybackEdit:true,
      rowId: id
    })
    // getBuybackConigurationById(id)
    console.log(id);
  }



  render() {
    return (
      <div className="container-fluid">
        <div className="tab__fileter__content">
          <div className="tab__filter__left pl-0">
            <div className="all__entries">
              All Entries | <span>{(this.state.totalRows).toString().padStart(2, '0')}</span>
            </div>
            <button onClick={() => this.openBuybackModal(true)} className="btn cursor-pointer btn-primary" >
              Add Buyback
            </button>
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
                  <th>FG Code</th>
                  <th>Buyback Type</th>
                  <th>Distributor</th>
                  <th>Outlet</th>
                  <th>Validity Range</th>
                  <th>STATUS</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <RenderBuyBackConfigurationListTable data={this.state.buyBackConfigurationList}
                  openViewModel={(row) => this.openViewModel(row)}
                  openEditModel={(id) => this.openEditModel(id)}
                />
              </tbody>
            </table>
          </PerfectScrollbar>
        </div>
        <RenderModal
          buybackEdit={this.state.buybackEdit}
          showModal={this.state.showModal}
          closeBuybackModal={this.closeBuybackModal}
          openBuybackModal={this.openBuybackModal}
          url_Inventory={this.props.url_Inventory}
          loadingFunction={this.props.loadingFunction}
          setNotification={this.props.setNotification}
          ajaxUtil={this.props.ajaxUtil}
          buybackData={this.state.buybackData}
          rowId={this.state.rowId}

        />


      </div>
    );
  }
}

function RenderModal(props) {

  if (props.showModal == 'ADD') {
    // console.log("rnder",props.rowId)
    return (
      <Popup
        type={POPUP_ALIGN.RIGHT}
        title={(props.buybackEdit) ? "Add Buyback" : "Edit Buyback"}
        // title={(props.rowId) ? "Add Buyback" : "Edit Buyback"}
        isOpen={(props.showModal == 'ADD')}
        close={props.closeBuybackModal}
        minWidth="50%"
        component={
          <AddEditBuyBack
            url_Inventory={props.url_Inventory}
            loadingFunction={props.loadingFunction}
            setNotification={props.setNotification}
            ajaxUtil={props.ajaxUtil}
            closeBuybackModal={props.closeBuybackModal}
            rowEditById={props.rowId}
          />
        }
      />
    )
  }
  if (props.showModal == 'VIEW') {
    console.log("sdhfashkdf", props.buybackData);
    return (
      <div>
        <Popup
          type={POPUP_ALIGN.CENTER}
          isOpen={(props.showModal == 'VIEW')}
          close={props.closeBuybackModal}
          minWidth="50%"
          component={
            <Details data={props.buybackData}
            />
          }
        />

      </div>
    )
  }

  return (
    <></>
  )
}

