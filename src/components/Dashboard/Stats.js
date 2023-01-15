import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

export default function Stats({
  remainingCredits,
  billingCycleEnd,
  apiKeys,
  plan,
  extraCreditsEnabled
}) {
 const bce = new Date(billingCycleEnd)
 const renewalDate = bce.toLocaleDateString('en-us', {
  year: "numeric",
  month: "short",
  day: "numeric"
 });

 const noAPIKeys = apiKeys.length;
 const noAPIKeysEnabled = apiKeys.filter(e => !e.disabled).length;
 const planSubtitle = extraCreditsEnabled ? "credit packages auto-purchased" : "fixed number of credits";
 return (
    <Row>
      <CustomCard title="Remaining Credits" value={remainingCredits} subtitle={"renewal  on " + renewalDate} />
      <CustomCard title="API Keys" value={noAPIKeys} subtitle={`${noAPIKeysEnabled} enabled`} />
      <CustomCard title="Plan" value={plan} subtitle={planSubtitle} />
    </Row>
  );
}

function CustomCard({title, value, subtitle}) {
  return (
    <Col md={4} lg={4} className="mb-4 mb-lg-4">
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