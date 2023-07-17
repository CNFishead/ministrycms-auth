import axios from '@/utils/axios';
import { Form, Input, Radio, Select, Button, InputNumber } from 'antd';
import styles from './PaymentForm.module.scss';
import { useInterfaceStore } from '@/state/interface';
import { useEffect } from 'react';
import phoneNumber from '@/utils/phoneNumber';
import { states } from '@/utils/states';
import { countries } from '@/utils/countries';

const AchForm = () => {
  const [form] = Form.useForm();

  const { setSignUpPaymentFormValues, setSignUpErrorDetected } =
    useInterfaceStore((state) => state);

  useEffect(() => {
    form.setFieldsValue(setSignUpPaymentFormValues);
  }, []);

  const onChange = () => {
    setSignUpPaymentFormValues(form.getFieldsValue());

    form
      .validateFields()
      .then((values) => {
        setSignUpErrorDetected(false);
      })
      .catch((err) => {
        setSignUpErrorDetected(true);
      });
  };
  return (
    <Form
      form={form}
      onChange={onChange}
      className={styles.form}
      layout="vertical"
    >
      <div className={styles.group}>
        <Form.Item
          name="checkname"
          label="Account Holder Name"
          tooltip="The name of the person or business that appears on the check."
          rules={[{ required: true, message: 'Please input your card number' }]}
        >
          <Input placeholder={'Your card number'} className={styles.input} />
        </Form.Item>
        <Form.Item
          name="checkaccount"
          label="Account Number"
          tooltip="The account number is a 9-digit number located on the bottom left of your check."
          rules={[
            { required: true, message: 'Please input card expiration date' },
          ]}
        >
          <Input placeholder={'MM/YY'} className={styles.input} />
        </Form.Item>
        <Form.Item
          name="checkaba"
          label="Routing Number"
          rules={[
            {
              required: true,
              message: 'Please input the routing number!',
            },
          ]}
          tooltip="The routing number is a 9-digit number located on the bottom left of your check."
        >
          <Input placeholder={'CVV'} className={styles.input} />
        </Form.Item>
      </div>

      <div className={styles.group}>
        <Form.Item
          name="email"
          label="Billing Email"
          rules={[{ required: true, message: 'Please input billing email' }]}
        >
          <Input type="email" placeholder={'Email'} className={styles.input} />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Billing Phone #"
          rules={[
            {
              required: true,
              message: 'Please input billing phone number',
            },
          ]}
        >
          <InputNumber
            style={{ width: '100%' }}
            controls={false}
            formatter={(value: any) => phoneNumber(value)}
            parser={(value: any) => value.replace(/[^\d]/g, '')}
            placeholder={'Phone Number'}
            className={styles.input}
          />
        </Form.Item>
      </div>
      <Form.Item
        name="address"
        label="Billing Address"
        rules={[{ required: true, message: 'Please input billing address' }]}
      >
        <Input placeholder={'Address'} className={styles.input} />
      </Form.Item>
      <Form.Item name="address2" label="Billing Address 2">
        <Input placeholder={'Address 2'} className={styles.input} />
      </Form.Item>
      <div className={styles.group}>
        <Form.Item
          name="country"
          label="Country"
          rules={[{ required: true, message: 'Please input billing country!' }]}
        >
          <Select placeholder="Select a country" className={styles.input}>
            {countries.map((country) => (
              <Select.Option key={country} value={country}>
                {country}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="state" label="State">
          <Select placeholder="Select a state" className={styles.input}>
            {states.map((state) => (
              <Select.Option
                key={state.abbreviation}
                value={state.abbreviation}
              >
                {state.abbreviation}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </div>
      <div className={styles.group}>
        <Form.Item name="zip" label="Zip">
          <Input placeholder={'Zip Code'} className={styles.input} />
        </Form.Item>
        <Form.Item
          name="city"
          label="City"
          rules={[{ required: true, message: 'Please input billing city!' }]}
        >
          <Input placeholder={'City'} className={styles.input} />
        </Form.Item>
      </div>
    </Form>
  );
};

export default AchForm;
