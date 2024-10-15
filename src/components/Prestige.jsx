import React from 'react';
import { Button, Typography, Box } from '@mui/material';

const PrestigeSystem = ({ points, prestigeLevel, onPrestige }) => {
    const prestigeThreshold = 1000 * (prestigeLevel + 1); // Example: 1000 points per prestige level

    return (
        <Box style={{ margin: '20px' }}>
        <Typography variant="h6">Prestige System</Typography>
        <Typography variant="body1">Current Prestige: {prestigeLevel}</Typography>
        <Typography variant="body2">
            Reach {prestigeThreshold} points to unlock the next prestige.
        </Typography>

        {points >= prestigeThreshold ? (
            <Button variant="contained" color="primary" onClick={onPrestige}>
            Prestige Now!
            </Button>
        ) : (
            <Button variant="contained" disabled>
            Prestige Locked
            </Button>
        )}
        </Box>
    );
};

export default PrestigeSystem;
