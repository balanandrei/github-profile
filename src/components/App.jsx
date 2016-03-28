import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Profile from './github/Profile.jsx';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: 'balanandrei',
			userData: [],
			userRepos: [],
			perPage: 10
		}
	}

	// Get user data from github
	getUserData() {
		$.ajax({
			url: 'https://api.github.com/users/'+this.state.username+'?client_id='+this.props.clientId+'&client_secret='+this.props.clientSecret,
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({userData: data})
				console.log(data);
			}.bind(this),
			error: function(xhr, status, err) {
				this.setState({username: null});
				alert(err);
			}.bind(this)
		});
	}

	// get User Repos
	getUserRepos() {
		$.ajax({
			url: 'https://api.github.com/users/'+this.state.username+'/repos?per_age='+this.state.perPage+'&client_id='+this.props.clientId+'&client_secret='+this.props.clientSecret+'&sort=created',
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({userRepos: data})
			}.bind(this),
			error: function(xhr, status, err) {
				this.setState({username: null});
				alert(err);
			}.bind(this)
		});
	}

	componentDidMount() {
		this.getUserData();
		this.getUserRepos();
	}

	render() {
		return(
			<div>
				<Profile {...this.state} />
			</div> 
		) 
	}
}

App.propTypes = {
	clientId: React.PropTypes.string,
	clientSecret: React.PropTypes.string
};

App.defaultProps = {
	clientId: '53dd38bc8ef9bec18daf',
	clientSecret: '57f54f0b2abc5767b34475ab20889b874d707396'
}

export default App