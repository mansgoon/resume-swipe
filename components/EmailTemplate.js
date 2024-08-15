import React from 'react';
import { Html } from '@react-email/html';
import { Button } from '@react-email/button';

const EmailTemplate = ({ verificationLink }) => (
  <Html lang="en">
    <div style={{
      backgroundColor: '#ffffff',
      color: '#333333',
      fontFamily: 'Arial, sans-serif',
      padding: '40px 20px',
      maxWidth: '600px',
      margin: '0 auto',
    }}>
      <table width="100%" cellPadding="0" cellSpacing="0" style={{ marginBottom: '20px' }}>
        <tr>
          <td style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src="https://cdn.builder.io/api/v1/image/assets%2F6733664189124df1a0a8060cf76dde25%2Fb11675d893bd40138e98cba9da8e290c" alt="ResumeSwipe Logo" width="36" height="36" style={{ marginRight: '10px' }} />
            <span style={{ fontSize: '24px', fontWeight: 'bold' }}>
              <span style={{ color: '#333333' }}>resume</span>
              <span style={{ color: '#3498db' }}>swipe</span>
            </span>
          </td>
        </tr>
      </table>
      <p style={{
        fontSize: '16px',
        lineHeight: '1.5',
        marginBottom: '30px',
        textAlign: 'center',
      }}>
        Welcome to our community! We&apos;re thrilled to have you join us.
        To get started, please verify your email address by clicking the button below.
      </p>
      <table width="100%" cellPadding="0" cellSpacing="0">
        <tr>
          <td align="center">
            <Button
              href={verificationLink}
              style={{
                backgroundColor: '#3b82f6',
                color: '#ffffff',
                padding: '12px 20px',
                borderRadius: '5px',
                fontSize: '16px',
                fontWeight: 'bold',
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              Verify Email
            </Button>
          </td>
        </tr>
      </table>
      <p style={{
        fontSize: '14px',
        color: '#666666',
        marginTop: '30px',
        textAlign: 'center',
      }}>
        If you didn&apos;t create an account with ResumeSwipe, please disregard this email.
      </p>
      <hr style={{ borderColor: '#e0e0e0', margin: '30px 0' }} />
      <p style={{
        fontSize: '12px',
        color: '#888888',
        textAlign: 'center',
      }}>
        © 2024 ResumeSwipe. All rights reserved.
      </p>
    </div>
  </Html>
);

export default EmailTemplate;