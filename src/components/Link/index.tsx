import s from './styles.module.css'
import NextLink from 'next/link'
import { CSSProperties } from 'react'

interface LinkProps {
    url: string
    style?: CSSProperties
    external?: boolean
}

export const Link: React.FC<LinkProps> = ({ url, style, external = false, ...props }) => {
    if (external) {
        return (
            <a
                className={s.link}
                href={url}
                style={style}
                target='_blank'
            >
                {props.children}
            </a>
        )
    }

    return (
        <NextLink
            href={url}
        >
            <a
                className={s.link}
                href={url}
                style={style}
            >
                {props.children}
            </a>
        </NextLink>
    )
}