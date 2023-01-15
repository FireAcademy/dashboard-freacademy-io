import React, { useState, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { updateAPIKey } from './api';
import { TriggerRefreshContext } from "./Dashboard";
import toast from 'react-hot-toast';

export default function ModifyAPIKeyModal(props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [initialized, setInitialized] = useState(false);
  const [name, setName] = useState('');
  const [limit, setLimit] = useState('0');
  const [disabled, setDisabled] = useState(false);
  const [origin, setOrigin] = useState(false);

  const refreshData = useContext(TriggerRefreshContext);

  if(props.show && initialized === false) {
    setName(props.data.name);
    setLimit(props.data.limit);
    setDisabled(props.data.disabled);
    setOrigin(props.data.origin);
    setInitialized(true);
  }
  if (!props.show && initialized === true) {
    setInitialized(false);
  }

  const apiKey = props.data.apiKey;
  
  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError('');
    
    let error = '';
    try {
      const res = await updateAPIKey(apiKey, name, limit, origin, disabled);
      
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
      setInitialized(false);
      refreshData();
      props.onHide();
      toast.success('API key modified.');
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
            Modify API Key
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error !== '' &&
            <Alert variant='danger'>
              {error}
            </Alert>
          }

          {loading &&
            <Alert variant='info'>
              Updating info...
            </Alert>
          }

          <FloatingLabel label="Name" className="mt-2 mb-3">
            <Form.Control type="text" placeholder="Test API Key" value={name} onChange={e => setName(e.target.value)} disabled={loading} />
          </FloatingLabel>

          <FloatingLabel label="Monthly Credit Limit" className="mt-2 mb-3">
            <Form.Control type="number" placeholder="0" value={limit} onChange={e => setLimit(e.target.value)} disabled={loading} />
          </FloatingLabel>

          <FloatingLabel label="Origin" className="mt-2 mb-3">
            <Form.Control type="text" placeholder="*" value={origin} onChange={e => setOrigin(e.target.value)} disabled={loading} />
          </FloatingLabel>

          <FloatingLabel label="Status">
            <Form.Select value={disabled} onChange={e => setDisabled(e.target.value === "true")}>
              <option value={false}>Enabled</option>
              <option value={true}>Disabled</option>
            </Form.Select>
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide} variant="secondary" disabled={loading}>Close</Button>
          <Button type="submit" disabled={loading}>Submit</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}