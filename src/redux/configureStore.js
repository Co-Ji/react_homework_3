import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
//createBrowserHistory는 뭐지? connectRouter는 뭐지?
import { connectRouter } from "connected-react-router";

import User from "./modules/user";

//히스토리를 리덕스에서 사용하기 위해 export
export const history = createBrowserHistory();

const rootReducer = combineReducers({
    user: User, //리듀서?
    router: connectRouter(history), //히스토리를 리듀서와 묶어준다.
});

//액션 실행 후 리듀서로 가기 전 중간에 해야 할 작업을 할 수 있도록 미들웨어를 만든다.
//여기서 히스토리를 사용할 수 있도록 히스토리를 넘겨준다.
const middlewares = [thunk.withExtraArgument({ history: history })];

// 지금이 어느 환경인 지 알려줘요. (개발환경, 프로덕션(배포)환경 ...)
const env = process.env.NODE_ENV;

// env가 개발환경 일 때 로거라는 걸 하나만 더 써볼게요.
// if문안에서만 쓰기 위해 require로 가져온다.
if (env === "development") {
    const { logger } = require("redux-logger");
    middlewares.push(logger);
}

//redux decTools를 설정한다.
const composeEnhancers =
    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ // 윈도우가 브라우저일 때 && 데브툴즈가 설치되어 있는 경우
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
              // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
          })
        : compose;

//미들웨어를 묶는다.
const enhancer = composeEnhancers(applyMiddleware(...middlewares));

//리듀서와 미들웨어를 묶어 스토어 만든다.
let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();
