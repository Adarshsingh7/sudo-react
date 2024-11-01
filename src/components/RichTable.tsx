import { useState } from "react";
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Sample data
const initialData = [
  {
    id: 1,
    name: "John Doe",
    age: 30,
    email: "john@example.com",
    role: "Developer",
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 28,
    email: "jane@example.com",
    role: "Designer",
  },
  {
    id: 3,
    name: "Bob Johnson",
    age: 35,
    email: "bob@example.com",
    role: "Manager",
  },
  {
    id: 4,
    name: "Alice Brown",
    age: 26,
    email: "alice@example.com",
    role: "Developer",
  },
  {
    id: 5,
    name: "Charlie Wilson",
    age: 32,
    email: "charlie@example.com",
    role: "Designer",
  },
  {
    id: 6,
    name: "Eva Davis",
    age: 29,
    email: "eva@example.com",
    role: "Manager",
  },
  {
    id: 7,
    name: "Frank Miller",
    age: 31,
    email: "frank@example.com",
    role: "Developer",
  },
];

type SortDirection = "asc" | "desc" | null;

export function RichTable() {
  const [data] = useState(initialData);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(
        sortDirection === "asc"
          ? "desc"
          : sortDirection === "desc"
            ? null
            : "asc",
      );
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortColumn || !sortDirection) return 0;
    if (a[sortColumn as keyof typeof a] < b[sortColumn as keyof typeof b])
      return sortDirection === "asc" ? -1 : 1;
    if (a[sortColumn as keyof typeof a] > b[sortColumn as keyof typeof b])
      return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const renderSortIcon = (column: string) => {
    if (sortColumn !== column)
      return <ChevronsUpDown className="ml-2 h-4 w-4" />;
    if (sortDirection === "asc") return <ChevronUp className="ml-2 h-4 w-4" />;
    if (sortDirection === "desc")
      return <ChevronDown className="ml-2 h-4 w-4" />;
    return <ChevronsUpDown className="ml-2 h-4 w-4" />;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Employee Table</h2>
        <Select
          value={itemsPerPage.toString()}
          onValueChange={(value) => setItemsPerPage(Number(value))}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Items per page" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5 per page</SelectItem>
            <SelectItem value="10">10 per page</SelectItem>
            <SelectItem value="15">15 per page</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">
                <Button variant="ghost" onClick={() => handleSort("id")}>
                  ID {renderSortIcon("id")}
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("name")}>
                  Name {renderSortIcon("name")}
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("age")}>
                  Age {renderSortIcon("age")}
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("email")}>
                  Email {renderSortIcon("email")}
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button variant="ghost" onClick={() => handleSort("role")}>
                  Role {renderSortIcon("role")}
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.age}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell className="text-right">{item.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between items-center">
        <div>
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, sortedData.length)} of{" "}
          {sortedData.length} entries
        </div>
        <div className="space-x-2">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
