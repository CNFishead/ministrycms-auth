import React from 'react';
import './VerifySteps.scss';
import { FaEnvelope, FaUserCheck } from 'react-icons/fa';

const VerifySteps = () => {
  const steps = [
    {
      title: 'Verify Email',
      icon: <FaEnvelope />,
      description:
        'In order to gain access to your account, we require that you verify your email address by confirming that it is valid and belongs to you.',
    },
    {
      title: 'Truthcasting Verification',
      icon: <FaUserCheck />,
      description:
        "Truthcasting needs to confirm your identity and organization to make sure that you are indeed the person you claim to be and that your values align with Truthcasting's values. To do this, we will contact you to verify your details. This verification process might take up to one business day after you have confirmed your email.",
    },
  ];
  return (
    <div className="verify-steps-container">
      <div className="verify-steps">
        {steps.map((step, index) => {
          return (
            <div className="verify-step" key={index}>
              <div className="verify-step-top">
                <div className="verify-step-title-container">
                  <div className="verify-step-icon-number">{index + 1}</div>

                  <div className="verify-step-title">{step.title}</div>
                </div>

                <div className="verify-step-icon">{step.icon}</div>
              </div>

              <div className="verify-step-description">{step.description}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VerifySteps;
