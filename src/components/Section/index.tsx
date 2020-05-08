import s from './styles.module.css'
import { CSSProperties } from "react"

export type SectionProps = {
    style?: CSSProperties 
}

export const Section: React.FC<SectionProps> = props => {
    return (
        <section className={s.section} style={props.style}>
            {props.children}
        </section>
    )
}