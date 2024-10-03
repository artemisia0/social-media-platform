import ProfileHeader from '@/components/ProfileHeader'
import ProfilePosts from '@/components/ProfilePosts'


export default function ProfilePage({ username }: { username: string; }) {
	return (
		<div className="h-[calc(100vh-200px)] w-full max-w-[1080px] flex flex-col items-center">
			<div className="w-full flex justify-center max-w-[640] p-4">
				<ProfileHeader username={username} />
			</div>
			<ProfilePosts username={username} />
		</div>
	)
}

