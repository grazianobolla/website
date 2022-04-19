import { Component } from 'preact'
import Router from 'preact-router'

import { getRemoteEntries } from '../utils/Remote'

//components
import Footer from './footer'
import Header from './header'

//routes
import Home from '../routes/home'
import Blog from '../routes/blog'
import AboutMe from '../routes/about-me'
import Page from '../routes/page'

import '../styles/style.css'

class App extends Component {
    constructor() {
        super()
        this.state = { entryArray: [] }
    }

    //fetch entries at start
    async componentDidMount() {
        this.setState({ entryArray: await getRemoteEntries('app') })
    }

    render() {
        return (
            <div>
                <Header />
                <Router>
                    <Home path="/" entries={this.state.entryArray} default />
                    <Blog path="/blog" entries={this.state.entryArray} />
                    <AboutMe path="/about-me" />
                    <Page path="/page/:entryid" />
                </Router>
                <Footer />
            </div >
        )
    }
}

export default App