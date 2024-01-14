import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type ConfirmDialogProps = {
    open: boolean;
    onCancel: Function | any;
    onConfirm: Function | any;
};

/**
 * Confirm dialog
 * 
 * @param ConfirmDialogProps 
 * @returns 
 */
const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
    open,
    onCancel,
    onConfirm,
}: ConfirmDialogProps): JSX.Element => {
    return (
        <Dialog
            open={open}
            onClose={onCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete this task?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button id="dialog-confirm-button" onClick={onConfirm} autoFocus>Yes</Button>
                <Button id="dialog-cancel-button" color='secondary' onClick={onCancel}>No</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;