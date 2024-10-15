import React, { useState } from 'react';
import { Container, Box } from '@mui/material';
import ProfileCard from '../components/ProfileCard';
import Ladder from '../components/Progression';
import RewardLadder from '../components/RewardLadder';
import RewardTimeline from '../components/RewardTimeline';
import { fetchUserAttributes } from 'aws-amplify/auth';

const UserProfile = () => {
    
    const [user, setUser] = React.useState({});

    React.useEffect(() => {
        fetchUserAttributes().then((attributes) => {
            console.log(attributes);
            setUser({
                name: attributes.email,
                avatarUrl: attributes.picture,
                points: 0,
                rank: 'Gold',
            });
        });
    }, []);

    const rewards = [
        { name: 'Bronze Badge', points: 100 },
        { name: 'Silver Badge', points: 300 },
        { name: 'Gold Badge', points: 600 },
        { name: 'Platinum Badge', points: 1000 },
        { name: 'Diamond Badge', points: 1500 },
    ];

    return (
        <Container>
        <ProfileCard user={user} />
        <Ladder points={user.points} maxPoints={1000}  />
        <RewardTimeline currentPoints={user.points} rewards={rewards} />

        </Container>
    );
};

export default UserProfile;
