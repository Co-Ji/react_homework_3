import React from "react";
import { Grid, Text, Inputs, Button } from "../elements";
import { getCookie, setCookie, deleteCookie } from "../shared/Cookie";

import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { emailCheck } from "../shared/common";
//login()실행 시 리듀서로 데이터 보낼 수 있도록 필요한 것들 임포트
const Login = (props) => {
    const dispatch = useDispatch();

    // 기입한 id, pwd 가져오도록 useState쓴다.
    const [id, setId] = React.useState("");
    const [pwd, setPwd] = React.useState("");

    // id, pwd를 기입하면 id에 저장되도록 하는 함수
    const changeId = (e) => {
        setId(e.target.value);
    };
    const changePwd = (e) => {
        setPwd(e.target.value);
    };

    const login = () => {
        if (id === "" || pwd === "") {
            window.alert("아이디와 비밀번호를 모두 입력해주세요!");
            return;
        }

        if (!emailCheck(id)) {
            window.alert("이메일 형식이 맞지 않습니다!");
            return;
        }

        dispatch(userActions.loginFB(id, pwd));
    };
    // 버튼 클릭 시 리듀서에 액션 디스패치

    return (
        <React.Fragment>
            <Grid height="100vh">
                <Grid height="500px" padding="0 16px" bg="#EFF6FF" center>
                    <Grid margin="20px 0">
                        <Text size="30px" bold>
                            로그인
                        </Text>
                    </Grid>
                    <Grid padding="10px 10px 0 0">
                        <Text size="12px">아이디</Text>
                        <Inputs
                            label="아이디"
                            placeholder="아이디는 이메일 형식으로 입력해주세요"
                            onChange={changeId}
                        />
                    </Grid>
                    <Grid padding="10px 10px 0 0">
                        <Text size="12px">비밀번호</Text>
                        <Inputs
                            type="password"
                            label="비밀번호"
                            placeholder="비밀번호를 입력해주세요"
                            onChange={changePwd}
                        />
                    </Grid>
                    <Grid margin="50px 0">
                        <Button
                            width="100%"
                            onClick={() => {
                                login();
                            }}
                        >
                            <Text color="white">로그인하기</Text>
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default Login;
