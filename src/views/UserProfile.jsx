import React, { useState } from 'react';
import { Container, Box } from '@mui/material';
import ProfileCard from '../components/ProfileCard';
import Ladder from '../components/Ladder';
import PrestigeSystem from '../components/Prestige';

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

    return (
        <Container>
        <ProfileCard user={user} />
        <Ladder points={user.points} maxPoints={1000} rankUp={handleRankUp} />
        <PrestigeSystem points={user.points} prestigeLevel={user.prestigeLevel} onPrestige={handlePrestige} />
        </Container>
    );
};

export default UserProfile;
