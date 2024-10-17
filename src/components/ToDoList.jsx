import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Checkbox, Card, CardContent, Typography, Box, Badge } from '@mui/material';
import { generateClient } from 'aws-amplify/data';

const client = generateClient();

const ToDoList = ({ tasks = [], title, setTasks, setCompletedTasks, isCompletedList = false, setPoints }) => {
    const [taskList, setTaskList] = useState([]);

    useEffect(() => {
        setTaskList(tasks || []);
    }, [tasks]);

    const handleToggle = async (task) => {
        try {
            // Mettre à jour la tâche localement avant l'appel à l'API
            const updatedTask = { ...task, isDone: !task.isDone };
            setTaskList(prevTasks => prevTasks.filter(t => t.id !== task.id));
            setTasks(prevTasks => prevTasks.filter(t => t.id !== task.id));

            // Mettre à jour la liste des tâches réalisées
            if (updatedTask.isDone) {
                setCompletedTasks(prev => [...prev, updatedTask]);
                await updateUserPoints(updatedTask.points);
            } else {
                setTasks(prev => [...prev, updatedTask]);
                setCompletedTasks(prev => prev.filter(t => t.id !== updatedTask.id));
                await updateUserPoints(-updatedTask.points);
            }

            await client.models.Todo.update({
                id: task.id,
                isDone: updatedTask.isDone,
            });

            console.log(`Task "${updatedTask.title}" updated successfully!`);
        } catch (error) {
            console.error(`Failed to update task ${task.title}:`, error);
        }
    };

    const updateUserPoints = async (points) => {
        try {
            // Récupérer l'utilisateur actuel
            const user = await client.models.User.list(); // Remplacez 'currentUserId' par la logique appropriée pour obtenir l'ID utilisateur
            if (user.data.length === 0) {
                await client.models.User.create({
                    points: points
                })
                console.log("User created successfully!")
            } else {
                // Mettre à jour les points de l'utilisateur
                await client.models.User.update({
                    id: user.data[0].id,
                    points: user.data[0].points + points,
                });
                console.log("User points updated successfully!")
            }
            setPoints(prevPoints => prevPoints + points);

        } catch (error) {
            console.error("Failed to update user points:", error);
        }
    };

    return (
        <Card sx={{ boxShadow: 5, borderRadius: 4, mb: 4, mt: 2, mx: 2, backgroundColor: isCompletedList ? "#f0f0f0" : "#7abb4b" }}>
            <CardContent>
                <Typography variant="h5" component="div" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold', color: isCompletedList ? 'black' : 'white' }}>
                    {title}
                </Typography>
                <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
                    <List>
                        {taskList.map((task) => (
                            <ListItem key={task.id} disablePadding>
                                <Box
                                    component="div"
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        width: '100%',
                                        backgroundColor: 'background.paper',
                                        mb: 1,
                                        px: 2,
                                        py: 1,
                                        borderRadius: 2,
                                        boxShadow: 2,
                                    }}
                                >
                                    {!isCompletedList && (
                                        <ListItemIcon>
                                            <Checkbox
                                                edge="start"
                                                checked={task.isDone}
                                                onChange={() => handleToggle(task)}
                                                tabIndex={-1}
                                                disableRipple
                                                inputProps={{ 'aria-labelledby': task.id }}
                                            />
                                        </ListItemIcon>
                                    )}
                                    <ListItemText
                                        id={task.id}
                                        primary={
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    textDecoration: task.isDone ? 'line-through' : 'none',
                                                    color: task.isDone ? 'text.secondary' : 'text.primary',
                                                }}
                                            >
                                                {task.title}
                                            </Typography>
                                        }
                                        secondary={
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: task.isDone ? 'text.secondary' : 'text.primary',
                                                }}
                                            >
                                                {task.description}
                                            </Typography>
                                        }
                                    />
                                    <Badge color="primary">
                                        <Typography
                                            variant="subtitle2"
                                            sx={{
                                                fontWeight: 'bold',
                                                color: 'primary.main',
                                            }}
                                        >
                                            {task.points} points
                                        </Typography>
                                    </Badge>
                                </Box>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ToDoList;