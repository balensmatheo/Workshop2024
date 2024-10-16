import React from 'react';
import { Card, CardContent, Typography, Avatar, Badge } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Star, StarBorderOutlined } from '@mui/icons-material';
import { fetchUserAttributes } from 'aws-amplify/auth';

const ProfileCard = ({user, ranks}) => {



    return (
        <Card sx={{ margin: '20px', padding: '10px' }}>
        <CardContent>
            <Grid container spacing={2} alignContent={'left'} justifyContent={'left'}>
                <Grid item>
                    <Avatar alt={user.name} src={user.avatarUrl} sx={{ width: 80, height: 80, border: ranks.find(rank => rank.name === user.rank)?.border, backgroundColor: 'primary.main' }} />
                </Grid>
                <Grid item>
                    <Typography variant="h5">{user.name}</Typography>
                    <Typography variant="body1">Rang: {user.rank}</Typography>
                </Grid>
            </Grid>
        </CardContent>
        </Card>
    );
};

export default ProfileCard;
