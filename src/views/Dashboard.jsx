import React from 'react';
import { Grid } from '@mui/material';
import ToDoList from '../components/ToDoList';

const Dashboard = () => {
    const dailyTasks = [
        { id: 0, title: 'Défi de la gratitude', description: 'Partagez une chose pour laquelle vous êtes reconnaissant. Invitez vos amis à faire de même.', completed: false },
        { id: 1, title: 'Défi de l’encouragement', description: 'Laissez un commentaire positif sur une publication d\'un de vos amis ou d\'inconnus.', completed: false },
        { id: 2, title: 'Défi de bienveillance', description: 'Faites des gestes de bienveillance en ligne, comme envoyer des messages d\'encouragement à des amis.', completed: false },
        { id: 3, title: 'Défi partage', description: 'Publiez des ressources sur la santé mentale et encouragez la discussion ouverte sur le sujet.', completed: false },
    ];

    const weeklyTasks = [
        { id: 4, title: 'Défi de la semaine sans critique', description: ' Engagez-vous à ne pas critiquer ou commenter négativement pendant une semaine. Partagez votre expérience.', completed: false },
        { id: 5, title: 'Défi de la semaine des passions', description: 'Créez une série de posts où vous partagez vos passions et invitez les autres à faire de même.', completed: false },
    ];

    const monthlyTasks = [
        { id: 6, title: 'Défi des bonnes nouvelles', description: 'Créez un groupe ou un hashtag pour partager uniquement des nouvelles positives et inspirantes', completed: false },
        { id: 7, title: 'Défi du mois du soutien', description: 'Proposer de soutenir une cause ou un mouvement positif et encouragez vos amis à faire de même.', completed: false },
        { id: 8, title: 'Défi du mois contre le harcèlement', description: 'Sensibilisez vos abonnés aux effets du harcèlement en ligne. Partagez des témoignages et des solutions.', completed: false },
    ];

    return (
        <Grid container spacing={2} sx={{ backgroundColor: 'primary.main', padding: '20px', margin:0 }}>
            <Grid item xs={4}>
                <ToDoList tasks={dailyTasks} title="Daily Tasks" />
            </Grid>
            <Grid item xs={4}>
                <ToDoList tasks={weeklyTasks} title="Weekly Tasks" />
            </Grid>
            <Grid item xs={4}>
                <ToDoList tasks={monthlyTasks} title="Monthly Tasks" />
            </Grid>
        </Grid>
    );
};

export default Dashboard;
