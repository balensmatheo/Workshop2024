import React from 'react';
import { Card, CardContent, Typography, Avatar, Grid } from '@mui/material';

const ProfileCard = ({ user }) => {
    return (
        <Card style={{ margin: '20px', padding: '10px' }}>
        <CardContent>
            <Grid container spacing={2} alignItems="center">
            <Grid item>
                <Avatar alt={user.name} src={user.avatarUrl} style={{ width: 80, height: 80 }} />
            </Grid>
            <Grid item>
                <Typography variant="h5">{user.name}</Typography>
                <Typography variant="body1">Rank: {user.rank}</Typography>
                <Typography variant="body1">Points: {user.points}</Typography>
                <Typography variant="body1">Prestige: {user.prestigeLevel}</Typography>
            </Grid>
            </Grid>
        </CardContent>
        </Card>
    );
};

export default ProfileCard;
