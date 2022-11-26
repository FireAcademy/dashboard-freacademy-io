import React from 'react';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Logo from '../logo.svg';
import { Link } from 'react-router-dom';

export default function PaymentSuccess({ signIn }) {
  return (
    <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: 420 }} className="mb-5">
      <Container className="mb-5">
        <Col xs={{ span: 2, offset: 5 }} className="mt-2">
          <Image src={Logo} height="130" />
        </Col>

        <h1 className="text-center h3 mt-3 mb-4 font-weight-normal">Thank you!</h1>

        <p className="text-center mb-3">
          You have successfully activated your subscription. It might take a few minutes before the change is reflected on your dashboard.
        </p>

        <p className="text-center mb-5">
          We are grateful for your trust and can't wait to see the great things that you are going to build.
        </p>

        <p className="text-center mb-5">
          <Link to="/dashboard" className="text-muted">Back to Dashboard</Link>
        </p>
      </Container>
    </Container>
  );
}