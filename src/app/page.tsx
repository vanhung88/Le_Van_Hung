'use client';
import { useEffect, useRef, useState } from 'react';
import { Input, Table } from 'antd';
import { getListProject } from '@/service/apis';
import { ProjectItem, ProjectList } from '@/type';
import { SearchOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

export const columns = [
  {
    title: 'Name',
    dataIndex: 'project_name',
    key: '1',
  },
  {
    title: 'Domain',
    dataIndex: 'project_domain',
    key: '2',
  },
  {
    title: 'License Use',
    dataIndex: 'license_use',
    key: '3',
    render: (licenses) => (
      <div>
        {licenses?.map((item) => (
          <div key={item?.license_type}>
            <div>
              <div>
                <span className="font-medium">Type: </span>
                {item.license_type}
              </div>
              <div>
                <span className="font-medium">libraries: </span>
                {item?.libraries?.join(',')}
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: 'Date Accepted',
    dataIndex: 'last_accessed',
    key: '4',
    render: (date) => <div>{date ? dayjs(date).format('DD/MM/YYYY') : ''}</div>,
  },
];

const Home = () => {
  const [projects, setProjects] = useState<ProjectList>();
  let originalList = useRef<ProjectItem[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const projects = await getListProject();
        originalList.current = projects?.data?.results;
        setProjects(projects?.data);
      } catch (error) {}
    })();
  }, []);

  const handleSearch = (e) => {
    const searchName = e.target.value;

    const filter = originalList.current.filter(function (project) {
      return project.project_name
        .toLowerCase()
        .includes(searchName.toLowerCase());
    });
    if (filter) {
      setProjects({ count: filter?.length, results: filter });
    }
  };

  return (
    <div>
      <h1 className="mb-10 font-normal">PROJECT MANAGEMENT</h1>
      <Input
        onChange={handleSearch}
        prefix={<SearchOutlined />}
        className="w-80 mb-6"
        placeholder="Search by name"
      />
      <Table dataSource={projects?.results} columns={columns} />;
    </div>
  );
};
export default Home;
