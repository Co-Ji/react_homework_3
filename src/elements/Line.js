import React from "react";
import styled from "styled-components";

const Line = (props) => {
    const { width, border } = props;

    const styles = {
        width: width,
        border: border,
    };

    return (
        <React.Fragment>
            <Hr {...styles} />
        </React.Fragment>
    );
};

Line.defaultProps = {
    width: "100%",
    border: false,
};

const Hr = styled.hr`
    width: ${(props) => props.width};
    border: 0;
    border-top: ${(props) => props.border};
`;

export default Line;
