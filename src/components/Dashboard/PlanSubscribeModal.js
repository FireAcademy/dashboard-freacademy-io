import React, { useState, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { getSubscribeURL } from './api';
import { TriggerRefreshContext } from "./Dashboard";

export default function PlanSubscribeModal(props) {
  const plans = props.plans;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [plan, setPlan] = useState('');

  const refreshData = useContext(TriggerRefreshContext);

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError('');
    
    let error = '';
    try {
      const res = await getSubscribeURL(plan);
      
      if(res.url) {
        window.location.href = res.url;
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
      refreshData();
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
            Add Payment Method
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error !== '' &&
            <Alert variant='danger'>
              {error}
            </Alert>
          }

            <Form.Group onChange={e => setPlan(e.target.value)}>
                <Form.Label>Plan</Form.Label>
                {plans.map(plan => <Form.Check 
                    name="plans"
                    key={plan.id}
                    type="radio"
                    value={plan.id}
                    label={plan.name}
                />)}
            </Form.Group>
            
            <br/>
            <p>Details about each plan are available on our <a rel="noreferrer" target="_blank" href="https://fireacademy.io/">homepage</a>.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide} variant="secondary" disabled={loading}>Close</Button>
          <Button type="submit" disabled={loading || plan.length === 0}>Checkout</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}