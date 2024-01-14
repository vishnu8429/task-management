import { render } from '@testing-library/react';
import App from './App';

// test block
test('App main block renders successfully', () => {
  // render the component on virtual dom
  render(<App />);

  // select the elements you want to interact with
  // const element = screen.getByText(/Task Management/i);

  // assert the expected result
  // expect(element).toBeInTheDocument();
});
