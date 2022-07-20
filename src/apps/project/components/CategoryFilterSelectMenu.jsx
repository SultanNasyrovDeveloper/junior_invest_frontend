import { Dropdown, Button, Card, Checkbox } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';

const CategoryFilterSelectMenu = (props) => {
  const { categories, checked, onChange } = props;
  return (
    <Dropdown
      trigger={['click']}
      placement="bottomRight"
      overlay={
        <Card>
          <Scrollbars style={{ height: 200, width: 180 }}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
              {
                categories?.map(category => {
                  return (
                    <Checkbox
                      style={{ margin: 0}}
                      key={category.id}
                      checked={checked.includes(category.id)}
                      onChange={(event) => onChange(event, category.id)}
                    >{ category.name }</Checkbox>
                  )
                })
              }
            </div>
          </Scrollbars>
        </Card>
      }
    >
      <Button>
        <FilterOutlined />
        Категории
      </Button>
    </Dropdown>
  );
};

export default CategoryFilterSelectMenu;
