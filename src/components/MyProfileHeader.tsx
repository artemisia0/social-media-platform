import { Separator } from '@/components/ui/separator'
import { useQuery, gql } from '@apollo/client'
import { useAtomValue } from 'jotai'
import sessionDataAtom from '@/atoms/sessionDataAtom'
import { format } from 'date-fns'
import { Cake } from 'lucide-react'


const userDataQuery = gql`
query UserData($username: String!) {
	userData(username: $username) {
		result {
			birthDate
			firstName
			lastName
			countryCode
			countryLabel
			city
			signingUpDate
			avatar
		}
	}
}
`

export default function MyProfileHeader() {
	const sessionData = useAtomValue(sessionDataAtom)
	const userDataResponse = useQuery(userDataQuery, {
		variables: {
			username: sessionData.username!,
		}
	})

	if (userDataResponse.error) {
		console.log('GRAPHQL ERROR WHEN FETCHING USER DATA: ' + JSON.stringify(userDataResponse.error))
	}

	const city = userDataResponse.data?.userData?.result?.city ?? ''
	const countryCode = userDataResponse.data?.userData?.result?.countryCode ?? ''
	const countryLabel = userDataResponse.data?.userData?.result?.countryLabel ?? ''
	const signingUpDate = userDataResponse.data?.userData?.result?.signingUpDate
	const birthDate = userDataResponse.data?.userData?.result?.birthDate
	const lastName = userDataResponse.data?.userData?.result?.lastName
	const username = sessionData.username
	const firstName = userDataResponse.data?.userData?.result?.firstName 
	const avatar = userDataResponse.data?.userData?.result?.avatar

	return (
		<div className="flex flex-col items-center sm:flex-row gap-4">
			<img width={100} height={100} alt="My profile image" src={avatar ? avatar : 'https://as2.ftcdn.net/v2/jpg/04/99/21/79/1000_F_499217988_MhtA1re4Jq5BNQuuQLwLhbiGUlKoEtTB.jpg'} className="rounded-full" />
			<div className="flex flex-col gap-2 justify-center text-sm">
				<div className="flex items-center gap-2">
					<span className="flex items-center gap-1">
						<span>
							{username ?? 'Unknown'}
						</span>
					</span>
					<span>
						{signingUpDate && ` (since ${format(new Date(signingUpDate), 'dd/MM/yyyy')})`}
					</span>
				</div>
				<Separator />
				<div className="flex items-center gap-2">
					<span className="flex items-center gap-1">
						<span className={firstName ? ' ' : ' text-red-600'}>
							{firstName ?? 'Unknown'}
						</span>
						<span className={lastName ? ' ' : ' text-red-600'}>
							{lastName ?? 'Unknown'}
						</span>
					</span>
					<span className="flex items-center gap-1">
						<Cake />
						<span>
							{birthDate ? format(new Date(birthDate), 'dd/MM/yyyy') : 'Unknown'}
						</span>
					</span>
				</div>
				<Separator />
				<div className="flex items-center gap-1">
					<span className={`w-8 h-4 fi fi-${countryCode.toLowerCase()} mr-1`} />
					<span>
						{(countryLabel.length > 0 ? countryLabel : 'Unknown') + ','}
					</span>
					<span>
						{city.length > 0 ? city : 'Unknown'}
					</span>
				</div>
			</div>
		</div>
	)
}


