import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default function ModalPopUp(props) {
    const { isOpen,centered,toggle,contentClassName,width,component,title,className } = props;
    return <Modal isOpen={isOpen} centered={centered} toggle={toggle} contentClassName={contentClassName} style={{ maxWidth: width,marginRight:centered?"auto":"0px" }}>
            <ModalHeader toggle={props.closeHandler}>{title}</ModalHeader>
            <ModalBody>
                {component}
            </ModalBody>
    </Modal>
}    
