import React, { Component } from 'react';

class OrderBy extends Component {

	render()  {
		const { value, onChangeClick, options } = this.props;
		return (
			<div>
				<select id="role" name="role" className="form-control" value={value} onChange={onChangeClick}>
					{options.map( option =>(
						<option value={option.value}>{option.name}</option>
					))}
				</select>
			</div>
		);
    
	}
}

export default OrderBy;