'use server'
import 'server-only'

import { sealData, unsealData } from 'iron-session'
import type SessionData from '@/types/SessionData'


const ttl = 30 * 24 * 60 * 60  // 30 days

function getSessionSecret() {
	if (!process.env.SESSION_SECRET) {
		console.error('SESSION_SECRET is not set.')
		process.exit(1)
	}
	return process.env.SESSION_SECRET!
}

export async function getSessionData(sessionToken: string) {
	const session = await unsealData<SessionData>(
		sessionToken,
		{
			password: getSessionSecret(),
			ttl,
		}
	)
	return { ...session }
}

export async function getSessionToken(sessionData: SessionData) {
	const sessionToken = await sealData(sessionData, {
		password: getSessionSecret(),
		ttl,
	})
	return sessionToken
}

export async function getDefaultSessionToken() {
	const token = await getSessionToken({
		username: undefined,
		userRole: undefined,
	})
	return token
}

