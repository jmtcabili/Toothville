'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ProcedureForm } from './Form'
import { Description } from "@radix-ui/react-dialog"

export function ProcedureModal({ isOpen, onClose, procedure, onSave, onDelete }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className = "!bg-white">
        <Description></Description>
        <DialogHeader>
          <DialogTitle>{procedure ? 'Edit Procedure' : 'Add Procedure'}</DialogTitle>
        </DialogHeader>
        <ProcedureForm
          procedure={procedure}
          onSave={(updatedProcedure) => {
            onSave(updatedProcedure)
            onClose()
          }}
          onCancel={onClose}
        />
        {procedure && (
          <Button
            variant="destructive"
            onClick={() => {
              onDelete(procedure._id)
              onClose()
            }}
          >
            Delete Procedure
          </Button>
        )}
      </DialogContent>
    </Dialog>
  )
}

