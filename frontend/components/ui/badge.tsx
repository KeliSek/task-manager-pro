interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    label: string;
    type: 'status' | 'priority';
}

 const statusColors: Record<string, string> = {
        TODO: "bg-gray-100 text-gray-700",
        IN_PROGRESS: "bg-blue-100 text-blue-700",
        DONE: "bg-green-100 text-green-700",
    }

    const priorityColors: Record<string, string> = {
        LOW: "bg-green-100 text-green-700",
        MEDIUM: "bg-yellow-100 text-yellow-700",
        HIGH: "bg-red-100 text-red-700",
    }

export default function Badge({
    label,
    type = 'status',
} :BadgeProps){
    const getBadgeColor = type === 'status' ? statusColors : priorityColors;

    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor[label]} `}>
            {label?.replace('_', ' ')}
        </span>
    )
}
