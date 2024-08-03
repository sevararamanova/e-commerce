import React, { useState } from 'react'

import { Button, Checkbox, Form, Input, Typography, Divider } from 'antd';
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import axios from "../../../api";


const{Title, Text} = Typography;


const Register = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] =useState(false)

  const onFinish = async (values) => {
    console.log(values)
    try {
      setLoading(true)
      const response = await axios.post('/auth', values);
    console.log(response.data);
    }
    catch (error) {
      console.log(error);
    }
    finally {
    setLoading(false)
    }
    form.resetFields()
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      layout='vertical'
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 24,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Title className='text-center'>Register</Title>
      <Form.Item
      style={{ marginBottom: "0px"}}
        label="Firstname"
        name="first_name"
        rules={[
          {
            required: true,
            message: 'Please input your firstname!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
      style={{ marginBottom: "0px"}}
        label="Username"
        name="Username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
      style={{ marginBottom: "0px"}}
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          }
        ]}
      >
        <Input.Password />
      </Form.Item>
    

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
      className='w-full'
        wrapperCol={{
          span: 24,
        }}
      >
        <Button className='w-full' type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
      <Divider className='text-center text-gray-500 mb-[20px]'>Or</Divider>
           <div className='flex justify-center'>
           <GoogleLogin
        onSuccess={credentialResponse => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
        useOneTap
      />
           </div>
      <Text className='mt-[20px] block text-center'> Already have an account? <Link to="/auth">Login </Link> </Text>
    </Form>
  )
}

export default Register