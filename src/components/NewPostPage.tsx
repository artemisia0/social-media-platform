import type SessionData from '@/types/SessionData'


export default function NewPostPage({ sessionData }: { sessionData: SessionData }) {
	return (
		<section className="snap-center w-screen min-h-dvh flex items-center justify-center snap-always">
			<span>{"NewPostPage" + sessionData.username}</span>
		</section>
	)
}

