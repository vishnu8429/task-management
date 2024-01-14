import { render, screen } from '@testing-library/react';
import Breadcrumbs from '../Breadcrumbs';

const BreadcrumbsProps = {
    title: 'Task',
};

// test block
test("Breadcrumbs renders successfully", () => {
    // render the component on virtual dom
    render(<Breadcrumbs {...BreadcrumbsProps} />);

    // select the elements you want to interact with
    const element = screen.getByText(/Home/i);

    // assert the expected result
    expect(element).toBeInTheDocument();
});
