import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ConfigProvider, App } from "antd";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Seu App",
  description: "Descrição do seu app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AuthProvider>
          <ConfigProvider>
            <App>{children}</App>
          </ConfigProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
