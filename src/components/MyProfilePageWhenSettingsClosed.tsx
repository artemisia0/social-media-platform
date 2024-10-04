import ProfileHeader from '@/components/ProfileHeader'
import ProfilePosts from '@/components/ProfilePosts'
import SessionDataAtom from '@/atoms/sessionDataAtom'
import { useAtomValue } from 'jotai'
import { useState } from 'react'
import PostViewer from '@/components/PostViewer'


export default function MyProfilePageWhenSettingsClosed() {
	const [selectedPostData, setSelectedPostData] = useState<any>(null)
	const { username } = useAtomValue(SessionDataAtom)

	if (!username) {
		return (
			<div>
				{"Invalid session."}
			</div>
		)
	}

	if (selectedPostData) {
		return (
			<PostViewer data={selectedPostData} onClose={() => setSelectedPostData(null)} />
		)
	}

	return (
		<div className="h-[calc(100vh-200px)] w-full max-w-[1080px] flex flex-col items-center">
			<div className="w-full flex justify-center max-w-[640] p-4">
				<ProfileHeader username={username} />
			</div>
			<ProfilePosts username={username} onClick={setSelectedPostData} />
		</div>
	)
}

