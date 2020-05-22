import { NextPage } from 'next'
import { Section } from '../components/Section'
import { LinkContainer } from '../components/LinkContainer'
import { LinkText } from '../components/LinkText'
import { Ratio } from '../components/Ratio'
import { Highlighted } from '../components/Highlighted'
import { useState, useCallback } from 'react'
import { Glitch } from '../components/Glitch'
import dynamic from 'next/dynamic'

const Zalipuha = dynamic(
    () => import('../components/Zalipuha'),
    { ssr: false }
)
const ZalipuhaStatus = dynamic(
    () => import('../components/ZalipuhaStatus'),
    { ssr: false }
)
const Title = dynamic(
    () => import('../components/Title'),
    { ssr: false }
)


const Index: NextPage = props => {
    const [rotation, setRotation] = useState(0)
    const [mouse, setMouse] = useState(null)
    const mouseSpeed = .1
    const setMouseNull = useCallback(event => setMouse(null), [])
    const setMouseZero = useCallback(event => setMouse(0), [])
    const onMouseMove = useCallback(event => {
        const eventDelta = event.movementX * mouseSpeed
        event.buttons === 1
            ? setMouse(Math.abs(eventDelta - mouse) < 0 ? 0 : eventDelta)
            : setMouse(null)
        setMousePos([event.clientX, event.clientY])
    }, [mouse])
    
    const [mousePos, setMousePos] = useState<[number, number]>(null)    
    return (
        <>
            <Zalipuha 
                mouse={mouse}
                rotation={rotation}
                setRotation={setRotation}
            />
            <main style={{
                position : 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                {/* container for zalipuha interaction  */}
                <div style={{
                    width: '100%',
                    height: '100%',
                    
                    position : 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                    onMouseDown={setMouseZero}
                    onMouseUp={setMouseNull}
                    onMouseMove={onMouseMove}
                    onMouseLeave={setMouseNull}
                >
                    {/* HERO */}
                    <Section style={{
                        height: '100vh',
                        width: '100%',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        alignContent: 'space-between',
                        userSelect: 'none',
                    }}>
                        <Title />
                        <ZalipuhaStatus
                            mouse={mouse}
                            rotation={rotation}
                            mousePos={mousePos}
                        />
                        <div style={{
                            flex: '1 0 50%',
                            display: 'flex',
                            flexDirection: 'column',      
                            alignItems: 'end',      
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
                        <div style={{
                            flex: '1 0 50%', 
                            textAlign: 'end', 
                            alignSelf: 'flex-end',
                            userSelect: 'text',

                            display: 'flex',
                            justifyContent: 'flex-end'
                        }} >
                            <LinkContainer url='mailto:inbox@unit4.io'>
                                <LinkText>
                                    inbox@unit4.io
                                </LinkText>
                            </LinkContainer>
                        </div>
                    </Section>

                    {/* ABOUT */}
                    <span id='about' />
                    <Section style={{
                        userSelect: 'none',
                    }}>
                        <Ratio
                            left={7}
                            right={3}
                            leftContent={(
                                <div style={{
                                    userSelect: 'text'
                                }}>
                                    Открытая интерактивная карта позволяет в реальном времени картировать информацию в короткие сроки за счет привлечения местных команд волонтеров. <Highlighted>Алгоритмы обработки данных позволяют</Highlighted> выявить <Highlighted>форматы и сценарии использования,</Highlighted> устоявшиеся практики и аудитории. Сервис позволяет жителям самостоятельно вносить информацию о городских объектах. Горожане сами картируют свои ценности и видят ценности других горожан.
                                    <br/><br/>
                                    Сервис содержит данные о маршрутах общественного транспорта и позволяет строить графики доступности территории и города <Highlighted>в задаваемом временном промежутке</Highlighted> для различных способов и средств передвижения. Встроенные алгоритмы обработки данных позволяют в реальном времени анализировать собранную информацию и визуализирировать ее в понятных графиках, схемах
                                </div>
                            )}
                        />
                    </Section>
                </div>

                {/* PLUSHKEEE */}
                {true ? null : (<>
                    <span id='plushki' />
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
                                        border: 'solid 2px white',
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
                                        border: 'solid 2px white',
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
                                        border: 'solid 2px white',
                                    }}
                                />
                            )}
                        />
                    </Section>
                </>) }

                {/* EXAMPLES */}
                <span id='examples' />
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
                                justifyContent: 'flex-start'
                            }}>
                                <div style={{ marginBottom: '10%' }}>
                                    <LinkContainer url='' >
                                        <LinkText>
                                            Сервис картирования ценных мест для развития туризма (в рамках разработки стратегии развития Оймяконского улуса, Республика Саха 2019)
                                        </LinkText>
                                    </LinkContainer>
                                </div>
                                <div style={{ marginBottom: '10%' }}>
                                    <LinkContainer url='' >
                                        <LinkText>
                                            Веб-сервис визуализации пользовательских данных (в рамках предпроектного исследования открытых городских пространств г. Урай, ХМАО 2019)
                                        </LinkText>
                                    </LinkContainer>
                                </div>
                                <div style={{ marginBottom: '10%' }}>
                                    <LinkContainer url='' >
                                        <LinkText>
                                            Веб-сервис картирования стационарных активностей (в рамках предпроектного исследования открытых городских пространств г. Краснокамск 2019)
                                        </LinkText>
                                    </LinkContainer>
                                </div>
                                <div style={{ marginBottom: '10%' }}>
                                    <LinkContainer url='' >
                                        <LinkText>
                                            Интерактивная карта городских данных (в рамках предпроектного исследования г. Волоколамск, г. Нягань, г. Краснокамск 2019)
                                        </LinkText>
                                    </LinkContainer>
                                </div>
                                <div style={{ marginBottom: '10%' }}>
                                    <LinkContainer url='' >
                                        <LinkText>
                                            Веб-сервис сбора идей и предложений жителей инструмент вовлечения жителей (в рамках социокультурного исследования г. Питкяранта, г. Урай 2020)
                                        </LinkText>
                                    </LinkContainer>
                                </div>
                            </div>
                        )}
                        rightContent={(
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                
                                height: '100%',
                                marginBottom: '-10%'
                            }}>
                                <LinkContainer url='' >
                                    <Glitch image='url(/static/cat.png)' 
                                        style={{
                                            width: '100%',
                                            height: '250px',
                                            padding: '5%',
                                            marginBottom: '10%',
                                            border: 'solid 2px white',
                                        }}
                                    >
                                        <div style={{
                                            height: '100%',
                                            width: '100%',
                                            position: 'relative',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                        }}>
                                        <h2>
                                            Oyamikon
                                        </h2>  

                                        <Highlighted style={{
                                            marginLeft: '-5%',
                                            width: 'fit-content', 
                                            fontSize: '1.2rem',
                                        }}>
                                            -->
                                        </Highlighted>

                                        <div />
                                        </div>
                                    </Glitch>
                                </LinkContainer>
                                
                                <LinkContainer url='' >
                                    <div style={{
                                        width: '100%',
                                        height: '250px',
                                        padding: '5%',
                                        marginBottom: '10%',

                                        backgroundImage: 'url(/static/cross.svg)',
                                        border: 'solid 2px white',
                                        
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                    }}>
                                        <h2>
                                            Yrai - HMAO
                                        </h2>  

                                        <Highlighted style={{
                                            marginLeft: '-5%',
                                            width: 'fit-content', 
                                            fontSize: '1.2rem',
                                        }}>
                                            -->
                                        </Highlighted>

                                        <div />
                                    </div>
                                </LinkContainer>
                                
                                <LinkContainer url='' >
                                    <div style={{
                                        width: '100%',
                                        height: '250px',
                                        padding: '5%',
                                        marginBottom: '10%',

                                        backgroundImage: 'url(/static/cross.svg)',
                                        border: 'solid 2px white',
                                        
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                    }}>
                                        <h2>
                                            Pitkäranta
                                        </h2>  

                                        <Highlighted style={{
                                            marginLeft: '-5%',
                                            width: 'fit-content', 
                                            fontSize: '1.2rem',
                                        }}>
                                            -->
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