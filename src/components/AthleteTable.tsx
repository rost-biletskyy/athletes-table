import type { Athlete } from "../types/athlete";
import type { SortState } from "../utils/table";

type Props = {
    rows: Athlete[];
    sort: SortState;
    onSortChange: (s: SortState) => void;
};

export function AthleteTable({ rows, sort, onSortChange }: Props) {
    const handleSort = (key: keyof Athlete) => {
        if (!sort || sort.key !== key) {
            onSortChange({ key, direction: "asc" });
        } else {
            onSortChange({
                key,
                direction: sort.direction === "asc" ? "desc" : "asc",
            });
        }
    };

    const arrow = (key: keyof Athlete) =>
        sort?.key === key ? (sort.direction === "asc" ? " ↑" : " ↓") : "";

    return (
        <table border={1} cellPadding={6} width="100%">
            <thead>
                <tr>
                    <th onClick={() => handleSort("athleteCode")}>Code{arrow("athleteCode")}</th>
                    <th onClick={() => handleSort("firstName")}>Name{arrow("firstName")}</th>
                    <th onClick={() => handleSort("country")}>Country{arrow("country")}</th>
                    <th onClick={() => handleSort("sport")}>Sport{arrow("sport")}</th>
                    <th onClick={() => handleSort("age")}>Age{arrow("age")}</th>
                    <th onClick={() => handleSort("ranking")}>Ranking{arrow("ranking")}</th>
                    <th onClick={() => handleSort("salaryUsd")}>Salary{arrow("salaryUsd")}</th>
                </tr>
            </thead>
            <tbody>
                {rows.map((r) => (
                    <tr key={r.id}>
                        <td>{r.athleteCode}</td>
                        <td>{r.firstName} {r.lastName}</td>
                        <td>{r.country}</td>
                        <td>{r.sport}</td>
                        <td>{r.age}</td>
                        <td>{r.ranking}</td>
                        <td>{r.salaryUsd.toLocaleString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}