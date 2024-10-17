import { generateClient } from 'aws-amplify/data';
import { Container, TextField, Checkbox, FormControlLabel, Button, FormGroup } from '@mui/material';
import React, { useRef } from 'react';

const client = generateClient();

export default function AdminView() {
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);
    const isDoneRef = useRef(null);
    const isDailyRef = useRef(null);
    const isWeeklyRef = useRef(null);
    const isMonthlyRef = useRef(null);
    const pointsRef = useRef(null);

    const resetUserPoints = async () => {
        try {
            const user = await client.models.User.list();
            await client.models.User.update({
                id: user.data[0].id,
                points: 0,
            });
            window.location.reload();
            alert("User points reset successfully!");
        } catch (error) {
            console.error("Failed to reset user points:", error);
            alert("An error occurred while resetting user points.");
        }
    };

    const createTodo = async (event) => {
        event.preventDefault();

        const title = titleRef.current.value;
        const description = descriptionRef.current.value;
        const isDone = isDoneRef.current.checked;
        const isDaily = isDailyRef.current.checked;
        const isWeekly = isWeeklyRef.current.checked;
        const isMonthly = isMonthlyRef.current.checked;
        const points = parseInt(pointsRef.current.value, 10);

        try {
            await client.models.Todo.create({
                title,
                description,
                isDone,
                isDaily,
                isWeekly,
                isMonthly,
                points,
            });
            alert("Tâche crée !");
        } catch (error) {
            console.error("Failed to create todo:", error);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <form onSubmit={createTodo}>
                <TextField
                    label="Titre"
                    inputRef={titleRef}
                    name="titre"
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Description"
                    inputRef={descriptionRef}
                    name="description"
                    fullWidth
                    margin="normal"
                    required
                />

                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox inputRef={isDoneRef} name="isDone" />}
                        label="Complété"
                    />
                    <FormControlLabel
                        control={<Checkbox inputRef={isDailyRef} name="isDaily" />}
                        label="Journalier"
                    />
                    <FormControlLabel
                        control={<Checkbox inputRef={isWeeklyRef} name="isWeekly" />}
                        label="Hebdomadaire"
                    />
                    <FormControlLabel
                        control={<Checkbox inputRef={isMonthlyRef} name="isMonthly" />}
                        label="Mensuel"
                    />
                </FormGroup>

                <TextField
                    label="Points"
                    inputRef={pointsRef}
                    name="points"
                    type="number"
                    fullWidth
                    margin="normal"
                    required
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                >
                    Créer
                </Button>
            </form>
            {/* <Button
                onClick={() => resetUserPoints()}
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
            >
                reset points
            </Button> */}
        </Container>
    );
}
