"use client"

import * as React from "react"
import { useSession } from "next-auth/react"
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
import { useEmployees } from "@/hooks/use-all-employees"


// Create a separate component for the drag handle
function DragHandle({ id }) {
  const { attributes, listeners } = useSortable({ id })

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
function EditableCell({ value, onChange, type = "text", options = [] }) {
  if (type === "select") {
    // ❶ 受け取った値を必ず文字列に
    const stringValue =
      value === null || value === undefined ? "" : String(value);

    return (
      <Select
        value={stringValue}
        // ❷ 文字列で受け取り、必要に応じて数値に戻す
        onValueChange={(val) => onChange(Number(val))}
      >
        <SelectTrigger className="h-8 border-transparent bg-transparent shadow-none
                                  hover:bg-input/30 focus-visible:border
                                  focus-visible:bg-background">
          {/* 選択済みラベルが自動で入る */}
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o.id} value={String(o.id)}>
              {o.label}
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

export function DataTable({ data: initialData }) {
  const { data: session } = useSession()
  const user = session?.user
  const [data, setData] = React.useState(() => initialData)
  // 変更のあった行データを保持する state
  const [edited, setEdited] = React.useState({})       // 編集履歴
  const [deletedIds, setDeletedIds] = React.useState([]) // 削除対象ID
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
  const { employeeList, selectedEmployees, setSelectedEmployees } = useEmployees(user)

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  )

  const dataIds = React.useMemo(() => data?.map(({ id }) => id) || [], [data])

  //  更新
  const updateData = (id, field, value) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    )
    setEdited((prev) => {
      const base = prev[id] || data.find((r) => r.id === id)
      return { ...prev, [id]: { ...base, [field]: value } }
    })
    setHasChanges(true)
  }
  
  const deleteSelectedRows = () => {
    const ids = Object.keys(rowSelection).map(Number)
    setDeletedIds((prev) => Array.from(new Set([...prev, ...ids])))
    setData((prev) => prev.filter((r) => !ids.includes(r.id)))
    setRowSelection({})
    setHasChanges(true)
    toast.success(`${ids.length} 行を削除しました。保存してください。`)
  }

 // 保存
  const saveChanges = async () => {
    if (!hasChanges) return
    const updates = Object.values(edited)
    try {
      const res = await fetch("/api/master/m_seat_appoint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updates, deletes: deletedIds }),
      })
      if (!res.ok) throw new Error((await res.json()).error || "保存失敗しました。")
      const json = await res.json()
      toast.success(
        `更新: ${json.updatedCount} 件、削除: ${json.deletedCount} 件 保存しました。`
      )
      const fresh = await fetch("/api/master/m_seat_appoint").then((r) =>
        r.json()
      )
      setData(fresh)
      setEdited({})
      setDeletedIds([])
      setHasChanges(false)
    } catch (error) {
      toast.error(error.message)
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
      header: "予約ID",
      cell: ({ row }) => (
        <div className="w-10">
          <span className="text-sm text-muted-foreground">{row.original.appointId.toString()}</span>
        </div>
      ),
      enableHiding: false,
    },
    {
      accessorKey: "seatId",
      header: "予約座席",
      cell: ({ row }) => (
        <div className="w-15">
          <EditableCell
            value={row.original.seatId}
            onChange={(value) => updateData(row.original.id, "seatId", value)} />
        </div>
      ),
    },
    {
      accessorKey: "userId",
      header: "予約者",
      cell: ({ row }) => (
        <div className="w-20">
          <EditableCell
            value={row.original.userId.toString()}
            type="select"
            options={employeeList}
            onChange={(v) =>
              updateData(row.original.id, "userId", v)
            }
          />
        </div>
      ),
    },
    {
      accessorKey: "startDate",
      header: "適用開始日",
      cell: ({ row }) => (
        <div className="w-40">
          <EditableCell
            value={
              new Date(row.original.startDate)
                .toLocaleString('ja-JP', { timeZone: 'UTC' })
            }
            onChange={(value) => updateData(row.original.id, "startDate", value)}
          />
        </div>
      ),
    },
    {
      accessorKey: "endDate",
      header: "適用終了日",
      cell: ({ row }) => (
        <div className="w-40">
          <EditableCell
            value={
              new Date(row.original.endDate)
                .toLocaleString('ja-JP', { timeZone: 'UTC' })
            }
            onChange={(value) => updateData(row.original.id, "endDate", value)} />
        </div>
      ),
    },
    {
      accessorKey: "created",
      header: "作成日時",
      cell: ({ row }) => (
        <div className="w-20">
          <span className="text-sm text-muted-foreground">{new Date(row.original.created)
            .toLocaleString('ja-JP', { timeZone: 'UTC' })}</span>
        </div>
      ),
    },
    {
      accessorKey: "updated",
      header: "更新日時",
      cell: ({ row }) => (
        <div className="w-20">
          <span className="text-sm text-muted-foreground">
            {row.original.updated ? new Date(row.original.updated)
              .toLocaleString('ja-JP', { timeZone: 'UTC' }) : "-"}
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
            <DropdownMenuItem>削除</DropdownMenuItem>
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
      let newSelection = {}
      if (typeof updater === "function") {
        newSelection = updater(rowSelection)
      } else {
        newSelection = updater
      }
      const changedKeys = Object.keys(newSelection).filter(
        (key) => !rowSelection[key] === newSelection[key]
      )
      if (changedKeys.length > 0) {
        const changedRowId = Number(changedKeys[0])
        const changedRow = data.find((row) => row.id === changedRowId)
        if (changedRow) {
          const relatedRows = data.filter((row) => row.appointId === changedRow.appointId)
          const updatedSelection = { ...newSelection }
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

  function DraggableRow({ row }) {
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
              {selectedRowCount} 行削除する
            </ContextMenuItem>
          </ContextMenuContent>
        )}
      </ContextMenu>
    );
  }

  return (
    <div className="flex w-full flex-col justify-start gap-6">
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
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
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
            選択数/データ件数：{table.getFilteredSelectedRowModel().rows.length}/{table.getFilteredRowModel().rows.length} 
          </div>
          <div className="flex w-full items-center gap-8 lg:w-fit">
            <div className="hidden items-center gap-2 lg:flex">
              <Label htmlFor="rows-per-page" className="text-sm font-medium">
                表示行数
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
              Page {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
            </div>
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}>
                <span className="sr-only">first</span>
                <ChevronsLeftIcon />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}>
                <span className="sr-only">back</span>
                <ChevronLeftIcon />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}>
                <span className="sr-only">next</span>
                <ChevronRightIcon />
              </Button>
              <Button
                variant="outline"
                className="hidden size-8 lg:flex"
                size="icon"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}>
                <span className="sr-only">last</span>
                <ChevronsRightIcon />
              </Button>
            </div>
          </div>
        </div>
        {/* Save Button */}
        <div className="flex justify-end px-4 pb-4">
          <Button onClick={saveChanges} disabled={!hasChanges} className="gap-2">
            <SaveIcon className="h-4 w-4" />
            保存
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