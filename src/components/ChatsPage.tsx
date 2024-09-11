import type SessionData from '@/types/SessionData'


export default function ChatsPage({ sessionData }: { sessionData: SessionData }) {
	return (
		<span>{"ChatsPage" + sessionData.username}</span>
	)
}

