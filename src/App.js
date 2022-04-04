import React, { Component, Fragment } from 'react';

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './App.css';

import logo from './logo.svg';
import { Form, Image, Input, Typography, Button, notification } from 'antd';

const { Title } = Typography

class App extends Component {
  state = {
    prefix: localStorage.getItem('prefix'), 
    postfix: localStorage.getItem('postfix')
  }

  onFinish = (values) => {
    const { prefix, postfix } = values
    navigator.clipboard.readText()
      .then(text => `${prefix}${text}${postfix}`)
      .then(password => navigator.clipboard.writeText(password))
      .then(result => {
        localStorage.setItem('prefix', prefix)
        localStorage.setItem('postfix', postfix)
        this.setState({
          prefix: prefix || '',
          postfix: postfix || ''
        })
      })
      .then(result => notification.success({
        message: 'Copy successfully 😀',
        description: 'Prefix and postfix will be stored in local storage for later use.'
      }))
      .catch(error => {
        notification.error({
          message: 'Copy fail 😔',
          description: error.message || 'Prefix and postfix will be stored in local storage for later use.'
        })
      })
  }

  render() {
    const { prefix, postfix } = this.state
    return (
      <Fragment>
        <div className='area'>
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
          <div className='header'>
            <Image className='App-logo' src={logo} width={50} preview={false} />
            <Title level={1} className='header-title' >Copier</Title>
          </div>
          <div>
            <Form
              name='copier'
              initialValues={{ prefix, postfix }}
              onFinish={this.onFinish}
            >
              <Form.Item name='prefix'>
                <Input placeholder='Prefix' />
              </Form.Item>
              <Form.Item name='postfix'>
                <Input placeholder='Postfix' />
              </Form.Item>
              <Form.Item style={{ width: '100%' }}>
                <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                  Get My Password
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Fragment>
    );
  }
};

export default App;
