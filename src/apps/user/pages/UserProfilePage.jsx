import { PageHeader, Row, Col, Card } from 'antd';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { useTitle } from 'react-use';

import { userStore } from 'store';

const UserProfilePage = () => {
  useTitle('Профиль пользователя');

  return (
    <>
      <PageHeader
        ghost={false}
        title={userStore.fullName}
      />

      <Row>
        <Col span={24}>
          <Card
            title="Личная информация"
          >

          </Card>
        </Col>
      </Row>


    </>
  );
};

export default observer(UserProfilePage);
