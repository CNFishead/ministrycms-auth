import styles from "./SignUp.module.scss";
import Image from "next/image";
import { Button, Steps, message, Form } from "antd";
import { CgProfile } from "react-icons/cg";
import { useInterfaceStore } from "@/state/interface";
import { SignUpStep } from "@/state/signUpSteps";
import UserInformationForm from "./steps/userInformation/UserInformationForm.component";
import { AiOutlineUser } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
import ProfileInformationForm from "./steps/profileInformation/ProfileInformationForm.component";
import { useRegisterUser } from "@/state/serverState/auth";
type Props = {};

/**
 * @description on Change handler to be passed to components that will update the store with the form values
 *              i.e., a change in the userInformationForm will update the store (signUpUserFormValues) with the new values
 *              takes in a store, a form, and a formValues object
 * @param store the store to update
 * @param form the form to get the values from
 * @param formValues the values to update the store with
 * @param prevState the previous state of the store
 *
 * @returns void
 *
 */
const onChangeHandler = (store: any, form: any, formValues: any, prevState: any) => {
  store({ ...prevState, ...form.getFieldsValue(formValues) });
};

const SignUpView = (props: Props) => {
  const { currentSignUpStep, goBackToPreviousSignUpStep, isGoingToPreviousStep, signUpUserFormValues, setSignUpUserFormValues } =
    useInterfaceStore((state) => state);
  const { mutateAsync: registerUser } = useRegisterUser();
  const [form] = Form.useForm();
  const [profileForm] = Form.useForm();
  const signUpSteps: {
    [key: number]: SignUpStep;
  } = {
    0: {
      id: 0,
      title: "User Info",
      component: (
        <UserInformationForm
          form={form}
          onChangeHandler={() => onChangeHandler(setSignUpUserFormValues, form, form.getFieldsValue(), signUpUserFormValues)}
        />
      ),
      nextButtonText: "Next",
      headerText: "Start Your Experience Today!",
      subHeaderText: "Become a Shepherd Today",
      nextButtonDisabled: false,
      hideBackButton: true,
      icon: <AiOutlineUser />,
      nextButtonAction: async () => {
        // validate the form here
        // get the userSignupFormValues from the store, validate it, and then set the error state
        // if there are no errors, then advance to the next step
        await form
          .validateFields(signUpUserFormValues)
          .then(() => useInterfaceStore.getState().setSignUpErrorDetected(false))
          .catch(() => useInterfaceStore.getState().setSignUpErrorDetected(true));
        if (!useInterfaceStore.getState().signUpErrorDetected) useInterfaceStore.getState().advanceToNextSignUpStep();
        else message.error("Please complete the form before continuing");
      },
    },
    1: {
      id: 1,
      title: "Profile",
      component: (
        <ProfileInformationForm
          form={profileForm}
          onChangeHandler={() => onChangeHandler(setSignUpUserFormValues, profileForm, form.getFieldsValue(), signUpUserFormValues)}
        />
      ),
      nextButtonText: "Sign Up",
      hideNextButton: false,
      headerText: "Tell us about your Ministry",
      subHeaderText: "If you manage multiple ministries, you can add them later. This is just for your main ministry.",
      icon: <CgProfile />,
      nextButtonDisabled: false,
      hideBackButton: false,
      isHiddenOnSteps: false,
      nextButtonAction: async () => {
        // validate the form, if there are no errors, then register the user
        await profileForm
          .validateFields()
          .then(() => useInterfaceStore.getState().setSignUpErrorDetected(false))
          .catch(() => useInterfaceStore.getState().setSignUpErrorDetected(true));
        if (!useInterfaceStore.getState().signUpErrorDetected) registerUser();
      },
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
            ease: "easeInOut",
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
              {!signUpSteps[currentSignUpStep]?.hideBackButton && (
                <Button
                  type="primary"
                  className={styles.backButton}
                  onClick={signUpSteps[currentSignUpStep]?.previousButtonAction || goBackToPreviousSignUpStep}
                >
                  Back
                </Button>
              )}
              {signUpSteps[currentSignUpStep]?.hideNextButton ||
                // only when an action is defined
                (signUpSteps[currentSignUpStep]?.nextButtonAction && (
                  <Button
                    type="primary"
                    onClick={() => {
                      signUpSteps[currentSignUpStep].nextButtonAction();
                    }}
                    disabled={signUpSteps[currentSignUpStep]?.nextButtonDisabled}
                    className={styles.nextButton}
                  >
                    {signUpSteps[currentSignUpStep]?.nextButtonText}
                  </Button>
                ))}
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
