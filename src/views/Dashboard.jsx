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
        const fetchWeeklyTodos = async () => {
            try {
                const result = await client.models.Todo.list();
                console.log(result.data);
                setWeeklyTasks(result.data);
            } catch (error) {
                console.error("Failed to fetch weekly todos:", error);
            }
        };

        fetchWeeklyTodos();
    }, []);

    return (
        <Grid container sx={{ backgroundColor: 'primary.main', margin:0 }}>
            <Grid item xs={4}>
                <ToDoList tasks={dailyTasks} title="Tâches quotidiennes" />
            </Grid>
            <Grid item xs={4}>
                <ToDoList tasks={weeklyTasks} title="Tâches dromadaires" />
            </Grid>
            <Grid item xs={4}>
                <ToDoList tasks={monthlyTasks} title="Tâches mensuelles" />
            </Grid>
        </Grid>
    );
};

export default Dashboard;
