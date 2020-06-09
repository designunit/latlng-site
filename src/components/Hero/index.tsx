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
            position: 'relative',
            display: 'block',
            userSelect: 'none',
        }}>
            <h1 style={{
                position: 'absolute',
                top: 0,
                left: 0,
                padding: 'inherit',
                paddingRight: 0,
                paddingBottom: 0,
                width: 'fit-content',
                
                userSelect: 'text',
            }}>
                LATL.NG <br/>
                <span style={{
                    fontSize : isMobile ? '26px' : null
                }}>
                    cloud geoinformation system
                </span>
            </h1>
            {isMobile ? null : (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    padding: 'inherit',
                    paddingLeft: 0,
                    paddingBottom: 0,
                    width: 'fit-content',

                    userSelect: 'text',
                    alignItems: 'end',
                    textAlign: 'end',
                }}>
                    angle: {(Math.abs(rotation % 360)).toFixed(4)} <br/>
                    speed: {(mouse ?? .05).toFixed(4)} <br/>
                    cursor X: {`${!mousePos ? 'not detected' : mousePos[0].toFixed(4)}`} <br/>
                    cursor Y: {`${!mousePos ? 'not detected' : mousePos[1].toFixed(4)}`} <br/>
                </div>
            )}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                padding: 'inherit',
                paddingTop: 0,
                paddingRight: 0,
                width: 'fit-content',

                whiteSpace: 'nowrap',

                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                userSelect: 'text',      
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
            {isMobile ? null : (
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    padding: 'inherit',
                    paddingTop: 0,
                    paddingLeft: 0,
                    width: 'fit-content',
                    
                    alignSelf: 'flex-end',
                    userSelect: 'text',
                    textAlign: 'end',
                }}>
                    <LinkContainer url='mailto:inbox@unit4.io'>
                        <LinkText>
                            inbox@unit4.io
                        </LinkText>
                    </LinkContainer>
                </div>
            )}
        </Section>

    )
}

export default Hero