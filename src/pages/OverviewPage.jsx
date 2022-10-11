import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons"
import { Breadcrumb, Card, Col, Layout, Menu, Row } from "antd"
import React, { useContext } from "react"
import { AssetCard } from "../components/AssetCard"

import units from "../mock/units.json"
import { AssetList } from "../components/AssetList"
import { AssetDetails } from "../components/AssetDetails"
import { companyInfoContext } from "../contexts/companyInfoContext"
import { useNavigate } from "react-router-dom"

const { Header, Content, Sider } = Layout

export function OverviewPage() {
  const { assets } = useContext(companyInfoContext)
  const navigate = useNavigate()

  function onGoToCompanyPage() {
    navigate("/company")
  }

  return (
    <>
      <Breadcrumb
        style={{
          margin: "16px 0",
          cursor: "pointer",
        }}
      >
        <Breadcrumb.Item onClick={onGoToCompanyPage}>Company</Breadcrumb.Item>
        <Breadcrumb.Item>Units</Breadcrumb.Item>
      </Breadcrumb>
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        {assets && <AssetList assets={assets}></AssetList>}
      </Content>
    </>
  )
}
