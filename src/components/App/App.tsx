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

interface DragContext {
    dragSrc: string,
    setDragSrc: Dispatch<SetStateAction<string>>
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

export const DragContext = createContext<DragContext>({
    dragSrc: "",
    setDragSrc: () => { }
});

export type StatePages = string[]

function App() {
    const [activeModal, setActiveModal] = useState<IModal>({ name: "", active: false })
    const [expanded, setExpanded] = useState<State>(false)
    const [pages, setPages] = useState<StatePages>([
        abstract, abstract2, waves
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
                    <Header
                        activeModal={activeModal}
                        setActiveModal={setActiveModal} />
                    <DragContext.Provider value={{
                        dragSrc, setDragSrc
                    }}>
                        <Slider
                            pages={pages}
                            setPages={setPages}
                            activePage={activePage}
                            setActivePage={setActivePage}
                            activeModal={activeModal}
                            setActiveModal={setActiveModal}
                        />
                        <Filter activePage={activePage} setPages={setPages} />
                    </DragContext.Provider>
                </Layout>
            </ExpandedContext.Provider>
        </div>
    );
}

export default App;
