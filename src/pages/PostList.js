//PostList.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Post from "../components/Post";
import { Grid } from "../elements";
import { actionCreators as postActions } from "../redux/modules/post";

const PostList = (props) => {
    const dispatch = useDispatch();
    const post_list = useSelector((state) => state.post.list);
    const user_info = useSelector((state) => state.user.user);

    const { history } = props;

    React.useEffect(() => {
        //게시판 게시글이 0일 때만 게시글 가져오기
        // if (post_list.length === 0) {
        dispatch(postActions.getPostFB());
        // }
    }, []);

    return (
        <React.Fragment>
            <Grid bg="#EFF6FF" padding="40px 0px 0px">
                {post_list.map((post, index) => {
                    if (post.user_info.user_id === user_info?.uid) {
                        return (
                            <Grid
                                key={post.id}
                                onClick={() => {
                                    history.push(`/post/${post.id}`);
                                }}
                            >
                                <Post {...post} is_me />
                            </Grid>
                        );
                    } else {
                        return (
                            <Grid
                                key={post.id}
                                onClick={() => {
                                    history.push(`/post/${post.id}`);
                                }}
                            >
                                <Post {...post} />
                            </Grid>
                        );
                    }
                })}
            </Grid>
        </React.Fragment>
    );
};

export default PostList;
