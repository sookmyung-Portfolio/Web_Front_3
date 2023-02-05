import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from 'axios';
import { Button } from '@mui/material';
import './Comments.css';

const CommentWrapper = styled.div`
  border: 1px solid black;
  p{
    margin: 0;
  }
`;

const UserInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eeeeee;
`;


const Comments = (postId) => {
  const [input, setInput] = useState();
  const [comments, setComments] = useState([]);
  const [data, setData] = useState({});


  useEffect(() => {
    axios.get(`http://localhost:4040/questions/comments?postId=${postId}`).then((response)=> {
        setData(response.data);
    })
  }, []);

  const onChange = (e) => {
    setInput(e.target.value);
  };

  const addComment = () => { // 코멘트 추가
    setComments(
      comments.concat({
        id: comments.length + 1,
        content: input,
        //userName: userData[0].id,
      })
    );
    setInput("");
  };

  const removeComment = (id) => { // 코멘트 삭제
    return setComments(comments.filter((comment) => comment.id !== id));
  };

  const chagneContent = (id, inputWord) => { // 코멘트 수정
    return setComments(comments.map((comment) => {
      if (comment.id === id) {
        return {
          ...comment,
          content: inputWord,
        };
      }
      return comment;
    }));
  };

  return (
    <div className>
      <input value={input} onChange={onChange}></input>
      <Button variant="contained"
        onClick={() => {
          addComment(input);
          setInput("");
        }}
      >
        댓글달기
      </Button>
      <div className="comments-body">
       {comments.map((comment, index) => (
         <CommentWrapper key={`${comment.userName}_${index}`}  className="comments-comment">
           <UserInfoWrapper>
             <p>{comment.userName}</p>
             {comment.content}
             <button onClick={() => removeComment(comment.id)}>삭제</button>
             <button onClick={() => chagneContent(comment.id, input)}>
               수정
             </button>
           </UserInfoWrapper>
          
        </CommentWrapper>
      ))}
      </div>
    </div>
  );
};

export default Comments;