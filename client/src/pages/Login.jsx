import Navbar from "../components/Navbar";
import Footer from '../components/Footer';
import styled, { createGlobalStyle } from 'styled-components';

import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { useDispatch } from "react-redux";
import { login } from "../redux/apiCalls";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif;
    background-color: #f5f5f5;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: whitesmoke;
  overflow: hidden;
`;

const Wrapper = styled.div`
  width: 65%;
  height: 100%;
  padding: 30px;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const HeroTitle = styled.h1`
  font-size: 36px;
  font-weight: 700;
  text-align: center;
  margin-top: 50px;
  margin-bottom: 20px;
  color: #333;
  font-family: Fira Sans;
`;


const Form = styled.form`
  margin: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Input = styled.input`
  flex: 1;
  margin: 20px 10px 0px 0px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: teal;
    box-shadow: 0 0 8px rgba(0, 128, 128, 0.2);
  }
`;

const Button = styled.button`
  min-width: 40%;
  border: none;
  border-radius: 25px;
  margin: 20px 10px 0px 0px;
  padding: 12px 20px;
  background-color: teal;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: darkcyan;
    box-shadow: 0 4px 12px rgba(0, 128, 128, 0.4);
  }
`;

const FormWrapper = styled.div`
  width: 40%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  background-color: #f9f9f9;
`;

const Link = styled.a`
  display: block;
  width: 100%;
  text-align: center;
  margin: 20px 0px;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  color: teal;
  transition: color 0.3s ease, text-decoration 0.3s ease;

  &:hover {
    color: darkcyan;
    text-decoration: underline;
  }
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    const userCheck = {
      email: email,
      password: password,
    };
    try {
      axios.post("http://localhost:5000/users/login", userCheck).then((response) => {
        console.log(response.status);
        console.log(response.data);
        login(dispatch, { email, password });
        console.log("data suc");
        navigate("/dashboard");
      });
    } catch {
      alert("yanlış kullanıcı ismi ve/veya şifre");
    }
  };

  return (
    <>
      <GlobalStyle />
      <Navbar />
      <Container>
        <Wrapper>
          <HeroTitle>Login</HeroTitle>
          <FormWrapper>
            <Form onSubmit={handleLogin}>
              <Input
                placeholder="Email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button type="submit">Login</Button>
              <Link href="/register">Create a new account</Link>
            </Form>
          </FormWrapper>
        </Wrapper>
      </Container>
      <Footer />
    </>
  );
};

export default Login;
