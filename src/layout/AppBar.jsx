import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, ListItemButton, LinearProgress } from '@mui/material';
import { DashboardRounded, LeaderboardRounded, AccountCircleRounded, Logout, AddTaskRounded } from '@mui/icons-material';
import { signOut } from 'aws-amplify/auth';

export default function PrimarySearchAppBar({ points, maxPoints }) {
    const navigate = useNavigate();

    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const handleProfileClick = () => {
        navigate('/me');
    };

    const handleLogout = async () => {
        await signOut();
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const mobileMenuId = 'primary-search-account-menu-mobile';

    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileClick}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    const progress = (points / maxPoints) * 100;

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer(true)}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Link to="/dashboard" style={{ textDecoration: 'none', color: 'white' }}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block' } }}
                        >
                            SociSan
                        </Typography>
                    </Link>
                    <Box sx={{ flexGrow: 1 }} />

                    <Typography variant="body2" sx={{ ml: 1, color: 'background' }}>
                        {`${points} points`}
                    </Typography>

                    <Box sx={{ width: '40vw' }}>
                        <LinearProgress variant="determinate" value={progress} sx={{ ml: 2, '& .MuiLinearProgress-bar': { backgroundColor: 'background.main' } }} />
                    </Box>

                    <Typography variant="body2" sx={{ ml: 1, color: 'background' }}>
                        {`${maxPoints} points`}
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={4} color="error">
                                <MailIcon />
                            </Badge>
                        </IconButton>
                        <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
                            <Badge badgeContent={17} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileClick}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}

            <Drawer
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                sx={{
                    width: 240,
                    [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {[
                            { title: 'Dashboard', path: '/dashboard', icon: <DashboardRounded /> },
                            { title: 'Leaderboard', path: '/leaderboard', icon: <LeaderboardRounded /> },
                            { title: 'Profile', path: '/me', icon: <AccountCircleRounded /> },
                            {'title': 'Admin', 'path': '/admin', 'icon': <AddTaskRounded />},
                        ].map((item) => (
                            <ListItem key={item.title}>
                                <ListItemButton onClick={() => navigate(item.path)}>
                                    <ListItemIcon sx={{ mr: 0 }}>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.title} sx={{ ml: 0 }} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>

                    <Divider />
                    <ListItem>
                        <ListItemButton onClick={handleLogout} sx={{ color: 'red' }}>
                            <ListItemIcon sx={{ color: 'red', mr: 0 }}>
                                <Logout />
                            </ListItemIcon>
                            <ListItemText primary="Déconnexion" sx={{ ml: 0 }} />
                        </ListItemButton>
                    </ListItem>
                </Box>
            </Drawer>

            <Toolbar />
            <Outlet />
        </Box>
    );
}
