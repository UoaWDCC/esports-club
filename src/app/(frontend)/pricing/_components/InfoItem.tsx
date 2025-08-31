function InfoItem({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <dt className="text-sm font-medium text-green-800">{label}</dt>
            <dd className="text-green-900">{value}</dd>
        </div>
    );
}
