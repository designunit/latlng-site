import { NextPage, GetStaticProps } from 'next'
import { useRef, useState, useCallback, MouseEventHandler } from 'react'
import { Examples } from '../components/Examples'
import Hero from '../components/Hero'
import About from '../components/About'
import Head from 'next/head'
import { Meta, IMeta } from '../components/Meta'
import { GalleryItem } from '@/app/types'
import { Zalipuha } from '@/components/Zalipuha'

type Props = {
    meta: IMeta
    examples: GalleryItem[]
}

const Index: NextPage<Props> = props => {
    const mouseTargetRef = useRef<HTMLDivElement>(null)
    const [mousePos, setMousePos] = useState<[number, number]>([0, 0])

    const onMouseMove = useCallback<MouseEventHandler<HTMLDivElement>>(event => {
        setMousePos([event.clientX, event.clientY])
    }, [])

    return (
        <>
            <Head>
                <title>LATL.NG</title>
                <Meta meta={props.meta} />
            </Head>
            <Zalipuha
                ref={mouseTargetRef}
            />
            <main style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                {/* container for zalipuha interaction  */}
                <div
                    ref={mouseTargetRef}
                    onMouseMove={onMouseMove}
                    style={{
                        width: '100%',
                        height: '100%',

                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',

                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                    }}
                >
                    <Hero
                        mouse={0}
                        rotation={0}
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