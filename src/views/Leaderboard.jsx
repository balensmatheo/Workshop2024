import React, { useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';
import { fetchUserAttributes } from 'aws-amplify/auth';

const Leaderboard = () => {
    let leaderboardData = [
        { name: 'Jean-Pierre Gentil', score: 1500 },
        { name: 'Arthur Gradur', score: 600 },
        { name: 'Raoul Coule', score: 900 },
        { name: 'Bertrand Bienveillant', score: 1250 },
        { name: 'Pierre', score: 300 },
        { name: 'Rémi', score: 100 },
    ];

    const [datas, setDatas] = React.useState(leaderboardData);

    useEffect(() => {
        fetchUserAttributes().then((attributes) => {
            setDatas((prevDatas) => {
                const exists = prevDatas.some(user => user.name === attributes.nickname);
                return exists ? prevDatas : [...prevDatas, { name: attributes.nickname, score: attributes.score || 0 }];
            });
        });
    }, []);

return (
        <Box sx={{ padding: '20px' }}>
            <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 2 }}>
                Leaderboard
            </Typography>
            <TableContainer component={Paper} sx={{ maxWidth: 600, margin: '0 auto' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center"><strong>Rang</strong></TableCell>
                            <TableCell><strong>User</strong></TableCell>
                            <TableCell align="right"><strong>Score</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {datas.sort((a, b) => b.score - a.score).map((user, index) => (
                            <TableRow key={user.name}>
                                <TableCell align="center">{index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : index + 1} </TableCell> {/* Rang */}
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
