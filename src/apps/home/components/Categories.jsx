import React from 'react';
import {StyledHomePageRow} from "./components.styled";
import { Button, Col, Empty, Row, Typography, Card } from "antd";

const Categories = (props) => {

  const { categories, onClick, onButtonClick} = props;

  return (
    <>
      <StyledHomePageRow justify="center">
        <Typography.Title level={2}>Направления</Typography.Title>
      </StyledHomePageRow>

      <StyledHomePageRow gutter={[8, 8]}>
        {
          categories?.map(category => (
            <Col
              key={category.id}
              xs={24}
              md={12}
              lg={8}
              xl={6}
            >
              <Card
                hoverable={true}
                cover={<img src={category.image} />}
                onClick={() => onClick(category.id)}
              >
                {category.name}
              </Card>
            </Col>
          ))
        }
        {
          (!categories || categories?.length === 0) &&
          <Row
            justify="center"
            align="middle"
            style={{width: '100%', minHeight: '30vh'}}
          >
            <Empty description="Список направлений пуст" />
          </Row>
        }
      </StyledHomePageRow>


      <StyledHomePageRow justify="center">
        <Button
          size="large"
          onClick={onButtonClick}
          type="primary"
        >Смотреть проекты</Button>
      </StyledHomePageRow>
    </>
  );
};

export default Categories;
