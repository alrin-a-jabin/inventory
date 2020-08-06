import React from 'react';
import moment from 'moment';
import { UncontrolledTooltip } from 'reactstrap';
import Details from '../Details';

export default function RenderAllocationFileListTable(props) {


  // const openViewModel = (row) => (
  //   <Details buyBackData={row}/>
    
  // )

  let response = [];    
  if (props.data.length <= 0) {
    response.push(
      <tr key="1">
        <td colSpan="12">No Data</td>
      </tr>
    )
  } else {
    response = props.data.map((row, index) => (
      
      <tr key={index}> 
        <td>{index + 1}</td>
        <td>{row.fgCode}</td>
        <td>{row.buyBackType}</td>
        <td>{row.distributer}</td>
        <td>{row.outlet}</td>
        <td>{moment(row.fromDate, "YYYY-MM-DD").format("DD-MM-YYYY")} - {moment(row.toDate, "YYYY-MM-DD").format("DD-MM-YYYY")}</td>
        <td>{(row.status == 'ACTIVE') ? (<span className="text-success">{row.status}</span>): row.status }</td>
        <td>
          <div className="d-flex">
            <button className="btn-action btn-action-active" onClick={() => props.openEditModel(row.id)}>

            <i className="fa fa-pencil" aria-hidden="true" id="UncontrolledTooltipEdit"></i>
            </button>
            <button className="btn-action btn-action-active"  onClick={() => props.openViewModel(row)}>
              <i className="fa fa-eye" aria-hidden="true"  id="UncontrolledTooltipDelete" ></i>
            </button>
          </div>
        </td>
      
        <UncontrolledTooltip placement='bottom' target='UncontrolledTooltipEdit'>
        Edit
      </UncontrolledTooltip>

      <UncontrolledTooltip placement='bottom' target='UncontrolledTooltipDelete'>
        View
      </UncontrolledTooltip>
      </tr>
    ))
  }
  return(response);

};