import React, { Component, useState, useEffect } from "react";
import moment from 'moment';
import { Col, Row, Container, Input, Label, ModalBody, Modal, ModalHeader, ModalFooter } from "reactstrap";
import _ from "lodash";
import { Switch } from '@6d-ui/form';
import { FieldItem, FIELD_TYPES } from '@6d-ui/fields';

const Details = (props) => {

  const buybackData = props;
  console.log(buybackData);

  const [height, setHeight] = useState(window.innerHeight);
  const [viewData, setViewData] = useState({});
  const [modal, setModal] = useState(true);

  useEffect(() => {
    window.addEventListener("resize", () => setHeight(window.innerHeight - 68));
  }, []);

  useEffect(() => {
    if (buybackData) {
      setViewData(buybackData.data);
    }
    console.log("data", viewData);
  })
  // const toggle() => setModal(false);

  return (
    <div>
      {/* <Modal isOpen={modal} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }}> */}
        <div
          className="custom-container overlay_position scrollbar"
          style={{ 'height': height }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title">Detailed View #{viewData.fgCode}</h1>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  {/* <span aria-hidden="true"><i className="material-icons">close</i></span> */}
                </button>
              </div>
              <div className="modal-body">
                <div className="detail__view__wrapper">
                  <div className="detailed__content">
                    <div className="content__left">
                      <ul>
                        <li>Fg Code :{viewData.fgCode}</li>
                        <li>Buyback Type :{viewData.buyBackType}</li>
                        <li>Distributer :{viewData.distributer}</li>
                        <li>Outlet :{viewData.outlet}</li>
                        <li className="light__bg">
                          {/* validity range:{viewData.fromDate}-{viewData.toDate} */}
                          validity range:{moment(viewData.fromDate).format("DD-MM-YYYY")} - {moment(viewData.toDate).format("DD-MM-YYYY")}
                        </li>
                      </ul>
                    </div>
                    <div className="content__right">
                      <ul>
                        <li>Status : <span className="text-success m-2"> {viewData.status}</span></li>
                        <li>Channel :{viewData.channel}</li>
                        <li>Region :{viewData.region}</li>
                        <li>Cluster :{viewData.cluster}</li>
                        <li>
                          Sell True Check :{viewData.sellThruCheck ? "Yes" : "No"}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer bt-0 justify-content-center">
                {/* <button
                  type="button"
                  className="btn btn-primary-border"
                  data-dismiss="modal"
                  onClick={() => setModal(false)}
                >
                  Ok
                </button> */}
              </div>
            </div>
          </div>
        </div>
      {/* </Modal> */}
    </div>
  )
}

export default Details;