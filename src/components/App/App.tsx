import { Dispatch, SetStateAction, createContext, useState } from 'react';
import Filter from '../Filter/Filter';
import Header from '../Header/Header';
import Layout from '../Layout/Layout';
import Slider from '../Slider/Slider';
import abstract from "../../images/abstract.png"
import abstract2 from "../../images/abstract2.png"
import waves from "../../images/waves.png"
import './App.scss';

interface ExpandedContext {
    expanded: State,
    setExpanded: Dispatch<SetStateAction<State>>
}

interface AppContext {
    dragSrc: string,
    setDragSrc: Dispatch<SetStateAction<string>>
    images: StateImages,
    setImages: Dispatch<SetStateAction<StateImages>>,
    activePage: ActivePage,
    setActivePage: Dispatch<SetStateAction<ActivePage>>,
    activeModal: ActiveModal,
    setActiveModal: Dispatch<SetStateAction<ActiveModal>>
}

export type State = boolean

export type IModal = {
    name: string,
    active: boolean
}

export const ExpandedContext = createContext<ExpandedContext>({
    expanded: false,
    setExpanded: () => { }
});

export const AppContext = createContext<AppContext>({
    dragSrc: "",
    setDragSrc: () => { },
    images: [],
    setImages: () => { },
    activePage: 0,
    setActivePage: () => {},
    activeModal: { name: "", active: false },
    setActiveModal: () => {}
});

export type Image = string
export type StateImages = Image[]
export type ActivePage = number
export type ActiveModal = {name: string, active: boolean}

function App() {
    const [activeModal, setActiveModal] = useState<IModal>({ name: "", active: false })
    const [expanded, setExpanded] = useState<State>(false)
    const [images, setImages] = useState<StateImages>([
        abstract,abstract2,waves
    ]);
    const [dragSrc, setDragSrc] = useState("");
    const [activePage, setActivePage] = useState(0);

    return (
        <div className="App">
            <ExpandedContext.Provider value={{
                expanded,
                setExpanded
            }}>
                <Layout>
                    <AppContext.Provider value={{
                        dragSrc, setDragSrc,images,setImages,
                        activePage, setActivePage, activeModal, setActiveModal
                    }}>
                    <Header />
                        <Slider />
                        <Filter />
                    </AppContext.Provider>
                </Layout>
            </ExpandedContext.Provider>
        </div>
    );
}

export default App;
