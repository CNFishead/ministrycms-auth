import styles from "./Login.module.scss";
// import { Button } from 'antd'
import React from "react";
import { useRouter } from "next/router";
import { Form, Row, Col, Image, Input, Button } from "antd";
import { useLogin } from "@/state/serverState/auth";
import { useInterfaceStore } from "@/state/interface";
type Props = {
  fullUrl?: string;
};

const Auth = (props: Props) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { mutate: login, isLoading } = useLogin();
  const { redirectName } = useInterfaceStore((state) => state);

  const onFinish = async (values: any) => {
    login({
      email: values.email,
      password: values.password,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h1>Welcome Back</h1>
        <p>Login to your account to access {redirectName}</p>

        <Form layout="vertical" className={styles.form} onFinish={onFinish}>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please input your email" }]}>
            <Input placeholder="Username" className={styles.input} />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please input your password" }]}>
            <Input.Password placeholder="Password" className={styles.input} />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Sign In
          </Button>
        </Form>
      </div>
      <div className=""></div>
      <div className=""></div>
      <div className={styles.info}>
        <hr />
        <p className={styles.signUpLink}>
          Don't have an account? <a href="/signup">Start your free trial!</a>
        </p>
        <p className={styles.forgotPasswordLink}>
          <a href="/forgot-password">Forgot your password?</a>
        </p>
      </div>
    </div>
  );
};

export default Auth;
