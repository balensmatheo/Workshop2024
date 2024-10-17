import React from 'react';
import { Card, CardContent, Typography, Avatar, Badge, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Star, StarBorderOutlined } from '@mui/icons-material';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';

const client = generateClient();

const ProfileCard = ({user, ranks, setPoints}) => {

    
    const updateUserPoints = async (points) => {
        try {
            // Récupérer l'utilisateur actuel
            const user = await client.models.User.list();
            if (user.data.length === 0) {
                await client.models.User.create({
                    points: points
                });
            } else {
                // Mettre à jour les points de l'utilisateur
                await client.models.User.update({
                    id: user.data[0].id,
                    points: user.data[0].points + points,
                });
                setPoints(prevPoints => prevPoints + points);
                console.log("User points updated successfully!");
            }
        } catch (error) {
            console.error("Failed to update user points:", error);
        }
    };


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
            <Grid>
                <Button onClick={() => updateUserPoints(100)} variant="contained" color="primary">Ajouter 100 points</Button>

            </Grid>
        </CardContent>
        </Card>
    );
};

export default ProfileCard;
