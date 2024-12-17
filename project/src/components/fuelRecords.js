import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Records from "./AdminDashboardComponents/Records";

const fuelRecords = () => {
  const [records, setRecords] = useState([]);
  const [modalOpen1, setModalOpen1] = useState(false); // Modal for adding or editing record
  const [modalPicture, setModalPicture] = useState(null); // State for displaying picture in the modal
  const [newRecord, setNewRecord] = useState({
    date: "",
    truckName: "",
    coverage: "",
    picture: null,
  });
  const [editRecord, setEditRecord] = useState(null); // State for editing record
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false); // State for delete confirmation modal
  const [recordToDelete, setRecordToDelete] = useState(null); // State for the record to delete
  const [collapsedSections, setCollapsedSections] = useState({}); // State to track collapsible sections
  const [dropdownVisible, setDropdownVisible] = useState(null); // State for dropdown visibility
  const [truckName, setTruckName] = useState([]); // Initialize truckName as an empty array

  const dropdownRef = useRef(null); // Reference to manage clicking outside

  // Function to fetch records from the API
  const fetchRecords = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/API/fuelRecording/getAll"
      );
      setRecords(response.data);
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  // Group records by month and year
  const groupedRecords = records.reduce((acc, record) => {
    const date = new Date(record.date);
    const year = date.getFullYear();
    const month = date.toLocaleString("default", { month: "long" });
    const key = `${month} ${year}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(record);
    return acc;
  }, {});

  // Handle toggling collapsible sections
  const toggleSection = (section) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };
  useEffect(() => {
    fetch("http://localhost:8000/API/RegisterTruck/getAll")
      .then((response) => response.json())
      .then((data) => {
        const usernames = data.map((truck) => truck.username); // Extracting the usernames
        setTruckName(usernames); // Updating state with the truck usernames
      })
      .catch((error) => console.error("Error fetching truck data:", error));
  }, []); // Empty dependency array means this will run once when the component mounts

  // Handle input changes for new record data
  const handleNewRecordChange = (e) => {
    const { name, value } = e.target;
    setNewRecord((prevRecord) => ({
      ...prevRecord,
      [name]: value,
    }));
  };

  // Handle picture upload
  const handlePictureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewRecord((prevRecord) => ({
        ...prevRecord,
        picture: file,
      }));
    }
  };

  // Save new record data to API
  const saveNewRecord = async () => {
    try {
      const formData = new FormData();
      formData.append("date", newRecord.date);
      formData.append("truckName", newRecord.truckName);
      formData.append("coverage", newRecord.coverage);
      formData.append("picture", newRecord.picture);

      const response = await axios.post(
        "http://localhost:8000/API/fuelRecording/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setRecords((prevRecords) => [...prevRecords, response.data]);
      setNewRecord({ date: "", truckName: "", coverage: "", picture: null });
      setModalOpen1(false);
    } catch (error) {
      console.error("Error saving record:", error);
    }
  };

  // Handle picture click to show in modal
  const handlePictureClick = (picture) => {
    setModalPicture(picture);
  };

  // Close the modal
  const closeModal = () => {
    setModalPicture(null);
  };

  // Handle editing a record
  const handleEdit = (record) => {
    setEditRecord(record);
    setNewRecord({
      date: record.date,
      truckName: record.truckName,
      coverage: record.coverage,
      picture: record.picture,
    });
    setModalOpen1(true);
  };

  // Save edited record
  const saveEditedRecord = async () => {
    try {
      const formData = new FormData();
      formData.append("date", newRecord.date);
      formData.append("truckName", newRecord.truckName);
      formData.append("coverage", newRecord.coverage);
      if (newRecord.picture) {
        formData.append("picture", newRecord.picture);
      }

      const response = await axios.put(
        `http://localhost:8000/API/fuelRecording/update/${editRecord.fuelRecordsID}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setRecords((prevRecords) =>
        prevRecords.map((record) =>
          record.fuelRecordsID === editRecord.fuelRecordsID
            ? { ...record, ...response.data }
            : record
        )
      );
      setEditRecord(null);
      setNewRecord({ date: "", truckName: "", coverage: "", picture: null });
      setModalOpen1(false);
    } catch (error) {
      console.error("Error updating record:", error);
    }
  };

  // Handle deleting a record
  const handleDelete = (fuelRecordsID) => {
    setRecordToDelete(fuelRecordsID);
    setDeleteConfirmModal(true);
  };

  // Confirm deletion of the record
  const confirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:8000/API/fuelRecording/delete/${recordToDelete}`
      );
      setRecords((prevRecords) =>
        prevRecords.filter((record) => record.fuelRecordsID !== recordToDelete)
      );
      setDeleteConfirmModal(false);
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  // Cancel the delete action
  const cancelDelete = () => {
    setDeleteConfirmModal(false);
    setRecordToDelete(null);
  };

  // Handle clicking outside of the dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownVisible(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const uniqueTruckNames = [
    ...new Set(records.map((record) => record.truckName)),
  ];

  // Print specific month-year records
  const handlePrint = (monthYear) => {
    const filteredRecords = records.filter((record) => {
      const recordDate = new Date(record.date);
      const recordMonthYear = `${recordDate.toLocaleString("default", { month: "long" })} ${recordDate.getFullYear()}`;
      return recordMonthYear === monthYear;
    });

    // Create a printable window or trigger print action for filtered records
    const printWindow = window.open("", "_blank");
    printWindow.document.write("<html><body>");
    printWindow.document.write("<h1>Fuel Records for " + monthYear + "</h1>");
    printWindow.document.write(
      "<table border='1'><tr><th>Date</th><th>Truck Name</th><th>Coverage</th><th>Picture</th></tr>"
    );

    filteredRecords.forEach((record) => {
      printWindow.document.write(
        `<tr><td>${record.date}</td><td>${record.truckName}</td><td>${record.coverage}</td><td><img src='${record.picture}' style='width: 500px; height: auto;' /></td></tr>`
      );
      // Increased the image width to 500px. Adjust this value to make the image bigger.
    });

    printWindow.document.write("</table>");
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };
  

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">
        Fuel Permission Releases Reocrds
      </h2>
      <button
        onClick={() => setModalOpen1(true)}
        className="bg-green-500 text-white px-4 py-2 rounded-lg mb-4 hover:bg-green-600 transition-all"
      >
        Add Record
      </button>

      {Object.entries(groupedRecords).map(([monthYear, records]) => (
        <div key={monthYear} className="mb-4 border-b border-gray-300 pb-2">
          <div
            className="flex justify-between items-center cursor-pointer bg-gray-200 p-2 rounded"
            onClick={() => toggleSection(monthYear)}
          >
            <span className="text-lg font-semibold">{`Records of ${monthYear}`}</span>
            <button
              onClick={() => handlePrint(monthYear)}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Print
            </button>
            <button className="text-blue-500">
              {collapsedSections[monthYear] ? "Show" : "Hide"}
            </button>
          </div>
          {!collapsedSections[monthYear] && (
            <div className="mt-2">
              <table className="min-w-full bg-white border border-gray-300">
                <thead className="bg-gray-200 sticky top-0">
                  <tr>
                    <th className="p-2 text-left">Date</th>
                    <th className="p-2 text-left">Truck Name</th>
                    <th className="p-2 text-left">Coverage</th>
                    <th className="p-2 text-left">Picture</th>
                    <th className="p-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((record) => (
                    <tr key={record.fuelRecordsID}>
                      <td className="p-2">
                        {new Date(record.date).toISOString().split("T")[0]}
                      </td>
                      <td className="p-2">{record.truckName}</td>
                      <td className="p-2">{record.coverage} weeks</td>
                      <td className="p-2">
                        {record.picture ? (
                          <img
                            src={record.picture}
                            alt="Garbage record"
                            className="w-24 h-auto cursor-pointer hover:scale-105"
                            onClick={() => handlePictureClick(record.picture)}
                          />
                        ) : (
                          "No Picture"
                        )}
                      </td>
                      <td className="p-2 relative">
  {/* Ellipsis for actions */}
  <button
    className="text-gray-600 hover:text-gray-900"
    onClick={() =>
      setDropdownVisible(record.fuelRecordsID)
    }
  >
    &#8230; {/* Ellipsis icon */}
  </button>
  {dropdownVisible === record.fuelRecordsID && (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-1 bg-white border border-gray-300 rounded shadow-lg w-32 z-10"
    >
      <button
        onClick={() => handleEdit(record)}
        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-left"
      >
        Edit
      </button>
      <button
        onClick={() => handleDelete(record.fuelRecordsID)}
        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-left"
      >
        Delete
      </button>
    </div>
  )}
</td>

                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Truck Coverage and Lacking Weeks Table */}
              <table className="min-w-full bg-white border border-gray-300">
                <thead className="bg-green-200 sticky top-0">
                  <tr>
                    <th className="py-1 px-0 text-left text-sm">Truck Name</th>
                    <th className="py-1 px-0 text-left text-sm">
                      Coverage Released
                    </th>
                    <th className="py-1 px-0 text-left text-sm">
                      Lacking Week/s
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Grouping truck names under the current monthYear */}
                  {records
                    .map((record) => record.truckName)
                    .filter(
                      (value, index, self) => self.indexOf(value) === index
                    ) // Unique truck names
                    .map((truckName) => {
                      // Find all records for the truck name
                      const truckRecords = records.filter(
                        (r) => r.truckName === truckName
                      );

                      // Calculate total coverage released for the truck
                      const coverageReleased = truckRecords.reduce(
                        (total, record) =>
                          total + parseInt(record.coverage || 0),
                        0
                      );

                      // Define target coverage (can be adjusted based on your needs)
                      const targetCoverage = 4;
                      const lackingWeeks = targetCoverage - coverageReleased;

                      return (
                        <tr key={truckName}>
                          <td>{truckName}</td>
                          <td>{coverageReleased} week/s</td>
                          <td>{lackingWeeks > 0 ? lackingWeeks : 0} week/s</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}

      {/* Modal for Picture */}
      {modalPicture && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <img
              src={modalPicture}
              alt="Record picture"
              className="w-96 h-auto"
            />
            <button
              onClick={closeModal}
              className="mt-2 text-red-500 hover:text-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Modal for Picture */}
      {modalPicture && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <img
              src={modalPicture}
              alt="Record picture"
              className="w-96 h-auto"
            />
            <button
              onClick={closeModal}
              className="mt-2 text-red-500 hover:text-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Modal for Add/Edit Record */}
      {modalOpen1 && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-green-50 p-4 rounded shadow-lg shadow-2xl border-t-4 border-green-700">
            <h3 className="text-lg font-semibold">
              {editRecord ? "Edit Record" : "Add Record"}
            </h3>
            <div>
              <label className="block mb-2">Date:</label>
              <input
                type="date"
                name="date"
                value={newRecord.date}
                onChange={handleNewRecordChange}
                className="border border-green-500 w-full px-3 py-2 rounded mb-4"
              />
            </div>

            <div>
              <label className="block mb-2">Coverage in weeks:</label>
              <input
                type="number"
                name="coverage"
                value={newRecord.coverage}
                onChange={handleNewRecordChange}
                className="border border-green-500 w-full px-3 py-2 rounded mb-4"
              />
            </div>

            {/* Dropdown for Category or Type */}
            <div>
              <label className="block mb-2">
                Truck Name:
                <select
                  name="truckName"
                  value={newRecord.truckName}
                  onChange={handleNewRecordChange}
                  className="border border-green-500 w-full p-2 rounded mb-4"
                >
                  <option value="">Select Truck</option>
                  {truckName.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div>
              <label className="block mb-2">Picture:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePictureUpload}
                className="w-full px-3 py-2 border border-green-500 rounded mb-4"
              />
            </div>

            <button
              onClick={editRecord ? saveEditedRecord : saveNewRecord}
              className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600"
            >
              Save
            </button>
            <button
              onClick={() => setModalOpen1(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Modal for Confirm Delete */}
      {deleteConfirmModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <p>Are you sure you want to delete this record?</p>
            <button
              onClick={confirmDelete}
              className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-600 transition-all"
            >
              Yes
            </button>
            <button
              onClick={cancelDelete}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-all"
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default fuelRecords;
