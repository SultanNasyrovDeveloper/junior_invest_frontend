import {
  Avatar,
  Dropdown,
  Card,
  List,
  Space
} from 'antd';
import {
  UserOutlined,
  ProfileOutlined,
  LogoutOutlined,
  UserAddOutlined,
  LoginOutlined
} from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';

import { userStore } from 'store';
import { useAuth, useLogout } from 'apps/auth';

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

const StyledLinksContainer = styled.div`
  
  .textLinksContainer{
    display: flex;
    
    @media (max-width: 365px) {
      display: none;
    }
  }
  
  .iconLinksContainer {
    display: none;

    @media (max-width: 365px) {
      display: flex;
    }
  }
`

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
                  { userStore.fullName }
                </ListItemStyled>
                <ListItemStyled
                  key="profile"
                  onClick={() => navigate('/profile')}
                >
                  <Space size="middle">
                    <ProfileOutlined />
                    Профиль
                  </Space>
                </ListItemStyled>
                <ListItemStyled
                  key="logout"
                  onClick={() => logout()}
                >
                  <Space size="middle">
                    <LogoutOutlined />
                    Выйти
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
        <StyledLinksContainer>
          <Space size="large" className="textLinksContainer">
            <Link to="/signup">Регистрация</Link>
            <Link to="/signin">Вход</Link>
          </Space>
          <Space className="iconLinksContainer">
            <Link to="/signup">
              <UserAddOutlined />
            </Link>
            <Link to="/signin">
              <LoginOutlined />
            </Link>
          </Space>
        </StyledLinksContainer>
      }
    </>
  );
};

export default observer(UserMenu);
