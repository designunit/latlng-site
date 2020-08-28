import s from './styles.module.css'
import highlightedStyles from '../Highlighted/styles.module.css'
import { CSSProperties } from 'react'

const url = (src: string) => `url(${src})`

interface GlitchProps {
    image: string
    style?: CSSProperties
}

export const Glitch: React.FC<GlitchProps> = props => (
    <div className={`${s.imageGlitch} ${highlightedStyles.highlightedParent}`}
        style={props.style}
    >
        <div className={s.imageDistortion}
            style={{
                backgroundImage: url(props.image),
                zIndex: 0,
            }}
        />
        <div className={s.imageDistortion} id={s.red}
            style={{
                backgroundImage: url(props.image),
            }}
        />
        <div className={s.imageDistortion} id={s.cyan}
            style={{
                backgroundImage: url(props.image),
            }}
        />
        <div className={s.imageDistortion} id={s.transparent}
            style={{
                backgroundImage: url(props.image),
            }}
        />
        {props.children}
    </div>
)