import React from 'react';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent } from '@mui/lab';
import { Box, Typography, LinearProgress, IconButton } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const RewardTimeline = ({ currentPoints, rewards }) => {
  const unlockedRewardIndex = rewards.findIndex((reward) => currentPoints < reward.points);

  // Progress toward the next reward
  const currentReward = rewards[unlockedRewardIndex] || null;
  const progressToNextReward = currentReward
    ? (currentPoints / currentReward.points) * 100
    : 100;

  return (
    <Box sx={{ padding: '20px', width: '100%' }}>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>Your Progress Ladder</Typography>

      {/* Vertical Linear Progress showing progress towards the next reward */}
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
        <Typography variant="body2" sx={{ minWidth: 80 }}>
          Progress: {`${currentPoints}/${currentReward?.points || rewards[0].points}`} pts
        </Typography>
        <Box sx={{ width: '100%', marginLeft: 2 }}>
          <LinearProgress variant="determinate" value={progressToNextReward} />
        </Box>
      </Box>

      {/* Timeline for displaying rewards */}
      <Timeline position="alternate">
        {rewards.map((reward, index) => {
          const isUnlocked = currentPoints >= reward.points;
          const isCurrent = index === unlockedRewardIndex;
          const progressIcon = isUnlocked ? <CheckCircleIcon color="success" /> : <LockIcon />;

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
                {index < rewards.length - 1 && <TimelineConnector />}
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
