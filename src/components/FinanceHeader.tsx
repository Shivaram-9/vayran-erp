'use client';

import { useState, useTransition } from 'react';
import Modal from './Modal';
import { addInvoice } from '@/app/actions';
import { useToast } from './Toast';

export default function FinanceHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      await addInvoice(formData);
      setIsModalOpen(false);
      showToast("Invoice saved successfully!", "success");
    });
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>Finance & Accounting</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Invoices, expenses, and cash flow overview.</p>
        </div>
        <button className="btn" onClick={() => setIsModalOpen(true)}>Create Invoice</button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Invoice">
        <form action={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>Invoice ID</label>
            <input type="text" name="invoiceId" placeholder="INV-2024-..." required style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>Client</label>
            <input type="text" name="client" required style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>Amount ($)</label>
            <input type="number" step="0.01" name="amount" required style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>Status</label>
            <select name="status" style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>
          <button type="submit" className="btn" style={{ marginTop: '16px', opacity: isPending ? 0.7 : 1 }} disabled={isPending}>
            {isPending ? 'Saving...' : 'Save Invoice'}
          </button>
        </form>
      </Modal>
    </>
  );
}
