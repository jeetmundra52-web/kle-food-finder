import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import OutletCard from "@/components/OutletCard";
import SearchBar from "@/components/SearchBar";
import Filters from "@/components/Filters";
import SortDropdown from "@/components/SortDropdown";
import { useAuth } from "@/hooks/useAuth";
import { Outlet } from "@/types";

const OutletsList = () => {
    const [outlets, setOutlets] = useState<Outlet[]>([]);
    const [search, setSearch] = useState("");
    const [type, setType] = useState("");
    const [isVeg, setIsVeg] = useState(false);
    const [sort, setSort] = useState("");
    const { token } = useAuth();

    useEffect(() => {
        const fetchOutlets = async () => {
            try {
                const queryParams = new URLSearchParams();
                if (search) queryParams.append('search', search);
                if (type) queryParams.append('type', type);
                if (isVeg) queryParams.append('isVeg', 'true');
                if (sort) queryParams.append('sort', sort);

                const res = await fetch(`http://localhost:5000/api/outlets?${queryParams.toString()}`, {
                    headers: { 'x-auth-token': token || '' }
                });
                const data = await res.json();
                setOutlets(data);
            } catch (err) {
                console.error("Failed to fetch outlets", err);
            }
        };

        fetchOutlets();
    }, [search, type, isVeg, sort, token]);

    return (
        <div className="min-h-screen mesh-gradient">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                    <SearchBar value={search} onChange={setSearch} />
                    <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                        <Filters type={type} setType={setType} isVeg={isVeg} setIsVeg={setIsVeg} />
                        <SortDropdown value={sort} onChange={setSort} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {outlets.map((outlet) => (
                        <OutletCard key={outlet.id} outlet={outlet} />
                    ))}
                </div>

                {outlets.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">No outlets found matching your criteria.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default OutletsList;
