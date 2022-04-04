import React from "react";
import styled from "styled-components";
import Text from "./Text";

const Button = (props) => {
    const { width, children, onClick } = props;

    const styles = { width: width };

    return (
        <Btn onClick={onClick} {...styles}>
            {children}
        </Btn>
    );
};

Button.defaultProps = {
    width: "240px",
    // onClick: console.log("값을 뭘로 줘야하지?"),
};

const Btn = styled.button`
    width: ${(props) => props.width};
    background: #1b9cfc;
    height: 40px;

    border-radius: 5px;
    border-color: transparent;

    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

export default Button;
