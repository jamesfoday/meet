import React, { Component } from 'react';

// Base Alert component
class Alert extends Component {
    constructor(props) {
        super(props);
        this.color = null;
        this.bgColor = null;
    }

    getStyle = () => {
        return {
            color: this.color,
            backgroundColor: this.bgColor,
            borderWidth: '2px',
            borderStyle: 'solid',
            fontWeight: 'bolder',
            borderRadius: '7px',
            borderColor: this.color,
            textAlign: 'center',
            fontSize: '12px',
            margin: '10px 0',
            padding: '10px',
        };
    };

    render() {
        return (
            <div className="Alert">
                <p style={this.getStyle()}>{this.props.text}</p>
            </div>
        );
    }
}

// InfoAlert extending Alert
class InfoAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = 'rgb(0, 0, 255)';
        this.bgColor = 'rgb(220, 220, 255)';
    }

    render() {
        return super.render();
    }
}

// ErrorAlert extending Alert
class ErrorAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = 'rgb(255, 0, 0)';
        this.bgColor = 'rgb(255, 220, 220)';
    }

    render() {
        return super.render();
    }
}

// ✅ New WarningAlert extending Alert
class WarningAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = 'rgb(255, 165, 0)'; // orange
        this.bgColor = 'rgb(255, 240, 200)';
    }

    render() {
        return super.render();
    }
}

export { InfoAlert, ErrorAlert, WarningAlert };
