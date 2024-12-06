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
import { BASE_URL } from '@/utils/constants'

export default function ProcedureList() {
  const [procedures, setProcedures] = useState([])
  const [filter, setFilter] = useState('')
  const [selectedProcedure, setSelectedProcedure] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    async function fetchProcedures() {
      let response = await fetch(`${BASE_URL}/api/procedure`)
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
      const response = await fetch(`${BASE_URL}/api/procedure`, {
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
          const response = await fetch(`${BASE_URL}/api/procedure?_id=${updatedProcedure.id}`, {
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
      const response = await fetch(`${BASE_URL}/api/procedure?_id=${id}`, {
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
    <div className="flex flex-col md:flex-row gap-6 px-6 py-6 lg:mx-20 lg:mt-10">
  {/* Sidebar: Search and Add Procedure */}
  <div className="w-full md:w-1/3">
    <h2 className="text-xl font-bold mb-4">Filters</h2>
    <div className="bg-white border border-gray-300 rounded-lg p-4">
      <label htmlFor="filter" className="block text-sm font-semibold mb-2">
        Name
      </label>
      <Input
        id="filter"
        type="text"
        placeholder="Enter name"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-300 !bg-white"
      />
    </div>
    <button
      className="mt-4 bg-gray-300 py-3 px-4 rounded-lg shadow-sm hover:bg-gray-300 transition-all w-full"
      onClick={() => setIsModalOpen(true)}
    >
      Add Procedure
    </button>
  </div>

  {/* Table Section */}
  <div className="w-full md:w-2/3">
    <h2 className="text-xl font-bold mb-4">List of Procedures</h2>
    <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold">Name</TableHead>
            <TableHead className="font-bold">Price</TableHead>
            <TableHead className="font-bold">Category</TableHead>
            <TableHead className="font-bold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProcedures.map((procedure, index) => (
            <TableRow key={index}>
              <TableCell>{procedure.name}</TableCell>
              <TableCell>₱{procedure.price}</TableCell>
              <TableCell>{procedure.category}</TableCell>
              <TableCell>
                <Button
                  variant="solid"
                  size="sm"
                  onClick={() => {
                    setSelectedProcedure(procedure);
                    setIsModalOpen(true);
                  }}
                  className="!bg-green-800 text-white hover:!bg-green-900 rounded px-4 font-semibold"
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </div>

  {/* Procedure Modal */}
  <ProcedureModal
    isOpen={isModalOpen}
    onClose={() => {
      setIsModalOpen(false);
      setSelectedProcedure(null);
    }}
    procedure={selectedProcedure}
    onSave={selectedProcedure ? handleEditProcedure : handleAddProcedure}
    onDelete={handleDeleteProcedure}
  />
</div>

  )
}

