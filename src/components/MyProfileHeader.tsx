import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import { useQuery, gql } from '@apollo/client'
import { useAtomValue } from 'jotai'
import sessionDataAtom from '@/atoms/sessionDataAtom'
import { format } from 'date-fns'


const userDataQuery = gql`
query UserData($username: String!) {
	userData(username: $username) {
		result {
			username
			signingUpDate
			birthDate
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

	const signingUpDate = userDataResponse.data?.userData?.result?.signingUpDate

	return (
		<div className="flex items-center gap-4">
			<img width={100} height={100} alt="My profile image" src='https://as2.ftcdn.net/v2/jpg/04/99/21/79/1000_F_499217988_MhtA1re4Jq5BNQuuQLwLhbiGUlKoEtTB.jpg' className="rounded-full" />
			<div className="flex flex-col gap-2 justify-center text-sm">
				<div className="">
					{userDataResponse.loading && "... ..."}
					{userDataResponse.data?.userData?.result && userDataResponse.data.userData.result.username}
					{signingUpDate && ` (since ${format(new Date(signingUpDate), 'dd/MM/yyyy')})`}
				</div>
				<Separator />
				<div className="">
					{"First-name Last-name dd-mm-yyyy"}
				</div>
				<Separator />
				<div className="">
					{"{country flag icon} Country, City"}
				</div>
			</div>
		</div>
	)
}


