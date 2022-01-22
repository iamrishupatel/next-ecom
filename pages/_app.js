import { Provider} from "react-redux";
import { store } from "../store";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "artemis-ui/dist/index.css";
import "../styles/global.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
      <Toaster />
    </Provider>
  );
}

export default MyApp;
