import styles from './SignUp.module.scss';
import Image from 'next/image';
import { Button, Modal, Steps, message } from 'antd';
import { BsBox } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { MdOutlinePayments } from 'react-icons/md';

import { useInterfaceStore } from '@/state/interface';
import { SignUpStep } from '@/state/signUpSteps';
import FeatureChoose from './steps/featureChoose/FeatureChoose.component';
import UserInformationForm from './steps/userInformation/UserInformationForm.component';
import { AiOutlineCheckCircle, AiOutlineUser } from 'react-icons/ai';
import { AnimatePresence, motion } from 'framer-motion';
import PaymentInformation from './steps/paymentInformation/PaymentInformation.component';
import ProfileInformationForm from './steps/profileInformation/ProfileInformationForm.component';
type Props = {};

const SignUpView = (props: Props) => {
  const {
    currentSignUpStep,
    goBackToPreviousSignUpStep,
    isGoingToPreviousStep,
    paymentMethod,
    setPaymentMethod,
  } = useInterfaceStore((state) => state);

  const signUpSteps: {
    [key: number]: SignUpStep;
  } = {
    0: {
      id: 0,
      title: 'User Info',
      component: <UserInformationForm />,
      nextButtonText: 'Next',
      headerText: 'Start Your Experience Today!',
      subHeaderText: 'Become a Shepherd Today',
      nextButtonDisabled: false,
      hideBackButton: true,
      icon: <AiOutlineUser />,
      nextButtonAction: () => {
        if (!useInterfaceStore.getState().signUpErrorDetected)
          useInterfaceStore.getState().advanceToNextSignUpStep();
        else message.error('Please complete the form before continuing');
      },
    },
    1: {
      id: 1,
      title: 'Profile',
      component: <ProfileInformationForm />,
      nextButtonText: 'Next',

      headerText: 'Tell us about your ministry',
      subHeaderText:
        'If you manage multiple ministries, you can add them later. This is just for your main ministry.',
      icon: <CgProfile />,
      nextButtonDisabled: false,
      hideBackButton: false,
      nextButtonAction: () => {
        Modal.confirm({
          title: 'Public View Notice',
          content: (
            <p>
              This information will be visible to the public, are you sure you
              want to continue?
            </p>
          ),
          onOk() {
            useInterfaceStore.getState().advanceToNextSignUpStep();
          },
        });
      },
    },
    2: {
      id: 1,
      title: 'Verification',
      component: <h1>Still Working on this one</h1>,
      nextButtonText:
        useInterfaceStore.getState().features.length > 0
          ? 'Next'
          : 'Register without adding any features',
      headerText: 'Choose your features',
      subHeaderText:
        'Choose the features you want to add to your Truthcasting account',
      icon: <AiOutlineCheckCircle />,
      nextButtonDisabled: true,
      hideBackButton: false,
      nextButtonAction: () =>
        useInterfaceStore.getState().advanceToNextSignUpStep(),
    },
  };

  return (
    <div className={styles.wrapper}>
      <AnimatePresence initial={true} mode="wait">
        <motion.div
          className={styles.container}
          initial={{
            x: isGoingToPreviousStep ? -80 : 80,
            opacity: 0,
            scale: 0.99,
          }}
          animate={{
            x: 0,
            opacity: 1,
            scale: 1,
          }}
          transition={{
            ease: 'easeInOut',
            duration: 0.3,
          }}
          exit={{
            opacity: 0,
            scale: 0.95,
          }}
          key={currentSignUpStep}
        >
          <div className={styles.main}>
            <Image
              src="https://api.shepherdcms.org/images/ShepherdsCMSLogo.png"
              width={200}
              height={200}
              alt="logo"
              className={styles.logo}
            />
            <h1>{signUpSteps[currentSignUpStep]?.headerText}</h1>
            <p>{signUpSteps[currentSignUpStep]?.subHeaderText}</p>

            {signUpSteps[currentSignUpStep]?.component}
          </div>

          <div className={styles.info}>
            <div className={styles.buttons}>
              {!signUpSteps[currentSignUpStep].hideBackButton && (
                <Button
                  type="primary"
                  className={styles.backButton}
                  onClick={
                    signUpSteps[currentSignUpStep]?.previousButtonAction ||
                    goBackToPreviousSignUpStep
                  }
                >
                  Back
                </Button>
              )}
              <Button
                type="primary"
                onClick={() => {
                  signUpSteps[currentSignUpStep]?.nextButtonAction();
                }}
                disabled={signUpSteps[currentSignUpStep]?.nextButtonDisabled}
                className={styles.nextButton}
              >
                {signUpSteps[currentSignUpStep]?.nextButtonText}
              </Button>
            </div>
            <p className={styles.signUpLink}>
              Already have an account? <a href="/">Login</a>
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className={styles.stepsContainer}>
        <Steps
          className={styles.steps}
          current={currentSignUpStep}
          items={
            Object.values(signUpSteps).map((step) => {
              return {
                title: (
                  <div className={styles.step}>
                    {/* {step.icon} */}
                    <span>{step.title}</span>
                  </div>
                ),
                icon: step.icon,
                // status: step.id === currentSignUpStep ? 'process' : '',
              };
            }) as any
          }
          size="small"
        />
      </div>
    </div>
  );
};

export default SignUpView;
