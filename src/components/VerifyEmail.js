import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Logo from '../logo.svg';

export default function VerifyEmail({refreshToken, resendVerificationEmail}) {
  return (
    <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: 500 }} className="mb-5">
      <Container className="mb-5">
        <Col xs={{ span: 2, offset: 5 }} className="mt-2">
          <Image src={Logo} height="72" />
        </Col>

        <h1 className="text-center h3 mt-3 mb-3 font-weight-normal">Verify your email</h1>

        <p className="text-center mb-4">You're one step away from using FireAcademy. Click the link you just received by email to activate your account.</p>

        <Col className="text-center">
          <Button variant="primary" onClick={refreshToken}>
            Log In
          </Button>
          {' '}
          <Button variant="outline-primary" onClick={resendVerificationEmail}>
            Resend Email
          </Button>
        </Col>
      </Container>
    </Container>
  );
}