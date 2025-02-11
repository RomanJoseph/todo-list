'use client'

import { useAuth } from '@/contexts/AuthContext';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Row, Col, App, Typography } from 'antd';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

const LoginPage: React.FC = () => {
  const route = useRouter();
  const { message } = App.useApp()
  const { login } = useAuth();
  
  const onFinish = async (values: { email: string; password: string }) => {
    const { email, password } = values;

    try {
      await login(email, password);
      message.success("Login realizado com sucesso !");
      route.push('/tasks');
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        message.error(err?.response?.data.message || "Algo deu errado na hora de de fazer login");
      } else {
        message.error("Ocorreu um erro desconhecido");
      }
    }
  };

  return (
    <Row 
      justify="center" 
      align="middle" 
      className="min-h-screen bg-gray-50 bg-[url('https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg')] bg-center bg-cover"
    >
      <Col xs={22} sm={16} md={12} lg={8}>
        <Card 
          title="Login" 
          className="rounded-lg shadow-lg border-0"
          headStyle={{ fontSize: '1.5rem', textAlign: 'center' }}
        >
          <Form
            name="normal_login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Por favor insira seu email!' },
                { type: 'email', message: 'Email inválido!' }
              ]}
              label="Email"
            >
              <Input
                prefix={<UserOutlined className="text-gray-300" />}
                placeholder="seu@email.com"
                size="large"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Por favor insira sua senha!' }
              ]}
              label="Senha"
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-300" />}
                placeholder="••••••••"
                size="large"
                className="rounded-lg"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                className="h-10 mt-5 rounded-lg font-semibold"
              >
                Entrar
              </Button>
            </Form.Item>
          </Form>
          <div className="text-center mt-4">
            <Typography>Ainda não possui uma conta? </Typography>
            <Link href="/register" className="text-blue-500 hover:underline">Cadastre-se!</Link>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default LoginPage;