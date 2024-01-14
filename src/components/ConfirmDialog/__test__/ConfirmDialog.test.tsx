import { fireEvent, render, screen } from '@testing-library/react';
import ConfirmDialog from '../ConfirmDialog';

const ConfirmDialogProps = {
    open: true,
    onCancel: () => {},
    onConfirm: () => {},
};

// test block
test("ConfirmDialog renders successfully", () => {
    // render the component on virtual dom
    render(<ConfirmDialog {...ConfirmDialogProps} />);

    // select the elements you want to interact with
    const element = screen.getByText(/Confirm Delete/i);
    // const confirmBtn = screen.getByTestId("dialog-confirm-button");
    // const cancelBtn = screen.getByTestId("dialog-cancel-button");

    // // interact with those elements
    // fireEvent.click(confirmBtn);
    // fireEvent.click(cancelBtn);

    // assert the expected result
    expect(element).toBeInTheDocument();
});
