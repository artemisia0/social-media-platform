import { Button } from "@/components/ui/button"

import { useMutation, gql } from '@apollo/client'
import { useSetAtom } from 'jotai'
import sessionTokenAtom from '@/atoms/sessionTokenAtom'


const signOutMutation = gql`
mutation {
	signOut {
		sessionToken
	}
}
`

export default function MyProfilePageWhenSettingsOpened() {
	const [signOut] = useMutation(signOutMutation)
	const setSessionToken = useSetAtom(sessionTokenAtom)

	const onSignOut = () => {
		if (localStorage) {
			localStorage.setItem('sessionToken', '')
		}
		signOut().then(
			(res) => {
				setSessionToken(res.data.signOut.sessionToken!)
			}
		)
	}

	return (
		<div className="mt-16 p-4 flex flex-col gap-2 justify-center max-w-[640px]">
			<Button variant="outline" onClick={onSignOut}>
				{"Sign out"}
			</Button>
		</div>
	)
}

