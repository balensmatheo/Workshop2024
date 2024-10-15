import React, { useState, useEffect } from 'react';
import { Card, CardContent, Button, Typography, Checkbox, List, ListItem, ListItemText, ListItemSecondaryAction, ListItemButton, IconButton } from '@mui/material';
import { MoreVertRounded } from '@mui/icons-material';

const ToDoList = (props) => {
    const [listTasks, setListTasks] = useState(props.tasks || []);
    const [title, setTitle] = useState(props.title || 'ToDoList');


    return (
        <Card  elevation={7} sx={{ margin: '20px'}}>
        <CardContent>
            <Typography variant="h6">{title}</Typography>
            <List>
            {listTasks.map((task, index) => (
                <ListItem key={index}>
                    <Checkbox checked={!!task.completed} />
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
