import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';

// Sample leaderboard data (you can replace this with real data)
const leaderboardData = [
    { name: 'Jean-Pierre Gentil', score: 1500 },
    { name: 'Arthur Gradur', score: 600 },
    { name: 'Raoul Coule', score: 900 },
    { name: 'Bertrand Bienveillant', score: 1250 },
    { name: 'Pierre', score: 300 },
    { name: 'Rémi', score: 100 },
];

// Leaderboard Component
const Leaderboard = () => {
    // Sort users by score in descending order
    const sortedUsers = leaderboardData.sort((a, b) => b.score - a.score);

    return (
        <Box sx={{ padding: '20px' }}>
        <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 2 }}>
            Leaderboard
        </Typography>
        <TableContainer component={Paper} sx={{ maxWidth: 600, margin: '0 auto' }}>
            <Table>
            <TableHead>
                <TableRow>
                <TableCell align="center"><strong>Rank</strong></TableCell>
                <TableCell><strong>User</strong></TableCell>
                <TableCell align="right"><strong>Score</strong></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {sortedUsers.map((user, index) => (
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
