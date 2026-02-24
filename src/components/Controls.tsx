import type { Athlete } from "../types/athlete";
import type { Filters } from "../utils/table";

type Props = {
    rows: Athlete[];
    search: string;
    onSearchChange: (v: string) => void;
    filters: Filters;
    onFiltersChange: (f: Filters) => void;
    onReset: () => void;
};

export function Controls({
    rows,
    search,
    onSearchChange,
    filters,
    onFiltersChange,
    onReset,
}: Props) {
    const unique = (arr: string[]) =>
        Array.from(new Set(arr)).sort((a, b) => a.localeCompare(b));

    const countries = unique(rows.map((r) => r.country));
    const sports = unique(rows.map((r) => r.sport));
    const statuses = unique(rows.map((r) => r.status));
    const genders = unique(rows.map((r) => r.gender));

    return (
        <div className="controls">
            <input
                placeholder="Search..."
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
            />

            <select
                value={filters.country}
                onChange={(e) =>
                    onFiltersChange({ ...filters, country: e.target.value })
                }
            >
                <option value="">All Countries</option>
                {countries.map((c) => (
                    <option key={c}>{c}</option>
                ))}
            </select>

            <select
                value={filters.sport}
                onChange={(e) =>
                    onFiltersChange({ ...filters, sport: e.target.value })
                }
            >
                <option value="">All Sports</option>
                {sports.map((s) => (
                    <option key={s}>{s}</option>
                ))}
            </select>

            <select
                value={filters.status}
                onChange={(e) =>
                    onFiltersChange({ ...filters, status: e.target.value })
                }
            >
                <option value="">All Status</option>
                {statuses.map((s) => (
                    <option key={s}>{s}</option>
                ))}
            </select>

            <select
                value={filters.gender}
                onChange={(e) =>
                    onFiltersChange({ ...filters, gender: e.target.value })
                }
            >
                <option value="">All Genders</option>
                {genders.map((g) => (
                    <option key={g}>{g}</option>
                ))}
            </select>

            <select
                value={filters.olympian}
                onChange={(e) =>
                    onFiltersChange({
                        ...filters,
                        olympian: e.target.value as Filters["olympian"],
                    })
                }
            >
                <option value="">All</option>
                <option value="true">Olympian</option>
                <option value="false">Not Olympian</option>
            </select>

            <button onClick={onReset}>Reset</button>
        </div>
    );
}