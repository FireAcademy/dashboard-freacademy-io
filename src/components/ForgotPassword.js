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

export default function ForgotPassword({ resetPassword }) {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState();

  return (
    <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: 333 }} className="mb-5">
      <Form className="mb-5" onSubmit={async (e) => {
        e.preventDefault();

        resetPassword(email).then(() => {
          setSuccess(true);
          setError('');
        }).catch((err) => {
          if (err.code === 'auth/user-not-found') {
            setError("That email address was not found in our records.");
          } else {
            setError("Error: " + err.code);
          }
        });
      }}>
        <Col xs={{ span: 2, offset: 5 }} className="mt-2">
          <Image src={Logo} height="72" />
        </Col>

        <h1 className="text-center h3 mt-3 mb-4 font-weight-normal">Password Reset</h1>

        {success &&
          <Alert variant='success'>
            Email sent successfully.
          </Alert>
        }

        {error.length > 0 &&
          <Alert variant='danger'>
            {error}
          </Alert>
        }

        <FloatingLabel label="Email Address" className="mb-3">
          <Form.Control type="email" placeholder="john.doe@example.com" onChange={e => setEmail(e.target.value)} />
        </FloatingLabel>

        <div className="d-grid gap-2">
          <Button variant="primary" type="submit">
            Send Reset Link
          </Button>
        </div>

        <p className="mt-4 mb-5 text-muted text-center">
          Magically remembered it? <Link to="/login">Login</Link>.
        </p>
      </Form>
    </Container>
  );
}