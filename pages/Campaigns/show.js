import { React, Component, useEffect } from "react";
import Layout from "../../components/Layout";
import Compaigninstance from "../../date/compaign";
import { Card, Button, Grid } from "semantic-ui-react";
import web3 from "../../date/web3";
import ContributeForm from "../../components/ContributeForm";
import { Link } from "../../routes";

class CampaignShow extends Component {
  static async getInitialProps(props) {
    console.log(props.query.address);
    const Compaign = await Compaigninstance(props.query.address);
    const Summary = await Compaign.methods.getSummary().call();
    console.log(Summary);

    return { Summary, address: props.query.address };
  }

  rebderCards() {
    const items = [
      {
        header: this.props.Summary[4],
        description: "the manager created this .",
        meta: "address of manager",
        fluid: true,
      },
      {
        header: this.props.Summary[0],
        description: "the miniContribution .",
        meta: "",
        fluid: true,
      },
      {
        header: web3.utils.fromWei(this.props.Summary[1], "ether"),
        description: "Compaign balance.",
        meta: "",
        fluid: true,
      },
      {
        header: this.props.Summary[2],
        description: "the Requests .",
        meta: "",
        fluid: true,
      },

      {
        header: this.props.Summary[3],
        description: "the ContributedNumber .",
        meta: "",
        fluid: true,
      },
    ];
    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <Grid>
          <Grid.Column width={10}> {this.rebderCards()}</Grid.Column>

          <Grid.Column width={6}>
            <ContributeForm address={this.props.address} />
          </Grid.Column>
          <Link
            legacyBehavior
            route={`/Campaigns/${this.props.address}/request`}
          >
            <a>
              <Button content="view request" primary />
            </a>
          </Link>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
