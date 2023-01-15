import React, { useState, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { updateUserPlan } from './api';
import { TriggerRefreshContext } from "./Dashboard";
import toast from 'react-hot-toast';

export default function ManagePlanModal(props) {
  const plans = props.plans;
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [plan, setPlan] = useState('');
  const [creditsPackages, setCreditsPackages] = useState(props.creditsPackages);
  if(plan === '' && plans.length > 0) {
    setPlan(plans.find(p => p.name === props.planName)?.id ?? plans[0].id);
  }

  const refreshData = useContext(TriggerRefreshContext);

  const onSubmitUpdatePlan = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError('');
    
    let error = '';
    try {
      const resp = await updateUserPlan(plan, creditsPackages);

      if(resp.success) {
        toast.success('Plan updated.');
      } else {
        error = resp.message;
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
      <Form onSubmit={onSubmitUpdatePlan}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Manage Your Plan
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error !== '' &&
            <Alert variant='danger'>
              {error}
            </Alert>
          }

          <FloatingLabel label="Plan">
            <Form.Select value={plan} onChange={e => setPlan(e.target.value)} disabled={loading}>
              {plans.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </Form.Select>
          </FloatingLabel>
            
          <Form.Check 
            type="switch"
            id="purchase-extra-credits-packages"
            className="mt-3"
            label="Auto-purchase additional credits packages as needed."
            checked={creditsPackages}
            onChange={(e) => setCreditsPackages(e.target.checked)}
            disabled={loading}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide} variant="secondary" disabled={loading}>Close</Button>
          <Button
            type="submit"
            disabled={loading || (plan !== '' && plans.find(p => p.id === plan).name === props.planName && creditsPackages === props.creditsPackages)}>
              Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}