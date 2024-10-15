import React from 'react';
import { Box, Typography, LinearProgress, List, ListItem, ListItemText, Divider } from '@mui/material';

const RewardLadder = ({ currentPoints, rewards }) => {
    const unlockedRewardIndex = rewards.findIndex((reward) => currentPoints < reward.points);

    // The last unlocked reward, current reward to unlock, and the next two
    const lastUnlocked = unlockedRewardIndex - 1 >= 0 ? rewards[unlockedRewardIndex - 1] : null;
    const currentReward = rewards[unlockedRewardIndex] || null;
    const nextReward = rewards[unlockedRewardIndex + 1] || null;
    const nextNextReward = rewards[unlockedRewardIndex + 2] || null;

    // Calculate progress toward the current reward
    const progressToNextReward = currentReward
        ? (currentPoints / currentReward.points) * 100
        : 100;

    return (
        <Box sx={{ width: '100%', padding: '20px' }}>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>Your Ladder</Typography>

        <List>
            {/* Last unlocked reward */}
            {lastUnlocked && (
            <>
                <ListItem>
                <ListItemText
                    primary={`Last unlocked: ${lastUnlocked.name}`}
                    secondary={`Unlocked at ${lastUnlocked.points} points`}
                />
                </ListItem>
                <Divider />
            </>
            )}

            {/* Current reward */}
            {currentReward && (
            <>
                <ListItem>
                <ListItemText
                    primary={`Next reward: ${currentReward.name}`}
                    secondary={`Unlock at ${currentReward.points} points`}
                />
                <Box sx={{ width: '100%', mt: 2 }}>
                    <Typography variant="body2">{`Progress: ${currentPoints}/${currentReward.points} points`}</Typography>
                    <LinearProgress variant="determinate" value={progressToNextReward} />
                </Box>
                </ListItem>
                <Divider />
            </>
            )}

            {/* Next two rewards */}
            {nextReward && (
            <>
                <ListItem>
                <ListItemText
                    primary={`Upcoming reward: ${nextReward.name}`}
                    secondary={`Unlock at ${nextReward.points} points`}
                />
                </ListItem>
                <Divider />
            </>
            )}

            {nextNextReward && (
            <>
                <ListItem>
                <ListItemText
                    primary={`Upcoming reward: ${nextNextReward.name}`}
                    secondary={`Unlock at ${nextNextReward.points} points`}
                />
                </ListItem>
            </>
            )}
        </List>
        </Box>
    );
};

export default RewardLadder;
