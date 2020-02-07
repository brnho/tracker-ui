import React from 'react';

function editFormat(date) {
	return (date != null) ? date.toISOString().substring(0, 10) : '';
}

function displayFormat(date) {
	return (date != null) ? date.toDateString() : '';
}

function unformat(str) {
	const val = new Date(str);
	return Number.isNaN(val.getTime()) ? null : val;
}

export default class DateInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: editFormat(props.value),
			valid: true,
			focused: false
		};
		this.onChange = this.onChange.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.onFocus = this.onFocus.bind(this);
	}

	onFocus() {
		this.setState({ focused: true });
	}

	onChange(e) {
		if (e.target.value.match((/^[\d-]*$/))) {
			this.setState({ value: e.target.value });
		}
	}

	onBlur(e) {
		const { onChange, onValidityChange } = this.props;
		const { value, valid: oldValid } = this.state;
		const dateValue = unformat(value);
		const valid = value === '' || dateValue != null;
		if (valid !== oldValid && onValidityChange) {
			onValidityChange(e, valid);
		}
		this.setState({ valid, focused: false });
		if (valid) onChange(e, dateValue); //call the parent's handler with a date object
	}

	render() {
		const { value, valid, focused } = this.state;
		const { value: origValue, onValidityChange, ...props } = this.props; ///...props includes the className for validation styling
		const displayValue = (focused || !valid) ? value : displayFormat(origValue);
		return (
			<input
				{...props}
				onChange={this.onChange}
				value={displayValue}
				placeholder={focused ? 'yyyy-mm-dd' : null}
				onBlur={this.onBlur}
				onFocus={this.onFocus}
			/>
		);
	}
}