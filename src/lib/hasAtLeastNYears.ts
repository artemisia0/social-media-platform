
export default function hasAtLeastNYears(birthDate: Date, nYears: number) {
	const today = new Date()
	const twelveYearsAgo = new Date(today.getFullYear() - nYears, today.getMonth(), today.getDate())
	return birthDate <= twelveYearsAgo
}

