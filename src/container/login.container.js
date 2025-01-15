import { useState } from "react";
import validation from "../utils/validation";
import { useNavigate } from "react-router-dom";

const LoginContainer = () => {
  const [first, setFirst] = useState({});
  const [error, setError] = useState({});
  const navigate = useNavigate()
  const handleChange = (e,pattern) => {
    const { name, value } = e.target;
    setError((prev) =>( {...prev,[name]: validation(name,pattern, value)}));
    setFirst((prev) => ({ ...prev, [name]: value }));
  };
  

  const handleSubmit = async(e) => {
      e.preventDefault();   
      const response = await fetch("http://localhost:3000/dashboard", {
        method: "POST",
        body: JSON.stringify({...first})
      });
      
      if(response.status === 201) {
        console.log("welcome to dashboard");
      }
      navigate('/dashboard');
  };

  const loginData = [
    {
      type: "email",
      label: "Email",
      variant: "outlined",
      fullWidth: true,
      name: "email",
      pattern: 'checkEmail',
      value: first?.email || "",
      sx: { marginBottom: 2 },
    },
    {
      type: "password",
      label: "Password",
      variant: "outlined",
      fullWidth: true,
      name: "password",
      pattern: 'notEmpty',
      value: first?.password || "",
      sx: { marginBottom: 2 },
    },
  ];

  return {
    first,
    handleChange,
    loginData,
    handleSubmit,
    error
  };
};

export default LoginContainer;
