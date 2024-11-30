'use client'

import { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ProcedureForm } from './Form'
import { ProcedureModal } from './Modal'

export default function ProcedureList() {
  const [procedures, setProcedures] = useState([])
  const [filter, setFilter] = useState('')
  const [selectedProcedure, setSelectedProcedure] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    async function fetchProcedures() {
      let response = await fetch('http://localhost:3000/api/procedure')
      let data = await response.json()
      setProcedures(data)
    }
    fetchProcedures()
  }, [])
  const filteredProcedures = procedures.filter(
    (procedure) =>
      procedure.name.toLowerCase().includes(filter.toLowerCase()) ||
      procedure.category.toLowerCase().includes(filter.toLowerCase())
  )

  const handleAddProcedure = async(newProcedure) => {
    try{
      const response = await fetch('http://localhost:3000/api/procedure', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProcedure),
      })
      if (response.ok) {
        const data = await response.json()
        setProcedures([...procedures, data.procedure])
      }
    }catch(error){
      console.error(error)
    }
  }

  const handleEditProcedure = async(updatedProcedure) => {
    try{
          const response = await fetch(`http://localhost:3000/api/procedure?_id=${updatedProcedure.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            newName: updatedProcedure.name,
            newPrice: updatedProcedure.price,
            newCategory: updatedProcedure.category,
          })
        })
        if (response.ok) {
          const data = await response.json()
          console.log(data)
          setProcedures(
            procedures.map((p) => p._id === data.procedure._id ? data.procedure : p)
          )
        }else{
          const errorData = await response.json();
          console.error('Failed to update procedure')
        }
    }catch(error){
      console.error(error)
    }
    setIsModalOpen(false)
  }

  const handleDeleteProcedure = async (id) => {
    try{
      const response = await fetch(`http://localhost:3000/api/procedure?_id=${id}`, {
        method: 'DELETE',
      })
      setProcedures(procedures.filter((p) => p._id !== id))
      setIsModalOpen(false)
    }catch (error)
    {
      console.error(error);
    }
    
  }

  return (
    <div className = "py-4 px-2">
      <div className="mb-4 flex flex-row flex-wrap items-center gap-2 min-h-[70px]">
        <div id="filter" className = "flex flex-row items-center border rounded border-1 bg-gray-200 max-w-max">
          <div className = "w-[75px] px-1">Name: </div>
          <Input
            type="text"
            placeholder="enter name"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="max-w-sm !bg-white rounded-none border-none"
          />
        </div>
        <button className="bg-gray-200 py-1 px-4 rounded min-h-[40px]" onClick={() => setIsModalOpen(true)}>Add Procedure</button>
      </div>
      <h1 className = "mt-2 font-bold text-lg">List of Procedures</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProcedures.map((procedure, index) => {
              return(
                <TableRow key={index}>
                  <TableCell>{procedure.name}</TableCell>
                  <TableCell>₱{procedure.price}</TableCell>
                  <TableCell>{procedure.category}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedProcedure(procedure)
                        setIsModalOpen(true)
                      }}
                      className = "!bg-green-800 text-white"
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              )
          })}
        </TableBody>
      </Table>

      <ProcedureModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedProcedure(null)
        }}
        procedure={selectedProcedure}
        onSave={selectedProcedure ? handleEditProcedure : handleAddProcedure}
        onDelete={handleDeleteProcedure}
      />
    </div>
  )
}

