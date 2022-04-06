import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore, storage } from "../../shared/firebase";
import moment from "moment";

import { actionCreators as imageActions } from "./image";

//액션타입
const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
//액션 크리에이터
const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (post_id, post) => ({
    post_id,
    post,
}));

//이니셜스테이트
const initialState = {
    list: [],
};
//게시글의 이니셜스테이트
const initialPost = {
    // id: 0,
    // user_info: {
    //     user_name: "sungji",
    //     user_profile:
    //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYZVzUjqsQPvHUvFlT0JmYv0p-Cs0zRtLzZQ&usqp=CAU",
    // },
    image_url:
        "https://firebasestorage.googleapis.com/v0/b/react-homework1.appspot.com/o/images%2FIMG_0024.JPEG?alt=media&token=919b84ee-c46e-47e9-9be4-03e571cd7ab8",
    contents: "",
    comment_count: 0,
    insert_dayTime: moment().format("YYYY-MM-DD hh:mm:ss"), //모멘트패키지 내장함수
};

//미들웨어

//(contents='')인수 들어오는거 언제 배운건지 모르겠음 찾아보기
const addPostFB = (contents = "") => {
    return function (dispatch, getState, { history }) {
        const postDB = firestore.collection("post");
        const _user = getState().user.user; //스토어에서 유저정보가져오기
        const user_info = {
            user_name: _user.user_name,
            user_id: _user.uid,
            user_profile: _user.user_profile,
        };

        const _post = {
            ...initialPost, //이건뭐지? 이니셜 포스트 여기에 왜 넣어주는거지?
            contents: contents,
            insert_dayTime: moment().format("YYYY-MM-DD hh:mm:ss"),
        };
        //===========이미지 가져오는 과정 ============
        const _image = getState().image.preview;
        console.log(_image);
        console.log(typeof _image); //데이터url의 값은 스트링으로 나온다.

        const _upload = storage
            .ref(`images/${user_info.user_id}_${new Date().getTime()}`)
            .putString(_image, "data_url");
        //업로드: ref로 파일이름을 가져오고(파일이름은 유저+시간), putString에 파일내용과 타입을 적는다.(파이어베이스 공식문서 참고)
        _upload.then((snapshot) => {
            snapshot.ref
                .getDownloadURL()
                .then((url) => {
                    // console.log(url);

                    return url;
                })
                //===========================================
                .then((url) => {
                    //왜 계속 let을 쓰는걸까?
                    postDB
                        .add({ ...user_info, ..._post, image_url: url })
                        .then((document) => {
                            let post = {
                                user_info,
                                ..._post,
                                id: document.id,
                                image_url: url,
                            };
                            dispatch(addPost(post));
                            history.replace("/");

                            dispatch(imageActions.setPreview(null)); //게시글 작성 후 미리보기 초기화
                        })
                        .catch((error) => {
                            window.alert("포스트 작성 중 문제가 발생했습니다!");
                            console.log("post 작성실패 에러", error);
                            // 게시글을 파이어스토어에 저장하는 중 발생하는 오류
                        });
                })
                .catch((error) => {
                    window.alert("이미지 업로드 중 문제가 발생했습니다!");
                    console.log("이미지 업로드 에러", error);
                    // 이미지 업로드 중 발생하는 오류
                });
        });
    };
};

const getPostFB = () => {
    return function (dispatch, getState, { history }) {
        const postDB = firestore.collection("post");

        postDB.get().then((documents) => {
            let post_list = [];
            documents.forEach((document) => {
                let _post = {
                    id: document.id,
                    ...document.data(),
                };
                let post = {
                    id: document.id,
                    user_info: {
                        user_name: _post.user_name,
                        user_profile: _post.user_profile,
                        user_id: _post.user_id,
                    },
                    image_url: _post.image_url,
                    contents: _post.contents,
                    comment_count: _post.comment_count,
                    insert_dayTime: _post.insert_dayTime,
                };
                post_list.push(post);
            });

            dispatch(setPost(post_list));
        });
    };
};

//(기본값)은 오류를 방지하기 위함(찾아보기)
const editPostFB = (post_id = null, post = {}) => {
    return function (dispatch, getState, { history }) {
        console.log(post_id);
        if (!post_id) {
            console.log("수정할 게시물 정보가 없음");
            return;
        }
        const _image = getState().image.preview;

        const _post_index = getState().post.list.findIndex(
            (post) => post.id === post_id
        );
        const _post = getState().post.list[_post_index];

        console.log(_post);

        const postDB = firestore.collection("post");
        //======글만 수정하는 경우
        if (_image === _post.image_url) {
            postDB
                .doc(post_id)
                .update(post)
                .then((doc) => {
                    dispatch(editPost(post_id, { ...post }));
                    history.replace("/");
                });
            // ======글, 사진 모두 수정하는 경우
        } else {
            const user_id = getState().user.user.uid;
            const _upload = storage
                .ref(`images/${user_id}_${new Date().getTime()}`)
                .putString(_image, "data_url");
            //업로드: ref로 파일이름을 가져오고(파일이름은 유저+시간), putString에 파일내용과 타입을 적는다.(파이어베이스 공식문서 참고)
            _upload.then((snapshot) => {
                snapshot.ref
                    .getDownloadURL()
                    .then((url) => {
                        // console.log(url);

                        return url;
                    })
                    //===========================================
                    .then((url) => {
                        postDB
                            .doc(post_id)
                            .update({ ...post, image_url: url })
                            .then((doc) => {
                                dispatch(
                                    editPost(post_id, {
                                        ...post,
                                        image_url: url,
                                    })
                                );
                                history.replace("/");
                            });
                    })
                    .catch((error) => {
                        window.alert("이미지 업로드 중 문제가 발생했습니다!");
                        console.log("이미지 업로드 에러", error);
                        // 이미지 업로드 중 발생하는 오류
                    });
            });
        }
    };
};

//리듀서(임머사용)
export default handleActions(
    {
        [SET_POST]: (state, action) =>
            produce(state, (draft) => {
                draft.list = action.payload.post_list;
            }),

        [ADD_POST]: (state, action) =>
            produce(state, (draft) => {
                draft.list.unshift(action.payload.post); //최신게시글부터 보여야 하니 unshift(배열앞에 추가)
            }),

        [EDIT_POST]: (state, action) =>
            produce(state, (draft) => {
                //인덱스로 수정할 포스트 찾기
                //근데 왜 인덱스로 찾지? 포스트 아이디로 찾으면 안되나?
                let index = draft.list.findIndex(
                    (post) => post.id === action.payload.post_id
                );
                console.log("draft.list가 뭐지????", draft.list);
                draft.list[index] = {
                    ...draft.list[index],
                    ...action.payload.post,
                };
                console.log("draft.list가 뭐지????", draft.list[index]);
            }),
    },
    initialState
);
//익스포트
const actionCreators = {
    setPost,
    addPost,
    editPost,
    getPostFB,
    addPostFB,
    editPostFB,
};

export { actionCreators };
