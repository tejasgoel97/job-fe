// components/ModalShell.tsx
import React from "react";
import ReactModal from "react-modal";

ReactModal.setAppElement?.("#root");

export default function ModalShell({
  isOpen,
  onRequestClose,
  title,
  children,
}) {
  return (
    <>
      <style>{`
        .rm-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.5); z-index: 1055; }
        .rm-content {
          position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
          width: min(92vw, 860px); max-height: calc(100vh - 4rem);
          overflow: hidden; background: #fff; border: 1px solid rgba(0,0,0,.2);
          border-radius: .75rem; box-shadow: 0 .5rem 1rem rgba(0,0,0,.15); padding: 0;
        }
        .rm-body { overflow: auto; max-height: calc(100vh - 12rem); padding: 1rem 1.25rem; }
      `}</style>

      <ReactModal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        shouldCloseOnEsc
        shouldCloseOnOverlayClick
        overlayClassName="rm-overlay"
        className="rm-content"
        contentLabel={title}
      >
        <div className="modal-header px-4 border-bottom py-2">
          <h5 className="modal-title">{title}</h5>
          <button type="button" className="btn-close" aria-label="Close" onClick={onRequestClose} />
        </div>
        <div className="rm-body">{children}</div>
      </ReactModal>
    </>
  );
}
