import React from 'react';

const EmailTemplate = ({ verificationLink }) => (
  <div>
    <h1>Welcome to ResumeSwipe!</h1>
    <p>Thank you for registering. Please click the link below to verify your email:</p>
    <a href={verificationLink}>Verify Email</a>
  </div>
);

export default EmailTemplate;