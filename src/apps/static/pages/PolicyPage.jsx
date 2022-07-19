import { PageHeader, Col, Card } from 'antd';
import React from 'react';
import { useAsync } from 'react-use';
import { observer } from 'mobx-react-lite';
import { useNavigate } from "react-router-dom";

import { VerticalMarginRow } from 'components';
import { appStore } from 'store';

const PolicyPage = () => {

  const navigate = useNavigate();

  useAsync(async () => {
    try {
      await appStore.fetchPolicy();
    }
    catch(error) {
      navigate('/not-found');
    }
  }, []);

  return (
    <>
      <PageHeader
        title="Политика конфиденциальности"
        ghost={false}
      />

      <VerticalMarginRow>
        <Col span={24}>
          <Card >
            {
              appStore.policy &&
              <div dangerouslySetInnerHTML={{ __html: appStore.policy?.content }} />
            }
          </Card>
        </Col>
      </VerticalMarginRow>

    </>
  );
};

export default observer(PolicyPage);
