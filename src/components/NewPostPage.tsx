import type SessionData from '@/types/SessionData'


export default function NewPostPage({ sessionData }: { sessionData: SessionData }) {
	return (
		<span>{"NewPostPage" + sessionData.username}</span>
	)
}

