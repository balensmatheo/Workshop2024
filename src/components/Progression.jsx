import React from 'react';
import { LinearProgress, Typography, Box } from '@mui/material';

const Ladder = ({ points, maxPoints, rankUp }) => {
    const progress = (points / maxPoints) * 100;

    return (
        <Box sx={{ margin: '20px' }}>
            <Typography variant="h6">Progression vers le prochain niveau :</Typography>
            <LinearProgress variant="determinate" value={progress} color="primary" />
            <Typography variant="body2">
                {points}/{maxPoints} points
            </Typography>
        </Box>
    );
};

export default Ladder;
