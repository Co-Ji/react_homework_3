import React from "react";
import styled from "styled-components";

const Inputs = (props) => {
    const { type, label, placeholder, onChange, width } = props;
    const styles = { width };
    // console.log(onChange);
    return (
        <React.Fragment>
            <Input
                type={type}
                label={label}
                placeholder={placeholder}
                onChange={onChange}
                {...styles}
            />
        </React.Fragment>
    );
};

Inputs.defaultProps = {
    type: "text",
    label: "",
    placeholder: "",
    onChange: () => {},
    width: "100%",
};

const Input = styled.input`
    width: ${(props) => props.width};
    height: 30px;
    border: 2px solid #25ccf7;
    border-radius: 3px;
    display: inline-block;
    &: hover {
        border: 2px solid #1b9cfc;
    }
`;

export default Inputs;
