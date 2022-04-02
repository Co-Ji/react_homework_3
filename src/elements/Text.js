import React from "react";
import styled from "styled-components";

const Text = (props) => {
    const { bold, color, size, children } = props;

    const styles = { bold: bold, color: color, size: size };

    return <TextP {...styles}>{children}</TextP>;
};

Text.defaultProps = {
    bold: false,
    color: "#222831",
    size: "14px",
};

const TextP = styled.p`
    color: ${(props) => props.color};
    font-size: ${(props) => props.size};
    font-weight: ${(props) => (props.bold ? "600" : "400")};
`;
//bold는 값을 가져오는게 아니다. = props로 bold를 지정하면 font-weight: 600 이란 뜻
//Grid.js 의 padding, margin, background-color와는 다른 상황임
export default Text;
