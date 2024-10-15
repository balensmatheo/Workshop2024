import React, { useState, useEffect } from 'react';
import { Card, CardContent, Button, Typography, Checkbox, List, ListItem, ListItemText, ListItemSecondaryAction, ListItemButton, IconButton, Chip } from '@mui/material';
import { MoreVertRounded } from '@mui/icons-material';
import { updateUserAttribute } from 'aws-amplify/auth';
import { Grid } from '@aws-amplify/ui-react';

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
            <Grid alignContent={'space-between'} justifyContent={'space-between'} columnDirection={'column'} display={'flex'} >
                <Typography variant="h6">{title}</Typography>
                <Chip label={listTasks.filter(task => task.completed).length + '/' + listTasks.length} sx={{ backgroundColor: 'primary.main', color: 'white', maxWidth: '80px' }} />
            </Grid>

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
