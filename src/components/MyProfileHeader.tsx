import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import { useQuery, gql } from '@apollo/client'
import { useAtomValue } from 'jotai'
import sessionDataAtom from '@/atoms/sessionDataAtom'
import { format } from 'date-fns'
import { Cake } from 'lucide-react'
import CountrySelector from '@/components/CountrySelector'
import { useState } from 'react'
import { Input } from '@/components/ui/input'


const userDataQuery = gql`
query UserData($username: String!) {
	userData(username: $username) {
		result {
			username
			signingUpDate
			birthDate
			firstName
			lastName
		}
	}
}
`

export default function MyProfileHeader() {
	const [city, setCity] = useState('')
	const [countryCode, setCountryCode] = useState('')
	const [countryLabel, setCountryLabel] = useState('')
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
	const birthDate = userDataResponse.data?.userData?.result?.birthDate

	return (
		<div className="flex flex-col items-center sm:flex-row gap-4">
			<img width={100} height={100} alt="My profile image" src='https://as2.ftcdn.net/v2/jpg/04/99/21/79/1000_F_499217988_MhtA1re4Jq5BNQuuQLwLhbiGUlKoEtTB.jpg' className="rounded-full" />
			<div className="flex flex-col gap-2 justify-center items-center text-sm">
				<div className="flex items-center gap-2">
					<span className="flex items-center gap-1">
						<span>
							{userDataResponse.data?.userData?.result?.username ?? 'Unknown'}
						</span>
					</span>
					<span>
						{signingUpDate && ` (since ${format(new Date(signingUpDate), 'dd/MM/yyyy')})`}
					</span>
				</div>
				<Separator />
				<div className="flex items-center gap-2">
					<span className="flex items-center gap-1">
						<span>
							{userDataResponse.data?.userData?.result?.firstName ?? 'Unknown'}
						</span>
						<span>
							{userDataResponse.data?.userData?.result?.lastName ?? 'Unknown'}
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
					<span className={`w-16 h-8 fi fi-${countryCode.toLowerCase()} mr-1`} />
					<span>
						{(countryLabel.length > 0 ? countryLabel : 'Unknown') + ','}
					</span>
					<span>
						{city.length > 0 ? city : 'Unknown'}
					</span>
					{/* Put there two inputs in a modal that will be opened by click on pen icon (below settings icon) */}
					<CountrySelector setCountryCode={setCountryCode} countryCode={countryCode} setCountryLabel={setCountryLabel} />
					<Input value={city} onChange={(e: any) => setCity(e.target.value)} placeholder="City" />
				</div>
			</div>
		</div>
	)
}


