import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { routes, images } from '../../../core';
import { TextInput } from '../../../components';

/**
 * Login view
 * 
 * @returns 
 */
const Login = (): JSX.Element => {

    const history = useHistory();

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
        console.log('data', data);
        history.push("/home");
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
                <Formik
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
                        <Box component="form" onSubmit={formikProps.handleSubmit} noValidate sx={{ mt: 1 }}>
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
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
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
            </Box>
        </Container>
    );
}

export default Login;