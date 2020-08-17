import { Section } from '../Section'
import { LinkContainer } from '../LinkContainer'
import { Glitch } from '../Glitch'
import { Highlighted } from '../Highlighted'
import { createBreakpoint } from 'react-use'

const breakpoint = createBreakpoint({ mobile: 1024, laptop: 1440, desktop: 1920 })

export const Examples: React.FC = () => {
    const isMobile = breakpoint() === 'mobile'

    const examples = [
        {
            picturePath: '/static/cat.png',
            text: 'Oyamikon'
        },
        {
            picturePath: '/static/cat.png',
            text: 'Pitkäranta'
        },
        {
            picturePath: '/static/cat.png',
            text: 'Yrai - HMAO'
        },
        {
            picturePath: '/static/cat.png',
            text: 'Oyamikon'
        },
    ]

    return (
        <Section
            style={{
                width: '100%',
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
            }}
        >
            {examples.map(({ picturePath, text }) => (
                <LinkContainer url='' 
                    style={{
                        flex: '0 0 30%',
                        marginBottom: '5%',
                    }}
                >
                <Glitch image={`url(${picturePath}) `}
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
                                position: 'relative',
                                top: '5%',
                                left: '5%',
                            }}>
                                {text}
                            </h2>  

                            <Highlighted style={{
                                width: 'fit-content', 
                                fontSize: '1.2rem',
                            }}>
                                {'-->'}
                            </Highlighted>
                        <div/>
                    </div>
                </Glitch>
            </LinkContainer>
            ))}
        </Section>
    )
}