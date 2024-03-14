'use client';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ConfigProvider } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { Layout, Menu } from 'antd';
import { Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
const inter = Inter({ subsets: ['latin'] });
import { ProjectOutlined, RubyOutlined } from '@ant-design/icons';
import { LOGON_PATH } from '@/constants';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();
  const token = Cookies.get('accessToken');
  const router = useRouter();

  const leftSideBar = [
    {
      key: '1',
      icon: <ProjectOutlined />,
      label: 'Project Management',
    },
    {
      key: '2',
      icon: <RubyOutlined />,
      label: 'Profile',
    },
  ];

  useEffect(() => {
    if (!token) {
      router.push(LOGON_PATH);
    } else {
      router.push('/');
    }
  }, [router, token]);
  return (
    <ConfigProvider>
      <html lang="en">
        <body className={inter.className}>
          {path === LOGON_PATH ? (
            <div>{children}</div>
          ) : (
            <Layout className="h-screen">
              <Header style={{ display: 'flex', alignItems: 'center' }}>
                <div />
                <Menu
                  theme="dark"
                  mode="horizontal"
                  defaultSelectedKeys={['2']}
                  style={{ flex: 1, minWidth: 0 }}>
                  LOGO
                </Menu>
              </Header>
              <Layout>
                <Sider width={200}>
                  <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%', borderRight: 0 }}
                    items={leftSideBar}
                  />
                </Sider>
                <Layout className="p-6">
                  <div className="bg-white h-screen p-6 rounded-sm">
                    {children}
                  </div>
                </Layout>
              </Layout>
            </Layout>
          )}
        </body>
      </html>
    </ConfigProvider>
  );
}
