import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [employees, setEmployees] = useState([])
  const [formData, setFormData] = useState({
    employeeName: '',
    email: '',
    designation: '',
    primarySkill: ''
  })

  const fetchEmployees = () => {
    axios.get('http://localhost:8080/api/employees')
      .then(res => setEmployees(res.data))
      .catch(err => console.error('Error fetching employees:', err))
  }

  useEffect(() => {
    fetchEmployees()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:8080/api/employees', formData)
      .then(() => {
        setFormData({ employeeName: '', email: '', designation: '', primarySkill: '' })
        fetchEmployees()
      })
      .catch(err => console.error('Error adding employee:', err))
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-gray-800">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">EXL Employee Dashboard</h1>

      {/* Quick Add Form to Test End-to-End Persistence */}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-8 grid grid-cols-1 md:grid-cols-5 gap-4">
        <input
          type="text"
          placeholder="Name"
          required
          value={formData.employeeName}
          onChange={e => setFormData({ ...formData, employeeName: e.target.value })}
          className="border rounded px-3 py-2"
        />
        <input
          type="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={e => setFormData({ ...formData, email: e.target.value })}
          className="border rounded px-3 py-2"
        />
        <input
          type="text"
          placeholder="Designation"
          value={formData.designation}
          onChange={e => setFormData({ ...formData, designation: e.target.value })}
          className="border rounded px-3 py-2"
        />
        <input
          type="text"
          placeholder="Primary Skill"
          value={formData.primarySkill}
          onChange={e => setFormData({ ...formData, primarySkill: e.target.value })}
          className="border rounded px-3 py-2"
        />
        <button type="submit" className="bg-blue-600 text-white font-semibold rounded px-4 py-2 hover:bg-blue-700 cursor-pointer">
          Add Employee
        </button>
      </form>

      {/* Employee List */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Employee Directory</h2>
        {employees.length === 0 ? (
          <p className="text-gray-500">Database connected. Add your first employee above to test the pipeline.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {employees.map(emp => (
              <li key={emp.employeeId} className="py-4 flex justify-between items-center">
                <div>
                  <p className="font-medium text-lg">{emp.employeeName}</p>
                  <p className="text-gray-500 text-sm">{emp.email}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-blue-600">{emp.primarySkill}</p>
                  <p className="text-gray-500 text-sm">{emp.designation}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default App