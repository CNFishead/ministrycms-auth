import axios from "@/utils/axios";
import { Form, Input, Radio, Select, Button, InputNumber, FormInstance } from "antd";
import styles from "./ProfileInformationForm.module.scss";
import { useInterfaceStore } from "@/state/interface";
import { useEffect } from "react";
import phoneNumber from "@/utils/phoneNumber";
import { states } from "@/utils/states";

interface Props {
  form: FormInstance;
  onChangeHandler: () => void;
}
const ProfileInformationForm = (props: Props) => {
  const { setSignUpProfileFormValues, signUpProfileFormValues, setSignUpErrorDetected } = useInterfaceStore((state) => state);

  useEffect(() => {
    props.form.setFieldsValue(signUpProfileFormValues);
  }, []);

  return (
    <Form onChange={props.onChangeHandler} form={props.form} className={styles.form} layout="vertical">
      <h1 className={styles.header}>Ministry Information</h1>

      <div className={styles.group}>
        <Form.Item name={["ministry", "name"]} label="Ministry Name" rules={[{ required: true }]}>
          <Input className={styles.input} />
        </Form.Item>
      </div>
      <Form.Item name={["ministry", "bio"]} label="Mission Statement">
        <Input.TextArea className={styles.input} />
      </Form.Item>
      <br />
      <h1 className={styles.header}>Location Information</h1>

      <div className={styles.group}>
        <Form.Item
          name={["ministry", "address"]}
          label="Address"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input className={styles.input} />
        </Form.Item>
        <Form.Item name={["ministry", "address2"]} label="Address 2">
          <Input className={styles.input} />
        </Form.Item>
      </div>
      <div className={styles.group}>
        <Form.Item name={["ministry", "city"]} label="City" rules={[{ required: true }]}>
          <Input className={styles.input} />
        </Form.Item>
        <Form.Item name={["ministry", "state"]} label="State" rules={[{ required: true }]}>
          <Select
            placeholder="Select a state"
            className={styles.input}
            showSearch
            filterOption={(input: any, option: any) => option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {states.map((state) => (
              <Select.Option key={state.abbreviation} value={state.abbreviation}>
                {state.abbreviation}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name={["ministry", "zipCode"]} label="Zip Code" rules={[{ required: true }]}>
          <Input className={styles.input} />
        </Form.Item>
      </div>
      <br />

      <h1 className={styles.header}>Social Information</h1>

      <div className={styles.group}>
        <Form.Item name={["ministry", "facebook"]} label="Facebook">
          <Input className={styles.input} />
        </Form.Item>
        <Form.Item name={["ministry", "instagram"]} label="Instagram">
          <Input className={styles.input} />
        </Form.Item>
        <Form.Item name={["ministry", "youtube"]} label="Youtube">
          <Input className={styles.input} />
        </Form.Item>
        <Form.Item name={["ministry", "website"]} label="Website">
          <Input className={styles.input} />
        </Form.Item>
      </div>
    </Form>
  );
};

export default ProfileInformationForm;
