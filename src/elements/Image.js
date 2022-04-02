import React from "react";
import styled from "styled-components";

const Image = (props) => {
    const { shape, src, size } = props;

    const styles = {
        src: src,
        size: size,
    };
    //서클, 사각형 둘 다 공통적으로 적용되는 속성: styles로 만든다.
    // shape: style이 아니라 원형을 알게 해주는 이름

    if (shape === "circle") {
        return <ImageCircle {...styles}></ImageCircle>;
    }

    if (shape === "rectangle") {
    }
    return (
        <AspectOutter>
            <AspectInner {...styles}></AspectInner>
        </AspectOutter>
    );
};

Image.defaultProps = {
    shape: "circle",
    src: "https://images.mypetlife.co.kr/content/uploads/2019/12/09151959/%EC%8B%AC%EC%8B%AC%ED%95%9C_%EA%B3%A0%EC%96%91%EC%9D%B42.png",
    size: 36,
};

const AspectOutter = styled.div`
    width: 100%;
    min-width: 250px;
`;

const AspectInner = styled.div`
    position: relative;
    padding-top: 75%;
    overflow: hidden;
    background-image: url("${(props) => props.src}");
    background-size: cover;
    background-position: center;
`;

//반응형 웹페이지에 적합한 사각형 이미지박스 만들기: div 두 개가 중요 padding-top은 왜?

const ImageCircle = styled.div`
    --size: ${(props) => props.size}px;
    width: var(--size);
    height: var(--size);
    border-radius: var(--size);

    background-image: url("${(props) => props.src}");
    background-size: cover;
    margin: 4px;
`;
// --size의 값은 props로 받아오고, width, height, border-radius에 적용할 --size라는 변수를 만들었다.
export default Image;
