import { Section } from '../Section'
import { LinkContainer } from '../LinkContainer'
import { Glitch } from '../Glitch'
import { Highlighted } from '../Highlighted'
import { createBreakpoint } from 'react-use'

const breakpoint = createBreakpoint({ mobile: 0, desktop: 1025 })

export const Examples: React.FC = () => {
    const isMobile = breakpoint() === 'mobile'

    const examples = [
        {
            picturePath: '/static/maps/uray.jpg',
            text: 'Берегурай - Uray',
            link: 'https://app.latl.ng/map/bereguray',
        },
        {
            picturePath: '/static/maps/nyagan.jpg',
            text: 'Нягань - Nyagan',
            link: 'https://app.latl.ng/map/nyagan',
        },
        {
            picturePath: '/static/maps/oymyakon.jpg',
            text: 'Оймякон - Oymyakon',
            link: 'https://oymyakon.unit4.io',
        },
        {
            picturePath: '/static/maps/ohta.jpg',
            text: 'Охта - Ohta reasearch',
            link: 'https://app.latl.ng/map/55PO6VNLVJQ8HIQ4'
        },
        {
            picturePath: '/static/maps/pitkaranta.jpg',
            text: 'Питкяранта - Pitkaranta',
            link: 'https://app.latl.ng/map/pitkaranta',
        },
        {
            picturePath: '/static/maps/uray-research.jpg',
            text: 'Урай волонтеры - Uray reasearch',
            link: 'https://uray.unit4.io/map',
        },
        {
            picturePath: '/static/maps/pitkaranta-research.jpg',
            text: 'Питкяранта карта памяти - Pitkaranta research',
            link: 'https://app.latl.ng/map/ID0OT642D8TRHKGP',
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
            {examples.map(({ picturePath, text, link }, index) => (
                <LinkContainer
                    key={index}
                    url={link}
                    external
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
                                paddingTop: '5%',
                                paddingLeft: '5%',
                                width: '90%',
                                flex: 1,
                            }}>
                                {text}
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