"use client";

import { Inter } from "next/font/google";
import { useState } from "react";
import { Layout, Menu, Button, Drawer } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  FileOutlined,
  LogoutOutlined,
  MenuOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useMediaQuery from "@/hooks/useMediaQuery";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(true);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const { logout } = useAuth();
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 768px)");

  function handleLogout() {
    logout();
    router.push("/");
  }

  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Layout style={{ minHeight: "100vh" }}>
          {isMobile && (
            <div className="fixed top-4 left-4 z-50">
              <Button
                type="primary"
                icon={<MenuOutlined />}
                onClick={() => setDrawerVisible(true)}
                className="bg-blue-500 hover:bg-blue-600 border-none"
              />
            </div>
          )}

          {!isMobile && (
            <Layout.Sider
              collapsible
              collapsed={collapsed}
              onCollapse={setCollapsed}
              width={200}
              style={{
                background: "#001529",
                color: "white",
                paddingTop: "16px",
              }}
            >
              <Button
                type="text"
                onClick={() => setCollapsed(!collapsed)}
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                style={{
                  color: "white",
                  marginLeft: "16px",
                  marginBottom: "16px",
                  background: "transparent",
                }}
              />

              <Menu theme="dark" mode="vertical" selectable={false} style={{ background: "#001529" }}>
                <Menu.Item key="2" icon={<FileOutlined />}>
                  <Link href="/tasks" className="text-white">
                    Tarefas
                  </Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<LogoutOutlined />} onClick={handleLogout}>
                  Sair
                </Menu.Item>
              </Menu>
            </Layout.Sider>
          )}

          <Drawer
            title={
              <div className="flex justify-between items-center w-full text-white">
                <span>Menu</span>
                <Button
                  type="text"
                  icon={<CloseOutlined />}
                  onClick={() => setDrawerVisible(false)}
                  className="text-white"
                />
              </div>
            }
            placement="left"
            closable={false}
            onClose={() => setDrawerVisible(false)}
            open={drawerVisible}
            bodyStyle={{ background: "#001529", padding: "0" }}
            headerStyle={{
              background: "#001529",
              borderBottom: "1px solid #ffffff22",
            }}
          >
            <Menu theme="dark" mode="vertical" selectable={false} style={{ background: "#001529" }}>
              <Menu.Item key="2" icon={<FileOutlined />} onClick={() => setDrawerVisible(false)}>
                <Link href="/tasks" className="text-white">
                  Tarefas
                </Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<LogoutOutlined />} onClick={handleLogout}>
                Sair
              </Menu.Item>
            </Menu>
          </Drawer>

          <Layout>
            <Layout.Content style={{ padding: "24px", background: "#f0f2f5" }}>
              {children}
            </Layout.Content>
          </Layout>
        </Layout>
      </body>
    </html>
  );
}
