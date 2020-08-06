import React from 'react';
import Pager from 'react-pager';
import {
  Table,
  Container,
  Row,
  Col,
  Button,
  Input,
  UncontrolledTooltip,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu
} from 'reactstrap';
import { FORM_MODAL } from '../../constants/ModalTypes';
import {
  CustomButton,
  BUTTON_STYLE,
  BUTTON_TYPE,
  BUTTON_SIZE
} from '@6d-ui/buttons';
import InfiniteScroll from "react-infinite-scroll-component";

export const DataTable = ({ totalPages, startRow, endRow, currentPage, totalRecords,
  labelList,isInfiniteScroll, actions, filters, rowData, commonSearch, changeAttributes,
  rowCount, orderByCol, sort, toggleAction, currentRow, highlightRow, filterLabelList,
  searchHelpText, header, isViewFilters, deleteRow, extraButtons, tableButtons, 
  showRecords = true, setPageState, hasExport = false, removeSearch = false,isInfoFirst=false, onExtraButtonClick,
  exportTypes, exportCall, exportResponseHandler, setNotification, exportFileName,exportLimit
 }) => {
   if(!isInfiniteScroll){
     currentPage--;
   }
  const handlePageChanged = (newPage) => {
    // const target = { "value": newPage++ };
    const target = { "value": isInfiniteScroll?newPage:newPage++ };
    const event = { "target": target };
    changeAttributes({ "name": "pageNumber" }, event);
  };
  const getHeader = () => {
    const getSortOptions = (sortOrder) => {
      //Order 1 -Asc 2-Desc
      const getSortIcon = () => {
        switch (sortOrder) {
          case "asc":
            return "fa-sort-asc"

          case "desc":
            return "fa-sort-desc"

          default:
            return "fa-sort"
        }
      };
      const sortClass = getSortIcon();
      return (
        <div className={`dataTable_sortIco${!sortOrder ? ' inActive' : ''}`}>
          <i className={`fa ${sortClass}`} aria-hidden="true"></i>
        </div>
      );
    };
    return labelList.map((label) => {
      return (
        <th className={label.isSortable ? 'dataTable_head_sortable' : ''} onClick={label.isSortable ? changeAttributes.bind(this, { "name": "sortOptions", "sort": (label.id === orderByCol ? sort : null), "orderByCol": label.id, "isResetTable": true }) : null} key={label.id}>
          <table className="dataTable_label_tab">
            <tbody>
              <tr>
                <td>
                  {label.name}
                </td>
                <td>
                  {label.isSortable ? getSortOptions(label.id === orderByCol ? sort : null) : ''}
                </td>
              </tr>
            </tbody>
          </table>
        </th>
      );
    });
  };
  const getRowData = () => {
    const getTableButtons = (rowId) => {
      if (tableButtons) {
        return tableButtons.map((tableButton, index) => {
          return (
            <td key={index} className="fit-content clickable_ico_dt">
              <span id={`data_${rowId}_table_button_${index}`}>
                <i onClick={() => onExtraButtonClick(tableButton.onClick, rowId)} className={`fa ${tableButton.icon}`} aria-hidden="true"></i>
              </span>
              <UncontrolledTooltip placement="bottom" target={`data_${rowId}_table_button_${index}`}>
                {tableButton.label}
              </UncontrolledTooltip>
            </td>
          );
        });
      } else {
        return null;
      }
    }
    const getColData = (colData, rowId) => {
      return colData.map((col, idx) => {
        if (labelList[idx]) {
          return (
            <td style={{ maxWidth: '200px' }} className="text-ellipsis" key={labelList[idx].id}>
              <span id={`data_${rowId}_${labelList[idx].id}`} className={col.className}>{col.value}</span>
              <UncontrolledTooltip placement="bottom" target={`data_${rowId}_${labelList[idx].id}`}>
                {/* {labelList[idx].name} */}
                {col.value}
              </UncontrolledTooltip>
            </td>
          );
        }
      });
    };
    return rowData.map((rows, idx) => {
      return (
        <tr key={rows.rowId} onClick={() => highlightRow(idx)} className={(currentRow === idx ? 'dataTable_selectedRow' : '')}>
          
           {actions.info === true &&isInfoFirst?
            <td className="fit-content clickable_ico_dt">
              <span id={`data_${rows.rowId}_info_button`}>
                <i onClick={() => { toggleAction(FORM_MODAL.View, rows.rowId) }} className="fa fa-eye" aria-hidden="true"></i>
              </span>
              <UncontrolledTooltip placement="bottom" target={`data_${rows.rowId}_info_button`}>
                Info
              </UncontrolledTooltip>
            </td> :
            null}
          {getColData(rows.columnValues, rows.rowId)}
          {actions.info === true && !isInfoFirst?
            <td className="fit-content clickable_ico_dt">
              <span id={`data_${rows.rowId}_info_button`}>
                <i onClick={() => { toggleAction(FORM_MODAL.View, rows.rowId) }} className="fa fa-eye" aria-hidden="true"></i>
              </span>
              <UncontrolledTooltip placement="bottom" target={`data_${rows.rowId}_info_button`}>
                Info
              </UncontrolledTooltip>
            </td> :
            null}
          {actions.edit === true ?
            <td className="fit-content clickable_ico_dt">
              <span id={`data_${rows.rowId}_edit_button`}>
                <i onClick={() => { toggleAction(FORM_MODAL.Edit, rows.rowId) }} className="fa fa-pencil" aria-hidden="true"></i>
              </span>
              <UncontrolledTooltip placement="bottom" target={`data_${rows.rowId}_edit_button`}>
                Edit
               </UncontrolledTooltip>
            </td> :
            null}
          {actions.delete === true ?
            <td className="fit-content clickable_ico_dt">
              <span id={`data_${rows.rowId}_delete_button`}>
                <i onClick={() => { deleteRow(rows.rowId, rows.confirmationMessage) }} className="fa fa-trash" aria-hidden="true"></i>
              </span>
              <UncontrolledTooltip placement="bottom" target={`data_${rows.rowId}_delete_button`}>
                Delete
              </UncontrolledTooltip>
            </td> :
            null}
          {getTableButtons(rows.rowId)}
        </tr>
      );
    });
  };
  const getTableButtonHeaders = () => {
    if (tableButtons) {
      return tableButtons.map((tableButton, index) => {
        return (
          <th key={index}>{tableButton.label}</th>
        )
      });
    }
  }
  const getTableData = () => {
    if (labelList && labelList.length > 0 && rowData && rowData.length > 0) {
      return (
        <div>
          <div className="dataTable_wrapper">
            <div className="dataTable-scrollable">
              <div>
                {isInfiniteScroll?<InfiniteScroll
                  dataLength={rowData.length}
                  next={()=>{handlePageChanged(currentPage)}}
                  hasMore={currentPage < totalPages? true:false}
                  loader={<h4>Loading...</h4>}
                  height={400}
                  endMessage={
                    <p style={{ textAlign: 'center' }}>
                      <b>You have seen it all!</b>
                    </p>
                  }
                >

                  <Table hover className="data-table dataTable-mainTable">
                    <thead>
                      <tr>
                        {(actions.info === true && isInfoFirst? <th>Info</th> : null)}
                        {getHeader()}
                        {(actions.info === true && !isInfoFirst ? <th>Info</th> : null)}
                        {(actions.edit === true ? <th>Edit</th> : null)}
                        {(actions.delete === true ? <th>Delete</th> : null)}
                        {getTableButtonHeaders()}
                      </tr>
                    </thead>
                    <tbody>
                      {getRowData()}
                    </tbody>
                  </Table>
                </InfiniteScroll>
                :
                 <Table hover className="data-table dataTable-mainTable">
                 <thead>
                   <tr>
                     {(actions.info === true && isInfoFirst? <th>Info</th> : null)}
                     {getHeader()}
                     {(actions.info === true && !isInfoFirst ? <th>Info</th> : null)}
                     {(actions.edit === true ? <th>Edit</th> : null)}
                     {(actions.delete === true ? <th>Delete</th> : null)}
                     {getTableButtonHeaders()}
                   </tr>
                 </thead>
                 <tbody>
                   {getRowData()}
                 </tbody>
               </Table>}
                
              </div>
            </div>
          </div>

          {!isInfiniteScroll&&<Row>
            <Col lg="3" md="12" sm="12">
              {showRecords &&
                <div className="dataTable_wrapper clearfix d-flex align-items-center">
                  <div className="float-left">
                    <UncontrolledButtonDropdown>
                      <DropdownToggle caret outline color="dataTable-rowCount" className="btn-block-c" size="sm">
                        {rowCount}
                      </DropdownToggle>
                      <DropdownMenu className="data-table-rowCount-dd">
                        <DropdownItem onClick={changeAttributes.bind(this, { "name": "rowCount", "isResetTable": true })}>5</DropdownItem>
                        <DropdownItem onClick={changeAttributes.bind(this, { "name": "rowCount", "isResetTable": true })}>10</DropdownItem>
                        <DropdownItem onClick={changeAttributes.bind(this, { "name": "rowCount", "isResetTable": true })}>20</DropdownItem>
                        <DropdownItem onClick={changeAttributes.bind(this, { "name": "rowCount", "isResetTable": true })}>50</DropdownItem>
                      </DropdownMenu>
                    </UncontrolledButtonDropdown>
                  </div>
                  <div className="dataTable_rowCountText float-left px-2">Records Per Page</div>
                </div>
              }
            </Col>
            <Col lg="9" md="12" sm="12">
              <div className="dataTable_wrapper">
                <Pager
                  total={totalPages ? totalPages : 0}
                  current={currentPage}
                  visiblePages={3}
                  titles={{ first: 'First', last: 'Last', prev: 'Prev', next: 'Next' }}
                  className="pagination-sm pull-right"
                  onPageChanged={handlePageChanged}
                />
              </div>
              <div className="dataTable_rowCountText float-right px-2">
                {(rowData && rowData.length > 0 ? (`Showing ${startRow} to ${endRow} of ${totalRecords}`) : '')}
              </div>
            </Col>
          </Row>}
        </div>
      );
    } else {
      return (
        <div className="dataTable_notFound text-center">
          Not Found !!
        </div>
      );
    }
  }
  const getFilters = () => {
    if (filters && filters.length > 0) {
      return filters.map((filter, idx) => {
        return (
          <div key={idx} className="dataTable_pageDetails">
            <div className="datatable_filter_components">
              {`${filterLabelList[filter.name]} : ${filter.value}`}
              <div onClick={changeAttributes.bind(this, { "filterName": filter.name, "name": "clearFilter", "isResetTable": true })} className="filterClose" filtername={filter.name}>
                <i className="fa fa-times" aria-hidden="true"></i>
              </div>
            </div>
          </div>
        );
      });
    }
  }
  const getFilterRow = () => {
    if (isViewFilters) {
      return (
        <Row>
          <Col lg="12">
            {getFilters()}
          </Col>
        </Row>
      )
    } else {
      return null;
    }
  }
  const getCreateButton = () => {
    const getExtraButtons = () => {
      if (extraButtons) {
        return extraButtons.map((extraButton, index) => {
          return (
            <div key={index} className=" float-left dataTable_wrapper">
              <CustomButton
                style={BUTTON_STYLE.BRICK}
                type={BUTTON_TYPE.PRIMARY}
                size={BUTTON_SIZE.MEDIUM}
                align="left"
                label={extraButton.label}
                isButtonGroup={true}
                icon={extraButton.icon}
                onClick={extraButton.onClick}
              />
            </div>
          )
        });
      } else {
        return null;
      }
    }
    const getCreatePopup = () => {
      toggleAction(FORM_MODAL.Create, null);
    }
    if (actions.create) {
      return (
        <div className="float-left">
          <div className="float-left dataTable_wrapper">
            <CustomButton
              style={BUTTON_STYLE.BRICK}
              type={BUTTON_TYPE.PRIMARY}
              size={BUTTON_SIZE.MEDIUM}
              align="left"
              label="Create"
              isButtonGroup={true}
              icon="fa-plus"
              onClick={getCreatePopup}
            />
          </div>
          {getExtraButtons()}
        </div>
      );
    } else if (extraButtons && extraButtons.length > 0) {
      return (
        <div className="float-left">
          {getExtraButtons()}
        </div>
      );
    }
  }
  const getDownloadButton = () => {
    return (
      <UncontrolledButtonDropdown title="download">
        <DropdownToggle caret outline color="dataTable-export-btn btn-block-c" size="sm">
          Export
          </DropdownToggle>
        <DropdownMenu right className="dataTable_export_dd">
          {
            exportTypes && exportTypes.map((item, ind) => {
              return <DropdownItem key={ind} onClick={(e) => {
                exportCall(item, exportFileName, setNotification, exportResponseHandler,exportLimit,totalRecords);
              }}>{item && item.label}</DropdownItem>;
            })
          }
          {/* <DropdownItem>csv</DropdownItem>
          <DropdownItem>excel</DropdownItem> */}
        </DropdownMenu>
      </UncontrolledButtonDropdown >
    );
  }
  const handleKeyPress = (e) => {
    const target = { "value": e.target.value };
    const event = { "target": target };
    setPageState({ keyword: e.target.value });
    if (e.keyCode === 13) {
      changeAttributes({ "name": "commonSearch", "isNotUpdateState": true, "isResetTable": true }, event);
    }
  }
  const getFilterIcon = () => {
    if (filterLabelList) {
      return (
        <div className="dataTable_wrapper float-right px-1">
          <Button color="dataTable-sm-btn btn-block-c" size="sm" onClick={() => toggleAction(FORM_MODAL.SearchFilter, null)}>
            <i className="fa fa-filter"></i>
          </Button>
        </div>
      );
    } else {
      return '';
    }
  }
  return (
    <Container className="dataTable" fluid>
      <Row>
        <Col lg="6" md="12" sm="12" className="d-flex align-items-center">
          <div className="dataTable_tc_head float-left dataTable_wrapper clearfix mr-2">
            {totalRecords} {header}
          </div>
          {getCreateButton()}
        </Col>
        <Col lg="6" md="12" sm="12">
          <div>
            {getFilterIcon()}
            {hasExport ? <div className="dataTable_wrapper float-right px-1">
              {getDownloadButton()}
            </div> : ''
            }
          </div>
          {removeSearch ? '' : <div className="dataTable_wrapper float-right pr-1">
            <Input type="search" className="dataTable_common_search"
              placeholder={searchHelpText} size="sm" onKeyUp={handleKeyPress}
              onChange={changeAttributes.bind(this, { "name": "keyword", "isOnlyUpdateState": true })}
              value={commonSearch} />
          </div>}
        </Col>
      </Row>
      {getFilterRow()}
      {getTableData()}
    </Container>
  );
};
