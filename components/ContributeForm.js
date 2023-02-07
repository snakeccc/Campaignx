import React, { Component } from "react";
import { Form, Input, Message, Button } from "semantic-ui-react";
import Compaign from "../date/compaign";
import web3 from "../date/web3";
import { Router } from "../routes";
class ContributeForm extends Component {
  state = { value: "", loading: null, errmessage: "" };
  onSubmit = async (event) => {
    event.preventDefault();

    const compaign = Compaign(this.props.address);
    try {
      this.setState({ loading: true });
      const accounts = await web3.eth.getAccounts();
      await compaign.methods.Contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, "ether"),
      });
      Router.replaceRoute(`/Campaigns/${this.props.address}`);
    } catch (err) {
      this.setState({ errmessage: err.message });
    }

    this.setState({ loading: false, value: "" });
  };

  render() {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errmessage}>
        <Form.Field>
          <label>to Contrbution</label>
          <Input
            value={this.state.value}
            onChange={(event) =>
              this.setState({ value: event.target.value, errmessage: "" })
            }
            label="ether"
            labelPosition="right"
            placeholder="Number"
          />
        </Form.Field>
        <Message error content={this.state.errmessage} />
        <Button loading={this.state.loading} primary>
          Create
        </Button>
      </Form>
    );
  }
}
export default ContributeForm;
