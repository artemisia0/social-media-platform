import ProfileHeader from '@/components/ProfileHeader'
import ProfilePosts from '@/components/ProfilePosts'
import { useState } from 'react'
import PostViewer from '@/components/PostViewer'


export default function ProfilePage({ username }: { username: string; }) {
	const [selectedPostData, setSelectedPostData] = useState<any>(null)

	const onPostClick = (postData: any) => {
		setSelectedPostData(postData)
	}

	return (
		<div className="h-[calc(100vh-200px)] w-full max-w-[1080px] flex flex-col items-center">
			{selectedPostData ? (
				<div className="flex items-center justify-center">
					<PostViewer data={selectedPostData} onClose={() => setSelectedPostData(null)} />
				</div>
				) : (
					<>
						<div className="w-full flex justify-center max-w-[640] p-4">
							<ProfileHeader username={username} />
						</div>
						<ProfilePosts onClick={onPostClick} username={username} />
					</>
				)
			}
		</div>
	)
}

