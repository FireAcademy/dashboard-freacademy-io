import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

export default function Stats({apiKeys, enabledApiKeys, totalWeeklyCreditUsage, freeCreditsRemaining}) {
 return (
    <Row>
      <CustomCard title="API Keys" value={apiKeys} subtitle={enabledApiKeys.toString() + " enabled"} />
      <CustomCard title="Weekly Usage" value={totalWeeklyCreditUsage} subtitle="credits" />
      <CustomCard title="Free Credits Left" value={freeCreditsRemaining} subtitle="credits" />
    </Row>
  );
}

function CustomCard({title, value, subtitle}) {
  return (
    <Col md={4} lg={4} className="mb-3 mb-lg-5">
      <Card>
        <Card.Body className="text-center">
          <Card.Text className="text-uppercase fs-5 fw-light">{title}</Card.Text>
          <Card.Text className="text-dark mb-1 d-block h1">{value}</Card.Text>
          <Card.Text className="text-lowercase fs-6 fw-light">{subtitle}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}