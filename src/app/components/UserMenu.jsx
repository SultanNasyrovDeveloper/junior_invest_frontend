import {
  Avatar,
  Dropdown,
  Button,
  Card,
  List,
  Space
} from 'antd';
import {
  UserOutlined,
  ProfileOutlined,
  MessageOutlined,
  PayCircleOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';

import { userStore } from 'store';
import { useAuth, useLogout } from 'apps/auth/hooks';

const StyledUserMenuIcon = styled(UserOutlined)`
  cursor: pointer;
`;

const StyledUserMenuCard = styled(Card)`
  min-width: 200px; 
  
  .ant-card-body {
    padding: 12px 24px;
  }
`;

const ListItemStyled = styled(List.Item)`
  cursor: pointer;
`;

const UserMenu = () => {

  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const logout = useLogout();

  return (
    <>
      { isLoggedIn &&
        <Dropdown
          trigger={['click']}
          placement="bottomRight"
          overlay={
            <StyledUserMenuCard>
              <List>
                <ListItemStyled>
                  { userStore.email }
                </ListItemStyled>
                <ListItemStyled
                  key="profile"
                  onClick={() => navigate('/profile')}
                >
                  <Space size="middle">
                    <ProfileOutlined />
                    Profile
                  </Space>
                </ListItemStyled>
                <ListItemStyled
                  key="messages"
                  onClick={() => navigate('/profile')}
                >
                  <Space size="middle">
                    <MessageOutlined />
                    Messages
                  </Space>
                </ListItemStyled>
                <ListItemStyled
                  key="coins"
                  onClick={() => navigate('/profile')}
                >
                  <Space size="middle">
                    <PayCircleOutlined />
                    Coins
                  </Space>
                </ListItemStyled>
                <ListItemStyled
                  key="logout"
                  onClick={() => logout()}
                >
                  <Space size="middle">
                    <LogoutOutlined />
                    Logout
                  </Space>
                </ListItemStyled>
              </List>
            </StyledUserMenuCard>
          }
        >
          <Avatar icon={<StyledUserMenuIcon />} />
        </Dropdown>
      }
      { !isLoggedIn &&
        <>
          <Link to="/signup">
            <Button type="link">Sign up</Button>
          </Link>
          <Link to="/signin">
            <Button type="link">Sign in</Button>
          </Link>
        </>
      }
    </>
  );
};

export default observer(UserMenu);
