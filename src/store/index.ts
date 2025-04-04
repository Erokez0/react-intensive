import { create } from "zustand";
import { Data, data } from "../data/questions";

type Status = 'known' | 'unknown' | 'skipped'
interface Store {
    questions: Data,
    questionIx: number,
    totalQuestions: number,
    stats: {
        [k in Status]: number
    },

    setQuestionIx: (ix: number) => void,
    updateQuestion: (type: Status) => void,
    calculateStats: () => void
}

export const useStore = create<Store>()((set, get) => ({
    questions: data,
    questionIx: 0,
    knownQuestions: 0,
    unknownQuestions: 0,
    skippedQuestions: 0,
    totalQuestions: 0,
    stats: {
        'known': 0,
        'unknown': 0,
        'skipped': 0
    },

    calculateStats: () => set(state => {
        const newState = {
            'known': 0,
            'unknown': 0,
            'skipped': 0
        }
        for (const question of Object.values(state.questions)) {
            if (question.selected) {
                newState[question.selected] += 1;
            }
        }
        return {stats: newState}

    }),

    setQuestionIx: (index: number) => set(() => ({questionIx: index}) ),
    updateQuestion: (status) => {
        set(state => (
            { questions: { ...state.questions, [state.questionIx]: {...state.questions[state.questionIx], selected: status} } }
        ));
        get().calculateStats()
        
    }
}));