'use client';

import React, { useEffect, useState } from 'react';

const formCategories = [
  { id: 3, label: 'Mentors' },
  { id: 4, label: 'Acceleration' },
  { id: 5, label: 'Investors' },
  { id: 6, label: 'Incubation' }
];

export default function RequestsPage() {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedFormId, setSelectedFormId] = useState(formCategories[0].id);

  useEffect(() => {
    async function fetchRequests() {
      try {
        const res = await fetch(`https://incubia-algerie.com/wp-json/incubia/v1/fluent-submissions/${selectedFormId}`);
        const data = await res.json();
        setRequests(data);
        setSelectedRequest(null);
      } catch (err) {
        console.error('Error fetching:', err);
      }
    }

    fetchRequests();
  }, [selectedFormId]);

  return (
    <div className="flex h-screen bg-gray-50 font-sans relative">
      {/* Sidebar */}
      <div className="w-[15%] border-r bg-white p-4">
        <div className="flex flex-col gap-2">
          {formCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedFormId(cat.id)}
              className={`px-3 py-2 rounded text-left font-medium text-sm ${
                selectedFormId === cat.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Requests Table */}
      <div className="w-[52%] px-6 py-4 overflow-auto">
        <h2 className="text-xl font-bold mb-4">Submissions</h2>
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full table-auto text-left text-sm">
            <thead className="text-gray-500 border-b">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {requests.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center py-6 text-gray-400">
                    No requests found.
                  </td>
                </tr>
              ) : (
                requests.map((req, index) => (
                  <tr
                    key={index}
                    onClick={() => setSelectedRequest(req)}
                    className="cursor-pointer transition hover:bg-gray-50"
                  >
                    <td className="p-4 font-medium text-gray-800">
                      {req.fields?.names?.first_name} {req.fields?.names?.last_name}
                    </td>
                    <td className="p-4 text-gray-500">{req.fields?.email}</td>
                    <td className="p-4 text-gray-400">{new Date(req.submitted_at).toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Popup Detail Panel */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white w-[35%] rounded-xl shadow-lg p-6 relative">
            <button
              onClick={() => setSelectedRequest(null)}
              className="absolute top-3 right-4 text-gray-400 hover:text-black text-lg"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              {selectedRequest.fields?.names?.first_name}{' '}
              {selectedRequest.fields?.names?.last_name}
            </h2>

            <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <div className="text-xs font-semibold text-gray-400 mb-1">Email</div>
                {selectedRequest.fields?.email}
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-400 mb-1">Téléphone</div>
                {selectedRequest.fields?.numeric_field}
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-400 mb-1">Secteur</div>
                {selectedRequest.fields?.dropdown}
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-400 mb-1">Expérience</div>
                {selectedRequest.fields?.numeric_field_1}
              </div>
              <div className="col-span-2">
                <div className="text-xs font-semibold text-gray-400 mb-1">Motivation</div>
                <p>{selectedRequest.fields?.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
