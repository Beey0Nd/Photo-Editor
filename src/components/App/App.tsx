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
    const [expanded, setExpanded] = useState<State>(false)
    const [pages, setPages] = useState<StatePages>([
        abstract, abstract2, waves
    ]);
    const [dragSrc, setDragSrc] = useState("");

    return (
        <div className="App">
            <ExpandedContext.Provider value={{
                expanded,
                setExpanded
            }}>
                <Layout>
                    <Header />
                    <DragContext.Provider value={{
                        dragSrc, setDragSrc
                    }}>
                        <Slider pages={pages} setPages={setPages} />
                        <Filter setPages={setPages} />
                    </DragContext.Provider>
                </Layout>
            </ExpandedContext.Provider>
        </div>
    );
}

export default App;
