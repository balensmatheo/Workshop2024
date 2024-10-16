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

    

    const rewards = [
        { name: 'Badge de Bronze', points: 100 },
        { name: 'Badge d\'Argent', points: 300 },
        { name: '5% sur un produit Nike', points: 450 },
        { name: 'Badge d\'Or', points: 600 },
        { name: 'Snapchat Premium Filters', points: 750 },
        { name: 'Accès Webinaire Positivité', points: 800 },
        { name: 'Badge de Platine', points: 1000 },
        { name: '1 mois de Snapchat Plus', points: 1250 },
        { name: 'Badge de Diamant', points: 1500 },
        { name: 'Goodies SociSan', points: 2000 },
    ];

    const ranks = [
        { name: 'Bronze', points: 100, 'border': '4px solid #CD7F32' },
        { name: 'Argent', points: 300, 'border': '4px solid #C0C0C0' },
        { name: 'Or', points: 600, 'border': '4px solid #FFD700' },
        { name: 'Platine', points: 1000, 'border': '4px solid #E5E4E2' },
        { name: 'Diamant', points: 1500, 'border': '4px solid #b9f2ff' },
    ];

    React.useEffect(() => {
        fetchUserAttributes().then((attributes) => {
            console.log(attributes);
            setUser({
                name: attributes.nickname,
                avatarUrl: attributes.picture,
                points: attributes.score || 500,
                rank: ranks.find(rank => rank.points <= attributes.score)?.name || 'Argent',
            });
            setIsLoading(false);
        });
    }, []);
    if (isLoading) {
        return <Loading />;
    }

    return (
        <Container>
        <ProfileCard user={user} ranks={ranks} />
        <Ladder points={user.points} maxPoints={1000}  />
        <RewardTimeline currentPoints={user.points} rewards={rewards} />

        </Container>
    );
};

export default UserProfile;
