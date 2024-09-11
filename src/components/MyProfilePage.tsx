import type SessionData from '@/types/SessionData'


export default function MyProfilePage({ sessionData }: { sessionData: SessionData }) {
	return (
		<span>{"MyProfilePage" + sessionData.username}</span>
	)
}

