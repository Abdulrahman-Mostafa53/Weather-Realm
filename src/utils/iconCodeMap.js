
const mapImage={
    "s" :[0],
    "c" :[1,2,3,45,48],
    "r" :[51,53,55,56,57,61,63,65,66,67,80,81,82],
    "rt" :[95,96,99],
    "sw":[71, 73, 75,77],
}
export default function getIcon(wCode){
    let match = null
    for(const [key,value] of Object.entries(mapImage)){
        for(const code of value){
            if(code===wCode){
                match = key 
                break
            }
        }
    }
    return new URL(`../assets/images/WeatherConIcons/${match}.svg`,import.meta.url).href
}