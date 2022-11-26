import React from 'react';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Logo from '../logo.svg';

export default function LoadingIndicator() {
  return (
    <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }} className="mb-5">
        <Col className="mt-2 text-center">
          <Image src={Logo} height="133.7"/>
        </Col>
    </Container>
  );
}