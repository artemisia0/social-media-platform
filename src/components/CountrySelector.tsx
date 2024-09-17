import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@/components/ui/select";
import { useState, useMemo } from 'react'
import countryList from 'react-select-country-list'
import { Input } from '@/components/ui/input'


export default function CountrySelector({ setCountryCode, countryCode, setCountryLabel }: { setCountryCode: any; countryCode: any; setCountryLabel: any; }) {
	const countries = useMemo(() => countryList().getData(), [])

	const handleCountyChange = (value: any) => {
		setCountryCode(value)
		const found = countries.filter((c: any) => c.value === value)
		setCountryLabel(found[0].label)
	}

	return (
		<Select onValueChange={handleCountyChange}>
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

