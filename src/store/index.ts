import { create } from "zustand";
import { Data } from "../data/questions";
interface Store {
    questions: Data,
    questionIx: number,
    knownQuestions: number,
    unknownQuestions: number,
    skippedQuestions: number,
    totalQuestions: number,
    setKnownQuestions: () => void,
    setUnknownQuestions: () => void,
    setSkippedQuestions: () => void,
    setQuestionIx: (ix: number) => void
}

export const useStore = create<Store>()((set) => ({
    questions: [],
    questionIx: 0,
    knownQuestions: 0,
    unknownQuestions: 0,
    skippedQuestions: 0,
    totalQuestions: 0,

    setKnownQuestions: () => set(state => ({knownQuestions: state.knownQuestions + 1}) ),
    setUnknownQuestions: () => set(state => ({unknownQuestions: state.unknownQuestions + 1}) ),
    setSkippedQuestions: () => set(state => ({skippedQuestions: state.skippedQuestions + 1}) ),
    setQuestionIx: (index: number) => set(() => ({questionIx: index}) )
}));