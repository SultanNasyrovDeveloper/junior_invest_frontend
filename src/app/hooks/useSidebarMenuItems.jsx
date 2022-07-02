import {
  HomeOutlined,
  ProjectOutlined,
  InfoCircleOutlined,
  MessageOutlined,
  ProfileOutlined,
  BookOutlined,
  GiftOutlined,
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
          <span>Home</span>
        )
      },
      {
        key: '/projects',
        icon: <ProjectOutlined />,
        label: (
          <span>Projects</span>
        )
      },
      {
        key: '/profile',
        icon: <ProfileOutlined />,
        label: (
          <span>Profile</span>
        )
      },
      {
        key: '/messages',
        icon: <MessageOutlined />,
        label: (
          <span>Messages</span>
        )
      },
      {
        key: '/blog',
        icon: <MessageOutlined />,
        label: (
          <span>Blog</span>
        )
      },
      {
        key: '/courses',
        icon: <BookOutlined />,
        label: (
          <span>Courses</span>
        )
      },
      {
        key: '/gift-shop',
        icon: <GiftOutlined />,
        label: (
          <span>Gift Shop</span>
        )
      },
      {
        key: '/terms-of-use',
        icon: <FileDoneOutlined />,
        label: (
          <span>Terms of Use</span>
        )
      },
      {
        key: '/about',
        icon: <InfoCircleOutlined />,
        label: (
          <span>About us</span>
        )
      },
    ]
  }, []);
  return items;
};

export default useSidebarMenuItems;
