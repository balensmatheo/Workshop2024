import React, { useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';
import Loading from './Loading';

const client = generateClient();

const Leaderboard = () => {

    let leaderboardData = [
        { name: 'Jean-Pierre Gentil', score: 1500 },
        { name: 'Arthur Gradur', score: 600 },
        { name: 'Raoul Coule', score: 900 },
        { name: 'Bertrand Bienveillant', score: 1250 },
        { name: 'Pierre', score: 300 },
        { name: 'Rémi', score: 100 },
    ];

    
    const [points, setPoints] = React.useState(0);
    const [datas, setDatas] = React.useState(leaderboardData);
    const [isLoading, setIsLoading] = React.useState(true);

    
    useEffect(() => {
        const fetchUserPoints = async () => {
            try {
                const user = await client.models.User.list();
                setPoints(user.data[0].points);
                fetchUserAttributes().then((attributes) => {
                    setDatas([...datas, { name: attributes.nickname, score: user.data[0].points }]);
                })
                setIsLoading(false);
            } catch (error) {
                console.error("Failed to fetch user points:", error);
                setIsLoading(false);
            }
        };

        fetchUserPoints();
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <Box sx={{ padding: '20px' }}>
        <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 2 }}>
            Tableau des scores
        </Typography>
        <TableContainer component={Paper} sx={{ maxWidth: 600, margin: '0 auto' }}>
            <Table>
                <TableHead>
                    <TableRow>
                    <TableCell align="center"><strong>Rang</strong></TableCell>
                    <TableCell><strong>Utilisateur</strong></TableCell>
                    <TableCell align="right"><strong>Score</strong></TableCell>
                    </TableRow>
                </TableHead>
            <TableBody>
                {datas.sort((a, b) => b.score - a.score).map((user, index) => (
                    <TableRow key={user.name}>
                        <TableCell align="center">{index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : index + 1} </TableCell> {/* Rank */}
                        <TableCell>{user.name}</TableCell> {/* User Name */}
                        <TableCell align="right">{user.score}</TableCell> {/* User Score */}
                    </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
        </Box>
    );
};

export default Leaderboard;
