import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
	DialogDescription,
  DialogTrigger,
	DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

import { useRef, useState, useEffect, ReactElement } from 'react'
import { useMutation, useQuery, gql } from '@apollo/client'

import { LoaderIcon, Pencil } from 'lucide-react'

import CountrySelector from '@/components/CountrySelector'

import { useAtomValue } from 'jotai'
import sessionDataAtom from '@/atoms/sessionDataAtom'
import croppedAvatarAtom from '@/atoms/croppedAvatarAtom'

import EditAvatarButton from '@/components/EditAvatarButton'


const editProfileMutation = gql`
mutation EditProfile($username: String!, $firstName: String, $lastName: String, $city: String, $countryCode: String, $countryLabel: String, $birthDate: String, $avatar: String) {
	editProfile(username: $username, firstName: $firstName, lastName: $lastName, city: $city, countryCode: $countryCode, countryLabel: $countryLabel, birthDate: $birthDate, avatar: $avatar) {
		status {
			ok
			message
		}
	}
}
`

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
		}
	}
}
`


export default function EditProfileButton() {
	const [editProfile, editProfileResponse] = useMutation(editProfileMutation)
	const sessionData = useAtomValue(sessionDataAtom)
	const userDataResponse = useQuery(userDataQuery, {
		variables: {
			username: sessionData.username,
		},
	})
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [firstNameInputValue, setFirstNameInputValue] = useState('')
	const [lastNameInputValue, setLastNameInputValue] = useState('')
	const [cityInputValue, setCityInputValue] = useState('')
	const [birthDateInputValue, setBirthDateInputValue] = useState('')
	const closeButtonRef = useRef<HTMLButtonElement | null>(null)
	const [countryCode, setCountryCode] = useState('')
	const [countryLabel, setCountryLabel] = useState('')
	const croppedAvatar = useAtomValue(croppedAvatarAtom)

	useEffect(
		() => {
			setFirstNameInputValue(userDataResponse.data?.userData?.result?.firstName)
			setLastNameInputValue(userDataResponse.data?.userData?.result?.lastName)
			setCityInputValue(userDataResponse.data?.userData?.result?.city)
			setBirthDateInputValue(userDataResponse.data?.userData?.result?.birthDate)
			setCountryCode(userDataResponse.data?.userData?.result?.countryCode)
			setCountryLabel(userDataResponse.data?.userData?.result?.countryLabel)
		}, [userDataResponse.data]
	)

	const onSubmit = () => {
		const inputValues = {
			username: 	sessionData.username,
			firstName: 	firstNameInputValue,
			lastName: 	lastNameInputValue,
			city: 			cityInputValue,
			birthDate: 	birthDateInputValue,
			countryCode,
			countryLabel,
			avatar: croppedAvatar,
		}
		editProfile({
			variables: {
				...inputValues,
			}
		}).then(
				() => {
					setErrorMessage(null)
					if (closeButtonRef.current) {  // should always be true
						closeButtonRef.current.click()
					}
					if (window && window.location) {  // should always be true
						window.location.reload()
					}
				},
				(err) => {
					console.error(err)
					setErrorMessage(err.toString())
				}
			)
	}

	let gqlErrors: ReactElement[] = []
	if (editProfileResponse?.error?.graphQLErrors) {
		gqlErrors = editProfileResponse.error.graphQLErrors.map(
			({ message }, i) => (<li className="text-destructive-foreground " key={i}>{message}</li>)
		)
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" className="flex justify-center items-center rounded-full btn btn-default absolute top-[72px] right-5">
					<Pencil />
				</Button>
			</DialogTrigger>
			<DialogContent className="dark bg-background text-foreground max-w-96">
				<DialogHeader>
					<DialogTitle>
						Edit Profile
					</DialogTitle>
					<DialogDescription>
						Please edit your profile data by editing input fields below.
					</DialogDescription>
					<div className="my-4 text-sm">
						{editProfileResponse.data?.editProfile?.status?.ok === false &&
							<div className="text-destructive-foreground mt-2">
								{editProfileResponse.data?.editProfile?.status?.message}
							</div>
						}
						{gqlErrors.length > 0 &&
							<ul className="mt-2">
								{gqlErrors}
							</ul>
						}
						{errorMessage && 
							<div className="text-destructive-foreground mt-2">
								{errorMessage}
							</div>
						}
						{editProfileResponse.loading &&
							<div className="flex items-center justify-center mt-2">
								<LoaderIcon className="animate-spin" />
							</div>
						}
					</div>
				</DialogHeader>
				<div className="flex flex-col gap-2">
					<EditAvatarButton />
					<Input placeholder="First name" value={firstNameInputValue} onChange={(e: any) => setFirstNameInputValue(e.target.value)} />
					<Input placeholder="Last name" value={lastNameInputValue} onChange={(e: any) => setLastNameInputValue(e.target.value)} />
					<CountrySelector setCountryCode={setCountryCode} countryCode={countryCode} setCountryLabel={setCountryLabel} />
					<Input placeholder="City" value={cityInputValue} onChange={(e: any) => setCityInputValue(e.target.value)} />
					<Input placeholder="Birth date" type="date" value={birthDateInputValue} onChange={(e: any) => setBirthDateInputValue(e.target.value)} />
				</div>
				<DialogFooter className="w-full flex flex-row items-center justify-end gap-2">
					<DialogClose asChild>
						<Button type="button" variant="ghost" ref={closeButtonRef}>
							Cancel
						</Button>
					</DialogClose>
					<Button type="submit" variant="outline" onClick={onSubmit}>
						Save
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

