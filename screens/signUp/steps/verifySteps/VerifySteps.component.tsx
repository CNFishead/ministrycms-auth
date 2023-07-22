import styles from "./VerifySteps.module.scss";
import { FaEnvelope, FaUserCheck } from "react-icons/fa";

const VerifySteps = () => {
  const steps = [
    {
      title: "Verify Email",
      icon: <FaEnvelope />,
      description:
        "To ensure secure access to your account, we kindly request that you undertake the process of email address verification. This verification procedure is essential to ascertain the validity of your email and to confirm ownership, thereby enhancing the protection of your account. Your cooperation in this matter is greatly appreciated.",
    },
    // {
    //   title: 'Truthcasting Verification',
    //   icon: <FaUserCheck />,
    //   description:
    //     "Truthcasting needs to confirm your identity and organization to make sure that you are indeed the person you claim to be and that your values align with Truthcasting's values. To do this, we will contact you to verify your details. This verification process might take up to one business day after you have confirmed your email.",
    // },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.steps}>
        {steps.map((step, index) => {
          return (
            <div className={styles.step} key={index}>
              <div className={styles.top}>
                <div className={styles.titleContainer}>
                  {/* <div className={styles.iconNumber}>{index + 1}</div> */}

                  <div className={styles.title}>{step.title}</div>
                </div>

                <div className={styles.icon}>{step.icon}</div>
              </div>

              <div className={styles.description}>{step.description}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VerifySteps;
