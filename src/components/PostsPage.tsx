import type SessionData from '@/types/SessionData'


export default function PostsPage({ sessionData }: { sessionData: SessionData }) {
	return (
		<section className="snap-center w-screen min-h-dvh flex items-center justify-center snap-always">
			<span>{"PostsPage" + sessionData.username}</span>
		</section>
	)
}

