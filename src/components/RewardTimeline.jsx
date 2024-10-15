import React from 'react';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent } from '@mui/lab';
import { Box, Typography, LinearProgress } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const RewardTimeline = ({ currentPoints, rewards }) => {
    const unlockedRewardIndex = rewards.findIndex((reward) => currentPoints < reward.points);

    // Calculate progress toward the next reward
    const getProgressToNextReward = (index) => {
        const nextReward = rewards[index];
        if (!nextReward) return 100;
        return Math.min((currentPoints / nextReward.points) * 100, 100);
    };

    return (
        <Box sx={{ padding: '20px', width: '100%' }}>
        {/* Timeline for displaying rewards */}
        <Timeline position="alternate">
            {[...rewards].reverse().map((reward, reversedIndex) => {
            const index = rewards.length - 1 - reversedIndex;
            const isUnlocked = currentPoints >= reward.points;
            const isCurrent = index === unlockedRewardIndex;
            const progressIcon = isUnlocked ? <CheckCircleIcon color="success" /> : <LockIcon />;
            
            // Calculate the connector progress color
            const connectorProgress = index > 0 ? getProgressToNextReward(index - 1) : 0;

            return (
                <TimelineItem key={index}>
                <TimelineOppositeContent>
                    <Typography variant="body2" color="text.secondary">
                    {isUnlocked ? "Unlocked" : "Locked"}
                    </Typography>
                </TimelineOppositeContent>

                <TimelineSeparator>
                    <TimelineDot color={isUnlocked ? "success" : "grey"}>
                    {progressIcon}
                    </TimelineDot>

                    {index < rewards.length - 1 && (
                    <TimelineConnector>
                        <Box
                        sx={{
                            height: 4,
                            width: '100%',
                            background: `linear-gradient(to right, primary.main ${connectorProgress}%, grey ${connectorProgress}%)`,
                        }}
                        />
                    </TimelineConnector>
                    )}
                </TimelineSeparator>

                <TimelineContent>
                    <Typography variant="h6" component="span">
                    {reward.name}
                    </Typography>
                    <Typography>{`Unlock at ${reward.points} points`}</Typography>

                    {isCurrent && (
                    <Typography variant="body2" color="primary">
                        {`Current goal: ${reward.points} points`}
                    </Typography>
                    )}
                </TimelineContent>
                </TimelineItem>
            );
            })}
        </Timeline>
        </Box>
    );
};

export default RewardTimeline;
