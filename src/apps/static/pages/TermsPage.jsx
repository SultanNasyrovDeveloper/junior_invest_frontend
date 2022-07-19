import { PageHeader, Col, Card } from 'antd';
import React from 'react';
import {useAsync, useTitle} from 'react-use';
import { observer } from 'mobx-react-lite';
import { useNavigate } from "react-router-dom";

import { VerticalMarginRow } from 'components';
import { appStore } from 'store';

const TermsPage = () => {
  useTitle('Правила пользования');
  const navigate = useNavigate();

  useAsync(async () => {
    try {
      await appStore.fetchTerms();
    }
    catch(error) {
      navigate('/not-found');
    }
  }, []);

  return (
    <>
      <PageHeader
        title="Правила платформы"
        ghost={false}
      />

      <VerticalMarginRow>
        <Col span={24}>
          <Card >
            {
              appStore.terms &&
              <div dangerouslySetInnerHTML={{ __html: appStore.terms?.content }} />
            }
          </Card>
        </Col>
      </VerticalMarginRow>

    </>
  );
};

export default observer(TermsPage);
