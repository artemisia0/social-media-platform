import isMyProfilePageSettingsOpenedAtom from '@/atoms/isMyProfilePageSettingsOpenedAtom'
import { useAtom } from 'jotai'
import { Settings, Undo2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import MyProfilePageWhenSettingsOpened from '@/components/MyProfilePageWhenSettingsOpened'
import MyProfilePageWhenSettingsClosed from '@/components/MyProfilePageWhenSettingsClosed'
import { useEffect } from 'react'
import EditProfileButton from '@/components/EditProfileButton'


export default function MyProfilePage() {
	const [isMyProfilePageSettingsOpened, setIsMyProfilePageSettingsOpened] = useAtom(isMyProfilePageSettingsOpenedAtom)

	useEffect(
		() => {
			setIsMyProfilePageSettingsOpened(false)
		}, [setIsMyProfilePageSettingsOpened]
	)

	return (
		<div className="relative h-dvh w-full flex justify-center">
			<Button variant="outline" className="flex justify-center items-center rounded-full btn btn-default absolute top-5 right-5 bg-zinc-800 border border-zinc-600 hover:bg-zinc-700 text-slate-100 hover:text-slate-100" onClick={() => setIsMyProfilePageSettingsOpened(!isMyProfilePageSettingsOpened)}>
				{
					isMyProfilePageSettingsOpened ? (
						<Undo2 />
					) : (
						<Settings />
					)
				}
			</Button>
			<EditProfileButton />
			{
				isMyProfilePageSettingsOpened ? (
					<MyProfilePageWhenSettingsOpened />
				) : (
					<MyProfilePageWhenSettingsClosed />
				)
			}
		</div>
	)
}

