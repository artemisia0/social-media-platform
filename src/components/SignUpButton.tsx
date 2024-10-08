import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
	DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
	DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Progress } from '@/components/ui/progress'

import { useRef, useState, ReactElement } from 'react'
import { useMutation, gql } from '@apollo/client'

import { LoaderIcon } from 'lucide-react'
import hasAtLeastNYears from '@/lib/hasAtLeastNYears'

import zxcvbn from 'zxcvbn'

import { useSetAtom } from 'jotai'
import sessionTokenAtom from '@/atoms/sessionTokenAtom'


const signUpMutation = gql`
mutation SignUp($username: String!, $password: String!, $birthDate: String!) {
	signUp(username: $username, password: $password, birthDate: $birthDate) {
		status {
			ok
			message
		}
	}
}
`

const signInMutation = gql`
mutation SignIn($username: String!, $password: String!) {
	signIn(username: $username, password: $password) {
		sessionToken
	}
}
`

export default function SignUpButton() {
	const [signUp, signUpResponse] = useMutation(signUpMutation)
	const [signIn] = useMutation(signInMutation)
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const usernameInputRef = useRef<HTMLInputElement | null>(null)
	const secondPasswordInputRef = useRef<HTMLInputElement | null>(null)
	const birthDateInputRef = useRef<HTMLInputElement | null>(null)
	const [passwordValue, setPasswordValue] = useState('')
	const [passwordStrength, setPasswordStrength] = useState<zxcvbn.ZXCVBNResult | null>(null)
	const setSessionToken = useSetAtom(sessionTokenAtom)

	const onPasswordValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const password = event.target.value
		if (password.length > 40) {
			return
		}
		setPasswordValue(password)
		setPasswordStrength(zxcvbn(password))
	}

	const onSubmit = () => {
		const username = usernameInputRef.current?.value ?? ''
		const password = passwordValue
		const secondPassword = secondPasswordInputRef.current?.value ?? ''
		const birthDate = new Date(birthDateInputRef.current?.value ?? '')
		if (username.length > 30) {
			setErrorMessage('Username must not be more than 30 characters long.')
			return
		}
		if (password.length > 40) {
			setErrorMessage('Password must not be more than 40 characters long.')
			return
		}
		if (!passwordStrength || passwordStrength.score !== 4) {
			setErrorMessage('Password is too easy to hack. Indicator must be green.')
			return
		}
		if (!birthDate) {
			setErrorMessage('Incorrect birth date.')
			return
		}
		if (!hasAtLeastNYears(birthDate, 12)) {
			setErrorMessage('User must be at least 12 years old.')
			return
		}
		if (password.length < 8) {
			setErrorMessage('Password length must be at least 8 characters.')
			return
		}
		if (username.length < 8) {
			setErrorMessage('Username length must be at least 8 characters.')
			return
		}
		// check password strength
		if (password !== secondPassword) {
			setErrorMessage('Provided passwords are not equal.')
			return
		}
		signUp({
			variables: {
				username,
				password,
				birthDate,
			}
		}).then(
				() => {
					setErrorMessage(null)
					signIn({
						variables: {
							username,
							password,
						}
					}).then(
							(res) => {
								const tok = res.data.signIn.sessionToken
								if (!tok) {
									throw new Error('Weird error: failed to sign in just right after signing up: sessionToken is invalid.')
								}
								if (localStorage) {
									localStorage.setItem('sessionToken', tok!)
								}
								setSessionToken(tok!)
							}
						)
				},
				(err) => {
					console.error(err)
					setErrorMessage(err.toString())
				}
			)
	}

	let gqlErrors: ReactElement[] = []
	if (signUpResponse?.error?.graphQLErrors) {
		gqlErrors = signUpResponse.error.graphQLErrors.map(
			({ message }, i) => (<li className="text-destructive-foreground " key={i}>{message}</li>)
		)
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">
					Sign Up
				</Button>
			</DialogTrigger>
			<DialogContent className="dark bg-background text-foreground max-w-96">
				<DialogHeader>
					<DialogTitle>
						Sign Up
					</DialogTitle>
					<DialogDescription>
						Please provide all the neccessary credentials below to create a new account. Passwords must be the same.
					</DialogDescription>
					<div className="my-4 text-sm">
						{signUpResponse.data?.signUp?.status?.ok === false &&
							<div className="text-destructive-foreground mt-2">
								{signUpResponse.data?.signUp?.status?.message}
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
						{signUpResponse.loading &&
							<div className="flex items-center justify-center mt-2">
								<LoaderIcon className="animate-spin" />
							</div>
						}
					</div>
				</DialogHeader>
				<div className="flex flex-col gap-2">
					<Input placeholder="Username" ref={usernameInputRef} />
					<Input placeholder="Password" type="password" onChange={onPasswordValueChange} value={passwordValue} />
					{passwordStrength && (
							<div className="flex flex-col items-center gap-1 my-1">
								<Progress value={(passwordStrength.score+1) * 20} className={['*:bg-red-600', '*:bg-orange-600', '*:bg-yellow-600', '*:bg-blue-600', '*:bg-green-600'][passwordStrength.score] + ' w-[95%]'} />
								{passwordStrength.feedback.warning && (
										<p className="text-sm text-destructive-foreground">
											{passwordStrength.feedback.warning}
										</p>
									)
								}
							</div>
						)
					}
					<Input placeholder="Password (again)" type="password" ref={secondPasswordInputRef} />
					<Input placeholder="Your birth date" type="date" ref={birthDateInputRef} />
				</div>
				<DialogFooter className="w-full flex flex-row items-center justify-end gap-2">
					<DialogClose asChild>
						<Button type="button" variant="ghost">
							Cancel
						</Button>
					</DialogClose>
					<Button type="submit" variant="outline" onClick={onSubmit}>
						Sign Up
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

