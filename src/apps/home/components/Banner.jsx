import { Typography, Row, Col, Card } from 'antd';
import React from 'react';
import styled from 'styled-components';

import { ReactComponent as Logo } from 'assets/icons/logo_text.svg';

const BannerContainer = styled(Card)`
  width: 100%;
  height: 85vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  .ant-card-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    .banner-logo {
      margin-bottom: 2rem
    }
  }
`;

const Banner = () => {

  return (
    <BannerContainer >
      <Logo className="banner-logo"/>
      <Typography.Title level={2}>
        Платформа поддержки проектов детей от 7 до 16 лет
      </Typography.Title>
    </BannerContainer>
  );
};

export default Banner;
