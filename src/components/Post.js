import React from "react";
import { Grid, Image, Text } from "../elements";
// import Grid from "../elements/Grid";
// import Image from "../elements/Image";
// import Text from "../elements/Text";
// 임포트할 컴포넌트가 많아 지저분할 때는 index.js에 넣어 한 번에 써줄 수 있다.

const Post = (props) => {
    return (
        <React.Fragment>
            <Grid>
                <Grid is_flex>
                    <Image shape="circle" src={props.src}></Image>
                    <Text bold>{props.user_info.user_name}</Text>
                    <Text>{props.insert_dt}</Text>
                </Grid>
                <Grid padding="16px">
                    <Text>{props.contents}</Text>
                </Grid>
                <Grid>
                    <Image shape="rectangle" src={props.src}></Image>
                </Grid>
                <Grid padding="16px">
                    <Text bold>댓글 {props.comment_cnt}개</Text>
                </Grid>
            </Grid>
            <div>user profile / user name / insert_dt / is_me (edit )</div>
            <div>contents</div>
            <div>image</div>
            <div>comment cnt</div>
        </React.Fragment>
    );
};
//is_flex는 무엇일까?

Post.defaultProps = {
    user_info: {
        user_name: "sungji",
        user_profile:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYZVzUjqsQPvHUvFlT0JmYv0p-Cs0zRtLzZQ&usqp=CAU",
    },
    image_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMgZt64WY0GeQIy7AsPI7gOgfskaNRFM6ZbA&usqp=CAU",
    contents: "뽀식이네요!",
    comment_cnt: 10,
    insert_dt: "2022-04-01 23:00:00",
};
//프롭스가 없어 오류가 나거나 화면이 깨지는 걸 방지

export default Post;
