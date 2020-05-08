import { NextPage } from "next"
import { Section } from "../components/Section"
import { LinkContainer } from "../components/LinkContainer"
import { LinkText } from "../components/LinkText"
import { Ratio } from "../components/Ratio"
import { Highlighted } from "../components/Highlighted"

const Index: NextPage = props => {
    return (
        <>
            <div style={{
                position: 'absolute',
                right: 0,
            }}>
                <img src='/static/ZalipuhaPreview.png' />
            </div>
            <main style={{  position: 'relative' }}>

                {/* HERO */}
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
                
                {/* ABOUT */}
                <Section>
                    <Ratio
                        left={7}
                        right={3}
                        leftContent={(
                            <>
                                Открытая интерактивная карта позволяет в реальном времени картировать информацию в короткие сроки за счет привлечения местных команд волонтеров. 
                                <Highlighted>Алгоритмы обработки данных позволяют</Highlighted> выявить <Highlighted>форматы и сценарии использования, </Highlighted>устоявшиеся практики и аудитории. Сервис позволяет жителям самостоятельно вносить информацию о городских объектах. Горожане сами картируют свои ценности и видят ценности других горожан.
                                <br/><br/>
                                Сервис содержит данные о маршрутах общественного транспорта и позволяет строить графики доступности территории и города <Highlighted>в задаваемом временном промежутке</Highlighted> для различных способов и средств передвижения. Встроенные алгоритмы обработки данных позволяют в реальном времени анализировать собранную информацию и визуализирировать ее в понятных графиках, схемах
                            </>
                        )}
                    />
                </Section>
            </main>
        </>
    )
}

export default Index