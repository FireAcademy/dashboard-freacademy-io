import React, { useContext, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { createAPIKey } from './api';
import { TriggerRefreshContext } from "./Dashboard";

export default function GenerateAPIKeyModal(props) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [name, setName] = useState('');
  const [origin, setOrigin] = useState('*');
  const [limit, setLimit] = useState('0');

  const refreshData = useContext(TriggerRefreshContext);

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setResult('');
    
    let result;
    try {
      const res = await createAPIKey(name, origin, limit);

      if(res.message) {
        result = res.message;
      } else if (!res.success) {
        result = 'unknown error ocurred';
      } else {
        result = true;
      }
    } catch(_) {
      result = _.message;
    }
    
    setLoading(false);
    if(result === true) {
      setResult('');
      setName('');
      setOrigin('*');
      setLimit("0");
      refreshData();
      props.onHide();
    } else {
      setResult(result);
    }
  }

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
      fullscreen="sm-down"
      centered
    >
      <Form onSubmit={onSubmit}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Generate API Key
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {result !== '' &&
            <Alert variant='danger'>
              {result}
            </Alert>
          }

          {loading &&
            <Alert variant='info'>
              Generating...
            </Alert>
          }

          <p>You're about to generate a new API key. If you're unsure about any parameters, please consult our <a rel="noreferrer" target="_blank" href="https://docs.fireacademy.io/dashboard/creating-an-api-key">docs</a>.</p>

          <FloatingLabel label="Name">
            <Form.Control type="text" placeholder="Marvin" value={name} onChange={e => setName(e.target.value)} disabled={loading} />
          </FloatingLabel>

          <FloatingLabel label="Origin" className="mt-2">
            <Form.Control type="text" placeholder="*" value={origin} onChange={e => setOrigin(e.target.value)} disabled={loading} />
          </FloatingLabel>

          <FloatingLabel label="Monthly Credit Limit" className="mt-2 mb-3">
            <Form.Control type="number" placeholder="0" value={limit} onChange={e => setLimit(e.target.value)} disabled={loading} />
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