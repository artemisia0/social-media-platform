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

import { useRef, useState, ReactElement } from 'react'
import { useMutation, gql } from '@apollo/client'

import { LoaderIcon } from 'lucide-react'


const signUpMutation = gql`
mutation SignUp($username: String!, $password: String!) {
	signUp(username: $username, password: $password) {
		status {
			ok
			message
		}
	}
}
`

export default function SignUpButton() {
	const [signUp, signUpResponse] = useMutation(signUpMutation)
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const usernameInputRef = useRef<HTMLInputElement | null>(null)
	const passwordInputRef = useRef<HTMLInputElement | null>(null)
	const secondPasswordInputRef = useRef<HTMLInputElement | null>(null)

	const onSubmit = () => {
		const username = usernameInputRef.current?.value ?? ''
		const password = passwordInputRef.current?.value ?? ''
		const secondPassword = secondPasswordInputRef.current?.value ?? ''
		if (password !== secondPassword) {
			setErrorMessage('Provided passwords are not equal.')
			return
		}
		signUp({
			variables: {
				username,
				password,
			}
		}).then(
				() => {
					setErrorMessage(null)
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
					<Input placeholder="Password" type="password" ref={passwordInputRef} />
					<Input placeholder="Password (again)" type="password" ref={secondPasswordInputRef} />
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

