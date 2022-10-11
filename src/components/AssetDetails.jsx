import {
  Breadcrumb,
  Button,
  Col,
  Divider,
  Image,
  Layout,
  message,
  Popconfirm,
  Progress,
  Row,
  Space,
  Typography,
} from "antd"
import axios from "axios"
import React, { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { companyInfoContext } from "../contexts/companyInfoContext"
import { useAuth } from "../hooks/useAuth"

const { Text, Link, Title } = Typography

const { Content } = Layout

export function AssetDetails() {
  const { VITE_APP_API_URL } = import.meta.env
  const { assetId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const { assets, fetchAssets, selectedUnit } = useContext(companyInfoContext)

  const [asset, setAsset] = useState({})

  useEffect(() => {
    setAsset(assets.find((assetInList) => assetInList._id === assetId))
  }, [])

  const healthLevelBar = {
    Running: "active",
    Alerting: "exception",
  }
  const healthLevelBarColor = {
    Stopped: "#8c8c8c",
  }

  function onGoToPage(page) {
    navigate(`/${page}`)
  }

  function confirmDelete(e) {
    axios
      .delete(`${VITE_APP_API_URL}/assets/${assetId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((response) => {
        message.success("Deleted")
        fetchAssets(selectedUnit)
        setTimeout(() => {
          onGoToPage("units")
        }, 1000)
      })
      .catch((error) => {
        console.log(error)
        message.error("Delete failed")
      })
  }

  if (!asset) return <></>

  return (
    <>
      <Breadcrumb
        style={{
          margin: "16px 0",
          cursor: "pointer",
        }}
      >
        <Breadcrumb.Item onClick={() => onGoToPage("company")}>
          Company
        </Breadcrumb.Item>
        <Breadcrumb.Item onClick={() => onGoToPage("units")}>
          Units
        </Breadcrumb.Item>
        <Breadcrumb.Item>Asset</Breadcrumb.Item>
      </Breadcrumb>
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
          background: "#fff",
        }}
      >
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "100%",
                gap: "18px",
              }}
            >
              <Image width={200} src={asset.image} />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Title level={2}>{asset.name}</Title>
                <Text>Description: {asset.description}</Text>
                <Text>Model: {asset.model}</Text>
                <Text>Owner: {asset.owner}</Text>
                <Text>
                  Last time updated:{" "}
                  {new Date(asset.updatedAt).toLocaleString()}
                </Text>
              </div>
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  gap: "15px",
                  margin: "20px 0 0",
                }}
              >
                <p>
                  <span>Status: {asset.status}</span>
                </p>
                <p>
                  <span>Health: {asset.healthLevel}%</span>
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                }}
                s
              >
                <Progress
                  percent={asset.healthLevel}
                  status={healthLevelBar[asset.status] || ""}
                  strokeColor={healthLevelBarColor[asset.status] || ""}
                  showInfo={false}
                  type="circle"
                  strokeLinecap="round"
                  strokeWidth={12}
                />
              </div>
            </div>
          </div>
        </div>
        <Row align="center" justify="end">
          <Col span={24}>
            <Space>
              <Button>Edit</Button>
              <Popconfirm
                title="Are you sure to delete this task?"
                onConfirm={confirmDelete}
                okText="Yes"
                cancelText="No"
                placement="bottom"
              >
                <Button>Remove</Button>
              </Popconfirm>
            </Space>
          </Col>
        </Row>
        <Divider>History</Divider>
        <Space>Soon you'll be able to see some charts here.</Space>
      </Content>
    </>
  )
}
