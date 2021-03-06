import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Image } from 'cloudinary-react';
import { fetchSomeMembers } from '../../actions';
import moment from 'moment';

class MemberList extends PureComponent {
	componentDidMount() {
		this.props.fetchSomeMembers();
	}

	renderMembers() {
		return this.props.members.reverse().map(({ _id, firstName, lastName, email, birthDate, imageUrl }) => {
			return (
				<Fragment key={_id}>
					<div>
						<Fragment>
							{imageUrl ? (
								<Image
									cloudName={process.env.REACT_APP_CLOUD_NAME}
									publicId={imageUrl}
									width="100"
									crop="scale"
								/>
							) : (
								<Image
									cloudName={process.env.REACT_APP_CLOUD_NAME}
									publicId={process.env.REACT_APP_PUBLIC_ID}
									width="100"
									crop="scale"
								/>
							)}
						</Fragment>
						<Link to={`/members/${_id}`}>
							<h4>
								{firstName} {lastName}
							</h4>
						</Link>
						<p>{email}</p>
						<p>Born: {moment(birthDate).format('MMMM Do, YYYY')}</p>
					</div>
				</Fragment>
			);
		});
	}

	render() {
		return <div>{this.renderMembers()}</div>;
	}
}

function mapStateToProps({ members }) {
	return {
		members
	};
}

export default connect(mapStateToProps, { fetchSomeMembers })(MemberList);
