import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";

// React-hook-form
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

let renderCount = 0;

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Required"),
  password: Yup.string().required("Required")
});

interface IFormInput {
  name: string;
  email: string;
  password: string;
  remember: boolean;
}

const defaultValues = {
  name: "",
  email: "",
  password: "",
  remember: false
};

export const LoginReactHook = () => {
  const { handleSubmit, control, reset } = useForm<IFormInput>({
    defaultValues: defaultValues,
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = (data: IFormInput) => {
    alert(JSON.stringify(data, null, 2));
  };

  renderCount++;

  return (
    <>
      <Typography
        variant="h6"
        align="right"
      >{`Render Count ${renderCount}`}</Typography>
      <Grid container sx={{ height: "50vh" }}>
        <Grid
          item
          xs={12}
          component={Paper}
          elevation={2}
          sx={{
            my: 10,
            mx: 18
          }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Controller
                name="email"
                control={control}
                rules={{ required: true }}
                render={({
                  field: { onChange, value, onBlur },
                  fieldState: { error },
                  formState
                }) => {
                  return (
                    <TextField
                      helperText={error ? error.message : null}
                      size="medium"
                      error={!!error}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      fullWidth
                      label="Email"
                      type="email"
                      required
                    />
                  );
                }}
              />

              <Controller
                name="password"
                control={control}
                rules={{ required: true }}
                render={({
                  field: { onChange, value, ref },
                  fieldState: { error }
                }) => {
                  return (
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      inputRef={ref}
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      onChange={onChange}
                      value={value}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  );
                }}
              />

              <FormControlLabel
                control={
                  <Checkbox name="remember" value="remember" color="primary" />
                }
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Button fullWidth onClick={() => reset()} variant={"outlined"}>
                Reset
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
