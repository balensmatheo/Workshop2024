import React, {useEffect, useState} from 'react';
import { Grid } from '@mui/material';
import ToDoList from '../components/ToDoList';
import { generateClient } from 'aws-amplify/data';

const client = generateClient();

const Dashboard = () => {
    const [dailyTasks, setDailytasks] = useState([]);
    const [weeklyTasks, setWeeklyTasks] = useState([]);
    const [monthlyTasks, setMonthlyTasks] = useState([]);

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
                setWeeklyTasks(weekly.data);
                setDailytasks(daily.data);
                setMonthlyTasks(monthly.data);
                console.log(daily.data);
                console.log(weekly.data);
                console.log(monthly.data);
            } catch (error) {
                console.error("Failed to fetch weekly todos:", error);
            }
        };

        fetchTodos();
    }, []);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
                <ToDoList tasks={dailyTasks} title="Tâches Quotidiennes" />
            </Grid>
            <Grid item xs={12} md={4}>
                <ToDoList tasks={weeklyTasks} title="Tâches Hebdomadaires" />
            </Grid>
            <Grid item xs={12} md={4}>
                <ToDoList tasks={monthlyTasks} title="Tâches Mensuelles" />
            </Grid>
        </Grid>
    );
};

export default Dashboard;
