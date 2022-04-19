import style from './style.css'

import profilePicture from './youtube.webp'
import githubPicture from './github.webp'
import discordPicture from './discord.webp'

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
            <h1 class={style.welcome}>Hi, I'm Graziano</h1>
            <p class={style.welcome_text}>
                Since I've started programming, I have accumulated multiple projects in a great variety of topics,
                including things like <span children='graphics rendering' /> (OpenGL/C++), <span children='real time video-game networking' />,
                various <span children='social network bots' /> and native <span children="graphical UI's" /> (wxWidgets, Flutter, FLTK, etc)
                between many other things. I enjoy writing neat clean code.
            </p>
            <br />
            <p class={style.welcome_text}>
                Here you can find a collection of most of my projects containing explanations, downloads and videos.
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
