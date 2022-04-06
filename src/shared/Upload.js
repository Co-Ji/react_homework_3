import React from "react";
import { Button } from "../elements";
import { storage } from "./firebase";
import { actionCreators as imageActions } from "../redux/modules/image";
import { useDispatch, useSelector } from "react-redux";

const Upload = (props) => {
    const dispatch = useDispatch();
    //useRef() 사용해서 파일가져오기
    const fileInput = React.useRef();

    const is_uploading = useSelector((state) => state.image.uploading);

    const selectFile = (e) => {
        // // 업로드할 파일 확인해보기(연습)
        // console.log(e);
        // console.log(e.target);
        // console.log(e.target.files[0]);
        // console.log(fileInput.current.files[0]); //ref로 가져온 값

        const reader = new FileReader(); //FileReader 파일읽기 객체
        console.log(reader);
        const file = fileInput.current.files[0];

        reader.readAsDataURL(file); // 선택한 파일객체를 읽는 내장함수 readAsDataURL()

        reader.onloadend = () => {
            // console.log(reader.result);
            dispatch(imageActions.setPreview(reader.result)); //결과를 디스패치
        };
    };

    const uploadFB = () => {
        let image = fileInput.current.files[0]; //ref로 접근한 파일객체를 쓴다.
        dispatch(imageActions.uploadImageFB(image));
    };
    return (
        <React.Fragment>
            <input
                type="file"
                ref={fileInput}
                disabled={is_uploading} //업로딩 중 버튼 선택 못하도록
                onChange={selectFile}
            />
            <Button onClick={uploadFB}>업로드하기</Button>
        </React.Fragment>
    );
};

export default Upload;
