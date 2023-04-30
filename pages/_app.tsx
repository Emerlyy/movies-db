import Layout from '../components/Layout';
import { ColorModeProvider } from '../context/ColorModeContext';

import 'styles/globals.css'
import { AppProps } from 'next/app';


const App = ({ Component, pageProps }: AppProps) => (
  <ColorModeProvider>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </ColorModeProvider>
);

export default App;
