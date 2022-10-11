import { LaptopOutlined, UserOutlined } from "@ant-design/icons"
import {
  Breadcrumb,
  Button,
  Col,
  Form,
  Input,
  Layout,
  List,
  Row,
  Typography,
} from "antd"
import axios from "axios"
import React, { useContext, useEffect, useState } from "react"
import { companyInfoContext } from "../contexts/companyInfoContext"
import { useAuth } from "../hooks/useAuth"

const { Header, Content, Sider } = Layout

export function CompanyPage() {
  const { VITE_APP_API_URL } = import.meta.env
  const { user, logout } = useAuth()
  const { userInfo, fetchUserInfo, fetchUnits } = useContext(companyInfoContext)
  const [form] = Form.useForm()
  const [unitForm] = Form.useForm()

  const [userList, setUserList] = useState([])

  useEffect(() => {
    if (userInfo) {
      fetchUsers()
    }
  }, [userInfo])

  function fetchUsers() {
    axios
      .get(`${VITE_APP_API_URL}/companies/users/${userInfo.company?._id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((response) => {
        setUserList(response.data)
      })
      .catch((error) => console.log(error))
  }

  function onCreateCompany(values) {
    axios
      .post(
        `${VITE_APP_API_URL}/companies/create`,
        {
          name: values.company,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        },
      )
      .then((response) => {
        fetchUserInfo()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function onCreateCompanyFailed(errorInfo) {
    console.log("Failed:", errorInfo)
  }

  function onAddNewUnit(values) {
    const { VITE_APP_API_URL } = import.meta.env

    axios
      .post(
        `${VITE_APP_API_URL}/units/create`,
        {
          name: values.name,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        },
      )
      .then((response) => {
        fetchUnits()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function onAddNewUser(values) {
    const { VITE_APP_API_URL } = import.meta.env

    axios
      .patch(
        `${VITE_APP_API_URL}/companies/addUser`,
        {
          email: values.email,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        },
      )
      .then((response) => {
        fetchUsers()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function onLogout() {
    logout()
  }

  return (
    <>
      <Breadcrumb
        style={{
          margin: "16px 0",
          cursor: "pointer",
        }}
      >
        <Breadcrumb.Item>Company</Breadcrumb.Item>
      </Breadcrumb>
      {userInfo?.company ? (
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <Typography.Title style={{ textAlign: "center" }}>
            {userInfo?.company?.name}
          </Typography.Title>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Typography.Title level={4}>
                Add a new unit to this company:
              </Typography.Title>
              <Form
                form={unitForm}
                name="register"
                onFinish={onAddNewUnit}
                scrollToFirstError
                layout="vertical"
              >
                <Form.Item
                  name="name"
                  label=""
                  rules={[
                    {
                      required: true,
                      message: "Please input the unit name!",
                    },
                  ]}
                >
                  <Input size="large" placeholder="Insert the unit name" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Add
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Typography.Title level={4}>Add a new user:</Typography.Title>
              <Form
                form={form}
                name="register"
                onFinish={onAddNewUser}
                scrollToFirstError
                layout="vertical"
              >
                <Form.Item
                  name="email"
                  label=""
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
                  <Input
                    size="large"
                    placeholder="Insert the user e-mail"
                    prefix={<UserOutlined />}
                  />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Add
                  </Button>
                </Form.Item>
              </Form>
            </Col>
            <Col span={24}>
              <Typography.Title level={4}>Users:</Typography.Title>
              <List
                itemLayout="horizontal"
                // TODO implement user list
                dataSource={userList}
                renderItem={(user) => (
                  <List.Item
                    actions={[
                      <a key="list-loadmore-edit">edit</a>,
                      <a key="list-loadmore-more">remove</a>,
                    ]}
                  >
                    <List.Item.Meta
                      title={<a href="https://ant.design">{user.name}</a>}
                      description={user.email}
                    />
                  </List.Item>
                )}
              />
            </Col>
          </Row>
        </Content>
      ) : (
        <Content>
          <Row flex align="center" justify="center">
            <Col span={12}>
              <Typography.Title level={3}>
                Create a company or wait until you're put in an existing one:
              </Typography.Title>
              <Form
                name="basic"
                labelCol={{ span: 0 }}
                wrapperCol={{ span: 24 }}
                initialValues={{ remember: true }}
                onFinish={onCreateCompany}
                onFinishFailed={onCreateCompanyFailed}
                autoComplete="off"
              >
                <Form.Item
                  label=""
                  name="company"
                  rules={[
                    {
                      required: true,
                      message: "Please input your the company name!",
                    },
                  ]}
                >
                  <Input size="large" placeholder="Company name" />
                </Form.Item>
                <Row>
                  <Col span={24} align="center" justify="center">
                    <Form.Item
                      wrapperCol={{
                        span: 24,
                      }}
                    >
                      <Button type="primary" htmlType="submit">
                        Submit
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Content>
      )}
      <Button onClick={onLogout}>Logout</Button>
    </>
  )
}
