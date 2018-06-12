// import dependencies
import Head from "next/head";

// layout component
export default class extends React.Component {
    render() {
        return <div>
            <Head>
                <title>{ this.props.title }</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>

            <style global jsx>{`
                @import url('https://fonts.googleapis.com/css?family=Open+Sans:300');

                *:not(ul, li) {
                    top: 0; left: 0;
                    bottom: 0; right: 0;
                    margin: 0; padding: 0;
                    cursor: default;
                    user-select: none;
                    box-sizing: border-box;
                }

                html {
                    height: 100%;
                    overflow-x: hidden;
                    font-family: 'Open Sans', Verdana, sans-serif;
                }

                body {
                    margin: 0;
                    height: 100%;
                    position: relative;
                }

                a {
                    color: inherit;
                    cursor: pointer;
                    text-decoration: none;
                }

            `}</style>

            { this.props.children }

        </div>
    }
}
