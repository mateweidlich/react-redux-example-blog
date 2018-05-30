import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
	renderField(field) {
		const { meta: { touched, error } } = field;
		const className = `form-group ${touched && error ? 'has-danger' : ''}`;

		return (
			<div className={className}>
				<label>{field.label}</label>
				<input type="text" className="form-control" {...field.input} />
				<div className="text-help">{touched ? error : ''}</div>
			</div>
		);
	}

	onSubmit(values) {
		this.props.createPost(values, () => {
			this.props.history.push('/');
		});
	}

	render() {
		return (
			<form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
				<Field component={this.renderField} name="title" label="Title" />
				<Field component={this.renderField} name="categories" label="Categories" />
				<Field component={this.renderField} name="content" label="Content" />
				<button type="submit" className="btn btn-primary">Submit</button>
				<Link to="/" className="btn btn-danger">Cancel</Link>
			</form>
		);
	}
}

function validate(values) {
	const errors = {};

	if (!values.title || values.title.length < 3) {
		errors.title = 'Enter a title that is at least 3 characters!';
	}

	if (!values.categories) {
		errors.categories = 'Enter some categories!';
	}

	if (!values.content) {
		errors.content = 'Enter some content!';
	}

	return errors;
}

export default reduxForm({
	validate,
	form: 'PostsNewForm'
})(
	connect(null, { createPost })(PostsNew)
);