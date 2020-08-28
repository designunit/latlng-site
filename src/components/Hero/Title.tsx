import { useMobile } from "@/hooks/useMobile"

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>

export const Title: React.FC<Props> = props => {
    const isMobile = useMobile()

    return (
        <h1 {...props}>
            <span style={{
                userSelect: 'text',
                WebkitUserSelect: 'text',
            }}>
                LATL.NG<br />

                <span style={{
                    fontSize: isMobile ? '26px' : null
                }}>
                    cloud geoinformation system
                </span>
            </span>
        </h1>
    )
}
