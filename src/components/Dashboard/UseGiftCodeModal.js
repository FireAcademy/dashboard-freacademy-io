import React, { useContext, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { redeemGiftCode } from './api';
import { TriggerRefreshContext } from "./Dashboard";

export default function UseGiftCodeModal(props) {
  const apiKeys = props.apikeys;

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(apiKeys.length === 0 ? 'You have no API keys' : '');
  const [apiKey, setApiKey] = useState(apiKeys.length > 0 ? apiKeys[0].api_key : '');
  const [code, setCode] = useState('');

  const refreshData = useContext(TriggerRefreshContext);

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setResult('');
    
    let result;
    try {
      const res = await redeemGiftCode(code, apiKey);

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
      setCode('');
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
            Use Gift Code
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

          <p>Don't have a gift code? Take a look at our <a rel="noreferrer" target="_blank" href="http://docs.fireacademy.io/grants">grants program</a> .</p>

          <FloatingLabel label="Gift Code" className="mt-2 mb-3">
            <Form.Control type="text" placeholder="9a94fc27-fb32-4b66-b393-88aa00cb73a4" value={code} onChange={e => setCode(e.target.value)} disabled={loading} />
          </FloatingLabel>

          <FloatingLabel label="API Key">
            <Form.Select value={apiKey} onChange={e => setApiKey(e.target.value)}>
              {apiKeys.map(key => <option key={key.api_key} value={key.api_key}>{key.name}</option>)}
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