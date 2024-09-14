
export default function hasAtLeastNYears(birthDate: string, nYears: number) {
	const today = new Date()
	const twelveYearsAgo = new Date(today.getFullYear() - 12, today.getMonth(), today.getDate())
	return birthDate <= twelveYearsAgo
}

