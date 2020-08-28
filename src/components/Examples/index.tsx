import { Section } from '../Section'
import { Link } from '../Link'
import { Glitch } from '../Glitch'
import { Highlighted } from '../Highlighted'
import { createBreakpoint } from 'react-use'
import { Item } from './Item'

const breakpoint = createBreakpoint({ mobile: 0, desktop: 1025 })

export type ExamplesProps = {
    items: Array<{
        label: string
        href: string
        imageSrc: string
    }>
}

export const Examples: React.FC<ExamplesProps> = props => {
    const isMobile = breakpoint() === 'mobile'

    return (
        <Section
            style={{
                width: '100%',
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
            }}
        >
            {props.items.map(({ imageSrc, label, href }, index) => (
                <Link
                    key={index}
                    url={href}
                    external
                    style={{
                        flex: '0 0 30%',
                        marginBottom: '5%',
                        position: 'relative',
                    }}
                >
                    <Item style={{
                        border: '2px solid var(--color)',
                    }}>
                        <Glitch image={imageSrc}
                            style={{
                                height: '250px',
                            }}
                        >
                        </Glitch>
                        <Highlighted
                            as={'h2'}
                            color={'var(--color)'}
                            style={{
                                color: 'var(--color-white)',

                                position: 'absolute',
                                top: 0,
                                left: 0,
                            }}
                        >
                            {label}
                        </Highlighted>

                        <Highlighted
                            color={'var(--color)'}
                            style={{
                                color: 'var(--color-white)',

                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                            }}
                        >
                            {'⟶'}
                        </Highlighted>
                    </Item>
                </Link>
            ))}
        </Section >
    )
}