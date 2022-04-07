import React from "react";
import { Grid, Text, Inputs, Button } from "../elements";
import { emailCheck } from "../shared/common";

import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const Signup = (props) => {
    const dispatch = useDispatch();

    //회원가입시 유저가 입력한 값 가져오기
    const [id, setId] = React.useState("");
    const [user_name, setUser_name] = React.useState("");
    const [pwd, setPwd] = React.useState("");
    const [pwd_check, setPwd_check] = React.useState("");

    const signup = () => {
        if (id === "" || user_name === "" || pwd === "") {
            window.alert("입력하지 않은 항목이 있습니다!");

            return;
        }

        if (!emailCheck(id)) {
            window.alert("아이디가 이메일 형식이 아닙니다!");
            return;
        }

        if (pwd !== pwd_check) {
            window.alert("비밀번호가 일치하지 않습니다!");
            return;
        }
        dispatch(userActions.signupFB(id, pwd, user_name));
    };

    return (
        <React.Fragment>
            <Grid height="100vh">
                <Grid height="700px" padding="0 16px" bg="#EFF6FF" center>
                    <Grid margin="20px 0">
                        <Text size="30px" bold>
                            회원가입
                        </Text>
                    </Grid>
                    <Grid margin="10px 0">
                        <Text size="12px">아이디</Text>
                        <Inputs
                            label="아이디"
                            placeholder="아이디는 이메일 형식으로 입력해주세요."
                            onChange={(e) => {
                                setId(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid margin="20px 0">
                        <Text size="12px">닉네임</Text>
                        <Inputs
                            label="닉네임"
                            placeholder="닉네임을 입력해주세요."
                            onChange={(e) => {
                                setUser_name(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid margin="20px 0">
                        <Text size="12px">비밀번호</Text>
                        <Inputs
                            type="password"
                            label="비밀번호"
                            placeholder="비밀번호를 6자리 이상 입력해주세요."
                            onChange={(e) => {
                                setPwd(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid margin="20px 0">
                        <Text size="12px">비밀번호 확인</Text>
                        <Inputs
                            type="password"
                            label="비밀번호 확인"
                            placeholder="비밀번호를 다시 입력해주세요."
                            onChange={(e) => {
                                setPwd_check(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid margin="50px 0">
                        <Button width="100%" onClick={signup}>
                            <Text color="white">회원가입하기</Text>
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};
export default Signup;
