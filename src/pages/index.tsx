import { NextPage, GetStaticProps } from 'next'
import { useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { Examples } from '../components/Examples'
import Hero from '../components/Hero'
import About from '../components/About'
import Head from 'next/head'
import { Meta, IMeta } from '../components/Meta'
import { GalleryItem } from '@/app/types'

const Zalipuha = dynamic(
    () => import('../components/Zalipuha'),
    { ssr: false }
)

type Props = {
    meta: IMeta
    examples: GalleryItem[]
}

const Index: NextPage<Props> = props => {
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
                <Meta meta={props.meta} />
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
                    <Hero
                        mouse={mouse}
                        rotation={rotation}
                        mousePos={mousePos}
                    />
                    <span id='about' />
                    <About />
                </div>
                <span id='examples' />
                <Examples items={props.examples} />
            </main>
        </>
    )
}

export const getStaticProps: GetStaticProps<Props> = async ctx => {
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

    const examples = [
        {
            imageSrc: '/static/maps/uray.jpg',
            label: '#берегурай',
            href: 'https://app.latl.ng/map/bereguray',
        },
        {
            imageSrc: '/static/maps/nyagan.jpg',
            label: 'Nyagan',
            href: 'https://app.latl.ng/map/nyagan',
        },
        {
            imageSrc: '/static/maps/oymyakon.jpg',
            label: 'Oymyakon',
            href: 'https://oymyakon.unit4.io',
        },
        {
            imageSrc: '/static/maps/ohta.jpg',
            label: 'Ohta reasearch',
            href: 'https://app.latl.ng/map/55PO6VNLVJQ8HIQ4'
        },
        {
            imageSrc: '/static/maps/pitkaranta.jpg',
            label: 'Pitkaranta',
            href: 'https://app.latl.ng/map/pitkaranta',
        },
        {
            imageSrc: '/static/maps/uray-research.jpg',
            label: 'Uray reasearch',
            href: 'https://uray.unit4.io/map',
        },
        {
            imageSrc: '/static/maps/pitkaranta-research.jpg',
            label: 'Pitkaranta research',
            href: 'https://app.latl.ng/map/ID0OT642D8TRHKGP',
        },
    ]

    return {
        props: {
            meta,
            examples,
        }
    }
}

export default Index