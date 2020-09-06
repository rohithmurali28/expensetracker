import styled from 'styled-components'
import { Icon } from 'antd';

export const InputField = styled.input`
    margin-bottom:10px;
    height: 30px;
    border-radius:6px;
    width: 200px;
`;

export const Main = styled.div`
    height:100vh;
    width:100%;
    display:flex;
    flex-direction:column;
`;

export const LeftPanel = styled.div`
     height: 100vh;
     width: 30%;
     color:#fff;
     padding-left:10px;
     background-color: #a74826;
     display:flex;
     flex-direction:column;
`;
export const Heading = styled.div`
    font-size: 20px;
    margin-left:10px;
`;
export const Recent = styled.div`
    font-size:20px;
`;
export const RightPanel = styled.div`
    display:flex;
    flex-direction:column;
`;

export const TemplateOuter = styled.div`
    height:150px;
    width:150px;
    margin-left:30px;
    margin-bottom: 20px;
    display:flex;
    flex-direction:column;
    align-items:center;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    padding-bottom:15px;
`;

export const TemplateInner = styled.div`
    height:100px;
    width:130px;
    margin-top:20px;
    margin-bottom: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const TypesWrapper = styled.div`
    display:flex;
    flex-wrap:wrap;

`;

export const Row = styled.div`
    display:flex;
    align-items:center;
`;

export const Type = styled.div`
    width:200px;
    font-style:bold;
`;

export const Header = styled.div`
    display:flex;
    align-items:center;
    height: 12vh;
    background-color: #a74826;
    width:100%;
    color:white;
    margin-bottom:20px;
`;

export const Username = styled.div`
    display:flex;
    flex:1;
    flex-direction:row-reverse;
`;

export const Remove = styled(Icon)`
    margin-left:10px;
    color:red;
`;

export const DrawerTitle = styled(Row)`
    justify-content:space-between;
`;

export const TypeName = styled.div`
    width:110px;
`;