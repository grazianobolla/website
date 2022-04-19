import { Component } from "preact"

class ToggleButton extends Component {
    constructor() {
        super()
        this.state = false
    }

    toggleFunc() {
        this.state = !this.state

        document.documentElement.setAttribute('data-theme', this.state ? 'dark' : 'light')
    }

    render() {
        return (
            <button onClick={this.toggleFunc}>Toggle</button>
        )
    }
}

export default ToggleButton