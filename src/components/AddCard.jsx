import { Card, Image, Progress, Typography } from "antd"
import React from "react"

import { useNavigate } from "react-router-dom"

export function AddCard() {
  const navigate = useNavigate()

  function onClickAddCard() {
    navigate(`/add/asset`)
  }
  return (
    <Card
      onClick={onClickAddCard}
      style={{
        width: 230,
      }}
      size="small"
      hoverable
      bodyStyle={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Typography.Title level={5}>Add a new asset</Typography.Title>
    </Card>
  )
}
