import { Row, Col } from 'antd';
import React from 'react';

const HeaderLayout = (props) => {
  const { burgerIcon, logo,  userMenu } = props;

  return (
    <Row>
      <Col span={1}>
        { burgerIcon }
      </Col>
      <Col span={5}
           style={{display: 'flex', alignItems: 'center'}}
      >
        { logo }
      </Col>
      <Col span={12}>

      </Col>
      <Col
        span={6}
        style={{display: 'flex', justifyContent: 'end', alignItems: 'center'}}
      >
        { userMenu }
      </Col>
    </Row>
  );
};

export default HeaderLayout;
