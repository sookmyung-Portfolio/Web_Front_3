import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import CheckForm from './CheckForm';
import Profile from './Profile';
import DepComboBox from './DepComboBox';
import NumComboBox from './NumComboBox';
import TextField from "@mui/material/TextField";
import { Container } from '@mui/system';
import { Button } from '@mui/material';
import axios from 'axios';

function SignIn() {
  const [id, setId] = useState('');
  const [finalId, setFinalId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [finalPassword, setFinalPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [finalName, setFinalName] = useState('');
  const [number, setNumber] = useState('');
  const [major, setMajor] = useState('');


  const handleSubmitClick = (event) => {
    event.preventDefault();
   
    axios.post('http://localhost:5050/register',
      // 클라이언트에서 서버로 request(요청)하며 보내주는 데이터
      // 회원가입창에서 클라이언트가 입력하는 데이터
      {
        id: finalId,           
        password: finalPassword,  // 숫자, 영어 대문자, 소문자, 특수기호, 8-20자  1234567#Aaa
        name: userName,  // id개념, 한글이 아니라 영어로 보내기, 영어+숫자, 4-12글자 
        classof: number,           
        dept: major,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          // 'Accept': 'application/json',
        },
      })
      // 그러면 서버에서 클라이언트로 response(응답)으로 
      // {ok: true} 아니면 {ok: false}가 온다.
      // .then((response) => {
      //   console.log(response); // response.data로 해야?
      // })
      .then((result) => {
        console.log(result);
        console.log("signupDB!");
        window.alert('회원가입이 되었습니다! 로그인 해주세요.');
        <Link to="/login"/>
      })
      .catch((error) => {
        window.alert('회원가입이 정상적으로 되지 않았습니다.');
        console.log(error);
      })
  };

  const onIdCheckClick = (event) => {
    event.preventDefault();

    axios.post('http://localhost:5050/checkId',
      // 클라이언트에서 서버로 request(요청)하며 보내주는 데이터
      // 회원가입창에서 클라이언트가 입력하는 데이터
      {
        id: id,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          // 'Accept': 'application/json',
        },
      })
      // 그러면 서버에서 클라이언트로 response(응답)으로 
      // {ok: true} 아니면 {ok: false}가 온다.
      // .then((response) => {
      //   console.log(response); // response.data로 해야?
      // })
      .then((result) => {
        setFinalId(id);
        console.log(finalId, "finalId");
        console.log("id!!!");
        window.alert('사용할 수 있는 아이디입니다.');
        <Link to="/login"/>
      })
      .catch((error) => {
        window.alert('사용할 수 없는 아이디입니다.');
        console.log(error);
      })
  }

  const onPwCheckClick = (event) => {
    event.preventDefault();
    if(password !== confirmedPassword  && password!=="" && confirmedPassword!==""){
      alert('비밀번호가 일치하지 않습니다.');
    } else if(password===""){
      alert('비밀번호란이 공백입니다.');
    } else if(confirmedPassword===""){
      alert('비밀번호 확인란이 공백입니다.');
    }else{
      const finalPassword = confirmedPassword;
      //alert(finalPassword); 비밀번호 세팅 확인용
      setFinalPassword(finalPassword);
      alert('비밀번호가 일치합니다.');
    }
  }

  const onNameCheckClick = (event) => {
    event.preventDefault();
    const data = event.target.value;  
    console.log(data, "데이터");

    /* 이 아래는 작업용으로만 추가
    if(NameAuth(nickName)){
      setFinalName(nickName);
    } else {
      alert('사용할 수 없는 아이디입니다.');
    }*/

    axios.post('http://localhost:5050/checkUsername', {
      headers: { "Content-Type":  "application/json" },
      body: JSON.stringify(data),	// json화 해버리기
    })
    .then(function(response) {   //기존에는 response.data와 같은 형식으로 정보를 받아왔는데 만약 boolean값을 리턴한다면 어떤 항목?
      console.log(response.data , "닉네임 확인 값");
      if(response.data.success === true){   
        console.log("사용가능");
        alert("사용가능한 닉네임입니다");  //알람!
        setFinalName(data);
        console.log(data, "데이터");
        console.log(finalName, "최종 닉네임");
      }
      else{
        alert("다른 닉네임을 입력해주세요");
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  
  return (
    <>
     <Container>
        <div style={{ 
          display: 'flex', justifyContent: 'center', alignItems: 'center', 
          width: '100%', height: '5vh'
          }}>
          <form style={{ display: 'flex', flexDirection: 'column'}}>
            <h1>Sign In</h1>
            <div>
            <TextField
                required
                id="outlined-required"
                label="아이디"
                value={id}
                name={id}
                onChange={({ target: { value } }) => setId(value)}  ///아이디 중복확인 ok
                type="text"
                placeholder="아이디"
                minlength="2" maxlength="6" size="small"
              />
            &nbsp; <Button variant="outlined" value={id} onClick = {onIdCheckClick}>중복 확인</Button>
            </div>
            <br/>
            <div>
            <TextField
                required
                id="outlined-required"
                label="비밀번호"
                value={password}
                name={password}
                onChange={({ target: { value } }) => setPassword(value)}
                type="password"
                placeholder="비밀번호"
                minlength="6" maxlength="12" 
                size="small"
              />
            </div>
            <br/>
            <div>
            <TextField
                required
                id="outlined-required"
                label="비밀번호 입력확인"
                value={confirmedPassword}
                onChange={({ target: { value } }) => setConfirmedPassword(value)}    ///비밀번호 재확인 ok
                type="password"
                placeholder="비밀번호 입력확인"
                minlength="6" maxlength="12" 
                size="small"
              />
            &nbsp; <Button variant="outlined" value={confirmedPassword} onClick = {onPwCheckClick} >일치 확인</Button>
            </div>
            <br/>
            <div>
            <TextField
                required
                id="outlined-required"
                label="닉네임"
                value={userName}
                name={userName}
                onChange={({ target: { value } }) => setUserName(value)}  ///아이디 중복확인 ok
                type="text"
                placeholder="닉네임"
                minlength="2" maxlength="6" size="small"
              />
            &nbsp; <Button variant="outlined" value={userName} onClick = {onNameCheckClick}>중복 확인</Button>

            </div>
            <br/>
            <NumComboBox value={number}
              onChange={({ target: { value } }) => setNumber(value)}  //체크박스 오케이  >> 숫자만 입력 가능하게 해야 함
              />  
            <br/>
            <DepComboBox value={major}
              onChange={({ target: { value } }) => setMajor(value)} />
            <br/>
            <Button variant="contained" onClick={handleSubmitClick}>Sign In</Button>
          </form>
        </div>
      </Container>
    </>
  );
}

export default SignIn;