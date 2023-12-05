import {
  PaginationItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Pagination } from "@mui/material";
import TableProps from "./type";
import Icon from "../Icon/Icon";
import { Link } from "react-router-dom";

const PAGE_SIZE = 10;

const TableComponenet = ({
  headers,
  data,
  page,
  setPage,
  totalElements,
  linkUrl,
  excludeFields,
}: TableProps) => {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 900 }}>
          <TableHead>
            <TableRow>
              <TableCell>ردیف</TableCell>
              {headers.map((header) => (
                <TableCell key={header}>{header}</TableCell>
              ))}
              {linkUrl && <TableCell>مشاهده جزئیات</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((item, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}>
                <TableCell>{index + 1 + (page - 1) * PAGE_SIZE}</TableCell>
                {Object.keys(item).map((binding, index) => {
                  if (!excludeFields?.includes(binding))
                    return <TableCell key={index}>{item[binding]}</TableCell>;
                })}
                {linkUrl && (
                  <TableCell>
                    <Link
                      className={"btn btn-primary text-white p-2"}
                      to={linkUrl + item["orderId"]}>
                      <Icon name={"grid-3x2-gap"} color={"white"} size={5} />
                    </Link>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className='grid grid-cols-3 justify-between items-center mt-4'>
        <div className='text-medium15 text-text-dark'>
          {`${Math.min((page - 1) * PAGE_SIZE + 1, totalElements)} - ${Math.min(
            page * PAGE_SIZE,
            totalElements
          )} از ${totalElements} مورد`}
        </div>
        <Pagination
          count={Math.ceil(totalElements / 10)}
          page={page}
          onChange={handleChange}
          sx={{
            ".MuiPaginationItem-root": {
              MozFontFeatureSettings: "'ss04'",
              WebkitFontFeatureSettings: "'ss04'",
              fontFeatureSettings: "'ss04'",
              color: "#11131F",
              borderRadius: "8px",
              borderColor: "#14151A26",
            },
            ".MuiPaginationItem-previousNext": {
              border: 0,
              fill: "#8F97B2",
            },
            ".Mui-selected": {
              color: "#00276B !important",
              backgroundColor: "#CAF5FD !important",
              borderColor: "#CAF5FD",
            },
            ".Mui-selected:hover": {
              color: "#00276B !important",
              backgroundColor: "#CAF5FD !important",
              borderColor: "#CAF5FD",
            },
          }}
          variant='outlined'
          shape='rounded'
          renderItem={(item) => (
            <PaginationItem
              slots={{
                previous: () => (
                  <Icon name={"chevron-left"} color={"text"} size={6} />
                ),
                next: () => (
                  <Icon name={"chevron-right"} color={"text"} size={6} />
                ),
              }}
              {...item}
            />
          )}
        />
      </div>
    </>
  );
};

export default TableComponenet;
