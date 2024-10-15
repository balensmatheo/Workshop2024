import {useEffect, useState} from 'react';
import { Container, Box } from '@mui/material';
import ProfileCard from '../components/ProfileCard';
import Ladder from '../components/Progression';
import RewardLadder from '../components/RewardLadder';
import RewardTimeline from '../components/RewardTimeline';
import { fetchUserAttributes } from 'aws-amplify/auth';

const UserProfile = () => {
    useEffect(() => {
        fetchAttributes();
    }, []);


    const [attributes, setAttributes] = useState({});
    const [user, setUser] = useState({
        name: attributes.nickname,
        avatarUrl: 'https://example.com/avatar.png', // Replace with actual avatar URL
        points: 650,
        rank: 'Gold',
    });
    async function fetchAttributes(){
        const userAttributes = await fetchUserAttributes();
        console.log(userAttributes);
        setAttributes(userAttributes);
        setUser({
                name: userAttributes.nickname,
                avatarUrl: 'https://example.com/avatar.png', // Replace with actual avatar URL
                points: 650,
                rank: 'Gold',
            }
        );

    }

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
