import React from "react";
import Post from "../components/Post";
import CommentList from "../components/CommentList";
import CommentWrite from "../components/CommentWrite";
import { Grid } from "../elements";
import { useSelector, useDispatch } from "react-redux";

const PostDetail = (props) => {
    const post_params = props.match.params.id;
    const post_list = useSelector((state) => state.post.list);
    const this_post_index = post_list.findIndex(
        (post) => post.id === post_params
    );

    const this_post = post_list[this_post_index];

    return (
        <Grid bg="#EFF6FF" height="90%">
            <Post {...this_post} is_me />
            <CommentWrite />
            <CommentList />
        </Grid>
    );
};

export default PostDetail;
