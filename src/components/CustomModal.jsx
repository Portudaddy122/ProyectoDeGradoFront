import React from 'react';
import './CustomModal.css'; // Archivo de estilos opcional

function CustomModal({ isOpen, title, content, onClose, onSave, onCancel, onConfirm, isEdit }) {
    if (!isOpen) return null; // No renderiza el modal si no está abierto

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <h2>{title}</h2>
                <div className="modal-content">
                    {content}
                </div>
                <div className="modal-actions">
                    {isEdit && <button onClick={onSave}>Guardar</button>}
                    <button onClick={onCancel || onClose}>Cancelar</button>
                    {onConfirm && <button onClick={onConfirm}>Confirmar</button>}
                </div>
            </div>
        </div>
    );
}

export default CustomModal;
