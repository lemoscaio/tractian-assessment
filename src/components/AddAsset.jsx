import { Button, Col, Divider, Form, Input, Layout, Row } from "antd"
import axios from "axios"
import React, { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { companyInfoContext } from "../contexts/companyInfoContext"
import { useAuth } from "../hooks/useAuth"

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

export function AddAsset() {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const { user } = useAuth()
  const { selectedUnit, fetchAssets } = useContext(companyInfoContext)

  function onAddAsset(values) {
    const { VITE_APP_API_URL } = import.meta.env

    axios
      .post(
        `${VITE_APP_API_URL}/assets/create/${selectedUnit}`,
        {
          name: values.name,
          image: values.image,
          description: values.description,
          model: values.model,
          owner: values.owner,
          status: values.status,
          healthLevel: Number(values.healthLevel),
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        },
      )
      .then((response) => {
        navigate("/units")
        fetchAssets(selectedUnit)
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
        <Divider>Add an asset</Divider>
        <Row type="flex" align="middle" justify="center">
          <Col xs={24} sm={24} md={18} lg={18} xl={10} xxl={6}>
            <Form
              {...formItemLayout}
              form={form}
              name="register"
              onFinish={onAddAsset}
              scrollToFirstError
              layout="vertical"
            >
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: "Please input the asset name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="image"
                label="Image URL"
                rules={[
                  {
                    required: true,
                    message: "Please input the asset image URL!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: "Please input the asset description!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="model"
                label="Model"
                rules={[
                  {
                    required: true,
                    message: "Please input the asset model!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="owner"
                label="Owner"
                rules={[
                  {
                    required: true,
                    message: "Please input the asset owner!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="status"
                label="Status"
                rules={[
                  {
                    required: true,
                    message: "Please input the asset initial status!",
                  },
                ]}
              >
                <Input placeholder="Must be only 'Running', 'Alerting' or 'Stopped'" />
              </Form.Item>

              <Form.Item
                name="healthLevel"
                label="Health Level"
                rules={[
                  {
                    required: true,
                    message: "Please input the asset initial health level!",
                  },
                ]}
              >
                <Input placeholder="From 0 to 100" />
              </Form.Item>

              <Row>
                <Col type="flex" align="middle" justify="center" span={24}>
                  <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                      Add
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Content>
    </Layout>
  )
}
