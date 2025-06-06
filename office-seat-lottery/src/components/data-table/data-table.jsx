"use client"

import * as React from "react"
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  GripVerticalIcon,
  MoreVerticalIcon,
  PlusIcon,
  SaveIcon,
  TrashIcon,
} from "lucide-react"
import { toast } from "sonner"
import { z } from "zod"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const schema = z.object({
  id: z.number(),
  appointId: z.number(),
  seatId: z.string(),
  userId: z.number(),
  startDate: z.string(),
  endDate: z.string(),
  created: z.string(),
  updated: z.string().nullable(),
})

// Create a separate component for the drag handle
function DragHandle({
  id
}) {
  const { attributes, listeners } = useSortable({
    id,
  })

  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="size-7 text-muted-foreground hover:bg-transparent">
      <GripVerticalIcon className="size-3 text-muted-foreground" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  );
}

// Editable cell component
function EditableCell({
  value,
  onChange,
  type = "text",
  options = []
}) {
  if (type === "select") {
    return (
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger
          className="h-8 border-transparent bg-transparent shadow-none hover:bg-input/30 focus-visible:border focus-visible:bg-background">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  return (
    <Input
      className="h-8 border-transparent bg-transparent shadow-none hover:bg-input/30 focus-visible:border focus-visible:bg-background"
      value={value}
      onChange={(e) => onChange(e.target.value)} />
  );
}

export function DataTable({
  data: initialData
}) {
  const [data, setData] = React.useState(() => initialData)
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [columnFilters, setColumnFilters] = React.useState([])
  const [sorting, setSorting] = React.useState([])
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  })
  const [hasChanges, setHasChanges] = React.useState(false)
  const sortableId = React.useId()

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  )

  const dataIds = React.useMemo(() => data?.map(({ id }) => id) || [], [data])

  // Update data function
  const updateData = (id, field, value) => {
    setData(
      (prev) => prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    )
    setHasChanges(true)
  }

  // Delete selected rows
  const deleteSelectedRows = () => {
    const selectedIds = Object.keys(rowSelection).map(Number)

    // 選択された行からAppointIdのセットを作成
    const selectedAppointIds = new Set(
      data.filter((item) => selectedIds.includes(item.id)).map((item) => item.appointId)
    )

    // 同じAppointIdを持つすべての行を削除
    setData((prev) => prev.filter((item) => !selectedAppointIds.has(item.appointId)))
    setRowSelection({})
    setHasChanges(true)
    toast.success(`Deleted ${selectedAppointIds.size} appointment(s)`)
  }

  // Save changes
  const saveChanges = async () => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setHasChanges(false)
      toast.success("Changes saved successfully")
    } catch (error) {
      toast.error("Failed to save changes")
    }
  }

  const columns = [
    {
      id: "drag",
      header: () => null,
      cell: ({ row }) => <DragHandle id={row.original.id} />,
    },
    {
      id: "select",
      header: ({ table }) => (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all" />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row" />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "appointId",
      header: "Appoint ID",
      cell: ({ row }) => (
        <div className="w-24">
          <EditableCell
            value={row.original.appointId.toString()}
            onChange={(value) => updateData(row.original.id, "appointId", Number.parseInt(value) || 0)} />
        </div>
      ),
      enableHiding: false,
    },
    {
      accessorKey: "seatId",
      header: "Seat ID",
      cell: ({ row }) => (
        <div className="w-24">
          <EditableCell
            value={row.original.seatId}
            onChange={(value) => updateData(row.original.id, "seatId", value)} />
        </div>
      ),
    },
    {
      accessorKey: "userId",
      header: "User ID",
      cell: ({ row }) => (
        <div className="w-24">
          <EditableCell
            value={row.original.userId.toString()}
            onChange={(value) => updateData(row.original.id, "userId", Number.parseInt(value) || 0)} />
        </div>
      ),
    },
    {
      accessorKey: "startDate",
      header: "Start Date",
      cell: ({ row }) => (
        <div className="w-40">
          <EditableCell
            value={new Date(row.original.startDate).toLocaleString()}
            onChange={(value) => updateData(row.original.id, "startDate", value)} />
        </div>
      ),
    },
    {
      accessorKey: "endDate",
      header: "End Date",
      cell: ({ row }) => (
        <div className="w-40">
          <EditableCell
            value={new Date(row.original.endDate).toLocaleString()}
            onChange={(value) => updateData(row.original.id, "endDate", value)} />
        </div>
      ),
    },
    {
      accessorKey: "created",
      header: "Created",
      cell: ({ row }) => (
        <div className="w-40">
          <span className="text-sm text-muted-foreground">{new Date(row.original.created).toLocaleString()}</span>
        </div>
      ),
    },
    {
      accessorKey: "updated",
      header: "Updated",
      cell: ({ row }) => (
        <div className="w-40">
          <span className="text-sm text-muted-foreground">
            {row.original.updated ? new Date(row.original.updated).toLocaleString() : "—"}
          </span>
        </div>
      ),
    },
    {
      id: "actions",
      cell: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
              size="icon">
              <MoreVerticalIcon />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Make a copy</DropdownMenuItem>
            <DropdownMenuItem>Favorite</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: (updater) => {
      // 現在の選択状態を取得
      let newSelection = {}

      if (typeof updater === "function") {
        newSelection = updater(rowSelection)
      } else {
        newSelection = updater
      }

      // 変更されたキーを見つける
      const changedKeys = Object.keys(newSelection).filter((key) => !rowSelection[key] === newSelection[key])

      if (changedKeys.length > 0) {
        // 変更された行のIDを取得
        const changedRowId = Number(changedKeys[0])
        // 変更された行のデータを取得
        const changedRow = data.find((row) => row.id === changedRowId)

        if (changedRow) {
          // 同じAppointIdを持つすべての行を取得
          const relatedRows = data.filter((row) => row.appointId === changedRow.appointId)

          // 新しい選択状態を作成
          const updatedSelection = { ...newSelection }

          // 関連するすべての行に同じ選択状態を適用
          relatedRows.forEach((row) => {
            updatedSelection[row.id.toString()] = newSelection[changedRowId.toString()]
          })

          setRowSelection(updatedSelection)
        } else {
          setRowSelection(newSelection)
        }
      } else {
        setRowSelection(newSelection)
      }
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  function handleDragEnd(event) {
    const { active, over } = event
    if (active && over && active.id !== over.id) {
      setData((data) => {
        const oldIndex = dataIds.indexOf(active.id)
        const newIndex = dataIds.indexOf(over.id)
        return arrayMove(data, oldIndex, newIndex);
      })
      setHasChanges(true)
    }
  }

  function DraggableRow({
    row
  }) {
    const { transform, transition, setNodeRef, isDragging } = useSortable({
      id: row.original.id,
    })

    const selectedRowCount = Object.keys(rowSelection).length

    return (
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <TableRow
            data-state={row.getIsSelected() && "selected"}
            data-dragging={isDragging}
            ref={setNodeRef}
            className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
            style={{
              transform: CSS.Transform.toString(transform),
              transition: transition,
            }}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
            ))}
          </TableRow>
        </ContextMenuTrigger>
        {selectedRowCount > 0 && (
          <ContextMenuContent>
            <ContextMenuItem onClick={deleteSelectedRows} className="text-destructive">
              <TrashIcon className="mr-2 h-4 w-4" />
              Delete {selectedRowCount} selected row{selectedRowCount > 1 ? "s" : ""}
            </ContextMenuItem>
          </ContextMenuContent>
        )}
      </ContextMenu>
    );
  }

  return (
    <div className="flex w-full flex-col justify-start gap-6">
      <div className="flex items-center justify-between px-4 lg:px-6">
        <h2 className="text-lg font-semibold">Seat Appointments</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <PlusIcon />
            <span className="hidden lg:inline">Add Appointment</span>
          </Button>
        </div>
      </div>
      <div className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
        <div className="overflow-hidden rounded-lg border">
          <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
            id={sortableId}>
            <Table>
              <TableHeader className="sticky top-0 z-10 bg-muted">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} colSpan={header.colSpan}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody className="**:data-[slot=table-cell]:first:w-8">
                {table.getRowModel().rows?.length ? (
                  <SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
                    {table.getRowModel().rows.map((row) => (
                      <DraggableRow key={row.id} row={row} />
                    ))}
                  </SortableContext>
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </DndContext>
        </div>
        <div className="flex items-center justify-between px-4">
          <div className="hidden flex-1 text-sm text-muted-foreground lg:flex">
            {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
            selected.
          </div>
          <div className="flex w-full items-center gap-8 lg:w-fit">
            <div className="hidden items-center gap-2 lg:flex">
              <Label htmlFor="rows-per-page" className="text-sm font-medium">
                Rows per page
              </Label>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value))
                }}>
                <SelectTrigger className="w-20" id="rows-per-page">
                  <SelectValue placeholder={table.getState().pagination.pageSize} />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-fit items-center justify-center text-sm font-medium">
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </div>
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}>
                <span className="sr-only">Go to first page</span>
                <ChevronsLeftIcon />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}>
                <span className="sr-only">Go to previous page</span>
                <ChevronLeftIcon />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}>
                <span className="sr-only">Go to next page</span>
                <ChevronRightIcon />
              </Button>
              <Button
                variant="outline"
                className="hidden size-8 lg:flex"
                size="icon"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}>
                <span className="sr-only">Go to last page</span>
                <ChevronsRightIcon />
              </Button>
            </div>
          </div>
        </div>
        {/* Save Button */}
        <div className="flex justify-end px-4 pb-4">
          <Button onClick={saveChanges} disabled={!hasChanges} className="gap-2">
            <SaveIcon className="h-4 w-4" />
            Save Changes
            {hasChanges && (
              <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0">
                !
              </Badge>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
