import React from 'react';
import { Grid } from '@mui/material';
import ToDoList from '../components/ToDoList';

const Dashboard = () => {
    const dailyTasks = [
        { title: 'Daily Task 1', description: 'Description of Daily Task 1', completed: false },
        { title: 'Daily Task 2', description: 'Description of Daily Task 2', completed: false },
        { title: 'Daily Task 3', description: 'Description of Daily Task 3', completed: false },
    ];

    const weeklyTasks = [
        { title: 'Weekly Task 1', description: 'Description of Weekly Task 1', completed: false },
        { title: 'Weekly Task 2', description: 'Description of Weekly Task 2', completed: false },
        { title: 'Weekly Task 3', description: 'Description of Weekly Task 3', completed: false },
    ];

    const monthlyTasks = [
        { title: 'Monthly Task 1', description: 'Description of Monthly Task 1', completed: false },
        { title: 'Monthly Task 2', description: 'Description of Monthly Task 2', completed: false },
        { title: 'Monthly Task 3', description: 'Description of Monthly Task 3', completed: false },
    ];

    return (
        <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
            <ToDoList tasks={dailyTasks} title="Daily Tasks" />
        </Grid>
        <Grid item xs={12} sm={4}>
            <ToDoList tasks={weeklyTasks} title="Weekly Tasks" />
        </Grid>
        <Grid item xs={12} sm={4}>
            <ToDoList tasks={monthlyTasks} title="Monthly Tasks" />
        </Grid>
        </Grid>
    );
};

export default Dashboard;
