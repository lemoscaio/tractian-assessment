import { Outlet } from "react-router-dom"

import { Layout, Menu } from "antd"
import React, { useContext } from "react"

import { Footer } from "../components/Footer"
import { companyInfoContext } from "../contexts/companyInfoContext"

const { Header } = Layout

export function MainLayout() {
  const { units, handleSelectUnit } = useContext(companyInfoContext)
  const unitList = units.map((unit, index) => ({
    key: index,
    label: `${unit.name}`,
    onClick: () => {
      handleSelectUnit(unit._id)
    },
  }))

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["0"]}
          items={unitList}
        />
      </Header>
      <Layout>
        <Layout
          style={{
            padding: "0 24px 24px",
          }}
        >
          <Outlet />
        </Layout>
      </Layout>
      <Footer />
    </Layout>
  )
}
