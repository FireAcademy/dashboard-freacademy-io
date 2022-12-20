import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Logo from '../logo.svg';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


/* killer feature */
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

export default function PaymentSuccess() {
  const { width, height } = useWindowSize()
  const [ displayConfetti, setDisplayConfetti ] = useState(false)

  return (
    <>
      <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: 420 }} className="mb-5">
        <Container className="mb-5">
          <Col xs={{ span: 2, offset: 5 }} className="mt-2">
            <Image src={Logo} height="130" />
          </Col>

          <h1 className="text-center h3 mt-3 mb-4 font-weight-normal">Thank you!</h1>

          <p className="text-center mb-3">
            Your subscription has been activated. We can't wait to see the great things that you are going to build!
          </p>

          <p className="text-center mb-3">
            Actually, this calls for a celebration - click the button below for some confetti.
          </p>

          <center>
            <Button
              variant="outline-danger"
              className="mb-5" 
              onClick={() => setDisplayConfetti(true)}
              disabled={displayConfetti}
            >
              {displayConfetti ? 'I have fulfilled my purpose.' : 'Click me'}
            </Button>
          </center>

          <p className="text-center mb-5">
            <Link to="/dashboard" className="text-muted">Back to Dashboard</Link>
          </p>
        </Container>
      </Container>
      { displayConfetti ? <Confetti
        width={width}
        height={height}
        numberOfPieces={400}
        gravity={0.13}
        opacity={0.84}
        tweenDuration={4200 / 2}
      /> : <></> }
    </>
  );
}