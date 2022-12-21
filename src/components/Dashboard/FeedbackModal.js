import React, { useState } from 'react';
import { getAuth } from 'firebase/auth';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { createTicket } from './api';

export default function FeedbackModal(props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [feeling, setFeeling] = useState('');
  const [submitAnonymously, setSubmitAnonymously] = useState(false);
  const [okToContact, setOkToContact] = useState(true);
  const [contactByEmail, setContactByEmail] = useState(true);
  const [contactInfo, setContactInfo] = useState('');

  const emotionalStates = [ 'Excited', 'Confused', 'Angry', 'Other' ];

  const [emotionalStateRadioValue, setEmotionalStateRadioValue] = useState(0);

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError('');
    
    let error = '';
    try {
      const currentUser = getAuth().currentUser;
      const email = currentUser.email;
      
      const emotionalState = emotionalStateRadioValue === emotionalStates.length - 1 ?
        ("Other: " + feeling) : emotionalStates[emotionalStateRadioValue];
      const contact = !submitAnonymously && okToContact ?
          (contactByEmail ? ("Email: " + email) : contactInfo): null;
      
      const res = await createTicket(message, emotionalState, submitAnonymously, contact);
      
      if(res.message) {
        error = res.message;
      } else if (!res.success) {
        error = 'unknown error ocurred';
      }
    } catch (_) {
      error = _.message;
    }
    
    setLoading(false);
    if(error !== '') {
      setError(error);
    } else {
      setError('');
      setMessage('');
      setFeeling('');
      setEmotionalStateRadioValue(0);
      props.onHide();
    }
  }

  return (
    <Modal
      onHide={props.onHide}
      show={props.show}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
      fullscreen="sm-down"
      centered
    >
      <Form onSubmit={onSubmit}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Feedback and Ideas Form
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error !== '' &&
            <Alert variant='danger'>
              {error}
            </Alert>
          }

          <Form.Label>What do you want us to know?</Form.Label>
          <Form.Control
            as="textarea"
            rows={7}
            placeholder="Confusions? Suggestions? We'll carefully review everything you write."
            value={message}
            onChange={e => setMessage(e.target.value)}
            disabled={loading}
          />
        
          <Form.Label className="mt-4">How are you feeling?</Form.Label>
          <br/><ButtonGroup className="mb-2 d-flex">
          {emotionalStates.map((text, index) => (
            <ToggleButton
                key={text}
                id={`radio-${text}`}
                type="radio"
                variant="outline-primary"
                name="radio"
                value={index.toString()}
                checked={index === emotionalStateRadioValue}
                onChange={(e) => setEmotionalStateRadioValue(parseInt(e.currentTarget.value))}
                disabled={loading}
              >
                {text}
              </ToggleButton>)
          )}
          </ButtonGroup>
          {emotionalStateRadioValue === emotionalStates.length - 1 ? (
            <Form.Control
              type="text"
              placeholder="like a cat - I need to take an 18h-long nap"
              value={feeling}
              onChange={e => setFeeling(e.target.value)}
              disabled={loading} />
          ) : <></>}

        <Form.Check 
          type="switch"
          id="submit-anonymously"
          className="mt-4"
          label="I want to submit this form anonymously."
          checked={submitAnonymously}
          onChange={(e) => setSubmitAnonymously(e.target.checked)}
          disabled={loading}
        />
        {submitAnonymously ? <></> : <>
          <Form.Check 
            type="switch"
            id="ok-to-contact"
            label="I'm fine with being contacted regarding my message."
            checked={okToContact}
            onChange={(e) => setOkToContact(e.target.checked)}
            disabled={loading}
          />
          {okToContact ? <>
            <Form.Check 
              type="switch"
              id="contact-by-email"
              label="I only communicate using email."
              checked={contactByEmail}
              onChange={(e) => setContactByEmail(e.target.checked)}
              disabled={loading}
            />
            {contactByEmail ? <></> : <>
              <Form.Label className="mt-4">How can we reach you?</Form.Label>
              <Form.Control
                type="text"
                placeholder="Pick up my RFC-2549-compliant carrier pigeons from..."
                value={contactInfo}
                onChange={e => setContactInfo(e.target.value)}
                disabled={loading}
              />
          </>}
          </>: <></>}
        </>}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide} variant="outline-secondary" disabled={loading}>Abort</Button>
          <Button type="submit" disabled={loading}>Send</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}