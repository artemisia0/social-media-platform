import type SessionData from '@/types/SessionData'


export default function FindUserPage({ sessionData }: { sessionData: SessionData }) {
	return (
		<span>{"FindUserPage" + sessionData.username}</span>
	)
}

