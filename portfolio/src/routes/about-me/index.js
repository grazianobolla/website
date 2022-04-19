import style from './style.css'
import imageMe from './me.jpg'
import imageTeo from './teodoro.jpg'
import imageLuna from './luna.jpg'

const AboutMe = () => (
    <Fragment>
        <div class={style.flex_container}>
            <div class={style.profile_container}>
                <div>
                    <img class={style.profiles} src={imageTeo}></img>
                    <img class={style.profiles} src={imageMe}></img>
                    <img class={style.profiles} src={imageLuna}></img>
                    <p>Teodoro, Graziano and Luna</p>
                </div>
            </div>
            <p class={style.about_me_text}>
                I was born in 2003 <a href='https://en.wikipedia.org/wiki/Uruguay'>(Montevideo, Uruguay)</a> and since then I have done nothing but <span>love computers</span>,
                I have gone through many stages since I was younger and they all involve my love for technology and especially programming:
                from wanting to make my own video games to wanting to create my own operating system.
                Over time I learned many valuable things that go way beyond just coding, <span>such as being organized, learning to work in a team,
                    being realistic with expectations</span> and <span>write readable code</span>. I've experimented with a thousand different infrastructures,
                languages and technologies: and I don't want to do anything other than <span>keep learning</span>.
            </p>
        </div>
    </Fragment>
)

export default AboutMe