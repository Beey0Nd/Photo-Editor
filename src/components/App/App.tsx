import Filter from '../Filter/Filter';
import Header from '../Header/Header';
import Layout from '../Layout/Layout';
import Slider from '../Slider/Slider';
import './App.scss';

function App() {
    return (
        <div className="App">
            <Layout>
                <Header />
                <Slider />
                <Filter />
            </Layout>
        </div>
    );
}

export default App;
