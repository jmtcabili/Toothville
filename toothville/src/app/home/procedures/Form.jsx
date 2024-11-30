'use client'

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import categories from "./categories.json"

export function ProcedureForm({ procedure, onSave, onCancel }) {
  const [name, setName] = useState(procedure?.name || '')
  const [price, setPrice] = useState(procedure?.price || '')
  const [category, setCategory] = useState(procedure?.category || '')
  
  useEffect(() => {
    if (procedure) {
      setName(procedure.name)
      setPrice(procedure.price)
      setCategory(procedure.category)
    }
  }, [procedure])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({ id: procedure?._id, name, price: Number(price), category })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Procedure name"
          className = "!bg-white"
          required
        />
      </div>
      <div>
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
           placeholder="Procedure price"
          className = "!bg-white"
          required
        />
      </div>
      <div>
        <Label htmlFor="category">Category</Label>
        <Input
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Procedure category"
          className = "!bg-white"
          required
        />
      </div>
      <div className="w-full space-x-2">       
        
        {procedure == null ? 
            <><Button type="" className = "!bg-nav_blue w-full !text-white">Add Procedure</Button></> : 
            <><Button type="" className = "!bg-nav_blue w-full !text-white">Edit Procedure</Button></>}
        
      </div>
    </form>
  )
}

