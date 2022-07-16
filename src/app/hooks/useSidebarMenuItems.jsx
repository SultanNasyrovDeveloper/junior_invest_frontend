import {
  HomeOutlined,
  ProjectOutlined,
  InfoCircleOutlined,
  ProfileOutlined,
  FileDoneOutlined
} from '@ant-design/icons';
import { useMemo } from 'react';


const useSidebarMenuItems = () => {

  const items = useMemo(() => {
    return [
      {
        key: '/',
        icon: <HomeOutlined />,
        label: (
          <span>Главная</span>
        )
      },
      {
        key: '/profile',
        icon: <ProfileOutlined />,
        label: (
          <span>Профиль</span>
        )
      },
      {
        key: '/projects',
        icon: <ProjectOutlined />,
        label: (
          <span>Проекты</span>
        )
      },

      {
        key: '/terms-of-use',
        icon: <FileDoneOutlined />,
        label: (
          <span>Правила</span>
        )
      },
      {
        key: '/about',
        icon: <InfoCircleOutlined />,
        label: (
          <span>О нас</span>
        )
      },
    ]
  }, []);
  return items;
};

export default useSidebarMenuItems;
