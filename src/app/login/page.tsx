'use client';
import { login } from '@/service/apis';
import { Button, Form, Input } from 'antd';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const onFinish = async (value) => {
    try {
      const response = await login(value);
      const accessToken = response?.data?.access_token;
      const refreshToken = response?.data?.access_token;
      Cookies.set('accessToken', accessToken, { expires: 10, secure: true });
      Cookies.set('refreshToken', refreshToken, { expires: 100, secure: true });
      router.push('/');
    } catch (error) {}
  };

  return (
    <div className=" h-screen flex items-center  justify-center">
      <div className="w-[500px] p-11 rounded-lg">
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off">
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email' }]}>
            <Input placeholder="Email Address" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password' }]}>
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item className="flex justify-center">
            <Button
              type="primary"
              htmlType="submit"
              className="bg-primary-color w-32 h-10">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
