import {
  Button,
  Col,
  Divider,
  Form,
  Image,
  Input,
  Layout,
  Row,
  Space,
  Typography,
} from "antd"
import axios from "axios"
import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { Footer } from "../components/Footer"

import TractianLogo from "./../assets/tractian.svg"

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
}
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },

    sm: {
      span: 24,
      offset: 0,
    },
  },
}

const { Content } = Layout

export function SignUpPage() {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  function onSignUp(values) {
    const { VITE_APP_API_URL } = import.meta.env

    axios
      .post(`${VITE_APP_API_URL}/sign-up`, {
        email: values.email,
        password: values.password,
      })
      .then((response) => {
        navigate("/sign-in")
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <Layout
      className="layout"
      style={{
        minHeight: "100vh",
      }}
    >
      <Content
        style={{
          padding: "50px",
          height: "100%",
        }}
      >
        <Row align="middle" justify="center">
          <Image width={300} src={TractianLogo} />
        </Row>
        <Divider>Sign-Up</Divider>
        <Row type="flex" align="middle" justify="center">
          <Col xs={24} sm={24} md={18} lg={18} xl={10} xxl={6}>
            <Form
              {...formItemLayout}
              form={form}
              name="register"
              onFinish={onSignUp}
              scrollToFirstError
              layout="vertical"
            >
              <Form.Item
                name="Name"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: "Please input your name!",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="email"
                label="E-mail"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve()
                      }
                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!",
                        ),
                      )
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Row>
                <Col type="flex" align="middle" justify="center" span={24}>
                  <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                      Register
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
        <Space
          direction="horizontal"
          style={{ width: " 100%", justifyContent: "center" }}
        >
          <Link to="/sign-in" component={Typography.Link}>
            Already registered? Click here to go to login.
          </Link>
        </Space>
      </Content>
      <Footer />
    </Layout>
  )
}
