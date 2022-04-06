import React from "react";
import { Grid, Text, Button, Image, Inputs } from "../elements";
import Upload from "../shared/Upload";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as imageActions } from "../redux/modules/image";

const PostWrite = (props) => {
    const dispatch = useDispatch();
    const is_login = useSelector((state) => state.user.is_login); //로그인상태인지 쿠키 확인
    const preview = useSelector((state) => state.image.preview);
    const post_list = useSelector((state) => state.post.list);

    // console.log(props.match.params.id); // url파라미터로 비교해서 수정할 페이지 / 작성페이지 나누기

    const post_params_id = props.match.params.id;
    const is_edit = post_params_id ? true : false; //파라미터 true면(있으면) 수정 / false면 작성

    const { history } = props; //APP.js 에 있기 때문에 이렇게 가져올 수 있다.(찾아볼것)

    let for_edit_post = is_edit
        ? post_list.find((post) => post.id === post_params_id)
        : null;

    React.useEffect(() => {
        if (is_edit && !for_edit_post) {
            window.alert("새로고침 시 뒤로 돌아갑니다.");
            history.goBack();

            return;
            //새로고침 시 리덕스 데이터가 사라져서 파라미터가 없어지는 경우 뒤로가기
        }
        //is_edit이 false 나오는 경우는? 파라미터가 없는 경우
        if (is_edit) {
            dispatch(imageActions.setPreview(for_edit_post.image_url));
        }
    });

    const [contents, setContents] = React.useState(
        for_edit_post ? for_edit_post.contents : ""
    );

    const changeContents = (e) => {
        setContents(e.target.value);
    };

    const addPost = () => {
        dispatch(postActions.addPostFB(contents));
    };

    const editPost = () => {
        dispatch(
            postActions.editPostFB(post_params_id, { contents: contents })
        );
    };

    if (!is_login) {
        return (
            <Grid margin="100px 0px" padding="16px" center>
                <Text size="20px">로그인 후 글을 작성해 주세요!</Text>
                <Button
                    onClick={() => {
                        history.replace("/login");
                    }}
                >
                    <Text color="#fff">로그인 하러 가기</Text>
                </Button>
            </Grid>
        );
    }
    return (
        <React.Fragment>
            <Grid padding="16px">
                <Text margin="0px" size="36px" bold>
                    {is_edit ? "게시글 수정" : "게시글 작성"}
                </Text>
                <Upload />
            </Grid>

            <Grid>
                <Grid padding="16px">
                    <Text margin="0px" size="24px" bold>
                        미리보기
                    </Text>
                </Grid>

                <Image
                    shape="rectangle"
                    src={
                        preview
                            ? preview
                            : "https://firebasestorage.googleapis.com/v0/b/react-homework1.appspot.com/o/images%2Fno_image_.jpg?alt=media&token=b0a9ef0b-215a-4bb7-ac5b-a89a9c5b1c55"
                    }
                />
            </Grid>

            <Grid padding="16px">
                <Inputs
                    value={contents}
                    onChange={changeContents}
                    label="게시글 내용"
                    placeholder="게시글 작성"
                    multiLine
                />
            </Grid>

            <Grid padding="16px">
                <Button
                    onClick={
                        is_edit
                            ? () => {
                                  editPost();
                              }
                            : () => {
                                  addPost();
                              }
                    }
                >
                    <Text color="#fff" size="20px">
                        {is_edit ? "게시글 수정" : "게시글 작성"}
                    </Text>
                </Button>
            </Grid>
        </React.Fragment>
    );
};

export default PostWrite;
