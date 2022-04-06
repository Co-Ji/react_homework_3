import React from "react";
import styled from "styled-components";

import { Text, Grid } from "./index";

const Inputs = (props) => {
    const { type, label, placeholder, onChange, width, multiLine, value } =
        props;
    const styles = { width };
    // console.log(onChange);

    if (multiLine) {
        return (
            <Grid>
                <Text>{label}</Text>
                <Textarea
                    value={value}
                    rows={10}
                    placeholder={placeholder}
                    onChange={onChange}
                ></Textarea>
            </Grid>
        );
    }

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
    multiLine: false,
    type: "text",
    label: "",
    placeholder: "",
    onChange: () => {},
    width: "100%",
    value: "",
};

const Textarea = styled.textarea`
    border: 1px solid #212121;
    width: 100%;
    padding: 12px 4px;
    box-sizing: border-box;
`;

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
