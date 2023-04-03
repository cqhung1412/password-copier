import React, { Component, Fragment } from "react";
import authenticator from "authenticator";

import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "./App.css";

import logo from "./logo.svg";
import { Form, Image, Input, Typography, Button, notification } from "antd";
window.Buffer = window.Buffer || require("buffer").Buffer;


const { Title } = Typography;

class App extends Component {
  state = {
    key: localStorage.getItem("key"),
    prefix: localStorage.getItem("prefix"),
    postfix: localStorage.getItem("postfix"),
  };

  onFinish = (values) => {
    const { key, prefix, postfix } = values;
    let promise;
    if (!key || key === "") {
      promise = navigator.clipboard.readText();
    } else {
      promise = new Promise((resolve, reject) => {
        try {
          const password = authenticator.generateToken(key);
          console.log(password);
          resolve(password);
        } catch (error) {
          reject(error);
        }
      });
    }
    promise
      .then((text) => `${prefix}${text}${postfix}`)
      .then((password) => navigator.clipboard.writeText(password))
      .then((result) => {
        const key = values.key || "";
        localStorage.setItem("key", key);
        localStorage.setItem("prefix", prefix);
        localStorage.setItem("postfix", postfix);
        this.setState({
          prefix: prefix || "",
          postfix: postfix || "",
        });
      })
      .then((result) =>
        notification.success({
          message: "Copy successfully 😀",
          description:
            "Key, prefix and postfix will be stored in local storage for later use.",
        })
      )
      .catch((error) => {
        notification.error({
          message: "Copy fail 😔",
          description:
            error.message ||
            "Key, refix and postfix will be stored in local storage for later use.",
        });
      });
  };

  render() {
    const { key, prefix, postfix } = this.state;
    return (
      <Fragment>
        <div className="area">
          <ul className="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <div className="header">
            <Image className="App-logo" src={logo} width={50} preview={false} />
            <Title level={1} className="header-title">
              Copier
            </Title>
          </div>
          <div>
            <Form
              name="copier"
              initialValues={{ key, prefix, postfix }}
              onFinish={this.onFinish}
            >
              <Form.Item name="key">
                <Input.Password placeholder="Key XXXX XXXXX XXXX XXXX" />
              </Form.Item>
              <Form.Item name="prefix">
                <Input.Password placeholder="Prefix" />
              </Form.Item>
              <Form.Item name="postfix">
                <Input.Password placeholder="Postfix" />
              </Form.Item>
              <Form.Item style={{ width: "100%" }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  Get My Password
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default App;
