import { useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import styles from "./SignatureModal.module.css";

export default function SignatureModal({ isOpen, onClose, onSave, title, storageKey }) {
  const [signature, setSignature] = useState(null);

  const saveSignature = () => {
    if (signature) {
      const canvas = signature.getTrimmedCanvas(); 
      if (canvas) {
        const signatureData = canvas.toDataURL("image/png"); 

        sessionStorage.setItem(storageKey, signatureData);

        onSave(signatureData.replace(/^data:image\/(png|jpg);base64,/, "")); 

        signature.clear(); 
        onClose(); 
      }
    }
  };

  const clearSignature = () => {
    if (signature) {
      signature.clear(); 
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
            <button onClick={clearSignature}>Clear</button>
            <button onClick={onClose}>Cancel</button>
            <button onClick={saveSignature}>Save</button>
          </div>
        </div>
      </div>
    )
  );
}
