"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import categories from "@/app/home/procedures/categories.json"

export function Combobox({setCategory}) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("Filter by category")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="!w-full overflow-x-auto">
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between !text-black !bg-white"
        >
          {value}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 !bg-white">
        <Command className = "!bg-white !text-black w-[300px]">
          <CommandInput placeholder="Search category" className="!text-black"/>
          <CommandList className = "!max-h-[200px] overflow-y-auto">
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup className="overflow-y-auto">
              <CommandItem
                  value={"All"}
                  onSelect={(currentValue) => {
                    setValue("All")
                    setOpen(false)
                    setCategory(currentValue)
                  }}
                  className = "!text-black  dark:data-[selected='true']:bg-gray-400 dark:data-[selected=true]:text-slate-50"
                >
                  All
              </CommandItem>
              {categories.map((category, index) => (
                <CommandItem
                  key={index}
                  value={category.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                    setCategory(currentValue)
                  }}
                  className = "!text-black  dark:data-[selected='true']:bg-gray-400 dark:data-[selected=true]:text-slate-50"
                >
                  {category.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
