import type SessionData from '@/types/SessionData'


export default function MyProfilePage({ sessionData }: { sessionData: SessionData }) {
	return (
		<section className="snap-center w-screen min-h-dvh flex items-center justify-center snap-always">
			<span>{"MyProfilePage" + sessionData.username}</span>
		</section>
	)
}

