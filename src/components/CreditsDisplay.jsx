import { CreditCard } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const CreditsDisplay = ({credits}) => {
        const navigate = useNavigate();
  return (
    <div onClick={()=>navigate("/subscriptions")} className="cursor-pointer">
        <div className="flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-full text-blue-700">
                <CreditCard size={16}/>
                <span className=" font-medium">{credits} Credits</span>
                
        </div>
      
    </div>
  )
}

export default CreditsDisplay;  
