import RootPage from '@/components/RootPage'
import { getDefaultSessionToken } from '@/actions/session'


export default async function Page() {
	const defaultSessionToken = await getDefaultSessionToken()

	return (
		<RootPage defaultSessionToken={defaultSessionToken} />
	)
}

