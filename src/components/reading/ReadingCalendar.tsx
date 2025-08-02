'use client'

import { ReadingRecord } from '@/types'

interface ReadingCalendarProps {
  records: ReadingRecord[]
}

export default function ReadingCalendar({ records }: ReadingCalendarProps) {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()
  
  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const firstDayWeekday = firstDayOfMonth.getDay()
  const daysInMonth = lastDayOfMonth.getDate()
  
  const monthNames = [
    '1月', '2月', '3月', '4月', '5月', '6月',
    '7月', '8月', '9月', '10月', '11月', '12月'
  ]
  
  const weekdays = ['日', '月', '火', '水', '木', '金', '土']
  
  // Create a map of dates to reading records
  const recordMap = new Map<string, ReadingRecord[]>()
  records.forEach(record => {
    const dateKey = new Date(record.readAt).toDateString()
    if (!recordMap.has(dateKey)) {
      recordMap.set(dateKey, [])
    }
    recordMap.get(dateKey)!.push(record)
  })
  
  const calendarDays = []
  
  // Empty cells for days before the first day of the month
  for (let i = 0; i < firstDayWeekday; i++) {
    calendarDays.push(null)
  }
  
  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day)
    const dateKey = date.toDateString()
    const dayRecords = recordMap.get(dateKey) || []
    
    calendarDays.push({
      day,
      date,
      records: dayRecords,
      isToday: date.toDateString() === today.toDateString()
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">
        読書カレンダー - {year}年{monthNames[month]}
      </h2>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekdays.map(weekday => (
          <div key={weekday} className="text-center text-sm font-semibold text-gray-600 py-2">
            {weekday}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => (
          <div
            key={index}
            className={`aspect-square border border-gray-200 p-1 ${
              day ? 'bg-white' : ''
            }`}
          >
            {day && (
              <div className={`h-full flex flex-col items-center justify-center text-sm ${
                day.isToday ? 'bg-primary-100 rounded-lg' : ''
              }`}>
                <span className={`font-medium ${
                  day.isToday ? 'text-primary-700' : 'text-gray-700'
                }`}>
                  {day.day}
                </span>
                {day.records.length > 0 && (
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-1"></div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-4 flex items-center justify-center space-x-4 text-sm">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <span className="text-gray-600">読書記録あり</span>
        </div>
        <div className="text-gray-600">
          今月の記録: {records.filter(r => {
            const recordDate = new Date(r.readAt)
            return recordDate.getMonth() === month && recordDate.getFullYear() === year
          }).length}日
        </div>
      </div>
    </div>
  )
}