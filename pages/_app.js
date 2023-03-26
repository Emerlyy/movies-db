import Layout from '@/components/Layout';
import { ColorModeProvider } from '@/context/ColorModeContext';
import '@/styles/globals.css'

const App = ({ Component, pageProps }) => (
  <ColorModeProvider>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </ColorModeProvider>
);

export default App;
