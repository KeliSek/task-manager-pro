'use client';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string,
    error?: string,
    options: { value: string, label: string }[],
}

export default function Select({
    label,
    error,
    options,
    ...props
}: SelectProps){
    return (
        <div className = {` flex flex-col gap-1`}>
            {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
            <select {...props} className = {`px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 transition bg-white ${error ? 'border-red-500' : 'border-gray-300'}`}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <p className = "text-red-500 text-sm">{error}</p>}
        </div>
    )
}