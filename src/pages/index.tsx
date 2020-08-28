import { NextPage } from 'next'
import { Section } from '../components/Section'
import { Ratio } from '../components/Ratio'
import { useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { Examples } from '../components/Examples'
import Hero from '../components/Hero'
import About from '../components/About'
import Head from 'next/head'
import { Meta, IMeta } from '../components/Meta'

const Zalipuha = dynamic(
    () => import('../components/Zalipuha'),
    { ssr: false }
)

interface IPageProps  {
    meta: IMeta
}

const Index: NextPage<IPageProps> = ({ meta }) => {
    const [rotation, setRotation] = useState(0)
    const [mouse, setMouse] = useState(null)
    const [mousePos, setMousePos] = useState<[number, number]>(null)
    const mouseSpeed = .1  
    const setMouseNull = useCallback(event => setMouse(null), [])
    const setMouseZero = useCallback(event => setMouse(0), [])
    const onMouseMove = useCallback(event => {
        const eventDelta = event.movementX * mouseSpeed * devicePixelRatio
        event.buttons === 1
            ? setMouse(eventDelta)
            : setMouse(null)
        setMousePos([event.clientX, event.clientY])
    }, [mouse])
        
    return (
        <>
            <Head>
                <title>LATL.NG</title>
                <Meta meta={meta} />
            </Head>
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
                <div 
                    style={{
                        width: '100%',
                        height: '100%',
                        
                        position : 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',

                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                    }}
                    onMouseDown={event => setMouseZero(event)}
                    onMouseUp={event => setMouseNull(event)}
                    onMouseMove={onMouseMove}
                    onMouseLeave={event => setMouseNull(event)}
                >
                    {/* HERO */}
                    <Hero 
                        mouse={mouse}
                        rotation={rotation}
                        mousePos={mousePos}
                    />

                    {/* ABOUT */}
                    <span id='about' />
                    <About />
                </div>

                {/* EXAMPLES */}
                <span id='examples' />
                <Examples />
            </main>
        </>
    )
}

export const getStaticProps = async () => {
    const meta: IMeta = {
        title: 'LATL.NG',
        description: 'cloud geoinformation system',
        image: 'https://latlng-site.now.sh/static/latlng.jpg',
        imageWidth: 50,
        imageHeight: 50,

        url: null, // 'https://берегурай.рф/',
        siteName: 'LATL.NG',
        locale: 'ru_RU',
        type: 'website',
        domain: null, // 'берегурай.рф',

        twitterCard: 'summary_large_image',
        twitterSite: '@',
        twitterCreator: '@tmshv',
    }

    return {
        props: {
            meta,
        }
    }
}

export default Index