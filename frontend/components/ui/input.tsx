interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export default function Input({
    label,
    error,
    className = '',
    ...props
}: InputProps) {
    return(
        <div className = {`flex flex-col gap-1 ${className}`}>
            <label className="text-sm font-medium text-gray-700">{label}</label>
            <input className={`px-3 py-2 border rounded-md transition outline-none text-gray-600 focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 ${error ? 'border-red-500' : 'border-gray-300'}`} {...props} />
            {error && <p className = "text-sm text-red-500">{error}</p>}
        </div>
    )
}