import Link from 'next/link'

interface LinkContainerProps {
    url: string
}

export const LinkContainer: React.FC<LinkContainerProps> = props => {
    return (
        <Link href={props.url}>
            <a
                href={props.url}
            >
                {props.children}
            </a>
        </Link>
    )
}