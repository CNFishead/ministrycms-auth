import React, { useState } from 'react';
import './VerifyEmail.scss';
import { FaEnvelope } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import axios from '../../../../utils/axios';

const VerifyEmail = ({ email, redirect, showRedirectButton }) => {
  const [resent, setResent] = useState(false);
  const handleResendEmail = async () => {
    await axios.post('/auth/resend-verification-email', { email });
    setResent(true);
  };
  const handleRedirect = () => {
    // check localstorage for a token
    const token = localStorage.getItem('token');
    // if there is a token, redirect with the token, otherwise redirect without the token
    // redirect to the link that was passed in
    window.location.href = token ? `${redirect}?token=${token}` : redirect;
  };

  return (
    <div className="verify-email-container">
      <FaEnvelope className="verify-email-icon" />
      <p className="verify-email-text">
        {showRedirectButton
          ? `Verifying your email is an important step that allows you to comment, like, and subscribe to content. However, we understand that this may not be a priority for everyone.
          If you choose not to verify your email at this time, don't worry - you can still access our platform and all of its features. Simply click the button below to be redirected back to the video that you want to rent.
          Thank you again for choosing TruthCasting. We're excited to have you as part of our community!`
          : `We have sent a verification email to your email address. To verify your
        account, please check your email inbox and click on the link that we
        have sent you. This will complete the verification process and allow you
        to access your account. If you do not see the email in your inbox,
        please check your spam folder. If you still do not see the email use the
        button below to resend the verification email.`}
      </p>

      {!resent && (
        <Button className="verify-email-button" onClick={handleResendEmail}>
          Resend Verification Email
        </Button>
      )}
      {showRedirectButton && (
        <Button className="verify-email-button" onClick={handleRedirect}>
          Proceed to Video
        </Button>
      )}
    </div>
  );
};

export default VerifyEmail;
