import { useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import "../App.css"

const data = [
  { name: 'Jan', consumption: 240 },
  { name: 'Feb', consumption: 300 },
  { name: 'Mar', consumption: 280 },
  { name: 'Apr', consumption: 320 },
  { name: 'May', consumption: 340 },
  { name: 'Jun', consumption: 380 },
  { name: 'Jul', consumption: 420 },
  { name: 'Aug', consumption: 450 }
]

function App() {
  const [selectedPeriod, setSelectedPeriod] = useState('Month')
  const spending = '77%'

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md max-w-[800px] mx-auto my-8">
      <div className="header">
        <div className="title-section">
          <h2>Power Consumed</h2>
          
        </div>
        <div className="spending-indicator">
          <span className="dot"></span>
          <span className='text-sm'>Electricity Consumed</span>
          <span className="spending text-sm">{spending} Spending</span>
        </div>
      </div>
      
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tickCount={6}
            />
            <Tooltip />
            <Area 
              type="monotone" 
              dataKey="consumption" 
              stroke="#FF8C8C"
              fill="#FFE7E7"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default App