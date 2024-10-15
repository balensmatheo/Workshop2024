import React, { useState } from 'react';
import { Container, Box } from '@mui/material';
import ProfileCard from '../components/ProfileCard';
import Ladder from '../components/Progression';
import PrestigeSystem from '../components/Prestige';
import RewardLadder from '../components/RewardLadder';
import RewardTimeline from '../components/RewardTimeline';

const UserProfile = () => {
    const [user, setUser] = useState({
        name: 'John Doe',
        avatarUrl: 'https://example.com/avatar.png', // Replace with actual avatar URL
        points: 650,
        rank: 'Silver',
        prestigeLevel: 1,
    });

    const handleRankUp = () => {
        setUser({
        ...user,
        points: 0, // Reset points after ranking up
        rank: 'Gold', // Update rank (you may want a more complex ranking system)
        });
    };

    const handlePrestige = () => {
        setUser({
        ...user,
        points: 0, // Reset points after prestige
        prestigeLevel: user.prestigeLevel + 1, // Increase prestige level
        });
    };

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
        <Ladder points={user.points} maxPoints={1000} rankUp={handleRankUp} />
        <PrestigeSystem points={user.points} prestigeLevel={user.prestigeLevel} onPrestige={handlePrestige} />
        <RewardTimeline currentPoints={user.points} rewards={rewards} />

        </Container>
    );
};

export default UserProfile;
