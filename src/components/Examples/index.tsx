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
                    <Glitch image={imageSrc}
                        style={{
                            height: '250px',
                        }}
                    >
                    </Glitch>
                    <Item style={{
                        pointerEvents: 'none',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                    }}>
                        <Highlighted
                            as={'h2'}
                            color={'var(--color)'}
                            style={{
                                // alignSelf: 'flex-end',
                                color: 'var(--color-white)'
                            }}
                        >
                            {label}
                        </Highlighted>

                        <div style={{ flex: 1 }} />

                        <Highlighted
                            color={'var(--color)'}
                            style={{
                                alignSelf: 'flex-end',
                                color: 'var(--color-white)'
                            }}
                        >
                            {'⟶'}
                        </Highlighted>
                    </Item>
                </Link>
            ))}
        </Section>
    )
}