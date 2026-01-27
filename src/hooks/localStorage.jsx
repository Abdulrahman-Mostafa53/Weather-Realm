import { useEffect, useState } from "react";

function getLocalData(key,intialValue){
    const val = JSON.parse(localStorage.getItem(key))
    if(val!=null) return val
    if(intialValue instanceof Function) return intialValue()
    return intialValue
}
export default function useLocalStorage(key,intialValue){
    const [value,setValue] = useState(()=>getLocalData(key,intialValue))
    useEffect(()=>{
        localStorage.setItem(key,JSON.stringify(value))
    },[value])
    return [value,setValue]}