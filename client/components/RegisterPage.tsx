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
import { useRegisterMutation } from "../features/api";

const RegisterPage = () => {
  const [register, { isLoading, isError, data}] = useRegisterMutation();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === confirmPassword) {
      register({ email, username, password });
      navigate("/")
    } else {
      //TODO (GitHub Issue #69): Change this to a React error that is displayed in the UI
      alert("Password confirmation does not match");
    }
  };

  return (
      <Box 
        component="form"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <Typography component="h2">Register</Typography>
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
          label="Username"
          type="text"
          required
          onChange={e => setUsername(e.target.value)}
          value={username}
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

        <TextField
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          required
          InputProps={{
            endAdornment:
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle confirm password visibility"
                  onClick={() => setShowConfirmPassword((show) => !show)}
                  onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault()}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon/>}
                </IconButton>
              </InputAdornment>
          }}
          onChange={e => setConfirmPassword(e.target.value)}
          value={confirmPassword}
        />

        <Button 
          disabled={isLoading} 
          type="submit"
        >
          Register
        </Button>
      </Box>
  );
};

export default RegisterPage;