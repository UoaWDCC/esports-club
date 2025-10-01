export function InfoItem({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <dt className="text-sm font-medium">{label}</dt>
            <dd className="text-sm">{value}</dd>
        </div>
    );
}
