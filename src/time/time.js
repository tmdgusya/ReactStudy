class Clock extends React.Component {

    constructor(props) {
        super(props);
        this.state = {date : new Date()};
    }

    render() {
        return (
        <div>
            <h1>Hello, World</h1>
            <h2>It is {this.state.date.toLocaleDateString()}. </h2>
        </div> )
    }
}

ReactDOM.render(
    <Clock />,
    document.getElementById('root')
)


setInterval(tick, 1000)