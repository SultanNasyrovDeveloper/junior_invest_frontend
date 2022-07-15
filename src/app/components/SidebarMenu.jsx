import { Menu } from 'antd';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { appStore } from 'store';

import { useSidebarMenuItems } from '../hooks';

const SidebarMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const items = useSidebarMenuItems();

  const handleMenuItemClick = (item) => {
    navigate(item.key);
    appStore.closeSidebar();
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

export default observer(SidebarMenu);
