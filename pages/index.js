import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import factory from "../date/factory";
import "semantic-ui-css/semantic.min.css";
import Layout from "../components/Layout";
import { Link } from "../routes";

class CampaignIndex extends Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getdeployCampaign().call();

    return { campaigns };
  }
  /*async componentDidMount() {
    const campaigns = await factory.methods.getdeployCampaign().call();
  }*/

  renderCampaign() {
    const items = this.props.campaigns.map((address) => {
      return {
        header: address,
        description: (
          <Link legacyBehavior route={`/Campaigns/${address}`}>
            <a> view campaign</a>
          </Link>
        ),
        fluid: true,
      };
    });
    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <Link legacyBehavior route="/Campaigns/new">
          <a>
            <Button floated="right" content="CreatCampaignContract" primary />
          </a>
        </Link>
        <div>{this.renderCampaign()}</div>
      </Layout>
    );
  }
}

export default CampaignIndex;
