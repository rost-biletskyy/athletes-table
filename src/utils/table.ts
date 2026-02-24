import type { Athlete } from "../types/athlete";

export type SortDirection = "asc" | "desc";

export type SortState = {
    key: keyof Athlete;
    direction: SortDirection;
} | null;

export type Filters = {
    country: string;
    sport: string;
    status: string;
    gender: string;
    olympian: "" | "true" | "false";
};

export function searchRows(rows: Athlete[], query: string) {
    if (!query.trim()) return rows;

    const q = query.toLowerCase();

    return rows.filter((r) =>
        [
            r.athleteCode,
            r.firstName,
            r.lastName,
            r.country,
            r.sport,
            r.team,
            r.status,
            r.gender,
        ]
            .join(" ")
            .toLowerCase()
            .includes(q)
    );
}

export function filterRows(rows: Athlete[], filters: Filters) {
    return rows.filter((r) => {
        if (filters.country && r.country !== filters.country) return false;
        if (filters.sport && r.sport !== filters.sport) return false;
        if (filters.status && r.status !== filters.status) return false;
        if (filters.gender && r.gender !== filters.gender) return false;

        if (filters.olympian) {
            const expected = filters.olympian === "true";
            if (r.isOlympian !== expected) return false;
        }

        return true;
    });
}

function compare(a: unknown, b: unknown) {
    if (typeof a === "number" && typeof b === "number") return a - b;
    if (typeof a === "boolean" && typeof b === "boolean")
        return Number(a) - Number(b);

    if (typeof a === "string" && typeof b === "string") {
        const da = Date.parse(a);
        const db = Date.parse(b);

        if (!Number.isNaN(da) && !Number.isNaN(db)) {
            return da - db;
        }

        return a.localeCompare(b);
    }

    return String(a).localeCompare(String(b));
}

export function sortRows(rows: Athlete[], sort: SortState) {
    if (!sort) return rows;

    const sorted = [...rows].sort((a, b) => {
        const result = compare(a[sort.key], b[sort.key]);
        return sort.direction === "asc" ? result : -result;
    });

    return sorted;
}

export function paginate<T>(rows: T[], page: number, pageSize: number) {
    const total = rows.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const safePage = Math.min(Math.max(page, 1), totalPages);

    const start = (safePage - 1) * pageSize;
    const end = start + pageSize;

    return {
        page: safePage,
        total,
        totalPages,
        rows: rows.slice(start, end),
    };
}