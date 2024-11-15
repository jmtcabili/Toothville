import { useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import styles from "./SignatureModal.module.css";

export default function SignatureModal({ isOpen, onClose, onSave, title, storageKey }) {
  const [signature, setSignature] = useState(null);

  const saveSignature = () => {
    if (signature) {
      const signatureData = signature.getTrimmedCanvas().toDataURL("image/jpeg");

      // Save to sessionStorage
      sessionStorage.setItem(storageKey, signatureData);

      // Pass the base64 data back to the parent
      onSave(signatureData);

      signature.clear(); // Clear the signature pad
      onClose(); // Close the modal
    }
  };

  return (
    isOpen && (
      <div className={styles.modalContainer}>
        <div className={styles.modal}>
          <h2>{title}</h2>
          <div className={styles.sigPadContainer}>
            <SignatureCanvas
              ref={(ref) => setSignature(ref)}
              penColor="black"
              canvasProps={{
                className: styles.sigCanvas,
              }}
            />
          </div>
          <div className={styles.modalActions}>
            <button onClick={onClose}>Cancel</button>
            <button onClick={saveSignature}>Save</button>
          </div>
        </div>
      </div>
    )
  );
}