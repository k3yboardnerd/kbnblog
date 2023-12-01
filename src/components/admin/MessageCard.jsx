/* eslint-disable react/prop-types */


export const MessageCard = ({ username, email, date, message, subject }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg w-[600px] space-y-4 p-4 flex flex-col divide-y-2">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-sm font-sans font-bold text-slate-800">{username}</h1>
          <span className="text-slate-400 text-xs font-sans font-semibold">{email}</span>
        </div>
        <span className="bg-violet-100 text-violet-800 text-xs py-1 px-2 rounded-lg">{date}</span>
      </div>
      <div className="p-4 space-y-4">
        <h1 className="font-bold text-lg text-slate-600">{subject}</h1>
        <p className="text-base p-2 bg-violet-50 rounded-lg font-medium">{message}</p>
      </div>
    </div>
  )
}
