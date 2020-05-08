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
                    <div style={{
                        flex: '1 0 50%', 
                        textAlign: 'end', 
                        alignSelf: 'flex-end',
                    }} >
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
                                <Highlighted>Алгоритмы обработки данных позволяют</Highlighted> выявить <Highlighted>форматы и сценарии использования,</Highlighted> устоявшиеся практики и аудитории. Сервис позволяет жителям самостоятельно вносить информацию о городских объектах. Горожане сами картируют свои ценности и видят ценности других горожан.
                                <br/><br/>
                                Сервис содержит данные о маршрутах общественного транспорта и позволяет строить графики доступности территории и города <Highlighted>в задаваемом временном промежутке</Highlighted> для различных способов и средств передвижения. Встроенные алгоритмы обработки данных позволяют в реальном времени анализировать собранную информацию и визуализирировать ее в понятных графиках, схемах
                            </>
                        )}
                    />
                </Section>

                {/* PLUSHKEEE */}
                <Section>
                    <Ratio
                        left={3}
                        right={6}
                        spacer={1}
                        style={{
                            padding: '5% 0',
                        }}
                        leftContent={(
                            <div style={{
                                height: '100%',

                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',

                                padding: '10% 0',

                                textAlign: 'end',
                            }}>
                                <h2>
                                    toolkit <br/>
                                    for social data <br/>
                                    collection
                                </h2>
                                Сервис содержит данные о маршрутах общественного транспорта и позволяет строить графики доступности территории и города в задаваемом временном промежутке для различных способов и средств передвижения.
                            </div>
                        )}
                        rightContent={(
                            <img src='/static/cross.svg' 
                                style={{
                                    width: '100%',
                                    height: '480px',
                                }}
                            />
                        )}
                    />
                    <Ratio
                        left={3}
                        right={6}
                        spacer={1}
                        style={{
                            padding: '5% 0',
                        }}
                        leftContent={(
                            <div style={{
                                height: '100%',

                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',

                                padding: '10% 0',

                                textAlign: 'end',
                            }}>
                                <h2>
                                urban data <br/>
                                mapping tool
                                </h2>
                                Сервис содержит данные о маршрутах общественного транспорта и позволяет строить графики доступности территории и города в задаваемом временном промежутке для различных способов и средств передвижения.
                            </div>
                        )}
                        rightContent={(
                            <img src='/static/cross.svg' 
                                style={{
                                    width: '100%',
                                    height: '480px',
                                }}
                            />
                        )}
                    />
                    <Ratio
                        left={3}
                        right={6}
                        spacer={1}
                        style={{
                            padding: '5% 0',
                        }}
                        leftContent={(
                            <div style={{
                                height: '100%',

                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',

                                padding: '10% 0',

                                textAlign: 'end',
                            }}>
                                <h2>
                                data <br/>
                                visualization
                                </h2>
                                Сервис содержит данные о маршрутах общественного транспорта и позволяет строить графики доступности территории и города в задаваемом временном промежутке для различных способов и средств передвижения.
                            </div>
                        )}
                        rightContent={(
                            <img src='/static/cross.svg' 
                                style={{
                                    width: '100%',
                                    height: '480px',
                                }}
                            />
                        )}
                    />
                </Section>
            
                {/* SSbILKI */}
                <Section>
                    <Ratio
                        left={6}
                        right={3}
                        spacer={1}
                        leftContent={(
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',

                                height: '100%',
                                justifyContent: 'space-between'
                            }}>
                                <LinkContainer url='' >
                                    <LinkText>
                                        Сервис картирования ценных мест для развития туризма (в рамках разработки стратегии развития Оймяконского улуса, Республика Саха 2019)
                                    </LinkText>
                                </LinkContainer>
                                <LinkContainer url='' >
                                    <LinkText>
                                        Сервис картирования ценных мест для развития туризма (в рамках разработки стратегии развития Оймяконского улуса, Республика Саха 2019)
                                    </LinkText>
                                </LinkContainer>
                                <LinkContainer url='' >
                                    <LinkText>
                                        Сервис картирования ценных мест для развития туризма (в рамках разработки стратегии развития Оймяконского улуса, Республика Саха 2019)
                                    </LinkText>
                                </LinkContainer>
                                <LinkContainer url='' >
                                    <LinkText>
                                        Сервис картирования ценных мест для развития туризма (в рамках разработки стратегии развития Оймяконского улуса, Республика Саха 2019)
                                    </LinkText>
                                </LinkContainer>
                            </div>
                        )}
                        rightContent={(
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                
                                height: '100%',
                                justifyContent: 'space-between',
                                marginBottom: '-10%'
                            }}>
                                <LinkContainer url='' >
                                    <div style={{
                                        width: '100%',
                                        height: '300px',
                                        padding: '5%',
                                        marginBottom: '10%',

                                        backgroundImage: 'url(/static/cross.svg)',
                                        
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                    }}>
                                        <h2>
                                            Oyamikon
                                        </h2>  

                                        <Highlighted style={{
                                            marginLeft: '-5%',
                                            width: 'min-content',
                                        }}>
                                            СТРЕЛОЧКА
                                        </Highlighted>

                                        <div />
                                    </div>
                                </LinkContainer>
                                
                                <LinkContainer url='' >
                                    <div style={{
                                        width: '100%',
                                        height: '300px',
                                        padding: '5%',
                                        marginBottom: '10%',

                                        backgroundImage: 'url(/static/cross.svg)',
                                        
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                    }}>
                                        <h2>
                                            Oyamikon
                                        </h2>  

                                        <Highlighted style={{
                                            marginLeft: '-5%',
                                            width: 'min-content',
                                        }}>
                                            СТРЕЛОЧКА
                                        </Highlighted>

                                        <div />
                                    </div>
                                </LinkContainer>
                                
                                <LinkContainer url='' >
                                    <div style={{
                                        width: '100%',
                                        height: '300px',
                                        padding: '5%',
                                        marginBottom: '10%',

                                        backgroundImage: 'url(/static/cross.svg)',
                                        
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                    }}>
                                        <h2>
                                            Oyamikon
                                        </h2>  

                                        <Highlighted style={{
                                            marginLeft: '-5%',
                                            width: 'min-content',
                                        }}>
                                            СТРЕЛОЧКА
                                        </Highlighted>

                                        <div />
                                    </div>
                                </LinkContainer>
                                
                            </div>
                        )}
                    />
                </Section>
            </main>
        </>
    )
}

export default Index