import { useEffect, useState } from 'preact/compat'
import Markdown from 'preact-markdown'
import Prism from 'prismjs';
import { getRemoteData } from '../../utils/Remote'
import { parseDate } from '../../utils/Utils';

import '../../styles/mod-prism-okaidia.css'
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';

import style from './style.css'
import { DiscussionEmbed } from '../../components/disqus';

const Page = ({ entryid }) => {
    const [entry, setEntry] = useState({});

    useEffect(() => {
        async function fetchData() {
            const info = await getRemoteData(entryid);

            if (info !== false)
                setEntry({ ok: true, ...info });
        }

        fetchData();
    }, []);

    const markedOpts =
    {
        highlight(code, lang) {
            if (Prism.languages[lang])
                return Prism.highlight(code, Prism.languages[lang], lang);

            return Prism.highlight(code, Prism.languages['cpp'], 'cpp');
        }
    };

    if (entry.ok) {
        console.log('disqus data:', location.href, entry.id, entry.title);

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
        );
    }
    else return (
        <Fragment>
            <p style={{ fontSize: 'xx-large' }}>Loading...</p>
        </Fragment>
    );
}

export default Page;