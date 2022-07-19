import { PageHeader, Col, Card } from 'antd';
import React from 'react';
import {useAsync, useTitle} from 'react-use';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import { VerticalMarginRow } from 'components';
import { appStore } from 'store';

const AboutPage = () => {
  useTitle('О нас');
  const navigate = useNavigate();


  useAsync(async () => {
    try {
      await appStore.fetchAbout();
    }
    catch(error) {
      navigate('/not-found');
    }
  }, []);

  return (
    <>
      <PageHeader
        title="О нас"
        ghost={false}
      />

      <VerticalMarginRow>
        <Col span={24}>
          <Card >
            {
              appStore.about &&
              <div dangerouslySetInnerHTML={{ __html: appStore.about.content }} />
            }
          </Card>
        </Col>
      </VerticalMarginRow>

    </>
  );
};

export default observer(AboutPage);
