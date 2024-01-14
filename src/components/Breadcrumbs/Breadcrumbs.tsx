import { useHistory } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { routes } from '../../core';

type BreadcrumbsProps = {
    title: string;
};

/**
 * Breadcrumbs
 * 
 * @param title 
 * @returns 
 */
const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ title }: BreadcrumbsProps): JSX.Element => {

    const history = useHistory();

    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography color="primary" sx={{ fontSize: 20, fontWeight: 'bold' }}>{title}</Typography>
            <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                <Typography sx={{ fontSize: 12, cursor: 'pointer' }} onClick={() => history.push(routes.home)}>Home</Typography>
                <Typography sx={{ fontSize: 12 }}>/</Typography>
                <Typography sx={{ fontSize: 12 }} color='primary'>{title}</Typography>
            </Box>
        </Box>
    );
};

export default Breadcrumbs;
