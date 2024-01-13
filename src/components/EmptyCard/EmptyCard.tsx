import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AssignmentIcon from '@mui/icons-material/Assignment';

type EmptyCardProps = {
    title: string;
    message: string;
};

/**
 * Empty card
 * 
 * @param {*} EmptyCardProps 
 */
const EmptyCard: React.FC<EmptyCardProps> = ({ title, message }: EmptyCardProps): JSX.Element => {
    return (
        <Card
            sx={{
                p: 16,
                mb: 2,
                textAlign: "center"
            }}
        >
            <CardContent>
                <AssignmentIcon color='primary' sx={{ fontSize: 54 }} />
                <Typography sx={{ fontSize: 26, fontWeight: 'bold', mb: 1 }}>{title}</Typography>
                <Typography variant="body2">{message}</Typography>
            </CardContent>
        </Card>
    );
};

export default EmptyCard;