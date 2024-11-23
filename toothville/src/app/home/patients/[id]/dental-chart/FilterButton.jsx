"use client"

import { useState, useEffect } from 'react'
import { Filter } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const filterOptions = [
  { id: "Upper_Right", label: "Upper Right" },
  { id: "Upper_Left", label: "Upper Left" },
  { id: "Lower_Right", label: "Lower Right" },
  { id: "Lower_Left", label: "Lower Left" },
]



export default function FilterButton({selectedFilters, setSelectedFilters, chart, setFilteredTeeth}) {

    //will change the state that contains the list of filtered teeth areas
    const handleFilterChange = (filterId) => {
        setSelectedFilters((prev) =>
          prev.includes(filterId)
            ? prev.filter((id) => id !== filterId)
            : [...prev, filterId]
        )
    }

    /*on render and when filters change, will set teeth list based on filters
    
    useEffect(() => {
      const filterTeeth = () =>{
        let teeth = chart.filter((tooth) =>{
            let toothArea = tooth.area.replace(" ", "_")
            if (selectedFilters.includes(toothArea))
                return tooth; 
        })
        const arr = []
        if (selectedFilters.length != 0)
          setFilteredTeeth(teeth)
        else{
          setFilteredTeeth(chart)
        }
      }
      filterTeeth()
    },[selectedFilters])
    */
    
    
    
    return (
      <Popover className = "!bg-white">
        <PopoverTrigger asChild>
        <Button 
            variant="outline" 
            className="w-10 h-10 p-0 !bg-blue-100 hover:!bg-blue-200 !border-blue-200"
          >
            <Filter className="h-4 w-4 !text-blue-500" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 !bg-white !text-black">
          <div className="grid gap-4">
            <h4 className="font-medium leading-none">Filter Options</h4>
            <div className="grid gap-2">
              {filterOptions.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={option.id}
                    className = "!border !border-black"
                    checked={selectedFilters.includes(option.id)}
                    onCheckedChange={() => handleFilterChange(option.id)}
                  />
                  <label
                    htmlFor={option.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    )
}
/*
<Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className="w-10 p-0 bg-blue-100 hover:bg-blue-200 border-blue-200"
        >
          <Filter className="h-4 w-4 text-blue-500" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56">
        <div className="grid gap-4">
          <h4 className="font-medium leading-none">Filter Options</h4>
          <div className="grid gap-2">
            {filterOptions.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <Checkbox
                  id={option.id}
                  checked={selectedFilters.includes(option.id)}
                  onCheckedChange={() => handleFilterChange(option.id)}
                />
                <label
                  htmlFor={option.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
*/