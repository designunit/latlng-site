import { Section } from '../Section'
import { LinkContainer } from '../LinkContainer'
import { Glitch } from '../Glitch'
import { Highlighted } from '../Highlighted'
import { createBreakpoint } from 'react-use'

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
                <LinkContainer
                    key={index}
                    url={href}
                    external
                    style={{
                        flex: '0 0 30%',
                        marginBottom: '5%',
                    }}
                >
                    <Glitch image={`url(${imageSrc}) `}
                        style={{
                            height: '250px',
                        }}
                    >
                        <div
                            className='highlightedParent'
                            style={{
                                height: '100%',
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                alignItems: 'start',
                            }}
                        >
                            <h2 style={{
                                paddingTop: '5%',
                                paddingLeft: '5%',
                                width: '90%',
                                flex: 1,
                            }}>
                                {label}
                            </h2>

                            <Highlighted style={{
                                width: 'fit-content',
                                fontSize: '1.2rem',
                            }}>
                                {'-->'}
                            </Highlighted>
                            <div style={{ flex: 1 }} />
                        </div>
                    </Glitch>
                </LinkContainer>
            ))}
        </Section>
    )
}