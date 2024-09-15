import MyProfileHeader from '@/components/MyProfileHeader'
import MyProfilePosts from '@/components/MyProfilePosts'


export default function MyProfilePageWhenSettingsClosed() {
	return (
		<div className="min-h-dvh w-full max-w-[1080px] flex flex-col items-center gap-4">
			<div className="w-full p-4">
				<MyProfileHeader />
			</div>
			<MyProfilePosts />
		</div>
	)
}

