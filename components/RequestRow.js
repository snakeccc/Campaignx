import { React, Component, useEffect } from "react";
import { Table, Button } from "semantic-ui-react";
import web3 from "../date/web3";
import Compaign from "../date/compaign";
class RequestRow extends Component {
  onApprove = async () => {
    const campaign = Compaign(this.props.address);
    const accounts = await web3.eth.getAccounts();
    await campaign.methods
      .approvalRequest(this.props.id)
      .send({ from: accounts[0] });
  };
  onFinalize = async () => {
    const campaign = Compaign(this.props.address);
    const accounts = await web3.eth.getAccounts();
    await campaign.methods
      .finalizeRequest(this.props.id)
      .send({ from: accounts[0] });
  };

  render() {
    const { Row, Cell } = Table;
    const { id, request } = this.props;
    return (
      <Row>
        <Cell>{id}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{web3.utils.fromWei(request.value, "ether")}</Cell>
        <Cell>{request.recipient}</Cell>
        <Cell>{request.approvalCount}</Cell>
        <Cell>{request.complete}</Cell>
        <Cell>
          <Button color="green" basic onClick={this.onApprove}>
            Approval
          </Button>
        </Cell>
        <Cell>
          <Button color="teal" basic onClick={this.onFinalize}>
            Finalize
          </Button>
        </Cell>
      </Row>
    );
  }
}
export default RequestRow;
