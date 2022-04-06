import { createAction, handleActions } from "redux-actions";
import produce from "immer";

import { storage } from "../../shared/firebase";

//액션타입
const UPLOADING = "UPLOADING";
const UPLOAD_IMAGE = "UPLOAD_IMAGE";
const SET_PREVIEW = "SET_PREVIEW";
//액션생성
const uploading = createAction(UPLOADING, (uploading) => ({ uploading }));
const uploadImage = createAction(UPLOAD_IMAGE, (image_url) => ({ image_url }));
const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));
//이니셜스테이트
//이니셜스테이트는 왜 필요할까?
const initialState = {
    image_url: "",
    uploading: false, //처음에는 업로딩상태가 아니니 false
    preview: null,
};

//미들웨어
//Upload.js에서 이미지ref를 가져와서 파이어스토리지에 넘기기
const uploadImageFB = (image) => {
    return function (dispatch, getState, { history }) {
        dispatch(uploading(true)); //업로드 중 임을 표시하기 위한 함수 (리듀서로 가 스토어의 uploading: true 가 된다. )

        const _upload = storage.ref(`images/${image.name}`).put(image); //업로드하는 과정: 참조를 만든 후, put()을 사용해 파일 업로드
        //업로드 후(then) url을 다시 가져온다.
        _upload.then((snapshot) => {
            // dispatch(uploading(false)) // 업로딩이 끝나는 시점은 이곳이지만,
            // 업로딩을 false로 바꾸는 동시에 이미지 url을 스토어에 저장하기 때문에 한번에 dispatch한다.

            snapshot.ref.getDownloadURL().then((url) => {
                dispatch(uploadImage(url));
            });
        });
    };
};

//리듀서
export default handleActions(
    {
        [UPLOAD_IMAGE]: (state, action) =>
            produce(state, (draft) => {
                draft.image_url = action.payload.image_url;
                draft.uploading = false; //한 번에 디스패치
            }),

        [UPLOADING]: (state, action) =>
            produce(state, (draft) => {
                draft.uploading = action.payload.uploading;
            }),

        [SET_PREVIEW]: (state, action) =>
            produce(state, (draft) => {
                console.log(action.payload.preview);
                draft.preview = action.payload.preview;
            }),
    },
    initialState
);

//익스포트
const actionCreators = {
    uploadImage,
    uploadImageFB,
    setPreview,
};

export { actionCreators };
