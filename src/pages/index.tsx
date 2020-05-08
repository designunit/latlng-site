import { NextPage } from "next"
import { Section } from "../components/Section"
import { LinkContainer } from "../components/LinkContainer"
import { LinkText } from "../components/LinkText"

const Index: NextPage = props => {
    return (
        <>
            <div style={{
                position: 'absolute',
                right: 0,
            }}>
                <img src='/static/ZalipuhaPreview.png' />
            </div>
            <main style={{position: 'relative'}}>
                <Section style={{
                    height: '100vh',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignContent: 'space-between',
                }}>
                    <h1 style={{flex: '1 0 50%'}}>
                        LATL.NG <br/>
                        cloud geoinformation system
                    </h1>
                    <div style={{flex: '1 0 50%'}} />
                    <div style={{
                        flex: '1 0 50%',
                        display: 'flex',
                        flexDirection: 'column',                        
                    }} > 
                    <LinkContainer url=''>
                        <LinkText>
                            what is latl.ng?
                        </LinkText>
                    </LinkContainer>
                    <LinkContainer url=''>
                        <LinkText>
                            fichers and cuties
                        </LinkText>
                    </LinkContainer>
                    <LinkContainer url=''>
                        <LinkText>
                            work examples
                        </LinkText>
                    </LinkContainer>
                    </div>
                    <div style={{flex: '1 0 50%', textAlign: 'end'}} >
                        <LinkContainer url=''>
                            <LinkText>
                                info@unit4.io
                            </LinkText>
                        </LinkContainer>
                    </div>
                </Section>
            </main>
        </>
    )
}

export default Index