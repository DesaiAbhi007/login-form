import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Box, Button, Stack, styled, Typography } from "@mui/material";
import LoginContainer from "../container/login.container";
import { ReactComponent as Abc } from "../assets/images/svg/rounded.svg";

const AuthForm = styled(Box)`
  background: linear-gradient(#ffffff 15%, #fffcd7 160%);
  border: 1px solid #000000;
  min-height: 350px;
  width: 100%;
  max-width: 350px;
  padding: 24px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
`;

const AuthWrapper = styled(Stack)`
  height: 100vh;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const OuterSvgAnimation = styled(Box)`
  position: absolute;
  left: -200px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto 12px;
  & svg {
    width: auto;
    height: 70vh;
    opacity: 0.2;
    fill: transparent;
    & path {
      stroke: red;
    }
  }
`;

const Login = () => {
  const { loginData, handleChange, handleSubmit, error } = LoginContainer();

  return (
    <AuthWrapper>
      <OuterSvgAnimation>
        <Abc />
      </OuterSvgAnimation>
      <AuthForm>
        <Typography component="h4" textAlign="center" color="primary" fontWeight={700} fontSize={24}>
          LOGIN
        </Typography>
        <Box m="auto">
          {loginData?.map((input, i) => {
            return (
              <TextField
                {...input}
                onChange={(e) => handleChange(e, input.pattern)}
                helperText={error[input?.name]}
                error={!!error[input?.name]}
                key={i}
              />
            );
          })}
        </Box>
        <Button variant="contained" color="secondary" fullWidth onClick={handleSubmit}>
          Submit
        </Button>
      </AuthForm>
    </AuthWrapper>
  );
};

export default Login;
