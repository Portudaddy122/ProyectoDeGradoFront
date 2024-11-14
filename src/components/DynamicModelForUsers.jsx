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
  showDescription = false // Nueva propiedad para controlar la descripción
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">{title}</h2>
        {showDescription && (
          <p className="modal-description">
            Puede editar los campos de la información del usuario seleccionado.
          </p>
        )}
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
