import ProfileHeader from '@/components/ProfileHeader'
import ProfilePosts from '@/components/ProfilePosts'
import SessionDataAtom from '@/atoms/sessionDataAtom'
import { useAtomValue } from 'jotai'


export default function MyProfilePageWhenSettingsClosed() {
	const { username } = useAtomValue(SessionDataAtom)

	return (
		<div className="h-[calc(100vh-200px)] w-full max-w-[1080px] flex flex-col items-center">
			<div className="w-full flex justify-center max-w-[640] p-4">
				<ProfileHeader username={username} />
			</div>
			<ProfilePosts username={username} />
		</div>
	)
}

