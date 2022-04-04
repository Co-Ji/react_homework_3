import React from "react";
import styled from "styled-components";
import { Grid, Button, Text } from "../elements";
import { getCookie, deleteCookie } from "../shared/Cookie";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

import { history } from "../redux/configureStore";
import { apiKey } from "./firebase";

const Header = (props) => {
    const dispatch = useDispatch();
    const is_login = useSelector((state) => state.user.is_login);

    const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;

    const is_session = sessionStorage.getItem(_session_key) ? true : false;
    // console.log(_session_key); //세션키 확인
    // console.log(sessionStorage.getItem(_session_key)); //세션에 로그인 정보가 있는지 확인
    // console.log(is_session); // 세션에 로그인정보가 있으면 트루 없으면 폴스

    //둘 다 충족해야 하기 때문에 (로그인했는지 쿠키와 세션으로 중복확인) &&을 사용
    if (is_login && is_session) {
        return (
            <React.Fragment>
                <Grid is_flex padding="30px 16px">
                    <Grid>
                        <BtnHome
                            type="button"
                            onClick={() => console.log("홈")}
                        >
                            <IconHome
                                src="/public/images/iconHome.png"
                                alt="homeIcon"
                            />
                        </BtnHome>
                    </Grid>
                    <Grid is_flex>
                        <Button onClick={() => console.log("내정보버튼")}>
                            <Text color="white">내정보</Text>
                        </Button>
                        <Button onClick={() => console.log("알림버튼")}>
                            <Text color="white">알림</Text>
                        </Button>
                        <Button
                            onClick={() => {
                                dispatch(userActions.logoutFB());
                            }}
                        >
                            <Text color="white">로그아웃</Text>
                        </Button>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            <Grid is_flex padding="30px 16px">
                <Grid>
                    <BtnHome
                        type="button"
                        onClick={() => {
                            history.push("/");
                        }}
                    >
                        <IconHome
                            src="/public/images/iconHome.png"
                            alt="homeIcon"
                        />
                    </BtnHome>
                </Grid>
                <Grid is_flex>
                    <Button
                        onClick={() => {
                            history.push("/signup");
                        }}
                    >
                        <Text color="white">회원가입</Text>
                    </Button>
                    <Button
                        onClick={() => {
                            history.push("/login");
                        }}
                    >
                        <Text color="white">로그인</Text>
                    </Button>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

const BtnHome = styled.button`
    width: 40px;
    height: 40px;
`;
const IconHome = styled.img`
    // background: red;
`;

export default Header;
