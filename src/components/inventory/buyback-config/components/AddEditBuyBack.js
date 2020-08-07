import React, { Component } from 'react';
import moment from 'moment';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';


const initialState = ({
  buyBackType: '',
  channel: '',
  region: '',
  cluster: '',
  distribution: '',
  outlet: '',
  fgCode: '',
  startDate: '',
  endDate: '',
  sellCheck: 'yes',
  buyBackTypeList: [],
  channelsList: [],
  regionList: [],
  clusterList: [],
  distributionList: [],
  outletList: [],
  fgCodeList: [],
  rowId: '',
  buyBackConfigurationListById: ''
});

export default class AddEditBuyBack extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  resetForm = () => {
    this.setState(initialState);
    this.componentDidMount();
  }


  async componentDidMount() {
    this.getChannels();
    this.getBuyBackTypes();
    this.getDistributionList();
    this.getFgCode();
    // this.setState({ rowId: this.props.rowEditById })
    // console.log("view", this.props.rowEditById)
    this.getBuybackConigurationById(this.props.rowEditById)
  }


  getBuybackConigurationById = (id) => {
    console.log("id", id)

    this.props.ajaxUtil.sendRequest(
      this.props.url_Inventory.BUYBACK_VIEW_DETAIL_ID + `/${id}`,
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
            this.setState({ buyBackConfigurationListById: response.data })
            console.log(response, "djshfvshdf", response.data)
          }
        }

      },
      this.props.loadingFunction,
      { method: 'GET', isShowSuccess: false }
    );
  }

  getFgCode = () => {
    this.props.ajaxUtil.sendRequest(
      this.props.url_Inventory.BUYBACK_FGCODE + '?isPageable=false&pageNo=0&pageSize=10000',
      {},
      (response) => {
        this.setState({ fgCodeList: response.data })
        console.log("fgcode", response.data)
      },
      this.props.loadingFunction,
      { method: 'GET', isShowSuccess: false }
    );
  }

  getDistributionList = () => {
    this.props.ajaxUtil.sendRequest(
      this.props.url_Inventory.BUYBACK_DISTRIBUTION,
      {},
      (response) => {
        this.setState({ distributionList: response.content })
        console.log("distributionList", response.content)
      },
      this.props.loadingFunction,
      { method: 'GET', isShowSuccess: false }
    );
  }

  getChannels = () => {
    this.props.ajaxUtil.sendRequest(
      this.props.url_Inventory.BUYBACK_CHANNEL,
      {},
      (response) => {
        this.setState({ channelsList: response });
        console.log("channelsList", response)
      },
      this.props.loadingFunction,
      { method: 'GET', isShowSuccess: false }
    );
  }
  getBuyBackTypes = () => {
    this.props.ajaxUtil.sendRequest(
      this.props.url_Inventory.BUYBACK_TYPE + '?isPageable=false&pageNo=0&pageSize=1000',
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
            this.setState({ buyBackTypeList: response.data })
            console.log("buyBackTypeList", response.data)
          }
        }
      },
      this.props.loadingFunction,
      { method: 'GET', isShowSuccess: false }
    );
  }

  getRegions = (channelId) => {
    this.props.ajaxUtil.sendRequest(
      this.props.url_Inventory.BUYBACK_REGION + `?channelId=${channelId}&typeId=2`,
      {},
      (response) => {
        this.setState({ regionList: response })
      },
      this.props.loadingFunction,
      { method: 'GET', isShowSuccess: false }
    );
  }



  getClusters = (regionId) => {
    console.log(regionId);
    this.props.ajaxUtil.sendRequest(
      this.props.url_Inventory.BUYBACK_CLUSTER + `/${regionId}`,

      {},
      (response) => {
        this.setState({ clusterList: response })
        console.log("cluster List", response)
      },
      this.props.loadingFunction,
      { method: 'GET', isShowSuccess: false }
    );
  }

  getOutletList = (outletId) => {
    console.log("idsdfsdfhshf", outletId);

    this.props.ajaxUtil.sendRequest(
      this.props.url_Inventory.BUYBACK_OUTLET + `?clusterId=${outletId}&order=desc&page=1&size=0&sort=createdDate`,
      {},
      (response) => {
        this.setState({ outletList: response.content })
        console.log("outletList", response.content);
      },
      this.props.loadingFunction,
      { method: 'GET', isShowSuccess: false }
    );
  }

  handleChange = (event) => {
    switch (event.currentTarget.name) {
      case 'channel':
        this.getRegions(event.currentTarget.value);
        break;
      case 'region':
        this.getClusters(event.currentTarget.value);
        break;
      case 'cluster':
        this.getOutletList(event.currentTarget.value);
        break;

      default:
        break;
    }
    this.setState({ [event.currentTarget.name]: event.currentTarget.value })
  }
  handleEvent = (event, picker) => {
    this.setState({
      startDate: moment(picker.startDate).format("DD-MM-YYYY"),
      endDate: moment(picker.endDate).format("DD-MM-YYYY")
    });
    console.log(this.state.startDate);
  }

  save = () => {
    const { buyBackType, channel, region, cluster, distribution, outlet, fgCode, startDate, endDate, sellCheck } = this.state;
    if (buyBackType.trim().length <= 0 ||
      channel.trim().length <= 0 ||
      region.trim().length <= 0 ||
      cluster.trim().length <= 0 ||
      distribution.trim().length <= 0 ||
      outlet.trim().length <= 0 ||
      fgCode.trim().length <= 0 ||
      startDate.trim().length <= 0 ||
      endDate.trim().length <= 0 ||
      sellCheck.trim().length <= 0) {
      this.props.setNotification({
        message: 'please fill up',
        hasError: true,
        timestamp: new Date().getTime()
      });
      return;
    }
    let channelName = '';
    this.state.channelsList.forEach((ch) => {
      if (ch.id == channel) {
        channelName = ch.channelName;
      }
    })
    let clusterName = '';
    this.state.clusterList.forEach((clu) => {
      if (clu.id == cluster) {
        clusterName = clu.locationName
      }
    });
    let distributerName = '';
    this.state.distributionList.forEach((dis) => {
      if (dis.id == distribution) {
        distributerName = dis.customerName
      }
    });
    let outletName = '';
    this.state.outletList.forEach((out) => {
      if (out.id == outlet) {
        outletName = out.name
      }
    });
    let regionName = '';
    this.state.regionList.forEach((reg) => {
      if (reg.id == region) {
        regionName = reg.locationName
      }
    });
    let submitData = {
      "buyBackType": buyBackType,
      "channel": channel,
      "channelName": channelName,
      "cluster": cluster,
      "clusterName": clusterName,
      "distributer": distribution,
      "distributerName": distributerName,
      "fgCode": fgCode,
      "fromDate": moment(startDate, 'DD-MM-YYYY').format('YYYY-MM-DD'),
      "id": 0,
      "outlet": outlet,
      "outletName": outletName,
      "region": region,
      "regionName": regionName,
      "sellThruCheck": (sellCheck == 'yes') ? true : false,
      "toDate": moment(endDate, 'DD-MM-YYYY').format('YYYY-MM-DD')
    }
    this.props.ajaxUtil.sendRequest(
      this.props.url_Inventory.BUYBACK_SAVE,
      submitData,
      (response) => {
        this.props.setNotification({
          message: response.message,
          hasError: !response.status,
          timestamp: new Date().getTime()
        });
        if (response.status) {
          this.props.closeBuybackModal();
        }
        this.props.closeBuybackModal();
      },
      this.props.loadingFunction,
      { method: 'POST', isShowSuccess: false }
    );
  }
  render() {
    const { closeBuybackModal } = this.props;
    return (
      <PerfectScrollbar>
        <div className="container-fluid" style={{ overflowX: 'scroll', overflow: 'auto', position: 'relative', backgroundColor: '#ffffff' }}>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label className="col-form-label">Buyback Type:</label>
                <select
                  name="buyBackType"
                  required
                  onChange={this.handleChange}
                  value={this.state.buyBackType}
                  className="distributer form-control required">
                  <option value="" selected disabled>Choose Buyback</option>
                  {this.state.buyBackTypeList.map((type, index) => (
                    <option key={index} value={type.id}>{type.typeName}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="col-form-label">Channel:</label>
                <select
                  name="channel"
                  required
                  onChange={this.handleChange}
                  value={this.state.channel}
                  className="distributer form-control required ">
                  <option value="" selected disabled>Choose Channel</option>
                  {this.state.channelsList.map((channel, index) => (
                    <option key={index} value={channel.id}>{channel.channelName}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="col-form-label">Region:</label>
                <select
                  name="region"
                  required
                  value={this.state.region}
                  onChange={this.handleChange}
                  className="distributer form-control required " >
                  <option value="" selected disabled>Choose Region</option>
                  {this.state.regionList.map((region, index) => (
                    <option key={index} value={region.id}>{region.locationName}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="col-form-label">Cluster:</label>
                <select
                  name="cluster"
                  required
                  value={this.state.cluster}
                  onChange={this.handleChange}
                  className="distributer form-control required " >
                  <option value="" selected disabled>Choose Cluster</option>
                  {this.state.clusterList.map((cluster, index) => (
                    <option key={index} value={cluster.id}>{cluster.locationName}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="col-form-label">Distribution:</label>
                <select
                  name="distribution"
                  required
                  value={this.state.distribution}
                  onChange={this.handleChange}
                  className="distributer form-control required ">
                  <option value="" selected disabled>Choose Distribution</option>
                  {this.state.distributionList.map((distribution, index) => (
                    <option key={index} value={distribution.id}>{distribution.customerName}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="col-form-label">Outlet:</label>
                <select
                  name="outlet"
                  required
                  value={this.state.outlet}
                  onChange={this.handleChange}
                  className="distributer form-control required">
                  <option value="" selected disabled>Choose Outlet</option>
                  {this.state.outletList.map((outlet, index) => (
                    <option key={index} value={outlet.id}>{outlet.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="col-form-label">Date Range Picker:</label>
                <br />
                <DateRangePicker
                  containerStyles={{
                    placeholder: 'start-date',
                    display: 'inline-block',
                    width: '100%'
                  }}
                  onEvent={this.handleEvent}>
                  <input
                    className="form-control required w-100"
                    type="text"
                    required
                    name="datefilter"
                    value={`${this.state.startDate ? this.state.startDate + ' - ' + this.state.endDate : 'startDate'}`}
                    onChange={this.handleChange}
                  ></input>
                </DateRangePicker>
              </div>

              <div className="form-group">
                <label className="col-form-label">FG Code:</label>
                <select
                  className="distributer form-control required "
                  required
                  name="fgCode"
                  value={this.state.fgCode}
                  onChange={this.handleChange}
                >
                  <option value="">Choose FG Code</option>
                  {this.state.fgCodeList.map((fgCode, index) => (
                    <option key={index} value={fgCode.id}>{fgCode.fgCode}</option>
                  ))}
                </select>
              </div>
              <div class="form-group">
                <p class="col-form-label label">Sell Thru Check:</p>
                <div class="custom-control custom-radio custom-control-inline">
                  <input value={this.state.sellCheck} onChange={this.handleChange} className="form-check-input" type="radio" name="sellCheck" id="sellCheck1" value="yes" checked={this.state.sellCheck === 'yes'} />
                  <label class="custom-control-label" for="sellCheck1"
                  >Yes</label>
                </div>
                <div class="custom-control custom-radio custom-control-inline">
                  <input value={this.state.sellCheck} onChange={this.handleChange} className="form-check-input" type="radio" name="sellCheck" id="sellCheck2" value="no" checked={this.state.sellCheck === 'no'} />
                  <label class="custom-control-label" for="sellCheck2"
                  >No</label>
                </div>
              </div>
            </div>
            <br />
            <br />
            <div className="col-md-12 p-0">
              <div className="modal-footer modal__footer__bg">
                <button type="button" onClick={closeBuybackModal} className="btn btn-secondary-border cursor-pointer" >
                  Close
              </button>
                <button type="button" onClick={this.resetForm} className="btn cursor-pointer btn-primary-border">
                  Reset
              </button>
                <button type="button" onClick={this.save} className="btn cursor-pointer btn-primary">Add</button>
                {/* <button onClick={this.save} type="button" className="btn btn-danger add hide mr-2 ml-2"></button> */}

              </div>
            </div>
          </div>
        </div>
      </PerfectScrollbar>
    )
  }
}