'use client';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { Layout, Menu } from 'antd';
import { Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import { ProjectOutlined, RubyOutlined } from '@ant-design/icons';

export default function Home() {
  const router = useRouter();
  const token = Cookies.get('accessToken');

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [router, token]);

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

  return (
    <div>jjj</div>
    // <Layout>
    //   <Header style={{ display: 'flex', alignItems: 'center' }}>
    //     <div className="demo-logo" />
    //     <Menu
    //       theme="dark"
    //       mode="horizontal"
    //       defaultSelectedKeys={['2']}
    //       style={{ flex: 1, minWidth: 0 }}></Menu>
    //   </Header>
    //   <Layout>
    //     <Sider width={200}>
    //       <Menu
    //         mode="inline"
    //         defaultSelectedKeys={['1']}
    //         defaultOpenKeys={['sub1']}
    //         style={{ height: '100%', borderRight: 0 }}
    //         items={leftSideBar}
    //       />
    //     </Sider>
    //     <Layout style={{ padding: '0 24px 24px' }}></Layout>
    //   </Layout>
    // </Layout>
  );
}
