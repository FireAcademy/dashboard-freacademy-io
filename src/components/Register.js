import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Logo from '../logo.svg';
import { Link } from 'react-router-dom';

export default function RegisterForm({signUp}) {
  const [error, setError] = useState('');
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: 333 }} className="mb-5">
      <Form className="mb-5" onSubmit={(e) => {
        e.preventDefault();

        signUp(email, password).catch((err) => {
          if (err.code === 'auth/email-already-in-use') {
            setError("An account is already using that email address.");
          } else {
            setError("Error: " + err.code);
          }
        });
      }}>
        <Col xs={{ span: 2, offset: 5 }} className="mt-2">
          <Image src={Logo} height="72" />
        </Col>

        <h1 className="text-center h3 mt-3 mb-4 font-weight-normal">Start using FireAcademy</h1>

        {error.length > 0 && 
          <Alert variant='danger'>
            {error}
          </Alert>
        }

        <FloatingLabel label="Email Address">
          <Form.Control type="email" placeholder="john.doe@example.com" onChange={e => setEmail(e.target.value)} />
        </FloatingLabel>


        <FloatingLabel label="Password" className="mt-2 mb-3">
          <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        </FloatingLabel>

        <div className="d-grid gap-2">
          <Button variant="primary" type="submit">
            Sign Up
          </Button>
        </div>

        <p className="mt-4 mb-5 text-muted text-center">
          Already have an account? <Link to="/login">Login</Link> instead. <br/> <br/>
          By signing up, you confirm that you have read and understood FireAcademy's{' '}
          <a href="https://fireacademy.io/terms-and-conditions">Terms and Conditions</a>,{' '}
          <a href="https://fireacademy.io/privacy-policy">Privacy Policy</a>, and{' '}
          <a href="https://fireacademy.io/cookie-policy">Cookie Policy</a>.
        </p>
      </Form>
    </Container>
  );
}