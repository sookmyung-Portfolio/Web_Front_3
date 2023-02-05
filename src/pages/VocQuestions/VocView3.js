import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './VocView3.css';
import { Link } from 'react-router-dom';
import { Container } from "@mui/material";
import Comments from '../Comments';

function GetData(Id) {
    const [question, setQuestion] = useState({});
    const [answer, setAnswer] = useState({});
    
    const [data, setData] = useState({});
    useEffect(() => {
      axios.get('http://localhost:4040/questions/'+Id).then((response)=> {
        setData(response.data);
        //console.log("ddddddd");
      })
    }, []);
    // 데이터를 가져올 때 id를 사용해서 가져와야 하는데 id에 대한 정보가 안불러와짐 ==> 성공
  
    
  
    const item =  (
          <>
              <h2 align="center">게시글 상세정보</h2>
              <div className="voc-view-wrapper">
                  <div className="voc-view-row">
                      <label>게시글 번호</label>
                      <label>{ data.num }</label>
                  </div>
                  <div className="voc-view-row">
                      <label>제목</label>
                      <label>{ data.title }</label>
                  </div>
                  <div className="voc-view-row">
                      <label>작성일</label>
                      <label>{ data.createAt }</label>
                  </div>
                  <div className="voc-view-row">
                      <label>내용</label>
                      <div>
                          {
                          data.content
                          }
                      </div>
                  </div>
                  <Comments />
              </div>
          </>
      );
  
      return item;
  }
  
  function VocView3() {
    const{vocId} = useParams();
    const item = GetData(vocId);
  
    return (<>
     <div style={{ 
              display: 'flex', justifyContent: 'center', alignItems: 'center', 
              width: '100%', height: '5vh',  
              }}>
          <Container maxWidth="sm">
              <div>
                  {item}
              </div>
          </Container>
      </div>
    </>);
  }
  
export default VocView3;