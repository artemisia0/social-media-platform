import type SessionData from '@/types/SessionData'


export default function PostsPage({ sessionData }: { sessionData: SessionData }) {
	return (
		<span>{"PostsPage" + sessionData.username}</span>
	)
}

