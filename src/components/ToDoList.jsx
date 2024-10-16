// ToDoList.js
import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Checkbox, Card, CardContent, Typography, Box, Badge } from '@mui/material';
import { generateClient } from 'aws-amplify/data';

const client = generateClient();

const ToDoList = ({ tasks, title }) => {
    const handleToggle = async (task) => {
        // Bascule l'état de la tâche isDone
        try {
            const updatedTask = await client.models.Todo.update({
                id: task.id,
                isDone: !task.isDone,
            });
            console.log(`Task "${updatedTask.title}" updated successfully!`);
        } catch (error) {
            console.error(`Failed to update task ${task.title}:`, error);
        }
    };

    return (
        <Card sx={{ boxShadow: 5, borderRadius: 4, mb: 4, mt:2,  mx: 2, backgroundColor: "#7abb4b" }}>
            <CardContent>
                <Typography variant="h5" component="div" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold', color: 'white' }}>
                    {title}
                </Typography>
                <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
                    <List>
                        {tasks.map((task) => (
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
