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
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, ListItemButton, LinearProgress } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import { AccountCircleRounded, DashboardRounded, LeaderboardRounded, Logout } from '@mui/icons-material';
import { generateClient } from 'aws-amplify/data';
import {useEffect} from "react";

const client = generateClient();

export default function PrimarySearchAppBar() {
    const navigate = useNavigate();

    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const [user, setUser] = React.useState({});
    const [isLoading, setIsLoading] = React.useState(true);
    const [points, setPoints] = React.useState(0);

    useEffect(() => {
        const fetchUserPoints = async () => {
            try {
                const user = await client.models.User.list();
                setPoints(user.data[0].points);
                setUser({
                    name: user.nickname,
                    avatarUrl: user.picture,
                    points: points,
                    rank: user.rank || 'Novice',
                });
                setIsLoading(false);
            } catch (error) {
                console.error("Failed to fetch user points:", error);
                setIsLoading(false);
            }
        };

        fetchUserPoints();
    }, []);

    const maxPoints = 1000;
    const progress = (points / maxPoints) * 100;

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
                        <LinearProgress variant="determinate" value={progress}  sx={{ ml: 2, '& .MuiLinearProgress-bar': { backgroundColor: 'background.main' } }} />
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
                            {'title': 'Tableau de bord', 'path': '/dashboard', 'icon': <DashboardRounded />},
                            {'title': 'Tableau des scores', 'path': '/leaderboard', 'icon': <LeaderboardRounded />},
                            {'title': 'Profil', 'path': '/me', 'icon': <AccountCircleRounded />},
                        ].map((item) => (
                            <ListItem key={item.title}>
                                <ListItemButton onClick={() => navigate(item.path)}>
                                    <ListItemIcon sx={{ mr: 0 }}>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.title} sx={{ ml: 0}} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    {/* Bouton de déconnexion rouge */}
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
