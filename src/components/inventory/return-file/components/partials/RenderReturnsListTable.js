import React from 'react';

export default function RenderReturnsListTable(props) {
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
        <td>{row.iccid}</td>
        <td>{row.mdnNo}</td>
        <td>{row.fgCode}</td>
        <td>{row.doNumber}</td>
      </tr>
    ))
  }
  return (
    response
  )
}