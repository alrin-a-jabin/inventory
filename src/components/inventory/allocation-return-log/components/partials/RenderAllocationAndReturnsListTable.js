import React from 'react';
import moment from 'moment';
import { UncontrolledTooltip } from 'reactstrap';


export default function RenderAllocationAndReturnsListTable(props) {
  let response = [];


  if (props.data.length <= 0) {
    response.push(
      <tr key="1">
        <td colSpan="12">No Data</td>
      </tr>
    )
  } else {
    response = props.data.map((row, index) => (
      // <tr key={index} className={(row.status === 'success') ? " " : "text-danger"}>

      <tr key={index} >
        <td>{index + 1}</td>
        <td>{row.fileName}</td>
        <td>{moment(row.date, 'YYYY-MM-DD h:mm:ss').format('DD-MM-YYYY h:mm a')}</td>
        <td>{row.fileType}</td>
        <td >{row.totalRecords}</td>
        
    <td>{(row.status === 'success') ? (<span className="text-success">{row.status}</span>) : (<span className="text-danger">FAILED</span>)}</td>
        <td >
          <button
            className={(row.status === 'success') ? "btn-action btn-action-desabled" : "cursor-pointer btn-action btn-action-active"}
          >
            <i className="fa fa-repeat" aria-hidden="true"  id="UncontrolledTooltipExample"   onClick={()=>props.retry(row.id)}>
            </i>
          </button>
        </td>
        <UncontrolledTooltip placement='bottom' target='UncontrolledTooltipExample'>
        Retry
      </UncontrolledTooltip>
      
      </tr >
    ))
  }
  return (
    response
  )
}


