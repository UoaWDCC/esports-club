import { tv, VariantProps } from "tailwind-variants";

const informationPanel = tv({
    base: "font-tomorrow text-xl",
    variants: {
        headerColour: {
            purple: "text-purple",
            pink: "text-pink",
        },
    },
    defaultVariants: {
        headerColour: "purple",
    },
});

export type InformationPanelProps = {
    title: string;
    subtitle: string;
    description: string;
    variant?: VariantProps<typeof informationPanel>;
};

export function InformationPanel({ title, subtitle, description, variant }: InformationPanelProps) {
    return (
        <div className="flex w-106 flex-col gap-4">
            <h3 className={informationPanel(variant)}>{title}</h3>
            <h5 className="font-tomorrow text-3xl font-normal">{subtitle}</h5>
            <p className="font-satoshi font-light">{description}</p>
        </div>
    );
}
