import { NextPage, GetStaticProps } from 'next'
import { useRef, useState, useCallback, MouseEventHandler } from 'react'
import { Examples } from '../components/Examples'
import Hero from '../components/Hero'
import About from '../components/About'
import Head from 'next/head'
import { Meta, IMeta } from '../components/Meta'
import { GalleryItem } from '@/app/types'
import { Zalipuha } from '@/components/Zalipuha'
import { GeoMarker } from '@/components/Zalipuha/Geosphere'

type Props = {
    meta: IMeta
    examples: GalleryItem[]
    points: GeoMarker[]
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
                points={props.points}
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

    const points: GeoMarker[] = [
        { location: [-12.471514065069812, 29.96032823460071], imageSrc: '/static/cats/1.jpg' },
        { location: [-66.14344941751239, -33.78218055874478], imageSrc: '/static/cats/2.jpg' },
        { location: [-163.20801211427406, 75.19405530640374], imageSrc: '/static/cats/3.jpg' },
        { location: [-60.1468537118777, 31.68887138113911], imageSrc: '/static/cats/4.jpg' },
        { location: [98.919861719307818, 34.327280220478983], imageSrc: '/static/cats/5.jpg' },
        { location: [19.505171745122794, 68.34049434153212], imageSrc: '/static/cats/6.jpg' },
        { location: [112.2117919210032, -28.50740286402985], imageSrc: '/static/cats/7.jpg' },
        { location: [-180.72891972601244, 18.236456875202094], imageSrc: '/static/cats/8.jpg' },
        { location: [-144.70567276094468, 42.757649149605925], imageSrc: '/static/cats/1.jpg' },
        { location: [16.677754391339704, 23.15973160196448], imageSrc: '/static/cats/2.jpg' },
        { location: [123.39126029072082, 23.943962457354814], imageSrc: '/static/cats/3.jpg' },
        { location: [34.53401051124965, -35.26060695811529], imageSrc: '/static/cats/4.jpg' },
        { location: [-54.89336410836961, 7.03808627812122], imageSrc: '/static/cats/5.jpg' },
        { location: [167.93694930066998, -7.75296599062257], imageSrc: '/static/cats/6.jpg' },
        { location: [50.24396406944393, 30.558119182431568], imageSrc: '/static/cats/7.jpg' },
        { location: [-136.37355654473666, -18.713657944900017], imageSrc: '/static/cats/8.jpg' },
        { location: [88.72475330521985, 10.451665787038394], imageSrc: '/static/cats/1.jpg' },
        { location: [72.42099035441424, -29.84503313630067], imageSrc: '/static/cats/2.jpg' },
        { location: [-92.40387452005182, 20.1722585434017], imageSrc: '/static/cats/3.jpg' },
        { location: [154.88855888496272, -45.3358210847797], imageSrc: '/static/cats/4.jpg' },
    ]

    return {
        props: {
            meta,
            examples,
            points,
        }
    }
}

export default Index