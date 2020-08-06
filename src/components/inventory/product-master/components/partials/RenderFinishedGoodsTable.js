import React from 'react';
import moment from 'moment';
export default function RenderFinishedGoodsTable(props) {
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
        <td>{row.materialCode}</td>
        <td>{row.materialType}</td>
        <td>{row.descriptionOfMaterial}</td>
        <td>{row.uom}</td>
        <td>{row.salesOrganisation}</td>
        <td>{row.discriptionChannel}</td>
        <td>{(row.productHierarchy) ? ((row.productHierarchy.hasOwnProperty("code")) ? row.productHierarchy.code : '--') : '--'}</td>
        <td>{row.materialGroup}</td>
        <td>{row.grossWeight}</td>
        <td>{row.weightUnit}</td>
        <td>{row.deletionFlag ? (<span className="text-danger">Yes</span>) : (<span>No</span>)}</td>
        <td>{moment(row.createdOn).format('LLL')}</td>
      </tr>
    ))
  }
  return (
    response
  )
}