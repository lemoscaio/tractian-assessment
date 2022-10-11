import { Layout } from "antd"

const { Footer: FooterEl } = Layout

export function Footer() {
  return (
    <FooterEl
      style={{
        textAlign: "center",
      }}
    >
      Tractian Assessment | Created by Caio Lemos
    </FooterEl>
  )
}
