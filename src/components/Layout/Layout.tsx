import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { signOut } from 'firebase/auth';

import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import Typography from '@mui/material/Typography';

import { auth, images, routes } from '../../core';
import UserHelper from '../../helpers/user.helper';

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

    const history = useHistory();

    const [open, setOpen] = useState<boolean>(false);
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
            UserHelper.deleteUser();
            window.location.href = "/";
        }).catch((error) => {
            // An error happened.
        });
    };

    // handle user info on appbar
    useEffect(() => {
        const userData = UserHelper.getUser();
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
                            pr: 2
                        }}>
                        <Avatar src={images.avatar} alt="Profile" />
                        <Typography
                            sx={{
                                fontWeight: 'bold',
                                textTransform: 'capitalize',
                                cursor: 'pointer',
                            }}
                            onClick={() => setOpen(true)}
                        >
                            {user.displayName}
                        </Typography>
                        <Menu
                            open={open}
                            onClose={() => setOpen(false)}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            sx={{
                                mt: '45px',
                                width: '250px',
                                minWidth: '250px'
                            }}
                        >
                            <MenuItem
                                sx={{ display: 'flex', gap: 1 }}
                                onClick={() => history.push(routes.profile)}
                            >
                                <PersonOutlineIcon /> Profile
                            </MenuItem>
                            <MenuItem
                                sx={{ display: 'flex', gap: 1 }}
                                onClick={() => _handleLogout()}
                            >
                                <LogoutIcon />Logout
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                    maxWidth: '100vw',
                }}
            >
                <Toolbar />
                <Container
                    maxWidth="lg"
                    sx={{
                        mt: 4,
                        mb: 4,
                        '@media (min-width: 480px)': {
                            maxWidth: '1600px',
                        },
                        '@media (max-width: 480px)': {
                            mt: 2,
                        }
                    }}
                >
                    {children}
                </Container>
            </Box>
        </Box>
    );
};

export default Layout;