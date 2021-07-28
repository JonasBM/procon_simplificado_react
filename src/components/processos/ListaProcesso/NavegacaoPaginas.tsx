import React from "react";
import { useHistory } from "react-router-dom";

export const NavegacaoPaginas = ({
  page,
  searchParams,
  setPage,
  pageMax,
  className = "",
}: {
  page: number;
  searchParams?: string;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  pageMax: number;
  className?: string;
}) => {
  const history = useHistory();

  if (searchParams) {
  }

  return (
    <nav className={className}>
      <ul className="pagination">
        <li
          className={
            "page-item border-end" +
            (page === 1 ? " disabled" : "") +
            searchParams
          }
        >
          <button
            className="page-link"
            onClick={() => {
              setPage(page - 1);
              history.push(
                "processos?page=" + (page - 1).toString() + searchParams
              );
            }}
          >
            Previous
          </button>
        </li>
        {[...Array(pageMax)].map((e, i) => {
          let thispage = i + 1;
          return (
            <li
              className={
                "page-item border-end" + (page === thispage ? " active" : "")
              }
              key={thispage}
            >
              <button
                className="page-link"
                onClick={() => {
                  setPage(thispage);
                  history.push(
                    "processos?page=" + thispage.toString() + searchParams
                  );
                }}
              >
                {thispage}
              </button>
            </li>
          );
        })}
        <li className={"page-item" + (page === pageMax ? " disabled" : "")}>
          <button
            className="page-link"
            onClick={() => {
              setPage(page + 1);
              history.push(
                "processos?page=" + (page + 1).toString() + searchParams
              );
            }}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavegacaoPaginas;
