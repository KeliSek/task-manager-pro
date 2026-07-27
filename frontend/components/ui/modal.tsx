'use client';

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export default function Modal({
    isOpen,
    onClose,
    title,
    children,
}: ModalProps) {
    if (!isOpen) return null;
    
    return (
        <div className = {`fixed inset-0 z-50 flex items-center justify-center`}>
            <div className = {`absolute inset-0 bg-black/50`} onClick = {onClose}></div>
            <div className = {`relative bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6 `}>
                <header className = "mb-4 flex justify-between items-center">
                    <h2 className = "text-lg font-semibold">{title}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl font-bold">✕</button>
                </header>
                <div className = "mb-4">
                    {children}
                </div>
            </div>
        </div>
    )
}