import isMyProfilePageSettingsOpenedAtom from '@/atoms/isMyProfilePageSettingsOpenedAtom'
import { useAtom } from 'jotai'
import { Settings, Undo2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import MyProfilePageWhenSettingsOpened from '@/components/MyProfilePageWhenSettingsOpened'
import MyProfilePageWhenSettingsClosed from '@/components/MyProfilePageWhenSettingsClosed'


export default function MyProfilePage() {
	const [isMyProfilePageSettingsOpened, setIsMyProfilePageSettingsOpened] = useAtom(isMyProfilePageSettingsOpenedAtom)

	return (
		<div className="relative h-dvh w-full">
			<Button className="flex justify-center items-center rounded-full btn btn-default absolute top-5 right-5" variant="outline" onClick={() => setIsMyProfilePageSettingsOpened(!isMyProfilePageSettingsOpened)}>
				{
					isMyProfilePageSettingsOpened ? (
						<Undo2 />
					) : (
						<Settings />
					)
				}
			</Button>
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

