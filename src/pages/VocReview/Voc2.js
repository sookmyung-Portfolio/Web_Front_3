import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import CommonTable from '../CommonTable';
import CommonTableColumn from '../CommonTableColumn';
import CommonTableRow from '../CommonTableRow';
import VocHeader2 from './VocHeader2';
import { Container } from "@mui/material";

function GetData() {
  const [data, setData] = useState({});
  const [num, setNum] = useState(1);
  useEffect(() => {
    axios.get('http://localhost:4040/reviews').then((response)=> {
      setData(response.data);
    })
  }, []);

  const item = (Object.values(data)).map((item) => (
    <CommonTableRow key={item.id}>
      <CommonTableColumn>{item.num}</CommonTableColumn>
      <CommonTableColumn>
        <Link to={`/voc2/${item._id}`}>
            {item.title}
        </Link>
      </CommonTableColumn>
      <CommonTableColumn>{item.createAt}</CommonTableColumn>
      <CommonTableColumn>{item.username}</CommonTableColumn>
    </CommonTableRow>
  ));
  // 문제: createAt값이 넘어오지 않음, 글번호란(첫번째 열)에 모든 정보가 적용됨  NaN
  console.log(item);
  return item;
}

function Voc2() {
  const item = GetData();

  return (<>
    <Container maxWidth="sm">
        <div>
            <VocHeader2></VocHeader2>
        </div>
        <CommonTable headersName={['글번호', '제목', '등록일', '작성자']}> 
          {item}
        </CommonTable>
    </Container>
  </>);
}
  
export default Voc2;