import type SessionData from '@/types/SessionData'


export default function FindUserPage({ sessionData }: { sessionData: SessionData }) {
	return (
		<section className="snap-center w-screen min-h-dvh flex items-center justify-center snap-always">
			<span>{"FindUserPage" + sessionData.username}</span>
		</section>
	)
}

