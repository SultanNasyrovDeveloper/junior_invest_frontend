import { Row, Col, Space } from 'antd';
import React from 'react';

const HeaderLayout = (props) => {
  const { burgerIcon, logo,  userMenu } = props;

  return (
    <Row>
      <Col xs={18}>
        <Space size="large">
          { burgerIcon }
          { logo }
        </Space>
      </Col>
      <Col
        xs={6}
        style={{display: 'flex', justifyContent: 'end', alignItems: 'center'}}
      >
        { userMenu }
      </Col>
    </Row>
  );
};

export default HeaderLayout;
