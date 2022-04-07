import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";

import { auth } from "../../shared/firebase";
import firebase from "firebase/app";

// action types
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
//이메일로 user정보 리덕스에 추가하기 (로그인, 회원가입 시)
const SET_USER = "SET_USER";

// action creators 임머를 사용하면 간단하게 action creator를 만들 수 있다.
//createAction(타입, (파라미터)=>({파라미터}))
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const setUser = createAction(SET_USER, (user) => ({ user }));

//이니셜스테이트(초기값)
const initialState = {
    user: null,
    is_login: false,
};

//이메일로 로그인한 유저의 이니셜스테이트(초기값)
// const user_initial = {
//     user_name: 'sungji'
//     user_nickname: 'test1'
//     user_pwd: test1
// }

//middleware actions

//setUser() 디스패치 전에 메인화면으로 넘겨 주는 미들웨어(새로고침해서 로그인 정보가 없어지면 안되니까)
// 파이어베이스에서 로그인 정보 불러오기 때문에 이제 필요없는 액션
// const loginAction = (user) => {
//     return function (dispatch, getState, { history }) {
//         //이게 무슨 뜻이지?
//         console.log(history);
//         dispatch(setUser(user)); // 리듀서에 로그인액션 디스패치
//         history.push("/"); //화면 메인으로 넘어감
//     };
// };

//파이어베이스에서 id, pwd 가져와서 setUser()액션
const loginFB = (id, pwd) => {
    return function (dispatch, getState, { history }) {
        auth.setPersistence(firebase.auth.Auth.Persistence.SESSION) //지속성 유지 (세션)
            .then((res) => {
                //로그인 하면 지속할 수 있도록 세션에 저장하는 함수 setPersistence() 실행 후 로그인 실행
                auth.signInWithEmailAndPassword(id, pwd)

                    .then((user) => {
                        console.log(user);
                        dispatch(
                            setUser({
                                id: id,
                                user_name: user.user.displayName,
                                user_profile:
                                    "https://images.mypetlife.co.kr/content/uploads/2019/12/09151959/%EC%8B%AC%EC%8B%AC%ED%95%9C_%EA%B3%A0%EC%96%91%EC%9D%B42.png",
                                uid: user.user.uid, //uid는 고유값 (나중에 필요할 수도 있음)
                            })
                        );
                        history.push("/");
                    })
                    .catch((error) => {
                        var errorCode = error.code;
                        var errorMessage = error.message;

                        console.log(errorCode, errorMessage);
                        window.alert(
                            "일치하는 정보가 없습니다. 아이디 또는 이메일을 확인해주세요!"
                        );
                    });
            });
    };
};

const signupFB = (id, pwd, user_name) => {
    return function (dispatch, getState, { history }) {
        auth.createUserWithEmailAndPassword(id, pwd)
            .then((user) => {
                console.log(user); //signupFB하는 유저 콘솔창에 표시

                auth.currentUser //현재 이메일, 비밀번호 입력한 유저 정보 가져옴
                    //.updateProfile(): 이메일, 비밀번호 밖에 없으니 다른 정보는 직접 업데이트한다.
                    .updateProfile({
                        displayName: user_name,
                    })
                    .then(() => {
                        dispatch(
                            setUser({
                                id: id,
                                user_name: user_name,
                                user_profile:
                                    "https://images.mypetlife.co.kr/content/uploads/2019/12/09151959/%EC%8B%AC%EC%8B%AC%ED%95%9C_%EA%B3%A0%EC%96%91%EC%9D%B42.png",
                                uid: user.user.uid,
                            })
                            //유저정보 업뎃까지 성공 후 setUser액션을 디스패치한다.
                        );
                        history.push("/"); // 메인으로 이동
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;

                console.log(errorCode, errorMessage);
                // 오류가 날 경우 콘솔창에 표시(예를 들어 이메일형식이 아니거나)
            });
    };
};

//로그인 유지하는 함수 (로그인 후 메인페이지(처음 연결되는 페이지)부터 유지되어야 한다.)
const loginCheckFB = () => {
    return function (dispatch, getState, { history }) {
        auth.onAuthStateChanged((user) => {
            if (user) {
                dispatch(
                    setUser({
                        id: user.email,
                        user_name: user.displayName,
                        user_profile:
                            "https://images.mypetlife.co.kr/content/uploads/2019/12/09151959/%EC%8B%AC%EC%8B%AC%ED%95%9C_%EA%B3%A0%EC%96%91%EC%9D%B42.png",
                        uid: user.uid,
                    })
                );
            } else {
                dispatch(logOut());
            }
        });
    };
};
// getState는 대체 뭘까?
const logoutFB = () => {
    return function (dispatch, getState, { history }) {
        //auth.signOut() = 파이어베이스 내장함수(로그아웃)
        auth.signOut().then(() => {
            dispatch(logOut());
            history.replace("/");
        });
    };
};

//reducer
export default handleActions(
    {
        [SET_USER]: (state, action) =>
            produce(state, (draft) => {
                setCookie("is_login", "success"); //Cookie.js거쳐서 쿠키에 로그인 정보 저장
                draft.user = action.payload.user; //createAction을 사용해 중간에 payload가 추가됐다.
                draft.is_login = true; // 스토어 state에 로그인아이디와 is_login = true를 저장 ?
            }),
        [LOG_OUT]: (state, action) =>
            produce(state, (draft) => {
                deleteCookie("is_login");
                draft.user = null;
                draft.is_login = false;
            }),
        [GET_USER]: (state, action) => produce(state, (draft) => {}),
    },
    initialState
);

// action creator를 컴포넌트에서 쓸 수 있도록 export
const actionCreators = {
    logOut,
    getUser,
    signupFB,
    loginFB,
    loginCheckFB,
    logoutFB,
};

export { actionCreators };
