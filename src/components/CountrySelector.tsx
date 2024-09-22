import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@/components/ui/select";
import { useMemo } from 'react'
import countryList from 'react-select-country-list'


export default function CountrySelector({ setCountryCode, setCountryLabel, countryCode }: { setCountryCode: any; setCountryLabel: any; countryCode: string; }) {
	const countries = useMemo(() => countryList().getData(), [])

	const handleCountyChange = (value: any) => {
		setCountryCode(value)
		const found = countries.filter((c: any) => c.value === value)
		setCountryLabel(found[0].label)
	}

	return (
		<Select value={countryCode} onValueChange={handleCountyChange}>
			<SelectTrigger>
				<SelectValue placeholder='Choose a country' />
			</SelectTrigger>
			<SelectContent className="bg-zinc-800">
				{countries.map(
					(country: any) => (
						<SelectItem className="text-slate-100" key={country.value} value={country.value}>
							<span className={`fi fi-${country.value.toLowerCase()} mr-2`} />
							{country.label}
						</SelectItem>
					)
				)}
			</SelectContent>
		</Select>
	)
}

