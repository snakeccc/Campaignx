import React, { useState } from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
import Layout from "../../components/Layout";
import { Dropdown, Input, Message } from "semantic-ui-react";
import instance from "../../date/factory";
import web3 from "../../date/web3";
import { Router } from "../../routes";
const options = [
  { key: "Wei", text: "Wei", value: "Wei" },
  { key: "Gwei", text: "Gwei", value: "Gwei" },
  { key: "Ether", text: "Ether", value: "Ether" },
];

/*const FormExampleForm = () => (
  <Layout>
    <Form>
      <Form.Field>
        <label>Minimum Contrbution</label>
        <Input
          label={<Dropdown defaultValue="Wei" options={options} />}
          labelPosition="right"
          placeholder="Find domain"
        />
      </Form.Field>
      <Button primary>Submit</Button>
    </Form>
  </Layout>
);*/

const FormExampleForm = () => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(null);
  const [loading, setloading] = useState(null);

  const handleChange = (event) => {
    setInputValue(event.target.value);
    setloading(false);
    setError(null);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    setError(null);
    setloading(true);
    try {
      const accounts = await web3.eth.getAccounts();
      await instance.methods
        .createCampaign(inputValue)
        .send({ from: accounts[0] });
    } catch (err) {
      setError(err.message);
    }
    setloading(false);
    Router.pushRoute("/");
  };

  return (
    <Layout>
      <Form onSubmit={onSubmit} error={!!error}>
        <Form.Field>
          <label>Minimum Contrbution</label>
          <Input
            value={inputValue}
            onChange={handleChange}
            label={<Dropdown defaultValue="Wei" options={options} />}
            labelPosition="right"
            placeholder="Number"
          />
        </Form.Field>
        <Message error content={error} />

        <Button loading={loading} primary>
          Create
        </Button>
      </Form>
    </Layout>
  );
};

export default FormExampleForm;
