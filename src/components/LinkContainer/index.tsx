import s from './styles.module.css'
import Link from 'next/link'
import { CSSProperties } from 'react'

interface LinkContainerProps {
    url: string
    style?: CSSProperties 
}

export const LinkContainer: React.FC<LinkContainerProps> = props => {
    return (
        <Link href={props.url}>
            <a
                className={s.aTag}
                href={props.url}
                style={props.style}
            >
                {props.children}
            </a>
        </Link>
    )
}