/*import {createContext, useState,useCallback,useEffect} from "react";
import axios from "axios";
import { apiEndpoints } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import {useAuth} from "@clerk/clerk-react";

export const UserCreditsContext = createContext();

export const UserCreditsProvider =({children}) =>{
        const [credits,setCredits]=useState(50);
        const [loading,setLoading]=useState(false);
        const {getToken,isSignedIn}=useAuth();


        //function to fetch user credits that can be called from anywhere
        const fetchUserCredits=useCallback(async()=>{
                if(!isSignedIn) return;
                setLoading(true);
                try {
                        const token=await getToken();
                        const response=await axios.get(apiEndpoints.GET_CREDITS,{
                                headers:{Authorization: `Bearer ${token}`}
                        });
                        if(response.status===200){
                                setCredits(response.data.credits);
                        } 
                        else{
                                toast.error("Unable to get the credits.");
                        }
                } catch (error) {
                        console.error("Error fetching user credits:", error);
                } finally {
                        setLoading(false);
                }

        },[getToken,isSignedIn]);  
        
        useEffect(()=>{
                if(isSignedIn){
                        fetchUserCredits();
                }
        },[fetchUserCredits,isSignedIn]);

        const updateCredits=useCallback(newCredits=>{
                console.log("Updating the credits :", newCredits);
                setCredits(newCredits);
        },[])



        const contextValue={
                credits,
                setCredits,
                fetchUserCredits,
                updateCredits
                
        }



        return (
                <UserCreditsContext.Provider value={contextValue}>
                        {children}
                </UserCreditsContext.Provider>
        )
}*/

import { createContext, useState, useCallback, useEffect } from "react";
import axios from "axios";
import { apiEndpoints } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";

export const UserCreditsContext = createContext();

export const UserCreditsProvider = ({ children }) => {
  const [credits, setCredits] = useState(0);
  const [loading, setLoading] = useState(false);

  const { getToken, isSignedIn } = useAuth();

  // ---------------- FETCH CREDITS (SOURCE OF TRUTH) ----------------
  const fetchUserCredits = useCallback(async () => {
    if (!isSignedIn) return;

    setLoading(true);

    try {
      const token = await getToken();

      const response = await axios.get(apiEndpoints.GET_CREDITS, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200 && response.data) {
        setCredits(response.data.credits);
      } else {
        toast.error("Unable to fetch credits");
      }
    } catch (error) {
      console.error("Error fetching user credits:", error);
      toast.error("Failed to fetch credits");
    } finally {
      setLoading(false);
    }
  }, [getToken, isSignedIn]);

  // ---------------- AUTO LOAD ON LOGIN ----------------
  useEffect(() => {
    if (isSignedIn) {
      fetchUserCredits();
    } else {
      setCredits(0);
    }
  }, [fetchUserCredits, isSignedIn]);

  // ---------------- SAFE REFRESH (USE AFTER UPLOAD/DELETE) ----------------
  const refreshCredits = useCallback(() => {
    return fetchUserCredits();
  }, [fetchUserCredits]);

  // ---------------- CONTEXT VALUE ----------------
  const contextValue = {
    credits,
    loading,
    fetchUserCredits,
    refreshCredits,
  };

  return (
    <UserCreditsContext.Provider value={contextValue}>
      {children}
    </UserCreditsContext.Provider>
  );
};