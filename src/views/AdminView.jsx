import { generateClient } from 'aws-amplify/data';
import { Container, TextField, Checkbox, FormControlLabel, Button, FormGroup, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import React, { useRef, useState } from 'react';
import { FacebookRounded, Instagram, LinkedIn, Twitter, YouTube } from '@mui/icons-material';

const client = generateClient();

export default function AdminView() {
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);
    const isDoneRef = useRef(null);
    const isDailyRef = useRef(null);
    const isWeeklyRef = useRef(null);
    const isMonthlyRef = useRef(null);
    const pointsRef = useRef(null);
    const [socialNetwork, setSocialNetwork] = useState(null);

    const resetUserPoints = async () => {
        try {
            const user = await client.models.User.list();
            if (user.data.length > 0) {
                await client.models.User.update({
                    id: user.data[0].id,
                    points: 0,
                });
                window.location.reload();
                alert("User points reset successfully!");
            }
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
                socialNetwork,
                points,
            });
            alert("Tâche créée avec succès!");
        } catch (error) {
            console.error("Failed to create todo:", error);
            alert("An error occurred while creating the task.");
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

                <FormControl fullWidth margin="normal">
                    <InputLabel id="social-network-label">Réseau social</InputLabel>
                    <Select
                        labelId="social-network-label"
                        value={socialNetwork || ''}
                        onChange={(event) => setSocialNetwork(event.target.value)}
                    >
                        <MenuItem value="">Aucun</MenuItem>
                        <MenuItem value="facebook"><FacebookRounded sx={{ mr: 1 }} /> Facebook</MenuItem>
                        <MenuItem value="twitter"><Twitter sx={{ mr: 1 }} /> Twitter</MenuItem>
                        <MenuItem value="instagram"><Instagram sx={{ mr: 1 }} /> Instagram</MenuItem>
                        <MenuItem value="linkedin"><LinkedIn sx={{ mr: 1 }} /> LinkedIn</MenuItem>
                        <MenuItem value="youtube"><YouTube sx={{ mr: 1 }} /> YouTube</MenuItem>
                    </Select>
                </FormControl>

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                >
                    Créer
                </Button>
            </form>
            <Button
                onClick={resetUserPoints}
                variant="contained"
                color="secondary"
                sx={{ mt: 2 }}
            >
                Réinitialiser les points
            </Button>
        </Container>
    );
}
