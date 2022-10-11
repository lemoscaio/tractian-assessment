import { Col, Row } from "antd"
import { AddCard } from "./AddCard"
import { AssetCard } from "./AssetCard"

export function AssetList({ assets }) {
  return (
    <Row gutter={[24, 24]}>
      {assets.map((asset, index) => (
        <Col key={asset._id}>
          <AssetCard asset={asset} />
        </Col>
      ))}
      <AddCard></AddCard>
    </Row>
  )
}
