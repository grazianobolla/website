import Markdown from 'preact-markdown'
import Prism from 'prismjs'
import { getRemoteData } from '../../utils/Remote'
import { parseDate } from '../../utils/Utils'
import { Component } from 'preact'

import '../../styles/mod-prism-okaidia.css'
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-cpp'

import style from './style.css'
import { DiscussionEmbed } from '../../components/disqus'

const markedOpts =
{
    highlight(code, lang) {
        if (Prism.languages[lang])
            return Prism.highlight(code, Prism.languages[lang], lang)

        return Prism.highlight(code, Prism.languages['cpp'], 'cpp')
    }
}

class Page extends Component {
    constructor(props) {
        super(props)
        this.state = { ok: false }
    }

    async componentDidMount() {
        const info = await getRemoteData(this.props.entryid)

        if (info !== false)
            this.setState({ ok: true, ...info })
    }

    render() {
        const entry = this.state

        if (!entry.ok)
            return (<p style={{ fontSize: 'xx-large' }}>Loading...</p>)

        console.log('disqus data:', location.href, entry.id, entry.title)

        return (
            <div class={style.page}>
                <h1>{entry.title}</h1>
                <p>Published {parseDate(entry.date)}</p>
                <hr />
                <Markdown markdown={entry.data} markedOpts={markedOpts} />
                <DiscussionEmbed shortname='grazianobolla'
                    config={
                        {
                            url: location.href,
                            identifier: entry.id,
                            title: entry.title,
                            language: 'en'
                        }
                    } />
            </div>
        )
    }
}

export default Page