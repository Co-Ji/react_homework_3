import "./App.css";
import React from "react";

//리덕스에서 쓴 히스토리와 app.js 도 연결해줘야 한다.
import { BrowserRouter, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";

import PostList from "../pages/PostList";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PostWrite from "../pages/PostWrite";
import PostDetail from "../pages/PostDetail";

import Header from "./Header";
import { Grid, Button } from "../elements";
import Permit from "./Permit";

import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { apiKey } from "./firebase";

function App() {
    //로그인 유지를 위한 함수 (단어장만들기 때 road생각해보기)
    const dispatch = useDispatch();
    //세션이 있는지 확인
    const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
    const is_session = sessionStorage.getItem(_session_key) ? true : false;

    React.useEffect(() => {
        if (is_session) {
            dispatch(userActions.loginCheckFB());
        }
    }, []);

    return (
        <div style={{ background: "black" }}>
            <ConnectedRouter history={history}>
                <Grid width="50vw" margin="0 auto">
                    <Header></Header>

                    {/* <ConnectedRouter history={history}> */}
                    <Route path="/" exact component={PostList}></Route>
                    <Route path="/login" exact component={Login}></Route>
                    <Route path="/signup" exact component={Signup}></Route>
                    <Route path="/write" exact component={PostWrite}></Route>
                    <Route
                        path="/write/:id"
                        exact
                        component={PostWrite}
                    ></Route>
                    <Route
                        path="/post/:id"
                        exact
                        component={PostDetail}
                    ></Route>
                    {/* <Route patch="/Search" exact component={Search} /> */}
                    {/* </ConnectedRouter> */}
                </Grid>
                <Permit>
                    <Button
                        is_float
                        text="+"
                        onClick={() => {
                            history.push("/write");
                        }}
                    ></Button>
                </Permit>
            </ConnectedRouter>
        </div>
    );
}

export default App;
