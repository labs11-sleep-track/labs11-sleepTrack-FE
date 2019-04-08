import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser, updateUser } from "../../actions";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { Form, Label, Input } from "reactstrap";
import "./Profile.css";
import Notifications, { notify } from "../Notifications/index";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      f_name: "",
      l_name: "",
      update: null
    };

    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    this.props.getUser();
    console.log("while mounting", this.props.inputs);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  handleChanges = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const user = {
      f_name: this.state.f_name,
      l_name: this.state.l_name,
      id: this.props.inputs.id
    };
    if (!user.f_name || !user.l_name) {
      this.setState({
        update: 1
      });
    } else {
      this.props.updateUser(user);
      this.setState({
        f_name: "",
        l_name: ""
      });
      this.setState(prevState => ({
        modal: !prevState.modal
      }));
      this.props.getUser();
      this.setState({
        update: null
      });
      this.toggle();
    }
    this.toggle();
  };

  render() {
    console.log("while rendering", this.props.inputs);
    // console.log(localStorage);
    // console.log(document.getElementsByClassName("notif"));
    return (
      <div className="profile">
        <div className="title">
          <h1>Profile</h1>
        </div>

        <br />
        <br />

        <div className="userInfo">
          <br />
          <div className="box">
            <h6>Email:</h6>
            <p className="item">{this.props.inputs.email}</p>
          </div>

          <br />
          <div className="box">
            <h6>First Name:</h6>
            <p>{this.props.inputs.f_name}</p>
          </div>
          <br />

          <div className="box">
            <h6>Last Name:</h6>
            <p>{this.props.inputs.l_name}</p>
          </div>
          <br />

          <div className="box">
            <h6>Account Type:</h6>
            <p>{this.props.inputs.account_type}</p>
          </div>
          <br />
        </div>
        <div className="butn">
          <Button color="primary" onClick={this.toggle}>
            Edit Profile
          </Button>
        </div>

        <Modal
          isOpen={this.state.modal}
          fade={false}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle} className="header">
            Update User Form
          </ModalHeader>

          <ModalBody>
            <Form>
              <div className="fNameDiv">
                <Label className="label">First Name *</Label>
                <Input
                  type="text"
                  name="f_name"
                  value={this.state.f_name}
                  placeholder={this.props.inputs.f_name}
                  onChange={this.handleChanges}
                />
              </div>

              <br />

              <div className="lNameDiv">
                <Label className="label">Last Name *</Label>
                <Input
                  type="text"
                  name="l_name"
                  value={this.state.l_name}
                  placeholder={this.props.inputs.l_name}
                  onChange={this.handleChanges}
                />
              </div>
            </Form>

            <br />

            {/* {this.state.update ? (
              <p className="fail">Failed to update profile.</p>
            ) : null} */}

            <br />

            <Button
              color="primary"
              onClick={this.handleSubmit}
              onMouseUp={() => notify("notif")}
            >
              Update
            </Button>

            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalBody>
        </Modal>

        <div className="notif">
          <Notifications update={this.state.update} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    inputs: state.auth.inputs,
    isUpdated: state.auth.isUpdated
  };
};

export default connect(
  mapStateToProps,
  { getUser, updateUser }
)(Profile);
