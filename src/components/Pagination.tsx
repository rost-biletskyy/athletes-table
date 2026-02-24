type Props = {
    page: number;
    totalPages: number;
    onChange: (p: number) => void;
};

export function Pagination({ page, totalPages, onChange }: Props) {
    return (
        <div className="pagination">
            <button disabled={page === 1} onClick={() => onChange(page - 1)}>
                Prev
            </button>

            <span style={{ margin: "0 10px" }}>
                Page {page} / {totalPages}
            </span>

            <button
                disabled={page === totalPages}
                onClick={() => onChange(page + 1)}
            >
                Next
            </button>
        </div>
    );
}