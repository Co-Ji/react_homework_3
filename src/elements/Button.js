import React from "react";
import styled from "styled-components";
import Text from "./Text";

const Button = (props) => {
    const { width, margin, children, onClick, is_float, text } = props;
    //게시글 쓰기 버튼
    if (is_float) {
        return (
            <React.Fragment>
                <FloatButton onClick={onClick}>
                    {text ? text : children}
                </FloatButton>
            </React.Fragment>
        );
    }

    const styles = {
        width: width,
        margin: margin,
    };

    return (
        <Btn onClick={onClick} {...styles}>
            {children}
        </Btn>
    );
};

Button.defaultProps = {
    width: "240px",
    margin: false,
    children: null,
    onClick: () => {},
    is_float: false,
};

const Btn = styled.button`
    width: ${(props) => props.width};
    margin: ${(props) => props.margin};
    height: 40px;
    border-radius: 5px;
    background: #1b9cfc;

    border-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

const FloatButton = styled.button`
    width: 50px;
    height: 50px;
    background-color: #212121;
    color: #ffffff;
    box-sizing: border-box;
    font-size: 36px;
    font-weight: 800;
    position: fixed;
    bottom: 50px;
    right: 16px;
    text-align: center;
    vertical-align: middle;
    border: none;
    border-radius: 50px;
    cursor: pointer;
`;

export default Button;
