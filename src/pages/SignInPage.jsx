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
import { useAuth } from "../hooks/useAuth"
import TractianLogo from "./../assets/tractian.svg"

const { Content } = Layout

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

export function SignInPage() {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const { login } = useAuth()

  function onLogin(values) {
    const { VITE_APP_API_URL } = import.meta.env

    axios
      .post(`${VITE_APP_API_URL}/sign-in`, {
        email: values.email,
        password: values.password,
      })
      .then((response) => {
        login({ data: response.data })
        navigate("/")
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
        <Divider>Sign-In</Divider>
        <Row type="flex" align="middle" justify="center">
          <Col xs={24} sm={24} md={18} lg={18} xl={10} xxl={6}>
            <Form
              {...formItemLayout}
              form={form}
              name="register"
              onFinish={onLogin}
              scrollToFirstError
              layout="vertical"
            >
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

              <Row>
                <Col type="flex" align="middle" justify="center" span={24}>
                  <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                      Login
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
        <Space
          direction="horizontal"
          style={{ width: "100%", justifyContent: "center" }}
        >
          <Link to="/sign-up" component={Typography.Link}>
            Not yet registered? Click here to sign-up.
          </Link>
        </Space>
      </Content>
      <Footer />
    </Layout>
  )
}
