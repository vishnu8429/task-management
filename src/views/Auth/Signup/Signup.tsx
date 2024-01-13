import { Formik } from 'formik';
import * as Yup from 'yup';

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { routes, images } from '../../../core';
import { TextInput } from '../../../components';

/**
 * Signup view
 * 
 * @returns 
 */
const Signup = (): JSX.Element => {

    // min 6 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.
    const passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    // formik initial values
    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    };

    // formik validation schema
    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        lastName: Yup.string()
            .min(1, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        email: Yup.string()
            .email('Invalid email')
            .required('Required'),
        password: Yup.string()
            .matches(passwordRegExp, { message: "Please create a stronger password" })
            .required("Required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), ""], "Passwords must match")
            .required("Required"),
    });

    // do signup
    const _doSignup = (data: any) => {
        console.log('data', data);
        window.location.href = routes.login;
    };

    return (
        <Container
            component="main"
            maxWidth="xs"
            sx={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <CssBaseline />
            <Box
                sx={{
                    p: 5,
                    boxShadow: 2,
                    borderRadius: 3,
                    bgcolor: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar
                    src={images.logo}
                    sx={{ width: 56, height: 56, mb: "10px" }}
                    alt="logo"
                />
                <Typography component="h1" variant="h5">Signup</Typography>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            setSubmitting(false);
                            _doSignup(values);
                        }, 400);
                    }}
                >
                    {(formikProps) => (
                        <Box component="form" onSubmit={formikProps.handleSubmit} noValidate sx={{ mt: 1 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextInput
                                        name="firstName"
                                        label="First Name"
                                        error={formikProps.errors.firstName}
                                        value={formikProps.values.firstName}
                                        onChange={formikProps.setFieldValue}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextInput
                                        name="lastName"
                                        label="Last Name"
                                        error={formikProps.errors.lastName}
                                        value={formikProps.values.lastName}
                                        onChange={formikProps.setFieldValue}
                                    />
                                </Grid>
                            </Grid>
                            <TextInput
                                name="email"
                                label="Email"
                                error={formikProps.errors.email}
                                value={formikProps.values.email}
                                onChange={formikProps.setFieldValue}
                            />
                            <TextInput
                                type='password'
                                name="password"
                                label="Password"
                                error={formikProps.errors.password}
                                value={formikProps.values.password}
                                onChange={formikProps.setFieldValue}
                            />
                            <TextInput
                                type='password'
                                name="confirmPassword"
                                label="Confirm Password"
                                error={formikProps.errors.confirmPassword}
                                value={formikProps.values.confirmPassword}
                                onChange={formikProps.setFieldValue}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Signup
                            </Button>
                            <Box sx={{ textAlign: "center" }}>
                                <Link href={routes.login} variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Box>
                        </Box>
                    )}
                </Formik>
            </Box>
        </Container>
    );
}

export default Signup;