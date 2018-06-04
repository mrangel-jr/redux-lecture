import React, { Component } from 'react';
import * as moment from 'moment';
import VoteControl from '../components/VoteControl';

class Comment extends Component {
	render()  {
		const {comment, onDeleteClick, onEditClick, onDownClick, onUpClick} = this.props;
    
		return (
			<div className="comment">
        
				<VoteControl voteScore={comment.voteScore} onDownClick={onDownClick} onUpClick={onUpClick}/>
				<div className="infos">
          
					<div className="info">
						<span>{comment.author} - {moment(comment.timestamp).fromNow()}</span>
					</div>

					<span className="text">
						{comment.body}
					</span>
					<div className="actions">
						<a href="#" onClick={onEditClick}>Edit</a>
						<a href="#" onClick={onDeleteClick}>Delete</a>
					</div>
				</div>
        
			</div>
		);
	}
}

export default Comment;