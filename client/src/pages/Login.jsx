import Navbar from "../components/Navbar";
import Footer from '../components/Footer';
import styled, { createGlobalStyle } from 'styled-components';

import { Fragment, useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { useDispatch } from "react-redux";
import { login } from "../redux/apiCalls";

import {
  GlobalStyles,
  Head,
  Text,
  Span,
  Link,
  Input,
  Form,
  Container,
  FormContainer,
  SocialContainer,
  Button,
  OverlayContainer,
  OverlayPanel,
  Overlay
} from "../components/loginstyle";

// const GlobalStyle = createGlobalStyle`
//   body {
//     margin: 0;
//     font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif;
//     background-color: #f5f5f5;
//   }
// `;

// const Container = styled.div`
//   width: 100%;
//   height: 80vh;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background-color: whitesmoke;
//   overflow: hidden;
// `;

// const Wrapper = styled.div`
//   width: 65%;
//   height: 100%;
//   padding: 30px;
//   align-items: center;
//   justify-content: center;
//   background-color: #ffffff;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   border-radius: 10px;
// `;

// const HeroTitle = styled.h1`
//   font-size: 36px;
//   font-weight: 700;
//   text-align: center;
//   margin-top: 50px;
//   margin-bottom: 20px;
//   color: #333;
//   font-family: Fira Sans;
// `;


// const Form = styled.form`
//   margin: 10px;
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: center;
// `;

// const Input = styled.input`
//   flex: 1;
//   margin: 20px 10px 0px 0px;
//   padding: 12px;
//   border: 1px solid #ddd;
//   border-radius: 4px;
//   transition: all 0.3s ease;

//   &:focus {
//     outline: none;
//     border-color: teal;
//     box-shadow: 0 0 8px rgba(0, 128, 128, 0.2);
//   }
// `;

// const Button = styled.button`
//   min-width: 40%;
//   border: none;
//   border-radius: 25px;
//   margin: 20px 10px 0px 0px;
//   padding: 12px 20px;
//   background-color: teal;
//   color: white;
//   font-weight: 600;
//   cursor: pointer;
//   transition: background-color 0.3s ease, box-shadow 0.3s ease;

//   &:hover {
//     background-color: darkcyan;
//     box-shadow: 0 4px 12px rgba(0, 128, 128, 0.4);
//   }
// `;

// const FormWrapper = styled.div`
//   width: 40%;
//   margin: auto;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   flex-wrap: wrap;
//   border: 1px solid #ddd;
//   border-radius: 10px;
//   padding: 20px;
//   background-color: #f9f9f9;
// `;

// const Link = styled.a`
//   display: block;
//   width: 100%;
//   text-align: center;
//   margin: 20px 0px;
//   font-size: 16px;
//   font-weight: 600;
//   text-decoration: none;
//   color: teal;
//   transition: color 0.3s ease, text-decoration 0.3s ease;

//   &:hover {
//     color: darkcyan;
//     text-decoration: underline;
//   }
// `;



// const Register = () => {
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [pass, setPass] = useState("");

//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     const registered = {
//       firstname: name,
//       lastname: lastName,
//       email: email,
//       password: pass,
//     };
//     console.log(registered);
//     axios.post("http://localhost:5000/users/", registered).then((response) => {
//       console.log(response.status);
//       console.log(response.data);
//     });

//     navigate("/login");
//   };

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [panelActive, setPanelActive] = useState(false);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [pass, setPass] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSignInEvent = () => {
    setPanelActive(false);
  };

  const onSignUpEvent = () => {
    setPanelActive(true);
  };

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
      alert("Something went wrong");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const registered = {
      firstname: name,
      lastname: lastName,
      email: email,
      password: pass,
    };
    console.log(registered);
    axios.post("http://localhost:5000/users/", registered).then((response) => {
      console.log(response.status);
      console.log(response.data);
      setPanelActive(false);
    });
  };

  return (
    <>
      <GlobalStyles />
      <Container
        id="container"
        className={`${panelActive ? "right-panel-active" : ""}`}
      >
        <FormContainer className="sign-up-container">
          <Form onSubmit={handleRegister}>
            <Head>Create Account</Head>
            <SocialContainer>
              <Link href="#" className="social">
                <i className="fab fa-google-plus-g">
                  <img src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000" width="30px" />
                </i>
              </Link>
              <Link href="#" className="social">
                <i className="fab fa-linkedin-in">
                  <img src="https://img.icons8.com/?size=100&id=13930&format=png&color=000000" width="30px" />
                </i>
              </Link>
            </SocialContainer>
            <Span>or use your email for registration</Span>
            <Input placeholder="Email (username)" type="email" onChange={(e) => setEmail(e.target.value)} required />
            <Input placeholder="First Name" type="text" onChange={(e) => setName(e.target.value)} required />
            <Input placeholder="Last Name" type="text" onChange={(e) => setLastName(e.target.value)} required />
            <Input placeholder="Password" type="password" onChange={(e) => setPass(e.target.value)} required />
            <Button type="submit">Sign Up</Button>
          </Form>
        </FormContainer>
        <FormContainer className="sign-in-container">
          <Form onSubmit={handleLogin}>
            <Head>Sign In</Head>
            <SocialContainer>
              <Link href="#" className="social">
                <i className="fab fa-google-plus-g">
                  <img src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000" width="30px" /></i>
              </Link>
              <Link href="#" className="social">
                <i className="fab fa-linkedin-in">
                  <img src="https://img.icons8.com/?size=100&id=13930&format=png&color=000000" width="30px" /></i>
              </Link>
            </SocialContainer>
            <Span>or use your account</Span>
            <Input placeholder="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required />
            <Input placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required />
            <Link href="#">Forgot your password?</Link>
            <Button type="submit">Sign In</Button>
          </Form>
        </FormContainer>
        <OverlayContainer>
          <Overlay>
            <OverlayPanel className="overlay-left">
              <Head>Welcome Back!</Head>
              <Text>
                To keep connected with us please login with your personal info
              </Text>
              <Button className="ghost" id="signIn" onClick={onSignInEvent}>
                Sign In
              </Button>
            </OverlayPanel>
            <OverlayPanel className="overlay-right">
              <Head>Hello, Friend!</Head>
              <Text>Enter your personal details and start journey with us</Text>
              <Button className="ghost" id="signUp" onClick={onSignUpEvent}>
                Sign Up
              </Button>
            </OverlayPanel>
          </Overlay>
        </OverlayContainer>
      </Container>

    </>
  );
};

export default Login;
