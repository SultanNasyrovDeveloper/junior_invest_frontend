import { Card, Row, Col } from 'antd';
import React from 'react';

import {
  ApplicationLayoutStyled,
  HeaderStyled,
  HeaderContentContainerStyled,
  ContentOuterContainerStyled,
  ScrollableContentStyled,
  ContentInnerContainerStyled,
  DrawerStyled,
  MainContainerStyled,
  StyledFooter
} from './components.styled';

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
    <ApplicationLayoutStyled>

      <HeaderStyled>
        <HeaderContentContainerStyled>
          { header }
        </HeaderContentContainerStyled>
      </HeaderStyled>

      <ContentOuterContainerStyled>
        <ScrollableContentStyled>
          <ContentInnerContainerStyled>
            <MainContainerStyled>
              { content }

              <StyledFooter>
                <Row>
                  <Col span={24}>
                    <Card>
                      { footer }
                    </Card>
                  </Col>
                </Row>
              </StyledFooter>
            </MainContainerStyled>
          </ContentInnerContainerStyled>
        </ScrollableContentStyled>

        <DrawerStyled
          visible={isShowNavigation}
          closable={false}
          maskClosable={true}
          onClose={onNavigationClose}
          placement="left"
          maskStyle={{ backgroundColor: 'transparent' }}
          getContainer={false}
          width={250}
          z-index={10}
        >
          { navigationPanel }
        </DrawerStyled>
      </ContentOuterContainerStyled>
    </ApplicationLayoutStyled>
  );
};

export default AppLayout;
