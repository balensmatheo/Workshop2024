import React, { useState, useEffect } from 'react';
import { Card, CardContent, Button, Typography, Checkbox, List, ListItem, ListItemText, ListItemSecondaryAction, ListItemButton, IconButton } from '@mui/material';
import { MoreVertRounded } from '@mui/icons-material';
import { updateUserAttribute } from 'aws-amplify/auth';

const ToDoList = (props) => {
    const [listTasks, setListTasks] = useState(props.tasks || []);
    const [title, setTitle] = useState(props.title || 'ToDoList');

    const handleOnChange = (event) => {
        console.log(event.target);
        const index = event.target.id;
        console.log(index);
        const newListTasks = [...listTasks];
        console.log(newListTasks);
        newListTasks[index].completed = !newListTasks[index].completed;

        addUser('tasks', newListTasks).then(() => {
            console.log('Task updated');
        }
        ).catch((error) => {
            console.error('Error updating task', error);
        });

        setListTasks(newListTasks);
    }

    return (
        <Card  elevation={7} sx={{ margin: '20px'}}>
        <CardContent>
            <Typography variant="h6">{title}</Typography>
            <List>
            {listTasks.map((task, index) => (
                <ListItem key={index}>
                    <Checkbox checked={!!task.completed} onChange={(event) => handleOnChange(event)} id={index} />
                    <ListItemText
                        primary={task.title}
                        secondary={task.description}
                    />
                    <ListItemButton>
                        <IconButton edge="end" aria-label="more">
                            <MoreVertRounded />
                        </IconButton>
                    </ListItemButton>
                </ListItem>
            ))}
            </List>
        </CardContent>
        </Card>
    );
};

export default ToDoList;
