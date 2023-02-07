import { Link } from "../../routes";
import { React, Component, useEffect } from "react";
import Layout from "../../components/Layout";
import { Card, Button, Table } from "semantic-ui-react";
import Compaign from "../../date/compaign";
import RequestRow from "../../components/RequestRow";
class Request extends Component {
  static async getInitialProps(props) {
    const address = props.query.address;
    const campaign = Compaign(address);
    const requestCount = await campaign.methods.getRequestsCount().call();

    const requests = await Promise.all(
      Array(requestCount)
        .fill()
        .map((element, index) => {
          return campaign.methods.Requests(index).call();
        })
    );

    return { address, requests, requestCount };
  }
  renderRow() {
    return this.props.requests.map((request, index) => {
      return (
        <RequestRow
          key={index}
          id={index}
          request={request}
          address={this.props.address}
          requestCount={this.props.requestCount}
        />
      );
    });
  }

  render() {
    const { Header, Row, HeaderCell, Body } = Table;
    return (
      <Layout>
        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>description</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>recipient</HeaderCell>
              <HeaderCell>ApprovalCount</HeaderCell>
              <HeaderCell>Approval</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
            </Row>
          </Header>
          <Body> {this.renderRow()}</Body>
        </Table>
        <Link
          legacyBehavior
          route={`/Campaigns/${this.props.address}/addrequest`}
        >
          <a>
            <Button primary>Add request</Button>
          </a>
        </Link>
      </Layout>
    );
  }
}
export default Request;
