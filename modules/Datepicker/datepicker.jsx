'use strict';

import "./datepicker.less";

import React,{ PropTypes } from "react";
import classnames from "classnames";
import Input from "../Input/input";
import Months from "./months";
import Weeks from "./weeks";
import Days from "./days";
import Time from "./time";
import {addClass,removeClass,hasClass,isClickInner} from "../Utils/dom";
import {formatTime} from "../Utils/string";

class Datepicker extends React.Component {
	constructor(props) {
		super(props);
		let currDate = new Date();
		this.state = {
			year:currDate.getFullYear(),
			month:(currDate.getMonth()+1),
			day:currDate.getDate(),
			show:false,
			value:'',
			selectedDay:currDate.getDate(),
			selectedTime:''
		}
	}

	// 处理左右箭头改变年月
	handleMonthChange(year,month){
		this.setState({
			year:year,
			month:month
		})
	}
	componentDidMount(){
		let _this = this;
		document.addEventListener('click',function(e){
			e.stopPropagation();
			let ele = e.target,
				targetEle = _this.refs.datepicker;
			if(_this.state.show && !isClickInner(ele,targetEle)){
				_this.hide();
			}

		})
	}
	// 设置input的值
	setDateValue(){
		let type = this.props.type,format = this.props.format||'yyyy-MM-dd',date;
		let _month = this.state.month<10?('0'+this.state.month):this.state.month.toString();
		let _day = this.state.selectedDay<10?('0'+this.state.selectedDay):this.state.selectedDay.toString();
		switch (type) {
			case 'date':
				date = formatTime(this.state.year.toString()+_month+_day,format);
				break;
			case 'time':
				date = this.state.selectedTime;
				break;
			default:
				date = formatTime(this.state.year.toString()+_month+_day,format)+' '+this.state.selectedTime
		}
		this.setState({value:date});
	}

	hide(){
		this.setState({show:false})
	}

	show(){
		this.setState({show:true})
	}
	handleClick(e){
		e.stopPropagation();
		let show = this.state.show;
		if(!show){
			this.show();
		}
	}

	// 处理单击某天
	handleSetDay(day){
		let _this = this;
		_this.setState({selectedDay:day});
		setTimeout(function() {
			_this.setDateValue();
			if(_this.props.type === 'date'){
				_this.hide();
			}
		}, 0);
	}

	handleSetTime(time){
		let _this = this;
		_this.setState({selectedTime:time});
		setTimeout(function() {
			_this.setDateValue();
			if(_this.props.type !== 'date'){
				_this.hide();
			}
		}, 0);
	}
	render(){
		let className = classnames('datepicker',this.props.className,this.state.show?'active':'');
		return (
			<div ref='datepicker' className={className} style={this.props.style}>
				<Input placeholder={this.props.placeholder} icon="arrow-down" value={this.state.value} onClick={this.handleClick.bind(this)} readOnly/>
				<div className="datepicker-container clearfix">
					<div className="datepicker-date fl" style={this.props.type ==='time'?{display:'none'}:{display:'block'}}>
						<Months lang={this.props.lang||'CN'} year={this.state.year} month={this.state.month} onChange={this.handleMonthChange.bind(this)}/>
						<Weeks lang={this.props.lang||'CN'}/>
						<Days year={this.state.year} month={this.state.month} day={this.state.day} setDay={this.handleSetDay.bind(this)}/>
					</div>
					<div className="datepicker-time fl" style={this.props.type ==='date'?{display:'none'}:{display:'block'}} >
						<Time step={this.props.step} timeStart={this.props.timeStart} timeEnd={this.props.timeEnd} setTime={this.handleSetTime.bind(this)} />
					</div>
				</div>
			</div>
		)
	}
}
Datepicker.propTypes = {
	style:PropTypes.object,
	placeholder:PropTypes.string,
	lang:PropTypes.string,
	type:PropTypes.string,
	format:PropTypes.string,
	step:PropTypes.string,
	timeStart:PropTypes.string,
	timeEnd:PropTypes.string
}
export {Datepicker as default};
