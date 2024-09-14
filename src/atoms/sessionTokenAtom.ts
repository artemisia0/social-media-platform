import { atom } from 'jotai'


const sessionTokenAtom = atom<string | null>(null)

export default sessionTokenAtom

