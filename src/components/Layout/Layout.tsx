import { signOut } from 'firebase/auth';

import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import { auth, images } from '../../core';
import { useEffect, useState } from 'react';

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    })
}));

type LayoutProps = {
    children: React.ReactNode;
};

/**
 * Layout
 * 
 * @param LayoutProps 
 * @returns 
 */
const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps): JSX.Element => {

    const [user, setUser] = useState({
        uid: "",
        displayName: "",
        email: "",
        phoneNumber: "",
        photoURL: "",
        accessToken: "",
    })

    // handle logout
    const _handleLogout = () => {
        signOut(auth).then(() => {
            window.location.href = "/";
        }).catch((error) => {
            // An error happened.
        });
    };

    useEffect(() => {
        const userJson = localStorage.getItem('user');
        const userData = userJson !== null
            ? JSON.parse(userJson)
            : {
                uid: "",
                displayName: "",
                email: "",
                phoneNumber: "",
                photoURL: "",
                accessToken: "",
            };
        setUser(userData);
    }, []);

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="absolute">
                <Toolbar>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1 }}
                    >
                        {process.env.REACT_APP_NAME}
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 1,
                        }}>
                        <Avatar src={images.avatar} alt="Profile" />
                        <Typography
                            sx={{
                                color: 'white',
                                fontWeight: 'bold',
                                cursor: 'pointer'
                            }}
                            onClick={() => _handleLogout()}
                        >{user.displayName}
                            Logout
                        </Typography>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
};

export default Layout;