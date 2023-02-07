import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import Layout from "../../components/Layout";
export default class MenuExampleBasic extends Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    return (
      <Layout>
        <Menu>
          <Menu.Item onClick={this.handleItemClick}>Editorials</Menu.Item>

          <Menu.Item onClick={this.handleItemClick}>Reviews</Menu.Item>

          <Menu.Item onClick={this.handleItemClick}>Upcoming Events</Menu.Item>
        </Menu>
      </Layout>
    );
  }
}
