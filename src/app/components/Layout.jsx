import { Layout, Drawer } from 'antd';
import React from 'react';
import styled from 'styled-components';

const LayoutStyled = styled(Layout)`
  height: 100vh;
`;

const HeaderStyled = styled(Layout.Header)`
  background-color: white;
`;

const ContentStyled = styled(Layout.Content)`
  padding: 0.5rem;
`;

const ContentContainerStyled = styled(Layout)`
  position: relative;
`;

const DrawerStyled = styled(Drawer)`
  position: absolute;
`;

const AppLayout = (props) => {
  const {
    header,
    content,
    footer,
    isShowNavigation,
    navigationPanel,
    onNavigationClose
  } = props;

  return (
    <LayoutStyled>
      <HeaderStyled>
        { header }
      </HeaderStyled>
      <ContentContainerStyled>
        <ContentStyled>
          { content }
        </ContentStyled>
        <Layout.Footer>
          { footer}
        </Layout.Footer>
        <DrawerStyled
          visible={isShowNavigation}
          closable={false}
          onClose={onNavigationClose}
          placement="left"
          maskStyle={{ backgroundColor: 'transparent' }}
          getContainer={false}
        >
          { navigationPanel }
        </DrawerStyled>
      </ContentContainerStyled>
    </LayoutStyled>
  );
};

export default AppLayout;
