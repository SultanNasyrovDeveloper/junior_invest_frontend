import { Row, Col, Typography, List, Divider } from 'antd';
import {
  HomeOutlined,
  ProjectOutlined,
  FileDoneOutlined,
  InfoCircleOutlined,
  ReconciliationOutlined
} from "@ant-design/icons";
import React from 'react';
import { Link } from 'react-router-dom';

import { VerticalMarginRow } from 'components';


const Footer = () => {
  return (
    <>
      <Row gutter={5}>
        <Col xs={24} sm={12} md={8}>
          <List size="small" split={false}>
            <List.Item>
              <List.Item.Meta
                avatar={<HomeOutlined />}
                title={<Link to="/">Главная</Link>}
              />
            </List.Item>
            <List.Item>
              <List.Item.Meta
                avatar={<ProjectOutlined />}
                title={<Link to="/projects">Проекты</Link>}
              />
            </List.Item>
            <List.Item>
              <List.Item.Meta
                avatar={<FileDoneOutlined />}
                title={<Link to="/terms">Правила</Link>}
              />
            </List.Item>
            <List.Item>
              <List.Item.Meta
                avatar={<InfoCircleOutlined />}
                title={<Link to="/about">О нас</Link>}
              />
            </List.Item>
            <List.Item>
              <List.Item.Meta
                avatar={<ReconciliationOutlined />}
                title={<Link to="/policy">Политика конфиденциальности</Link>}
              />
            </List.Item>
          </List>
        </Col>
        <Col xs={24} sm={12} md={8}></Col>
        <Col xs={24} sm={12} md={8}></Col>
      </Row>
      <Divider />
      <VerticalMarginRow justify="center">
        <Typography>Junior Invest, { new Date().getFullYear() }</Typography>
      </VerticalMarginRow>
    </>
  );
};

export default Footer;
