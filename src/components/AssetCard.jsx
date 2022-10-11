import { Card, Image, Progress, Space, Typography } from "antd"
import React from "react"
const { Meta } = Card

import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons"
import { useNavigate } from "react-router-dom"

export function AssetCard({ asset = {} }) {
  const navigate = useNavigate()

  const healthLevelBar = {
    Running: "active",
    Alerting: "exception",
  }
  const healthLevelBarColor = {
    Stopped: "#8c8c8c",
  }

  function onClickAssetCard() {
    navigate(`/assets/${asset._id}`)
  }
  return (
    <Card
      onClick={onClickAssetCard}
      style={{
        width: 230,
      }}
      size="small"
      actions={[<span key="details">Click to view details</span>]}
      hoverable
    >
      <Typography.Title level={4} style={{ textAlign: "center" }}>
        {asset.name}
      </Typography.Title>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Image
          alt={asset.name}
          src={asset.image}
          style={{
            width: "100%",
            height: "120px",
            objectFit: "cover",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "20px 0 0",
        }}
      >
        <p style={{ textAlign: "center" }}>
          <span>Status: {asset.status}</span>
        </p>
        <p style={{ textAlign: "center" }}>
          <span>Health: {asset.healthLevel}%</span>
        </p>
      </div>
      <Progress
        percent={asset.healthLevel}
        status={healthLevelBar[asset.status] || ""}
        strokeColor={healthLevelBarColor[asset.status] || ""}
        showInfo={false}
        strokeLinecap="round"
        strokeWidth={18}
      />
    </Card>
  )
}
