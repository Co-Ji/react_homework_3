import React from "react";
import styled from "styled-components";
import { Grid, Image, Text, Button, Line } from "../elements";
import { history } from "../redux/configureStore";
// import Grid from "../elements/Grid";
// import Image from "../elements/Image";
// import Text from "../elements/Text";
// 임포트할 컴포넌트가 많아 지저분할 때는 index.js에 넣어 한 번에 써줄 수 있다.

const Post = (props) => {
    return (
        <React.Fragment>
            <Grid padding="20px 0">
                <Grid is_flex>
                    <Post_info_grid style={{ justifyContent: "flex-start" }}>
                        <Image
                            shape="circle"
                            src={props.user_info.user_profile}
                        ></Image>
                        <Text bold>{props.user_info.user_name}</Text>
                    </Post_info_grid>
                    <Post_info_grid style={{ justifyContent: "flex-end" }}>
                        <Text>{props.insert_dayTime}</Text>
                        {props.is_me && ( //props에서 is_me 가 넘어온 경우에는 버튼 보여준다.
                            <Button
                                onClick={() => {
                                    history.push(`/write/${props.id}`);
                                }}
                                width="100px"
                                margin="5px"
                            >
                                <Text color="#fff">수정</Text>
                            </Button>
                        )}
                    </Post_info_grid>
                </Grid>
                <Grid padding="16px">
                    <Text>{props.contents}</Text>
                </Grid>
                <Grid>
                    <Image shape="rectangle" src={props.image_url}></Image>
                </Grid>
                <Grid padding="16px">
                    <Text bold>댓글 {props.comment_count}개</Text>
                </Grid>
                <Grid bg="black" width="100%" height="50px"></Grid>
            </Grid>
        </React.Fragment>
    );
};

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
    is_me: false,
};
//프롭스가 없어 오류가 나거나 화면이 깨지는 걸 방지

const Post_info_grid = styled.div`
    width: 100%;
    display: flex;
    padding: 10px;
`;

export default Post;
