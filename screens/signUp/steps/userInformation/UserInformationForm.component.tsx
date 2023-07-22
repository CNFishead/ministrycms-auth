import axios from "@/utils/axios";
import { Form, Input, Radio, Select, Button, FormInstance } from "antd";
import styles from "./UserInformationForm.module.scss";
import { useInterfaceStore } from "@/state/interface";
import { useEffect } from "react";

interface Props {
  form: FormInstance;
  onChangeHandler: () => void;
}

const UserInformationForm = (props: Props) => {
  const { setSignUpUserFormValues, signUpUserFormValues, setSignUpErrorDetected } = useInterfaceStore((state) => state);

  useEffect(() => {
    props.form.setFieldsValue(signUpUserFormValues);
  }, []);

  return (
    <Form form={props.form} className={styles.form} initialValues={{ sex: "male" }} layout="vertical" onChange={props.onChangeHandler}>
      <div className={styles.group}>
        <Form.Item
          name="firstName"
          label="First Name"
          initialValue=""
          rules={[
            {
              required: true,
              message: "Please enter your first name",
            },
          ]}
        >
          <Input className={styles.input} placeholder="Enter your first name" />
        </Form.Item>

        <Form.Item
          name="lastName"
          label="Last Name"
          initialValue=""
          rules={[
            {
              required: true,
              message: "Please enter your last name",
            },
          ]}
        >
          <Input className={styles.input} placeholder="Enter your last name" />
        </Form.Item>
      </div>

      <Form.Item
        name="email"
        label="Email"
        initialValue=""
        rules={[
          {
            required: true,
            type: "email",
            message: "Please enter a valid email address",
          },
          () => ({
            async validator(_, value) {
              if (value === "") return;
              // url encode the value
              const urlEncodedValue = encodeURIComponent(value);
              const { data } = await axios.get(`/auth/${urlEncodedValue || " "}/email`);
              if (data.exists === true) {
                return Promise.reject("Email already exists, please use another email");
              }
              return Promise.resolve();
            },
          }),
        ]}
      >
        <Input className={styles.input} placeholder="Enter your email address" />
      </Form.Item>

      <Form.Item
        name="username"
        label="Username"
        rules={[
          {
            required: true,
            pattern: /^[a-zA-Z0-9]+$/,
            message: "Username cannot contain spaces or special characters",
          },
          () => ({
            async validator(_, value) {
              if (value === "") return;
              const { data } = await axios.get(`/auth/${value || " "}/username`);
              if (data.exists === true) {
                return Promise.reject("Username already exists");
              }
              return Promise.resolve();
            },
          }),
        ]}
      >
        <Input className={styles.input} placeholder="Enter your username" />
      </Form.Item>

      <div className={styles.group}>
        <Form.Item
          name="password"
          label="Password"
          initialValue=""
          rules={[
            {
              required: true,
              message: "Please enter your password",
            },

            {
              min: 10,
            },
          ]}
        >
          <Input.Password className={styles.input} placeholder="Enter your password" />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          initialValue=""
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Please confirm your password",
            },
            {
              min: 10,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("The two passwords do not match");
              },
            }),
          ]}
        >
          <Input.Password className={styles.input} placeholder="Confirm your password" />
        </Form.Item>
      </div>

      <div className={styles.group}>
        <Form.Item
          name="phoneNumber"
          label="Phone Number"
          initialValue=""
          rules={[
            {
              required: true,
              message: "Please confirm your password",
            },
          ]}
        >
          <Input className={styles.input} placeholder="Enter your phone number" />
        </Form.Item>

        <Form.Item name="sex" label="Sex" initialValue="male">
          <Select className={styles.input} placeholder="Select your sex">
            <Select.Option value="male">Male</Select.Option>
            <Select.Option value="female">Female</Select.Option>
          </Select>
        </Form.Item>
      </div>
    </Form>
  );
};

export default UserInformationForm;
