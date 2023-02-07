import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "../routes";
export default () => {
  return (
    <Menu style={{ marginTop: "20px" }}>
      <Menu.Item position="left">
        <Link legacyBehavior route="/">
          <a className="itme">Editorials</a>
        </Link>
      </Menu.Item>

      <Menu.Item position="right">
        <Link legacyBehavior route="/">
          <a className="itme">Editorials</a>
        </Link>
      </Menu.Item>

      <Menu.Item>
        <Link legacyBehavior route="/Campaigns/new">
          <a className="itme">+</a>
        </Link>
      </Menu.Item>
    </Menu>
  );
};
