import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
    return (
        <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
                id="searchInput"
                type="text"
                placeholder="Search for outlets, cuisines..."
                className="pl-10 bg-white border-gray-200 focus:border-primary focus:ring-primary rounded-xl"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};

export default SearchBar;
