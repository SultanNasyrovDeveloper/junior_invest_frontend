import React from 'react';
import styled from 'styled-components';

import bannerBackground from 'assets/banner-background.jpg';

const BannerContainer = styled.div`
  width: 100%;
  height: 85vh;
  background-image: url(${bannerBackground})
`;

const Banner = () => {


  return (
    <BannerContainer>

    </BannerContainer>
  );
};

export default Banner;
