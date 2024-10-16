import React, {useEffect, useState} from 'react';
import { Container, Box } from '@mui/material';
import ProfileCard from '../components/ProfileCard';
import Ladder from '../components/Progression';
import RewardLadder from '../components/RewardLadder';
import RewardTimeline from '../components/RewardTimeline';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { LoadingButton } from '@mui/lab';
import Loading from './Loading';

const UserProfile = () => {
    
    const [user, setUser] = React.useState({});
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        fetchUserAttributes().then((attributes) => {

            setUser({
                name: attributes.nickname,
                avatarUrl: attributes.picture,
                points: 0,
                rank: 'Novice',
            });
        });
        setIsLoading(false);
    }, []);

    const rewards = [
        { name: 'Bronze Badge', points: 100 },
        { name: 'Silver Badge', points: 300 },
        { name: 'Gold Badge', points: 600 },
        { name: 'Platinum Badge', points: 1000 },
        { name: 'Diamond Badge', points: 1500 },
    ];

    if (isLoading) {
        return <Loading />;
    }

    return (
        <Container>
        <ProfileCard user={user} />
        <Ladder points={user.points} maxPoints={1000}  />
        <RewardTimeline currentPoints={user.points} rewards={rewards} />

        </Container>
    );
};

export default UserProfile;
