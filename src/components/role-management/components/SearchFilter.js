import React, { Component } from "react";
import { Row, ModalBody, ModalFooter } from "reactstrap";
import {
  CustomButton,
  BUTTON_STYLE,
  BUTTON_TYPE,
  BUTTON_SIZE,
  COLOR
} from '@6d-ui/buttons';
import { FieldItem } from '@6d-ui/fields';

class SearchFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roleId: '',
      roleName: '',
    };
  }

  onSearch() {
    const data = {
      "roleName": this.state.roleName,
      "roleId": this.state.roleId
    };
    this.props.onSubmitClick(data);
  }

  handleChange(name, value, obj) {
    const { isTouched } = obj || { isTouched: false };
    if (!isTouched) {
      this.setState({ [name]: value });
    }
  }
  render() {
    return (
      <div>
        <ModalBody>
          <Row className="mx-0 dataTableFormgroup">
            <FieldItem
              name="roleId"
              placeholder="Role Id"
              label="Role Id"
              width="md"
              value={this.state.roleId}
              onChange={this.handleChange.bind(this, "roleId")}
              touched={false}
              error=""
            />
            <FieldItem
              name="roleName"
              value={this.state.roleName}
              placeholder="Role Name"
              label="Role Name"
              width="md"
              onChange={this.handleChange.bind(this, "roleName")}
              touched={false}
              error=""
            />

          </Row>

          <ModalFooter>
            <CustomButton
              style={BUTTON_STYLE.BRICK}
              type={BUTTON_TYPE.SECONDARY}
              size={BUTTON_SIZE.LARGE}
              color={COLOR.PRIMARY}
              align="right"
              label="Cancel"
              isButtonGroup={true}
              onClick={this.props.onCancel}
            />
            <CustomButton
              style={BUTTON_STYLE.BRICK}
              type={BUTTON_TYPE.PRIMARY}
              size={BUTTON_SIZE.LARGE}
              align="right"
              label="Search"
              isButtonGroup={true}
              onClick={() => {
                this.onSearch();
                this.props.onCancel();
              }}
            />

          </ModalFooter>
        </ModalBody>
      </div>
    );
  }
}

export default SearchFilter;
