import request from './request';

export const login = (data) => {
  const url = `/auth/login`;
  return request.post(url, data);
};

export const getListProject = () => {
  return request.get('projects');
};
