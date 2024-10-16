// Dashboard.js
import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import ToDoList from '../components/ToDoList';
import { generateClient } from 'aws-amplify/data';

const client = generateClient();

const Dashboard = () => {
    const [dailyTasks, setDailyTasks] = useState([]);
    const [weeklyTasks, setWeeklyTasks] = useState([]);
    const [monthlyTasks, setMonthlyTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const daily = await client.models.Todo.list({
                    filter: {
                        isDaily: { eq: true },
                    },
                });
                const weekly = await client.models.Todo.list({
                    filter: {
                        isWeekly: { eq: true },
                    },
                });
                const monthly = await client.models.Todo.list({
                    filter: {
                        isMonthly: { eq: true },
                    },
                });

                const completedDaily = daily.data.filter(task => task.isDone);
                const completedWeekly = weekly.data.filter(task => task.isDone);
                const completedMonthly = monthly.data.filter(task => task.isDone);

                const completed = [...completedDaily, ...completedWeekly, ...completedMonthly];
                const pendingDaily = daily.data.filter(task => !task.isDone);
                const pendingWeekly = weekly.data.filter(task => !task.isDone);
                const pendingMonthly = monthly.data.filter(task => !task.isDone);

                setDailyTasks(pendingDaily);
                setWeeklyTasks(pendingWeekly);
                setMonthlyTasks(pendingMonthly);
                setCompletedTasks(completed);

                console.log(pendingDaily);
                console.log(pendingWeekly);
                console.log(pendingMonthly);
                console.log(completed);
            } catch (error) {
                console.error("Failed to fetch todos:", error);
            }
        };

        fetchTodos();
    }, []);

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <ToDoList tasks={dailyTasks} title="Tâches Quotidiennes" setTasks={setDailyTasks} setCompletedTasks={setCompletedTasks} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <ToDoList tasks={weeklyTasks} title="Tâches Hebdomadaires" setTasks={setWeeklyTasks} setCompletedTasks={setCompletedTasks} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <ToDoList tasks={monthlyTasks} title="Tâches Mensuelles" setTasks={setMonthlyTasks} setCompletedTasks={setCompletedTasks} />
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mt: 4 }}>
                <Grid item xs={12}>
                    <ToDoList tasks={completedTasks} title="Tâches Réalisées" isCompletedList />
                </Grid>
            </Grid>
        </>
    );
};

export default Dashboard;
