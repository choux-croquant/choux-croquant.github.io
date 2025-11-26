type CationProps = {
    text: string;
};

export default function Figure({ text }: CationProps) {
    return (
        <p className="text-center text-base text-gray-500">
            {text}
        </p>
    );
}
