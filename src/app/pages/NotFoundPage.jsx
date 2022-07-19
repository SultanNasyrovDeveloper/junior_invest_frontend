import { Row, Col, Card, PageHeader, Button } from 'antd';
import React from 'react';
import { useTitle } from "react-use";
import { Link } from 'react-router-dom';

import { VerticalMarginRow } from 'components';

import { ReactComponent as NotFoundImage } from 'assets/icons/404.svg';

const NotFoundPage = () => {
  useTitle('Страница не найдена');
  return (
    <>
      <PageHeader
        title="Страница не найдена"
        ghost={false}
      />

      <VerticalMarginRow>
        <Col span={24}>
          <Card>
            <Row justify="center">
              <NotFoundImage />
            </Row>
            <VerticalMarginRow justify="center">
              <Link to="/">
                <Button type="primary">На главную</Button>
              </Link>

            </VerticalMarginRow>
          </Card>
        </Col>
      </VerticalMarginRow>
    </>

  );
};

export default NotFoundPage;
