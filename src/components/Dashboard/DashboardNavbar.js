import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Logo from '../../logo.svg';
import { getAuth } from 'firebase/auth';

import './DashboardNavbar.css';
import UseGiftCodeModal from './UseGiftCodeModal';

export default function DashboardNavbar({ apikeys }) {
  const auth = getAuth();
  const user = auth.currentUser;
  const [showUseGiftCodeModal, setShowUseGiftCodeModal] = useState(false);

  const handleAction = async (action) => {
    if(action === 'signout') {
      return auth.signOut();
    }
    if(action === 'giftcode') {
      setShowUseGiftCodeModal(true);
    }
  }

  return (
    <>
      <Navbar bg="white" variant="pills" className="border-bottom mb-4" onSelect={handleAction}>
        <Container fluid>
          <Navbar.Brand className="ml-5">
            <Image src={Logo} height="32" width="32" />
          </Navbar.Brand>

          <NavDropdown title={user.email} id="header-email" className="px-3">
          <NavDropdown.Item eventKey="giftcode">Use Gift Code</NavDropdown.Item>
            <NavDropdown.Item eventKey="signout">Sign Out</NavDropdown.Item>
          </NavDropdown>
          {' '}
        </Container>
      </Navbar>
      <UseGiftCodeModal apikeys={apikeys} show={showUseGiftCodeModal} onHide={() => setShowUseGiftCodeModal(false)} />
    </>
  );
}