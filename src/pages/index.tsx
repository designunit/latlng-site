import Link from 'next/link'
import { GetServerSideProps, NextPage } from 'next'
import SVG from 'react-inlinesvg'
import { useRaf } from 'react-use'
import { useCallback, useState } from 'react'

const CreatorLogo: React.FC<{
    color: string,
    highlightColor: string,
    onLoad: () => void,
}> = props => {
    const [fill, setFill] = useState(props.color)

    const onOver = useCallback(() => {
        setFill(props.highlightColor)
    }, [])

    const onOut = useCallback(() => {
        setFill(props.color)
    }, [])

    return (
        <a
            href={'https://unit4.io'}
            onMouseOver={onOver}
            onMouseOut={onOut}
        >
            <SVG
                style={{
                    width: '250px',
                    fill,
                    transition: 'fill 250ms',
                }}
                onLoad={props.onLoad}
                src={'/static/u4.svg'}
            />
        </a>
    )
}

const Latlng: React.FC = props => {
    const n = useRaf(1000000000, 0)

    const s = 5000000
    const r = 5
    const x = Math.cos(n * s) * r
    const y = Math.sin(n * s) * r

    return (
        <div>
            <style jsx>{`
                div {
                    position: relative;
                }

                h1 {
                    font-size: 20rem;
                    line-height: 25rem;

                    color: white;
                    margin-bottom: 0;
                    font-family: 'Roboto';
                }

                .layer {
                    display: block;
                    position: absolute;
                    top: 0;
                    left: 0;
                }

                @media screen and (max-width: 1280px) {
                    h1 {
                        font-size: 15rem;
                    }
                }

                @media screen and (max-width: 960px) {
                    h1 {
                        font-size: 10rem;
                    }
                }

                @media screen and (max-width: 640px) {
                    h1 {
                        font-size: 7rem;
                    }
                }

                @media screen and (max-width: 31.25em) {
                    h1 {
                        font-size: 4rem;
                        line-height: 15rem;
                    }
                }
           `}</style>

            <h1>
                <span
                    className={'layer'}
                    style={{
                        color: '#ff0066',
                        top: y,
                    }}
                >LATL.NG
                </span>
                <span
                    className={'layer'}
                    style={{
                        color: '#00ff00',
                        left: x,
                    }}
                >LATL.NG
                </span>
                <span
                    style={{
                        color: 'white',
                        position: 'relative',
                        zIndex: 1,
                    }}
                >LATL.NG
                </span>
            </h1>
        </div>
    )
}

type ProjectLink = {
    label: string
    href: string
}

interface IProps {
    links: ProjectLink[]
}

const Page: NextPage<IProps> = props => {
    const [ready, setReady] = useState(false)
    const onLoadLogo = useCallback(() => {
        setReady(true)
    }, [])

    return (
        <div className={'wrapper'}>
            <style jsx>{`
                .wrapper {
                    width: 100%;
                    height: 100%;

                    display: flex;
                    justify-content: center;
                    align-items: center;

                    font-family: 'Roboto';
                    letter-spacing: 1px;
                    color: white;
                    background-color: black;
                    font-size: 1.25rem;
                }

                .center {
                    width: 90%;
                    height: 100%;

                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }

                .block {
                    padding: 0 20px;
                }

                .unit {
                    align-self: flex-end;
                    padding: 0 20px 80px;
                }

                a {
                    color: white;
                }

                a:hover {
                    color: #e40e80;
                }

                ul {
                    list-style: none;
                    padding-left: 0;
                }

                @media screen and (max-width: 31.25em) {
                    .block {
                        padding: 0;
                    }

                    .unit {
                        align-self: flex-start;
                        padding: 0px 0px 10px;
                    }
                }
           `}</style>

            <main
                className={'center'}
            >
                <div
                    style={{
                        alignSelf: 'flex-start',
                    }}
                >
                    <Latlng />
                </div>

                <div
                    className={'block'}
                    style={{
                        flex: 1,
                        alignSelf: 'flex-start',
                    }}
                >
                    <p>
                        ОБЛАЧНАЯ ГЕОИНФОРМАЦИОННАЯ СИСТЕМА С ФИЧАМИ И ПЛЮШКАМИ
                    </p>

                    <ul>
                        {props.links.map(link => (
                            <li key={link.href}>
                                <Link href={link.href}>
                                    <a>{link.label}</a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div
                    className={'block unit'}
                >
                    <CreatorLogo
                        color={'white'}
                        highlightColor={'#e40e80'}
                        onLoad={onLoadLogo}
                    />
                    <div><a href={'mailto:inbox@unit4.io'}>inbox@unit4.io</a></div>
                </div>
            </main>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps<IProps> = async ctx => {
    const res = await fetch('https://mesto.io/v1/source/609af407dd79a05fefd4e23a/features')
    if (!res.ok) {
        return {
            props: {
                links: []
            }
        }
    }

    const geojson = await res.json()
    const fs: Array<any> = geojson.features
    const links = fs
        .sort((a, b) => {
            const w1 = a.properties.weight ?? 0
            const w2 = b.properties.weight ?? 0
            return w2 - w1
        })
        .map(f => ({
            label: f.properties.text,
            href: f.properties.href,
        }))

    return {
        props: {
            links,
        }
    }
}

export default Page
