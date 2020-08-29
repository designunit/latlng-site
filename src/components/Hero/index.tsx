import { Link } from "../Link"
import { LinkText } from "../LinkText"
import { Section } from "../Section"
import { Title } from "./Title"
import { useMobile } from "@/hooks/useMobile"
import { ZalipuhaStat } from "../ZalipuhaStat"

interface HeroProps {
}

const Hero: React.FC<HeroProps> = () => {
    const isMobile = useMobile()

    return (
        <Section style={{
            height: '100vh',
            width: '100%',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignContent: 'space-between',
        }}>
            <Title />

            {isMobile ? null : (
                <>
                    <div style={{
                        flex: '1 0 50%',
                        alignSelf: 'flex-end',
                        alignItems: 'end',
                        textAlign: 'end',
                    }}>
                        <ZalipuhaStat
                            formatPattern={'0000.0000'}
                        />
                    </div>
                </>
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
                    <Link url='#about'>
                        <LinkText>
                            what's latl.ng?
                        </LinkText>
                    </Link>
                    <Link url='#examples'>
                        <LinkText>
                            work examples
                        </LinkText>
                    </Link>
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