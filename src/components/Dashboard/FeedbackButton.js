import React, { useState } from 'react';
import FeedbackModal from './FeedbackModal';

import './FeedbackButton.css';

export default function FeedbackButton() {
  const [showFeedbackModal, setShowFeedbackModall] = useState(false);

  return (
    <>
      <span
        className="feedback-button"
        title="Feedback and Ideas Form"
        onClick={() => setShowFeedbackModall(true)}
      >
        &#129412;
      </span>
      <FeedbackModal show={showFeedbackModal} onHide={() => setShowFeedbackModall(false)} />
    </>
  );
}