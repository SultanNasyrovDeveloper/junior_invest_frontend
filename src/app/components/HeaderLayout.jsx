import { Row, Col } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeaderLayout = (props) => {
  const navigate = useNavigate();
  const { burgerIcon, userMenu } = props;

  return (
    <Row>
      <Col span={1}>
        { burgerIcon }
      </Col>
      <Col span={5}>
        <span
          onClick={() => navigate('/')}
          style={{cursor: 'pointer'}}
        >Junior Invest</span>
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
