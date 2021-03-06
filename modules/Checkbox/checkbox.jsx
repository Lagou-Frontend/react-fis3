'use strict';
import "./checkbox.less";
import React,{ PropTypes } from "react";
import Icon from "../Icon/icon";
import classnames from "classnames";
class Checkbox extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			checked: !!this.props.checked
		};
	}
	componentWillReceiveProps (nextProps){
		if(nextProps.checked !== this.props.checked){
			this.setState({checked: nextProps.checked});
		}
	}
	handleChange(e){
		if(this.props.readOnly){
			return;
		}
		this.setState({
			checked: e.target.checked
		});
		if(this.props.onChange) {
			this.props.onChange(e.target.checked , this.props.value);
		}
	}
	getValue(){
		return this.state.checked ? (this.props.value||true) : false
	}
	setValue(){
		let checked = value === true || value ===1 || value === this.props.value;
		this.setState({checked});
	}

	render(){
		let className = classnames(this.props.inline?'inline':'','checkbox')
		return (
			<label style= {this.props.style} className={className} >
				<input 	type='checkbox'
						disabled={this.props.readOnly}
						onChange={this.handleChange.bind(this)}
						checked= {this.state.checked}
						value={this.props.value}
						/>
				<Icon icon={this.state.checked?'checkedbox':'checkbox'} />
				{this.props.text}
				{this.props.children}
			</label>
		)
	}
}

Checkbox.propTypes = {
	style:PropTypes.object,
	inline:PropTypes.bool,
	readOnly:PropTypes.bool,
	checked:PropTypes.bool,
	onChange:PropTypes.func,
	text:PropTypes.string,
	children:PropTypes.any
}


export {Checkbox as default};
