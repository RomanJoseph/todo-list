'use client'

import React from 'react';
import { registerUser } from '@/lib/auth/auth';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Card, Form, Input, Row, Col, Button, App, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AxiosError } from 'axios';

const RegisterPage: React.FC = () => {
  const route = useRouter();
  const { message } = App.useApp()

  const onFinish = async (values: { email: string; name: string; password: string; }) => {
    const { email, name, password } = values;
  
    try {
      await registerUser({ email, name, password });
      message.success("Registro realizado com sucesso!");
      route.push("/");
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        message.error(err?.response.data.message || "Algo deu errado na hora de registrar");
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
          title="Cadastro"
          className="rounded-lg shadow-lg border-0"
          headStyle={{ fontSize: '1.5rem', textAlign: 'center' }}
        >
          <Form name="register" initialValues={{ remember: true }} onFinish={onFinish} layout="vertical">
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Por favor insira seu email!' },
                { type: 'email', message: 'Email inválido!' },
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

            <Form.Item name="name" rules={[{ required: true, message: 'Por favor insira seu nome!' }]} label="Nome">
              <Input
                prefix={<UserOutlined className="text-gray-300" />}
                placeholder="João da Silva"
                size="large"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item name="password" rules={[{ required: true, message: 'Por favor insira sua senha!' }]} label="Senha">
              <Input.Password
                prefix={<LockOutlined className="text-gray-300" />}
                placeholder="••••••••"
                size="large"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Por favor confirme sua senha!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('As senhas não coincidem!'));
                  },
                }),
              ]}
              label="Confirmar Senha"
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-300" />}
                placeholder="••••••••"
                size="large"
                className="rounded-lg"
              />
            </Form.Item>

            <Button type="primary" htmlType="submit" size="large" block className="h-10 mt-5 rounded-lg font-semibold">
              Registrar
            </Button>
          </Form>
          <div className="text-center mt-4">
            <Typography>Já possui uma conta ? </Typography>
            <Link href="/login" className="text-blue-500 hover:underline">Faça login !</Link>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default RegisterPage;
