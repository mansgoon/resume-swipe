import React from 'react';
import { Html } from '@react-email/html';
import { Button } from '@react-email/button';

const EmailTemplate = ({ verificationLink }) => (
  <Html lang="en">
    <div style={{
      backgroundColor: '#1a1a1a',
      color: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      padding: '40px 20px',
      maxWidth: '600px',
      margin: '0 auto',
    }}>
      <table width="100%" cellPadding="0" cellSpacing="0" style={{ marginBottom: '20px' }}>
        <tr>
          <td style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src="https://resume-swipe.vercel.app/logo.png" alt="ResumeSwipe Logo" width="38" height="38" style={{ marginRight: '10px' }} />
            <span style={{ fontSize: '24px', fontWeight: 'bold' }}>
              <span style={{ color: '#e5e7eb' }}>resume</span>
              <span style={{ color: '#3b82f6' }}>swipe</span>
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
        Thank you for joining our community. We&apos;re excited to have you on board!
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
        color: '#9ca3af',
        marginTop: '30px',
        textAlign: 'center',
      }}>
        If you didn&apos;t create an account with ResumeSwipe, you can safely ignore this email.
      </p>
      <hr style={{ borderColor: '#374151', margin: '30px 0' }} />
      <p style={{
        fontSize: '12px',
        color: '#9ca3af',
        textAlign: 'center',
      }}>
        © 2024 ResumeSwipe. All rights reserved.
      </p>
    </div>
  </Html>
);

export default EmailTemplate;