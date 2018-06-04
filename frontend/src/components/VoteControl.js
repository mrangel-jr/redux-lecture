import React, { Component } from 'react';

class VoteControl extends Component {

	render()  {
		const { voteScore, onDownClick, onUpClick } = this.props;
    
		return (
			<div className="vote-control">
				<button className="fa fa-thumbs-o-up upVote" onClick={onUpClick} />
				<span className="votes">{voteScore}</span>
				<button className="fa fa-thumbs-o-down  downVote" onClick={onDownClick} />
			</div>
		);
	}
}

export default VoteControl;