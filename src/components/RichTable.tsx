/** @format */

'use client';

import React, { useState, useEffect } from 'react';
import {
	ChevronDown,
	ChevronUp,
	ChevronsUpDown,
	Edit,
	Trash2,
	Search,
	PlusCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type SortDirection = 'asc' | 'desc' | null;

interface RichTableProps {
	initialData: any[];
	mapping: { label: string; field: string }[];
	onEdit: (id: number) => void;
	onDelete: (id: number) => void;
	label: string;
}

const RichTable = function ({
	initialData,
	mapping,
	onEdit,
	onDelete,
	label,
}: RichTableProps) {
	const data = initialData;

	const [sortColumn, setSortColumn] = useState<string | null>(null);
	const [sortDirection, setSortDirection] = useState<SortDirection>(null);

	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(5);
	const [searchTerm, setSearchTerm] = useState('');

	const [filteredData, setFilteredData] = useState(data);

	useEffect(() => {
		const filtered = data.filter((item) =>
			Object.values(item).some((val) =>
				String(val).toLowerCase().includes(searchTerm.toLowerCase())
			)
		);
		setFilteredData(filtered);
		setCurrentPage(1);
	}, [data, searchTerm]);

	const handleSort = (column: string) => {
		if (sortColumn === column) {
			setSortDirection(
				sortDirection === 'asc'
					? 'desc'
					: sortDirection === 'desc'
					? null
					: 'asc'
			);
		} else {
			setSortColumn(column);
			setSortDirection('asc');
		}
	};

	const sortedData = [...filteredData].sort((a, b) => {
		if (!sortColumn || !sortDirection) return 0;
		const aValue = a[sortColumn as keyof typeof a];
		const bValue = b[sortColumn as keyof typeof b];
		if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
		if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
		return 0;
	});

	const totalPages = Math.ceil(sortedData.length / itemsPerPage);
	const paginatedData = sortedData.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	const renderSortIcon = (column: string) => {
		if (sortColumn !== column)
			return <ChevronsUpDown className='ml-2 h-4 w-4' />;
		if (sortDirection === 'asc') return <ChevronUp className='ml-2 h-4 w-4' />;
		if (sortDirection === 'desc')
			return <ChevronDown className='ml-2 h-4 w-4' />;
		return <ChevronsUpDown className='ml-2 h-4 w-4' />;
	};

	const handleAddRecord = () => {};

	return (
		<Card className='w-full max-w-4xl mx-auto'>
			<CardHeader>
				<CardTitle className='text-2xl font-bold'>{label}</CardTitle>
			</CardHeader>
			<CardContent>
				<div className='mb-4 flex justify-between items-center'>
					<div className='flex items-center space-x-4'>
						<div className='relative w-64'>
							<Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
							<Input
								placeholder='Search...'
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className='pl-8'
							/>
						</div>
						<Button
							onClick={handleAddRecord}
							variant='outline'
							size='sm'
						>
							<PlusCircle className='h-4 w-4 mr-2' />
							Add Record
						</Button>
					</div>
					<Select
						value={itemsPerPage.toString()}
						onValueChange={(value) => setItemsPerPage(Number(value))}
					>
						<SelectTrigger className='w-[180px]'>
							<SelectValue placeholder='Items per page' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='5'>5 per page</SelectItem>
							<SelectItem value='10'>10 per page</SelectItem>
							<SelectItem value='15'>15 per page</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div className='border rounded-md overflow-hidden'>
					<Table>
						<TableHeader>
							<TableRow>
								{mapping.map((el) => (
									<TableHead className=''>
										<Button
											variant='ghost'
											onClick={() => handleSort(el.field)}
											className='font-bold'
										>
											{el.label} {renderSortIcon(el.field)}
										</Button>
									</TableHead>
								))}
								<TableHead className='text-right'>Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{paginatedData.map((item) => (
								<TableRow
									key={item.id}
									className='transition-colors hover:bg-muted/50'
								>
									<TableCell className='font-medium'>{item.id}</TableCell>
									<TableCell>{item.name}</TableCell>
									<TableCell>{item.age}</TableCell>
									<TableCell>{item.email}</TableCell>
									<TableCell>{item.role}</TableCell>
									<TableCell className='text-right'>
										<div className='flex justify-end space-x-2'>
											<Button
												variant='ghost'
												size='sm'
												onClick={() => onEdit(item.id)}
											>
												<Edit className='h-4 w-4' />
												<span className='sr-only'>Edit</span>
											</Button>
											<Button
												variant='ghost'
												size='sm'
												onClick={() => onDelete(item.id)}
											>
												<Trash2 className='h-4 w-4' />
												<span className='sr-only'>Delete</span>
											</Button>
										</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
				<div className='mt-4 flex justify-between items-center text-sm text-muted-foreground'>
					<div>
						Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
						{Math.min(currentPage * itemsPerPage, sortedData.length)} of{' '}
						{sortedData.length} entries
					</div>
					<div className='space-x-2'>
						<Button
							variant='outline'
							size='sm'
							onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
							disabled={currentPage === 1}
						>
							Previous
						</Button>
						<Button
							variant='outline'
							size='sm'
							onClick={() =>
								setCurrentPage((prev) => Math.min(prev + 1, totalPages))
							}
							disabled={currentPage === totalPages}
						>
							Next
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default React.memo(RichTable);
