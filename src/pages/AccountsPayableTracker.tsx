import React, { useState, useEffect, useCallback } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { Plus, Edit, Trash2, Download, XCircle, CheckCircle } from 'lucide-react';

// IMPORTANT: For XLSX functionality, you need to include the SheetJS CDN script in your HTML file
// For example, add this line in your public/index.html <head> or before your React app mounts:
// <script src="https://unpkg.com/xlsx/dist/xlsx.full.min.js"></script>

declare global {
  var __app_id: string | undefined;
  var __firebase_config: string | undefined;
  var __initial_auth_token: string | undefined;
  interface Window {
    XLSX: any;
  }
}

const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

function AccountsPayableTracker() {
  const [db, setDb] = useState<any>(null);
  const [auth, setAuth] = useState<any>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [payables, setPayables] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    vendor: '',
    invoiceNumber: '',
    dueDate: '',
    amount: '',
    status: 'Pending',
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<{ text: string; type: string } | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<{ title: string; message: string; onConfirm: (() => void) | null; onCancel: (() => void) | null }>({ title: '', message: '', onConfirm: null, onCancel: null });

  // Initialize Firebase and authenticate
  useEffect(() => {
    try {
      const app = initializeApp(firebaseConfig);
      const firestore = getFirestore(app);
      const firebaseAuth = getAuth(app);

      setDb(firestore);
      setAuth(firebaseAuth);

      const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
        if (user) {
          setUserId(user.uid);
          console.log("User authenticated:", user.uid);
        } else {
          try {
            if (initialAuthToken) {
              await signInWithCustomToken(firebaseAuth, initialAuthToken);
            } else {
              await signInAnonymously(firebaseAuth);
            }
            console.log("Signed in anonymously or with custom token.");
          } catch (authError) {
            console.error("Firebase Auth Error:", authError);
            setError("Failed to authenticate. Please try again.");
            setLoading(false);
          }
        }
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (initError) {
      console.error("Firebase Initialization Error:", initError);
      setError("Failed to initialize Firebase. Check console for details.");
      setLoading(false);
    }
  }, []);

  // Fetch payables data when userId and db are ready
  useEffect(() => {
    if (db && userId) {
      const payablesCollectionRef = collection(db, `artifacts/${appId}/users/${userId}/payables`);
      const unsubscribe = onSnapshot(payablesCollectionRef, (snapshot) => {
        const fetchedPayables = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          dueDate: doc.data().dueDate?.toDate().toISOString().split('T')[0] || '',
        }));
        setPayables(fetchedPayables);
        setLoading(false);
      }, (err) => {
        console.error("Error fetching payables:", err);
        setError("Failed to load payables. Please try again.");
        setLoading(false);
      });
      return () => unsubscribe();
    }
  }, [db, userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const showTemporaryMessage = (msg: string, type = 'success') => {
    setMessage({ text: msg, type });
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!db || !userId) {
      showTemporaryMessage("Database not ready. Please wait.", "error");
      return;
    }
    if (!formData.vendor || !formData.invoiceNumber || !formData.dueDate || !formData.amount) {
      showTemporaryMessage("Please fill in all required fields.", "error");
      return;
    }
    if (isNaN(parseFloat(formData.amount)) || parseFloat(formData.amount) <= 0) {
      showTemporaryMessage("Amount must be a positive number.", "error");
      return;
    }
    try {
      const payableData = {
        ...formData,
        amount: parseFloat(formData.amount),
        dueDate: new Date(formData.dueDate),
        createdAt: serverTimestamp(),
      };
      if (editingId) {
        const payableDocRef = doc(db, `artifacts/${appId}/users/${userId}/payables`, editingId);
        await updateDoc(payableDocRef, payableData);
        showTemporaryMessage("Payable updated successfully!");
        setEditingId(null);
      } else {
        const payablesCollectionRef = collection(db, `artifacts/${appId}/users/${userId}/payables`);
        await addDoc(payablesCollectionRef, payableData);
        showTemporaryMessage("Payable added successfully!");
      }
      setFormData({
        vendor: '',
        invoiceNumber: '',
        dueDate: '',
        amount: '',
        status: 'Pending',
      });
    } catch (submitError) {
      console.error("Error adding/updating payable:", submitError);
      showTemporaryMessage("Failed to save payable. Please try again.", "error");
    }
  };

  const handleEdit = (payable: any) => {
    setEditingId(payable.id);
    setFormData({
      vendor: payable.vendor,
      invoiceNumber: payable.invoiceNumber,
      dueDate: payable.dueDate,
      amount: payable.amount,
      status: payable.status,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const confirmDelete = (id: string) => {
    setModalContent({
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this payable entry?',
      onConfirm: () => handleDelete(id),
      onCancel: () => setShowModal(false),
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    setShowModal(false);
    if (!db || !userId) {
      showTemporaryMessage("Database not ready. Please wait.", "error");
      return;
    }
    try {
      const payableDocRef = doc(db, `artifacts/${appId}/users/${userId}/payables`, id);
      await deleteDoc(payableDocRef);
      showTemporaryMessage("Payable deleted successfully!");
    } catch (deleteError) {
      console.error("Error deleting payable:", deleteError);
      showTemporaryMessage("Failed to delete payable. Please try again.", "error");
    }
  };

  const getRowClass = (dueDate: string, status: string) => {
    const today = new Date().toISOString().split('T')[0];
    if (status === 'Paid') {
      return 'bg-green-100 text-green-800';
    }
    if (dueDate < today) {
      return 'bg-red-100 text-red-800';
    }
    if (dueDate === today) {
      return 'bg-yellow-100 text-yellow-800';
    }
    return '';
  };

  const downloadExcel = useCallback(() => {
    if (typeof window.XLSX === 'undefined') {
      showTemporaryMessage("Excel download not ready. Please ensure the XLSX library script is loaded.", "error");
      console.error("window.XLSX is not defined. Make sure the XLSX CDN script is included in your HTML.");
      return;
    }
    if (payables.length === 0) {
      showTemporaryMessage("No data to download.", "error");
      return;
    }
    const dataToExport = payables.map(p => ({
      'Vendor': p.vendor,
      'Invoice Number': p.invoiceNumber,
      'Due Date': p.dueDate,
      'Amount': p.amount,
      'Status': p.status,
    }));
    const ws = window.XLSX.utils.json_to_sheet(dataToExport);
    const wb = window.XLSX.utils.book_new();
    window.XLSX.utils.book_append_sheet(wb, ws, "Accounts Payables");
    window.XLSX.writeFile(wb, "accounts_payables_tracker.xlsx");
    showTemporaryMessage("Excel file downloaded successfully!");
  }, [payables]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <p className="text-lg text-gray-700">Loading application...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 p-4">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <XCircle className="text-red-500 mx-auto mb-4" size={48} />
          <h2 className="text-xl font-semibold text-red-700 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
          <p className="text-sm text-gray-500 mt-4">Please check your console for more details or try refreshing the page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-inter text-gray-800 p-4 sm:p-6 lg:p-8 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-indigo-700 mb-8">
          Accounts Payable Tracker
        </h1>
        {userId && (
          <div className="mb-6 p-3 bg-indigo-50 rounded-lg text-center text-sm text-indigo-800">
            <p>Your User ID: <span className="font-mono break-all">{userId}</span></p>
            <p className="text-xs text-indigo-600 mt-1">Share this ID for collaborative features (if implemented).</p>
          </div>
        )}
        {message && (
          <div className={`p-3 mb-4 rounded-lg flex items-center justify-center text-sm
            ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message.type === 'success' ? <CheckCircle size={20} className="mr-2" /> : <XCircle size={20} className="mr-2" />}
            {message.text}
          </div>
        )}
        <section className="mb-10 p-6 bg-indigo-50 rounded-lg shadow-inner">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-6 text-center">
            {editingId ? 'Edit Payable Entry' : 'Add New Payable'}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="vendor" className="block text-sm font-medium text-gray-700 mb-1">Vendor</label>
              <input
                type="text"
                id="vendor"
                name="vendor"
                value={formData.vendor}
                onChange={handleChange}
                placeholder="e.g., Supplier A"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                required
              />
            </div>
            <div>
              <label htmlFor="invoiceNumber" className="block text-sm font-medium text-gray-700 mb-1">Invoice Number</label>
              <input
                type="text"
                id="invoiceNumber"
                name="invoiceNumber"
                value={formData.invoiceNumber}
                onChange={handleChange}
                placeholder="e.g., INV-2023-001"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                required
              />
            </div>
            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                required
              />
            </div>
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">Amount ($)</label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="e.g., 1500.75"
                step="0.01"
                min="0.01"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
              >
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Overdue">Overdue</option>
              </select>
            </div>
            <div className="sm:col-span-2 flex justify-center mt-4">
              <button
                type="submit"
                className="flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105"
              >
                {editingId ? <Edit size={20} className="mr-2" /> : <Plus size={20} className="mr-2" />}
                {editingId ? 'Update Payable' : 'Add Payable'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setFormData({ vendor: '', invoiceNumber: '', dueDate: '', amount: '', status: 'Pending' });
                  }}
                  className="ml-4 flex items-center px-6 py-3 bg-gray-400 text-white font-semibold rounded-lg shadow-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </section>
        <section className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-indigo-600">Your Payables</h2>
            <button
              onClick={downloadExcel}
              className="flex items-center px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105"
            >
              <Download size={20} className="mr-2" />
              Download Excel
            </button>
          </div>
          {payables.length === 0 ? (
            <p className="text-center text-gray-500 p-8 bg-gray-100 rounded-lg">No payables added yet. Start by adding a new entry above!</p>
          ) : (
            <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice No.</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {payables.map((payable) => (
                    <tr key={payable.id} className={getRowClass(payable.dueDate, payable.status)}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{payable.vendor}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{payable.invoiceNumber}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{payable.dueDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">${payable.amount?.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                          ${payable.status === 'Paid' ? 'bg-green-100 text-green-800' :
                            payable.status === 'Overdue' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'}`}>
                          {payable.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEdit(payable)}
                          className="text-indigo-600 hover:text-indigo-900 mr-3 p-1 rounded-md hover:bg-indigo-100 transition duration-150 ease-in-out"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => confirmDelete(payable.id)}
                          className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-100 transition duration-150 ease-in-out"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm mx-auto">
            <h3 className="text-lg font-bold text-gray-900 mb-4">{modalContent.title}</h3>
            <p className="text-sm text-gray-700 mb-6">{modalContent.message}</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={modalContent.onCancel || (() => setShowModal(false))}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-150"
              >
                Cancel
              </button>
              <button
                onClick={modalContent.onConfirm || (() => setShowModal(false))}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-150"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AccountsPayableTracker; 