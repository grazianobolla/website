import style from './style.css'

import { useState, useEffect } from 'preact/hooks'
import { parseDate } from '../../utils/Utils'
import { Fragment } from 'preact'

const ListEntry = ({ entryData }) => (
    <a href={`/page/${entryData.id}`} class={style.entry_element}>
        <img src={entryData.image} alt={entryData.title} />
        <p class={style.entry_element} id="title">{entryData.title}</p>
        <p class={style.entry_element} id="date">{parseDate(entryData.date)}</p>
    </a>
)

const BlogEntries = ({ entriesArray }) => {
    const [entries, setEntries] = useState([])

    useEffect(() => { setEntries(entriesArray) }, [entriesArray])

    function handleInput(e) {
        const str = e.target.value
        if (str == null || str[0] === ' ')
            return

        const finds = entriesArray.filter((element) => {
            const title = element.title
            return title.includes(str)
        })

        if (finds.length != entries.length) {
            setEntries(finds)
        }
    }

    return (
        <Fragment>
            <div class={style.entries_header}>
                <input type="text" placeholder="Search..." onInput={handleInput} />
            </div>

            <div class={style.entries_list}>
                {
                    (entries.length > 0) ?

                        entries.map((entry) => {
                            return (<ListEntry entryData={entry} />)
                        })

                        :

                        <p style={{ textAlign: 'center', fontSize: 'x-large', filter: 'opacity(20%)' }}>No posts found</p>
                }
            </div>
        </Fragment>
    )
}

const Blog = ({ entries }) => (
    <div class={style.blog}>
        <p id={style.description}>Find or explore all my posts here.</p>
        <hr />
        <BlogEntries entriesArray={entries} />
    </div>
)

export default Blog