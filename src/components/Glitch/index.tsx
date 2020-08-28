import s from './styles.module.css'

const url = (src: string) => `url(${src})`

interface GlitchProps {
    image: string
    style?: React.CSSProperties
}

export const Glitch: React.FC<GlitchProps> = props => (
    <div className={s.glitch}
        style={props.style}
    >
        <div className={s.distortion}
            style={{
                backgroundImage: url(props.image),
                zIndex: 0,
            }}
        />
        <div className={s.distortion} id={s.red}
            style={{
                backgroundImage: url(props.image),
            }}
        />
        <div className={s.distortion} id={s.cyan}
            style={{
                backgroundImage: url(props.image),
            }}
        />
        <div className={s.distortion} id={s.transparent}
            style={{
                backgroundImage: url(props.image),
            }}
        />

        {props.children}
    </div>
)