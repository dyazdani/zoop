import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useLoginMutation } from "../features/api";

const LoginPage = () => {
  const [login, { isLoading, isError, data }] = useLoginMutation();

  const navigate = useNavigate();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({ email, password });
    navigate("/");
  };

  return (
    <Box 
      component="form"
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <Typography component="h2">Login</Typography>
      {isError && <Typography 
        paragraph={true}
      >
        {/*TODO: Change this to an alert*/}Oops, there was an error creating an account. Try again?
      </Typography>}

      <TextField
        label="Email"
        type="email"
        required
        onChange={e => setEmail(e.target.value)}
        value={email}
      />

      <TextField
        label="Password"
        type={showPassword ? "text" : "password"}
        required
        InputProps={{
          endAdornment:
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword((show) => !show)}
                onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault()}
              edge="end"
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon/>}
              </IconButton>
            </InputAdornment>
        }}
        onChange={e => setPassword(e.target.value)}
        value={password}
      />

      <Button 
        disabled={isLoading} 
        type="submit"
      >
        Login
      </Button>
    </Box>
  );
};

export default LoginPage;