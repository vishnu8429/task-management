/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import UserHelper from '../../helpers/user.helper';
import { auth, images } from '../../core';
import { Layout, Loader, Breadcrumbs } from '../../components';

/**
 * Profile
 * 
 * @returns 
 */
const Profile = (): JSX.Element => {

    // handle loader
    const [isLoading, setLoading] = useState<boolean>(true);

    // active or logged user
    const [user, setUser] = useState<any>(null);

    // check user loggedin status
    useEffect(() => {
        onAuthStateChanged(auth, (user: any) => {
            if (user) {
                const uid = user.uid;
                if (uid !== null) {
                    setLoading(false);
                    setUser(user);
                    UserHelper.saveUser(user);
                } else {
                    setLoading(false);
                    UserHelper.deleteUser();
                    window.location.href = "/";
                }
            }
        });
    }, []);

    return (
        <Layout>
            {/* page header */}
            <Header title="My Profile" />

            {
                isLoading
                    ? <Loader />
                    : <Box
                        sx={{
                            p: '15px',
                            bgcolor: 'white',
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 5,
                        }}
                    >
                        <img
                            src={images.avatar}
                            alt="profile avatar"
                            loading="lazy"
                            width={'300px'}
                        />
                        <Box>
                            <Typography sx={{ fontSize: '20px', fontWeight: 'bold', textTransform: 'capitalize' }}>{user.displayName}</Typography>
                            <Typography>{user.email}</Typography>
                        </Box>
                    </Box>
            }
        </Layout>
    );
};

/**
 * Page header 
 * 
 * @param { title, onClick } 
 * @returns 
 */
const Header = ({ title }: any) => {
    return (
        <Box
            sx={{
                p: '15px',
                mb: 3,
                boxShadow: 2,
                borderRadius: 1,
                bgcolor: 'white',
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}>
            <Breadcrumbs title={title} />
        </Box>
    );
};

export default Profile;