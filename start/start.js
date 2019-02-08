import React from 'react';

class Start extends React.Component {
    constructor(props) {
        super(props);
        this.state = {first: '', second: ''} 
    }

    handleChange = (event) => {
        let target = event.target;
        this.setState({[target.name]: target.value});
    }

    handleSubmit = () => {
        this.props.getPlayers([{name: this.state.first, catched: []}, {name: this.state.second, catched: []}]);
    }

    render () {
        return (
            <>
            <p>Please enter the names of the opponents</p>
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label className="">Player 1 (Black):</label>
                    <input className=""type="text" value={this.state.first} name="first" onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label className="">Player 2 (White):</label>
                    <input className="" type="text" value={this.state.second} name="second" onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <input className="btn btn-success" type="Submit" value="Submit" />
                </div>
            </form>
            </>
        )
    }
}

export default Start;