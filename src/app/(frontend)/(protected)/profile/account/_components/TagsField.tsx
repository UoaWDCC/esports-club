import { Tags } from "./Tags";

export const TagsField = () => {
    return (
        <div className="flex w-full flex-col gap-1">
            <label>Tags</label>
            <div className="border-border flex gap-3 rounded-md border p-3">
                <Tags label="Tournament" className="border-[#E771FF] bg-[#773184] text-[#E771FF]" />
                <Tags label="Social" className="border-[#A071FF] bg-[#343184] text-[#A071FF]" />
                <Tags label="Valorant" className="border-[#FF7184] bg-[#84313C] text-[#FF7184]" />
            </div>
        </div>
    );
};