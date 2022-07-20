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
      max-width: 100%;
      height: auto;
      margin-bottom: 1rem;
    }
  }
`;

const HeaderText = styled.h1`
  font-size: 7vw;
  font-weight: bold;
  color: #0D6EFD;
  text-align: center;

  @media (min-width: 992px) { 
    font-size: 5vw;
  }
`;

const HeaderTagline = styled.h2`
  text-align: center;
  font-size: 4vw;

  @media (min-width: 768px) { 
    font-size: 4vw;
  }

  @media (min-width: 992px) {
    font-size: 3vw;
  }

  @media (min-width: 1200px) {
    font-size: 2vw;
  }
`;

const Banner = () => {

  return (
    <BannerContainer >
      <Row justify="center">
        <Col xs={16} md={20} lg={24}>
          <Logo className="banner-logo"/>
        </Col>
      </Row>

      <HeaderText>
         Раскрути свою идею!
      </HeaderText>
      <HeaderTagline>
        Платформа поддержки проектов детей от 7 до 17 лет
      </HeaderTagline>
    </BannerContainer>
  );
};

export default Banner;
