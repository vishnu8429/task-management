import { Component } from 'react';

import { images } from '../../core';
import './ErrorBoundary.scss';

/**
 * Error boundary
 */
class ErrorBoundary extends Component {

	constructor(props) {
		super(props);

		this.state = {
			hasError: false,
			error: null,
			errorInfo: null
		};
	}

	componentDidCatch(error, info) {
		this.setState({
			hasError: true,
			error: error,
			errorInfo: info
		});
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className='error-boundary-container'>
					<img src={images.error} alt='error-boundary' />
					<div className='content'>
						<h4><b>Sorry Something went wrong</b></h4>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;