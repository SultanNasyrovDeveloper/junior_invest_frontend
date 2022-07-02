import { Menu } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { useAuth, useSidebarMenuItems } from '../hooks';
import { appActions } from '../store';

const SidebarMenu = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const items = useSidebarMenuItems();

  const handleMenuItemClick = (item) => {
    navigate(item.key);
    dispatch(appActions.closeNavigation());
  };

  return (
    <>
      <Menu
        mode="vertical"
        items={items}
        onClick={handleMenuItemClick}
        selectedKeys={[location.pathname]}
      />
    </>
  );
};

export default SidebarMenu;
