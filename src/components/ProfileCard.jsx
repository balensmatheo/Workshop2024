import { Card, CardContent, Typography, Avatar, Grid } from '@mui/material';

const ProfileCard = ({ user }) => {


    const ranks = [
        { name: 'Bronze', points: 100, 'border': '4px solid #CD7F32' },
        { name: 'Silver', points: 300, 'border': '4px solid #C0C0C0' },
        { name: 'Gold', points: 600, 'border': '4px solid #FFD700' },
        { name: 'Platinum', points: 1000, 'border': '4px solid #E5E4E2' },
        { name: 'Diamond', points: 1500, 'border': '4px solid #b9f2ff' },
    ];


    return (
        <Card style={{ margin: '20px', padding: '10px' }}>
        <CardContent>
            <Grid container spacing={2} alignItems="center">
            <Grid item>
                <Avatar alt={user.name} src={user.avatarUrl} sx={{ width: 80, height: 80, border: ranks.find(rank => rank.name === user.rank).border, backgroundColor: 'primary.main' }} />
            </Grid>
            <Grid item>
                <Typography variant="h5">{user.name}</Typography>
                <Typography variant="body1">Rank: {user.rank}</Typography>
                <Typography variant="body1">Points: {user.points}</Typography>
            </Grid>
            </Grid>
        </CardContent>
        </Card>
    );
};

export default ProfileCard;
