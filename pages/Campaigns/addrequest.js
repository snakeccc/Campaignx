import { Link, Router } from "../../routes";
import { React, Component, useEffect } from "react";
import Layout from "../../components/Layout";
import { Form, Button, Message } from "semantic-ui-react";
import Compaign from "../../date/compaign";
import web3 from "../../date/web3";

class AddRequest extends Component {
  state = {
    value: "",
    description: "",
    recipient: "",
    loading: "",
    errmessage: "",
  };
  static async getInitialProps(props) {
    const { address } = props.query;
    return { address };
  }
  onSubmit = async (event) => {
    event.preventDefault();

    const compaign = Compaign(this.props.address);
    const { value, description, recipient } = this.state;
    try {
      this.setState({ loading: true });
      const accounts = await web3.eth.getAccounts();
      await compaign.methods.createRequest(description, value, recipient).send({
        from: accounts[0],
      });
      Router.replaceRoute(`/Campaigns/${this.props.address}/addrequest`);
    } catch (err) {
      this.setState({ errmessage: err.message });
    }

    this.setState({ loading: false, value: "" });
  };

  render() {
    return (
      <Layout>
        <Form onSubmit={this.onSubmit} error={!!this.state.errmessage}>
          <Form.Field>
            <label>description</label>
            <input
              value={this.state.description}
              onChange={(event) =>
                this.setState({ description: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label>value</label>
            <input
              value={this.state.value}
              onChange={(event) => this.setState({ value: event.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>recipient</label>
            <input
              value={this.state.recipient}
              onChange={(event) =>
                this.setState({ recipient: event.target.value })
              }
            />
          </Form.Field>
          <Message error content={this.state.errmessage} />
          <Button loading={this.state.loading} primary>
            Create
          </Button>
        </Form>
      </Layout>
    );
  }
}
export default AddRequest;
