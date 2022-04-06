// 로그인상태인지 아닌지 확인하는 컴포넌트

import React from "react";
//user정보를 보기 위해 useSelector 사용 (로그인 됐는지 확인)
import { useSelector } from "react-redux";
//세션 가지고 올 수 있도록 apikey 사용
import { apiKey } from "./firebase";

const Permit = (props) => {
    const is_login = useSelector((state) => state.user.user);
    const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
    const is_session = sessionStorage.getItem(_session_key) ? true : false;

    if (is_session && is_login) {
        return <React.Fragment>{props.children}</React.Fragment>;
    }

    return null;
};

export default Permit;
