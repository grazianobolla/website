import style from './style.css'

import profilePicture from './youtube.jpg'
import githubPicture from './github.png'
import discordPicture from './discord.png'

const Entry = ({ title, image, id }) => (
    <div class={style.entry}>
        <a href={`/page/${id}`}>
            <img src={image} alt={title} />
            <p>{title}</p>
        </a>
    </div>
)

const EntryGrid = ({ entries }) => {
    const latestEntries = entries.slice(-3)

    return (
        <div class={style.entrygrid}>
            {
                latestEntries.map((entry, i) => {
                    return <Entry title={entry.title} image={entry.image} id={entry.id} key={i} />
                })
            }
        </div>
    )
}

const Externals = () => (
    <div class={style.externals}>
        <a href='https://github.com/grazianobolla'>
            <img src={githubPicture} alt='My Github Page' />
            <p>Github</p>
        </a>

        <a href='https://www.youtube.com/channel/UCeWuuf_UPeGnOoB3LbA7j2g'>
            <img src={profilePicture} alt='My Youtube Profile' />
            <p>Youtube</p>
        </a>

        <a href='https://discord.com/users/467489564270002177'>
            <img src={discordPicture} alt='My Discord Profile' />
            <p>Discord</p>
        </a>
    </div>
)

const Home = ({ entries }) => {
    return (
        <div class={style.home}>
            <p class={style.welcome_text}>
                Welcome to my internet slice. Here you will find a collection of projects containing explanations, downloads and videos.
            </p>
            <br />

            <a class={style.about_me_btn} href='/about-me'>Read more about me here!</a>
            <Externals />

            <hr />
            <p style={{ textAlign: 'left', fontSize: 'var(--font-size)', marginBottom: '0px' }}>Latest posts:</p>
            <EntryGrid entries={entries} />
        </div>
    )
}

export default Home
