import { createBreakpoint } from "react-use"
import { LinkContainer } from "../LinkContainer"
import { LinkText } from "../LinkText"
import { Section } from "../Section"

interface HeroProps {
    mouse: number
    rotation: number
    mousePos: [number, number]
}

const Hero: React.FC<HeroProps> = ({ mouse, rotation, mousePos }) => {
    const breakpoint = createBreakpoint({ mobile: 1024, laptop: 1440, desktop: 1920 })
    const isMobile = breakpoint() === 'mobile' 

    return (
        <Section style={{
            height: '100vh',
            width: '100%',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignContent: 'space-between',
        }}>
            <h1 style={{
                flex: isMobile ? '1 0 100%' : '1 0 50%',
            }}>
                <span style={{
                    userSelect: 'text',
                    WebkitUserSelect: 'text',
                }}>
                    LATL.NG<br/>
                    <span style={{
                        fontSize : isMobile ? '26px' : null
                    }}>
                        cloud geoinformation system
                    </span>
                </span>
            </h1>
            {isMobile ? null : (
                <div style={{
                    flex: '1 0 50%', 
                    alignSelf: 'flex-end',
                    alignItems: 'end',
                    textAlign: 'end', 
                }}>
                    <span style={{
                        userSelect: 'text',
                        WebkitUserSelect: 'text',
                    }}>
                        angle: {(Math.abs(rotation % 360)).toFixed(4)} <br/>
                        speed: {(mouse ?? .05).toFixed(4)} <br/>
                        cursor X: {`${!mousePos ? 'not detected' : mousePos[0].toFixed(4)}`} <br/>
                        cursor Y: {`${!mousePos ? 'not detected' : mousePos[1].toFixed(4)}`} <br/>
                    </span>
                </div>
            )}
            <div style={{
                flex: '1 0 50%',    
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'start', 
                    userSelect: 'text',
                    WebkitUserSelect: 'text',
                    width: 'fit-content',
                }}>
                    <LinkContainer url='#about'>
                        <LinkText>
                            what's latl.ng?
                        </LinkText>
                    </LinkContainer>
                    <LinkContainer url='#examples'>
                        <LinkText>
                            work examples
                        </LinkText>
                    </LinkContainer>
                </div>
            </div>
            {isMobile ? null : (
                <div style={{
                    flex: '1 0 50%',
                    alignSelf: 'flex-end',
                    textAlign: 'end',
                }}>
                    <span style={{
                        userSelect: 'text',
                        WebkitUserSelect: 'text',
                    }}>
                        <a 
                            href='mailto:inbox@unit4.io'
                            style={{
                                textDecoration: 'none',
                            }}
                        >
                            <LinkText>
                                inbox@unit4.io
                            </LinkText>
                        </a>
                    </span>
                </div>
            )}
        </Section>
    )
}

export default Hero