import { atom } from 'jotai'
import type SessionData from '@/types/SessionData'


const sessionDataAtom = atom<SessionData>({
	username: undefined,
	userRole: undefined,
})

export default sessionDataAtom

