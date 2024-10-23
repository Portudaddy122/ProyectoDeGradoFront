import React from 'react';
import './DynamicModalForUsers.css';

const DynamicModelForUsers = ({
    isOpen,
    title,
    content,
    onClose,
    onSave,
    onCancel,
    onConfirm,
    isEdit
}) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className="modal-title">{title}</h2>
                <p className="modal-description">
                    {isEdit ? 'Puede editar los campos de la información del usuario seleccionado.' : 'En este apartado puedes ver los detalles de los usuarios.'}
                </p>
                <hr />
                {content}
                <div className="modal-actions">
                    {onSave && <button className='save-btn' onClick={onSave}>Guardar</button>}
                    {onCancel && <button className='cancel-btn' onClick={onCancel}>Cancelar</button>}
                    {onClose && !onSave && <button className='close-btn' onClick={onClose}>Cerrar</button>}
                    {onConfirm && !onSave && <button className='confirm-btn' onClick={onConfirm}>Confirmar</button>}
                </div>
            </div>
        </div>
    );
};

export default DynamicModelForUsers;