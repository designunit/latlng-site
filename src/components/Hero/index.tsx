import { useMedia } from "react-use"
import { LinkContainer } from "../LinkContainer"
import { LinkText } from "../LinkText"
import { Section } from "../Section"

interface HeroProps {
    mouse: number
    rotation: number
    mousePos: any
}

const Hero: React.FC<HeroProps> = ({ mouse, rotation, mousePos }) => {
    const isMobile = useMedia('(max-width: 768px)', false)

    return (
        <Section style={{
            height: '100vh',
            width: '100%',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignContent: 'space-between',
        }}>
            <h1 style={{
                flex: '1 0 50%',
            }}>
                <span style={{
                    userSelect: 'text', 
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
                <span style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'start', 
                    userSelect: 'text',
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
                </span>
            </div>
            {isMobile ? null : (
                <div style={{
                    flex: '1 0 50%',
                    alignSelf: 'flex-end',
                    textAlign: 'end',
                }}>
                    <span style={{
                        userSelect: 'text', 
                    }}>
                        <LinkContainer url='mailto:inbox@unit4.io'>
                            <LinkText>
                                inbox@unit4.io
                            </LinkText>
                        </LinkContainer>
                    </span>
                </div>
            )}
        </Section>
    )
}

export default Hero