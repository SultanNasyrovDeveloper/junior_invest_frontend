import styled from "styled-components";
import { Drawer, Layout } from "antd";
import { Scrollbars } from "react-custom-scrollbars-2";

export const ApplicationLayoutStyled = styled(Layout)`
  height: 100vh;
`;

export const HeaderStyled = styled(Layout.Header)`
  background-color: white;
  display: flex;
  justify-content: center;
`;

export const HeaderContentContainerStyled = styled.div`
  width: 100%;
  max-width: 1320px;
`

export const ContentOuterContainerStyled = styled(Layout)`
  position: relative;
`;

export const ContentInnerContainerStyled = styled.div`
  display: flex;
  justify-content: center;
`;

export const ScrollableContentStyled = styled(Scrollbars)`
  display: flex !important;
  justify-content: center;
`;

export const MainContainerStyled = styled(Layout.Content)`
  padding: 0.5rem 0;
  max-width: 1320px;
`;

export const DrawerStyled = styled(Drawer)`
  position: absolute;
  
  .ant-drawer-body {
    padding: 0;
  }
`;


export const StyledFooter = styled(Layout.Footer)`
`;
