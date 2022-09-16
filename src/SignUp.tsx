import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";

// React-hook-form
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { DevTool } from "@hookform/devtools";

let renderCount = 0;

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  password: Yup.string().required("Required")
});

interface IFormInput {
  firstName: string;
  lastName: string;
  password: string;
}

const defaultValues = {
  firstName: "",
  lastName: "",
  password: ""
};

export const SignUp = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors }
  } = useForm<IFormInput>({
    defaultValues: defaultValues,
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = (data: IFormInput) => {
    alert(JSON.stringify(data, null, 2));
  };
  const { onChange, onBlur } = register("firstName");
  renderCount++;
  console.log(watch("firstName")); // watch input value by passing the name of it
  return (
    <>
      <Typography
        component="h1"
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
              Sign Up
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                {...register("firstName")}
                id="firstName"
                name="firstName"
                label="First Name"
                margin="normal"
                type="text"
                fullWidth
                required
                onChange={onChange}
                onBlur={onBlur}
                error={errors ? Boolean(errors.firstName) : false}
                helperText={
                  errors.firstName?.type === "required" &&
                  "First name is required"
                }
              />

              <TextField
                {...register("lastName")}
                id="lastName"
                name="lastName"
                label="Last Name"
                type="lastName"
                margin="normal"
                fullWidth
                required
                error={errors ? Boolean(errors.lastName) : false}
                helperText={
                  errors.lastName?.type === "required" &&
                  "Last name is required"
                }
              />

              <TextField
                {...register("password", { required: true, maxLength: 20 })}
                margin="normal"
                fullWidth
                label="Password"
                type="password"
                id="password"
                required
                error={errors ? Boolean(errors.password) : false}
                helperText={
                  errors.lastName?.type === "required" &&
                  "Last name is required"
                }
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Button fullWidth onClick={() => reset()} variant={"outlined"}>
                Reset
              </Button>
            </form>
            <DevTool control={control} /> {/* set up the dev tool */}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
