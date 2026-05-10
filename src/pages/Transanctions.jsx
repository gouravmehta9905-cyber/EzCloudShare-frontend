import React from 'react'
import DashboardLayout from '../layout/DashboardLayout'
import { useState } from 'react'
import { useAuth } from "@clerk/clerk-react";
import { apiEndpoints } from '../util/apiEndpoints';
import axios from 'axios';
import { useEffect } from 'react';
import { Receipt,Loader2,AlertCircle } from 'lucide-react';


const Transanctions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {getToken} = useAuth();


  useEffect(()=>{
    const fetchTransactions=async()=>{
      try{
        setLoading(true);
        const token = await getToken();
        const response = await axios.get(apiEndpoints.TRANSACTIONS,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        });
        setTransactions(response.data);
        setError(null);

      }catch(error){
        console.error("Error fetching transactions:",error);
        setError("Failed to load transaction history. Please try again later.");
        
      }
      finally{
        setLoading(false);
      }
    };
    fetchTransactions();
  },[getToken]);



  const formatDate = (dateString) => {
  if (!dateString) return "N/A";

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};


  const formatAmount=(amountInPaise)=>{
    return `₹ ${(amountInPaise / 100).toFixed(2)}`;
  }

  return (
    <DashboardLayout activeMenu="Transactions">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Receipt  className="text-blue-600"/>
          <h1 className="text-2xl font-bold ">Transaction History</h1>
        </div>

        {error && (
            <div className="mb-6 p-4 bg-red-50  txt-red-700 rounded-lg flex items-center gap-2">
              <AlertCircle  size={20}/>
              <span>{error}</span> 

            </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin mr-2" size={24}/>
            <span>Loading transactions...</span>
          </div>
        ):transactions.length === 0 ? (
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <Receipt size={48} className='mx-auto mb-4 text-gray-400'/>
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                No transactions yet
              </h3>
              <p className="text-gray-500">
                You haven't made any credit purchases yet. Visit the Subscription page to buy credits.
              </p>
            </div>
        ):(
            <div className="overflow-x-auto">
              <table className='min-w-full bg-white rounded-lg overflow-hidden shadow '>
                  <thead className='bg-gray-50'>
                    <tr>
                        <th className="px-6 py-3 text-left text-xs fnt-medium text-gray-500  uppercase ">Date</th>
                        <th className="px-6 py-3 text-left text-xs fnt-medium text-gray-500  uppercase ">Plan</th>
                        <th className="px-6 py-3 text-left text-xs fnt-medium text-gray-500  uppercase ">Amount</th>
                        <th className="px-6 py-3 text-left text-xs fnt-medium text-gray-500  uppercase ">Credits Added </th>
                        <th className="px-6 py-3 text-left text-xs fnt-medium text-gray-500  uppercase ">Payment Id</th>


                    </tr>
                  </thead>
                  <tbody className='divide-y divide-gray-200 '>
                    {transactions.map((transaction)=>(
                        <tr key={transaction.id} className='hover:bg-gray-50'>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {formatDate(transaction.transactionDate)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm  text-gray-900"> 
                                {transaction.planId==="premium"
                                  ?"Premium Plan"
                                  :transaction.planId ==="ultimate"
                                  ?"Ultimate Plan"
                                  :"Basic Plan"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {formatAmount(transaction.amount)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {transaction.creditsAdded}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {transaction.paymentId
                                    ? transaction.paymentId.substring(0,12) +"..."
                                    :"N/A"}
                            </td>
                        </tr>
                    ))} 

                  </tbody>
              </table>
            </div>
        )}

      </div>
    </DashboardLayout>
  )
}

export default Transanctions
