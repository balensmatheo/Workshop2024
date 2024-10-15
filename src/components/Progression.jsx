import React from 'react';
import { LinearProgress, Typography, Box } from '@mui/material';

const Ladder = ({ points, maxPoints, rankUp }) => {
    const progress = (points / maxPoints) * 100;

    return (
        <Box sx={{ margin: '20px' }}>
        <Typography variant="h6">Progress to next rank</Typography>
        <LinearProgress variant="determinate" value={progress} />
        <Typography variant="body2">
            {points}/{maxPoints} points
        </Typography>
        {points >= maxPoints && (
            <Typography variant="body1" color="primary" sx={{ marginTop: '10px' }}>
            Congratulations! You've ranked up.
            </Typography>
        )}
        </Box>
    );
};

export default Ladder;
