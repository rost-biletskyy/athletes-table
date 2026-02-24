import { useMemo, useState } from "react";
import athletesData from "./data/athletes.json";
import type { Athlete } from "./types/athlete";
import {
  searchRows,
  filterRows,
  sortRows,
  paginate,
  type Filters,
  type SortState,
} from "./utils/table";
import { Controls } from "./components/Controls";
import { AthleteTable } from "./components/AthleteTable";
import { Pagination } from "./components/Pagination";

import "./table.css";

const athletes = athletesData as Athlete[];

const initialFilters: Filters = {
  country: "",
  sport: "",
  status: "",
  gender: "",
  olympian: "",
};

export default function App() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState(initialFilters);
  const [sort, setSort] = useState<SortState>(null);
  const [page, setPage] = useState(1);

  const pageSize = 10;

  const processed = useMemo(() => {
    let rows = searchRows(athletes, search);
    rows = filterRows(rows, filters);
    rows = sortRows(rows, sort);
    return rows;
  }, [search, filters, sort]);

  const paginated = paginate(processed, page, pageSize);

  return (
    <div style={{ padding: 20 }}>
      <h1>Athletes</h1>

      <Controls
        rows={athletes}
        search={search}
        onSearchChange={(v) => {
          setSearch(v);
          setPage(1);
        }}
        filters={filters}
        onFiltersChange={(f) => {
          setFilters(f);
          setPage(1);
        }}
        onReset={() => {
          setSearch("");
          setFilters(initialFilters);
          setSort(null);
          setPage(1);
        }}
      />
      <div className="table-wrapper">
        <AthleteTable
          rows={paginated.rows}
          sort={sort}
          onSortChange={(s) => {
            setSort(s);
            setPage(1);
          }}
        />
      </div>

      <Pagination
        page={paginated.page}
        totalPages={paginated.totalPages}
        onChange={setPage}
      />
    </div>
  );
}