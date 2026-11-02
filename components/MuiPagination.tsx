
"use client";

import Pagination from "@mui/material/Pagination";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function MuiPagination({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex w-full items-center justify-center py-7 sm:py-9">
      <div className="flex max-w-full items-center justify-center overflow-x-auto rounded-full bg-transparent p-0 shadow-none">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(_, page) => onPageChange(page)}
          variant="text"
          shape="circular"
          size="large"
          showFirstButton
          showLastButton
          siblingCount={0}
          boundaryCount={1}
          sx={{
            "& .MuiPagination-ul": {
              flexWrap: "nowrap",
              gap: { xs: "2px", sm: "5px" },
            },

            "& .MuiPaginationItem-root": {
              color: "var(--pagination-text)",
              borderRadius: "7px",
              minWidth: { xs: "32px", sm: "40px" },
              height: { xs: "32px", sm: "40px" },
              margin: 0,
              fontSize: { xs: "12px", sm: "14px" },
              fontWeight: 600,
              transition: "all 0.2s ease",
            },

            "& .MuiPaginationItem-root:hover": {
              backgroundColor: "var(--pagination-hover)",
            },

            "& .MuiPaginationItem-root.Mui-selected": {
              backgroundColor: "var(--pagination-selected-bg)",
              color: "var(--pagination-selected-text)",
              boxShadow: "0 3px 10px rgba(0,0,0,0.18)",
            },

            "& .MuiPaginationItem-root.Mui-selected:hover": {
              backgroundColor: "var(--pagination-selected-hover)",
            },

            "& .MuiPaginationItem-root.Mui-disabled": {
              opacity: 0.3,
            },

            "& .MuiPaginationItem-ellipsis": {
              color: "var(--pagination-text)",
            },
          }}
        />
      </div>
    </div>
  );
}
