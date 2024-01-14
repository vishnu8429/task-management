import { useState } from 'react';
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { addDoc, collection } from 'firebase/firestore';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
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

import { routes, images, auth } from '../../../core';
import { Loader, TextInput } from '../../../components';
import toastify from '../../../helpers/toastify';

/**
 * Signup view
 * 
 * @returns 
 */
const Signup = (): JSX.Element => {

    // min 6 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.
    const passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    // handle loader
    const [isLoading, setLoading] = useState<boolean>(false);

    // avatar
    // const [avatar, setAvatar] = useState<string>("");

    // State to store uploaded file
    // const [file, setFile] = useState<any><string>("");

    // handle upload progress
    // const [progress, setProgress] = useState<number>(0);

    // formik initial values
    const [initialValues, setInitialValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

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
            .matches(passwordRegExp, { message: "Create a password with a minimum of 6 characters, including at least 1 uppercase letter, 1 lowercase letter, and 1 numeric digit." })
            .required("Required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), ""], "Passwords must match")
            .required("Required"),
    });

    // Handle file upload event and update state
    // const _onChangeAvatar = (event: any) => {
    //     setFile(event.target.files[0]);
    // };

    // handle avatar upload
    // const onUploadAvatar = () => {
    //     if (!file) {
    //         alert("Please upload an avatar!");
    //     }

    //     const storageRef = ref(storage, `/files/${file.name}`);

    //     // progress can be paused and resumed. It also exposes progress updates.
    //     // Receives the storage reference and the file to upload.
    //     const uploadTask = uploadBytesResumable(storageRef, file);

    //     uploadTask.on("state_changed", (snapshot) => {
    //         const progress = Math.round(
    //             (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //         );

    //         // update progress
    //         setProgress(progress);
    //     }, (err) => console.log(err), () => {

    //         // download url
    //         getDownloadURL(uploadTask.snapshot.ref).then((url) => {
    //             console.log(url);
    //             setAvatar(url);
    //         });
    //     });
    // };

    // do signup
    const _doSignup = async (data: any) => {
        setLoading(true);

        // do create user with email and password
        await createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                setLoading(false);

                const user = userCredential.user;

                // update user profile by add displayName and photoURL
                updateProfile(user, {
                    displayName: `${data.firstName} ${data.lastName}`
                });

                toastify("Congratulations! Your account has been successfully created. Welcome aboard!", "SUCCESS");

                setInitialValues({
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                });

                setTimeout(() => {
                    window.location.href = routes.login;
                }, 2500);
            })
            .catch((error) => {
                setLoading(false);

                // handle error
                toastify("Oops! Something went wrong. Please try again", "ERROR");
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
                <Typography component="h1" variant="h5">Signup</Typography>
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
                                    _doSignup(values);
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
                                    <Grid container spacing={1}>
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
                                    {/* <div>
                                        <input type="file" onChange={_onChangeAvatar} accept="/image/*" />
                                        <button onClick={onUploadAvatar}>Upload Avatar</button>
                                        <p>{progress} "% done"</p>
                                    </div> */}
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
                                        fullWidth
                                        type="submit"
                                        variant="contained"
                                        sx={{
                                            mt: 3,
                                            mb: 2,
                                            p: 1
                                        }}
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
                }
            </Box>
        </Container>
    );
};

export default Signup;