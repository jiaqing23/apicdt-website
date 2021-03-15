import React from 'react'
import { useState} from 'react'
import './css/SchoolList.css'
import Winnerf from '../components/Winnerf.js'
import Seed from '../components/Seed.js'
import {serverURL} from '../config'
import Form from 'react-bootstrap/Form';
import areafs from "../components/json/areafs.json";

const StarwarsListTemp = () => {

  const [winnerfs, setWinnerfs] = useState([]);
  const [areaC,setAreaC] = useState("");
  const [area,setArea] = useState("");
  const [chosen,setChosen] = useState(false);
  const [empty,setEmpty] = useState(false);
  const [hideseed,setHideseed] = useState(true);


  const getSelection=(event)=>{
    setChosen(true);
    fetchWinners(event.target.value);
    setArea(event.target.value);
    if(event.target.value==="seed"){
      setHideseed(false);
    }
    else if(event.target.value==="my"){
      setAreaC("马来西亚");
    }
    else if(event.target.value==="sg"){
      setAreaC("新加坡");
    }
    else if(event.target.value==="hk"){
      setAreaC("香港");
    }
    else if(event.target.value==="mc"){
      setAreaC("澳门");
    }
    else if(event.target.value==="au"){
      setAreaC("澳大利亚");
    }
    else if(event.target.value==="cm"){
      setAreaC("中国大陆");
    }
    else if(event.target.value==="uk"){
      setAreaC("英国");
    }
    else{
      setAreaC("");
      setChosen(false);
      setEmpty(false);
    }
  }

  const fetchWinners = async (area1) => {
    // const res = await fetch('https://apicdt-server.com/starwars')
    // const res = await fetch('http://localhost:5000' + '/starwars')
    if(area1 === "seed"){
      const res = await fetch(serverURL + 'starwarsseed')
      const data = await res.json()
      setWinnerfs(data);
      return;
    } 
    const res = await fetch(serverURL + 'starwars'+area1)

    const data = await res.json()
    var temp = data.length;
    if(temp>0){
      setEmpty(false);
    }
    else{
      setEmpty(true);
    }
    var i;
    
    for (i = 0; i < temp; i++) {
      if(!(data[i].count)){
        delete data[i]
      }
    }
    
    var array = data.filter(function () { return true });

    array.sort(function (a, b) {
      return a.time - b.time;
    });

    // console.log(array)
    setWinnerfs(array);
  }



  return (
    <div className="schoolsBlock container" >
      <Form.Control
      as="select"
      className="areaSelection"
      id="inlineFormCustomSelect"
      onChange={(e) => getSelection(e)}
      >
      <option className = "area" value="">请选择地区</option>
      {areafs.map(areaf => (
        <option value={areaf.value} >{areaf.area}</option>
      ))}
      </Form.Control>
   
      <div className = {`listHeader ${!chosen ? "invi" : ""}`} >
        {areaC}地区电子抽签报名成功队伍
      </div>
      <h3 className = {`${!empty ? "invi" : ""} `}>
        暂无报名队伍
      </h3>
      <div className = {`${hideseed ? "dis" : ""}`} >
        {winnerfs.map((winnerf, index) => (
          <Winnerf area={area} key={index} index={index} winnerf={winnerf}/>
        ))}
      </div>
      <div className = {`${!hideseed ? "dis" : ""}`}>
        {winnerfs.map((winnerf, index) => (
          <Seed key={index} index={index} winnerf={winnerf}/>
        ))}
      </div>
 
    </div>
  )
}

export default StarwarsListTemp