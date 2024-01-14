import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Formik } from 'formik';
import * as Yup from 'yup';

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { routes, images, auth } from '../../../core';
import { Loader, TextInput } from '../../../components';
import UserHelper from '../../../helpers/user.helper';
import toastify from '../../../helpers/toastify';

/**
 * Login view
 * 
 * @returns 
 */
const Login = (): JSX.Element => {

    const history = useHistory();

    // handle loader
    const [isLoading, setLoading] = useState<boolean>(false);

    // formik initial values
    const initialValues = {
        username: "",
        password: ""
    };

    // formik validation schema
    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Required'),
        password: Yup.string()
            .required('Required'),
    });

    // do login
    const _doLogin = (data: any) => {
        setLoading(true);
        signInWithEmailAndPassword(auth, data.username, data.password)
            .then((userCredential) => {
                setLoading(false);

                const user: any = userCredential.user;
                UserHelper.saveUser(user);

                // redirect to home screen
                history.push("/home");
            })
            .catch((error) => {
                setLoading(false);
                toastify("Invalid email or password", "ERROR");
            });
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
                <Typography component="h1" variant="h5">Login</Typography>
                {
                    isLoading
                        ? <Box sx={{ mt: 1, width: "350px" }}>
                            <Loader />
                        </Box>
                        : <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={(values, { setSubmitting }) => {
                                setTimeout(() => {
                                    setSubmitting(false);
                                    _doLogin(values);
                                }, 400);
                            }}
                        >
                            {(formikProps) => (
                                <Box
                                    noValidate
                                    sx={{ mt: 1 }}
                                    component="form"
                                    onSubmit={formikProps.handleSubmit}
                                >
                                    <TextInput
                                        name="username"
                                        label="Username"
                                        error={formikProps.errors.username}
                                        value={formikProps.values.username}
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
                                    <Button
                                        fullWidth
                                        type="submit"
                                        variant="contained"
                                        sx={{
                                            mt: 3,
                                            mb: 2,
                                            p: 1
                                        }}
                                    >
                                        Login
                                    </Button>
                                    <Box sx={{ textAlign: "center" }}>
                                        <Link href={routes.signup} variant="body2">
                                            Don't have an account? Sign Up
                                        </Link>
                                    </Box>
                                </Box>
                            )}
                        </Formik>
                }
            </Box>
        </Container>
    );
};

export default Login;