import React from 'react';

export default function RenderAllocationFileListTable(props) {
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
        <td>{row.fgDescription}</td>
        <td>{row.iccid}</td>
        <td>{row.mdnNo}</td>
        <td>{row.fgCode}</td>
        <td>{row.price}</td>
        <td>{row.region}</td>
        <td>{ row.cmdCode }</td>
        <td>{row.shipToCode}</td>
        <td>{row.shipToAddress}</td>
        <td>{row.doDate}</td>
        <td>{row.clusterNumber }</td>
        <td>{row.cmdDescription}</td>
        <td>{row.doNumber}</td>
        <td>{row.imeiNo}</td>
        <td>{row.channelNumber}</td>
        <td>{row.customerGroup}</td>
        <td>{row.masterBoxId}</td>
        <td>{row.boxId}</td>
        <td>{row.poNumber}</td>
      </tr>
    ))
  }
  return (
    response
  )
}