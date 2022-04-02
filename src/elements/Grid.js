import React from "react";
import styled from "styled-components";

const Grid = (props) => {
    const { is_flex, width, margin, padding, bg, children } = props;
    const styles = {
        is_flex: is_flex,
        width: width,
        margin: margin,
        padding: padding,
        bg: bg,
    };
    return (
        <React.Fragment>
            <GridBox {...styles}>{children}</GridBox>
        </React.Fragment>
    );
};
//children = 그리드박스 컴포넌트를 상위 컴포넌트에서 사용할 때 상위 컴포넌트의 (예를들어div안에 넣고 싶다면) 저런식으로 써서 사용한다.

Grid.defaultProps = {
    children: null,
    is_flex: false,
    width: "100%",
    padding: false,
    margin: false,
    bg: false,
    //백그라운드
};
//프롭스로 넘긴 속성이 없을 경우를 대비(넘겨주는 프롭스에 따라 바뀔 것 들?)

const GridBox = styled.div`
    width: ${(props) => props.width};
    height: 100%;
    box-sizing: border-box;
    ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
    ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
    ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
    ${(props) =>
        props.is_flex
            ? `display: flex; align-items: center; justify-content: space-between; `
            : ""}
`;
//기본으로 설정한 속성
//${(props)=> (props.bg ? `${props.bg};` : '')} 백틱 한 번 더 쓰는 것에 주의한다(왜?)
// props가 없으면 : '' 이게 기본설정이 아닌가? 여기에 값을 줘도 적용이 안된다.
// 왜 어쩔 때는 삼항연산자를 쓰고 어쩔 때는 안쓰지?

export default Grid;
