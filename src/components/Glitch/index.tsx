import s from './styles.module.css'
import { CSSProperties } from 'react'

interface GlitchProps {
    image: string
    style?: CSSProperties
}

export const Glitch: React.FC<GlitchProps> = props => (
    <div className={s.imageGlitch}
        style={props.style}
    >
        <div className={s.imageDistortion} id={s.base}
            style={{
                backgroundImage: props.image,
            }}
        ></div>
        <div className={s.imageDistortion} id={s.red}
            style={{
                backgroundImage: props.image,
            }}
        ></div>
        <div className={s.imageDistortion} id={s.cyan}
            style={{
                backgroundImage: props.image,
            }}
        ></div>
        <div className={s.imageDistortion} id={s.transparent}
            style={{
                backgroundImage: props.image,
            }}
        ></div>
        {props.children}
    </div>
)