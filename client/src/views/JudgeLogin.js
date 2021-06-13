import React from 'react'
import { useState, useEffect, useCallback } from 'react'
import Footer from '../components/Footer'
import Alert from 'react-bootstrap/Alert';
import { useHistory } from "react-router-dom";
import './css/JudgeLogin.css'

const JudgeLogin = () => {
  const [judgeLoginData,setJudgeLoginData] = useState({token : '', indexT: '',isRoadShow: ''});
  const [time,setTime] = useState({hour:'',minute:'',day:''});
  const [changed, setChanged] = useState(false);
  const [checked, setChecked] = useState(false);
  const [changed_1, setChanged_1] = useState(false);
  const[topics,setTopics] = useState([]);
  const [start,setStart] = useState(true);

  const [dataf,setDataf] = useState([]);
  const [datat,setDatat] = useState ([]);
  const [showS, setShowS] = useState(false);
  const [showI, setShowI] = useState(false);
  const [showF, setShowF] = useState(false);

  const history = useHistory();
  
  const onSubmit = async (e) =>{
    e.preventDefault()

    if(judgeLoginData.token === ''){
      setShowF(false);
      setShowS(false);
      setShowI(true);
      setTimeout(() => setShowI(false), 1000);
      return;
    }

    try{
      if((dataf[0].token)&&(dataf.length<2)){
        var len = (dataf[0].indexA).length
        if(len === 0){  
          setShowI(false);
          setShowS(false);
          setShowF(true);
          setTimeout(() => setShowF(false), 1000);
        }
        for (var i = 0; i < len; i++){
          fetchTZTopic((dataf[0].indexA)[i].topic)
        }
        setShowI(false);
        setShowS(false);
        setTimeout(() => setShowF(true), 1000);
        setTimeout(() => setShowF(false), 1000);
        return;
      }
      else{
        setShowF(false);
        setShowS(false);
        setShowI(true);
        setTimeout(() => setShowI(false), 1000);
      }
    } catch(error){
      setShowI(true);
      setShowS(false);
      setShowF(false);
      setTimeout(() => setShowI(false), 1000);
    }
    
  }

  const getTime = async () => {
    const res = await fetch('http://localhost:5000/'+'starwars/time')
    const data = await res.json()
    // console.log(data);
    return data;
  }

  const fetchTZJudge = async (token) => {
    if(token === ''){
      return;
    }

    const res = await fetch('http://localhost:5000'+'/registerJudge/'+token)
    // const res = await fetch('https://apicdt-server.com'+'registerJudge/'+token)
    const data = await res.json()
    setDataf (data);
  }

  const fetchTZTopic = async (indexT) => {
    if(indexT === ''){
      return;
    }

    const res = await fetch('http://localhost:5000'+'/registerTopic/'+indexT)
    // const res = await fetch('https://apicdt-server.com'+'registerJudge/'+indexT)
    const data = await res.json()
    // setDatat(data);
    // console.log(data)
    getTime().then(result=>{
      time.hour = result.hour;
      time.minute = result.minute;
      time.day = result.day;
      var min = ((time.hour*60)+ time.minute);
      var temps = ((data[0].stimeh*60)+ data[0].stimem);
      var tempe = ((data[0].etimeh*60)+ data[0].etimem);

      if((temps<=min)&&(tempe>=min)&&(data[0].date===time.day)){
        judgeLoginData.indexT = data[0].indexT;
        judgeLoginData.isRoadShow = data[0].isRoadShow;
        judgeLoginData.judgeChiName = data[0].judgeChiName;
        // console.log(judgeLoginData)
        if(judgeLoginData.isRoadShow){
          setTimeout(() => history.push({
            pathname: '/gradingFan',
            token: judgeLoginData.token,
            indexT: judgeLoginData.indexT,
            judgeChiName:judgeLoginData.judgeChiName
          }), 1000);
        }
        else{
          setTimeout(() => history.push({
            pathname: '/gradinTable',
            token: judgeLoginData .token,
            indexT: judgeLoginData.indexT,
            judgeChiName:judgeLoginData.judgeChiName
          }), 1000);
        }
        setShowI(false);
        setShowS(true);
        setShowF(false);
        setTimeout(() => setShowS(true), 500);
        return;
      }
    });


    
  }

  useEffect(() => {
    if(changed){
      fetchTZJudge(judgeLoginData.token); 
      setChanged(false);
    }
  },[changed,judgeLoginData])

    
  return (
    <div>
      <Alert show={showS} className= "jalert" variant="success" onClose={() => setShowS(false)} dismissible>
        <Alert.Heading className = "alertHeading"> 登入成功！ </Alert.Heading>
      </Alert>
      <Alert show={showI} className= "jalert" variant="danger" onClose={() => setShowI(false)} dismissible>
        <Alert.Heading className = "alertHeading"> 代码不存在！ </Alert.Heading>
      </Alert>
      <Alert show={showF} className= "alert" variant="danger" onClose={() => setShowF(false)} dismissible>
          <Alert.Heading className = "alertHeading"> 当前没有可评比赛 ！ </Alert.Heading>
      </Alert>
      <form className="SWform JudgeForm" onSubmit = {onSubmit}>
        <div className="JudgeTitle"> 
          评审登入
        </div>
        <input type="text" className={`form-control englsihF`}  value={judgeLoginData.token} placeholder="请输入代码" onChange={(e) => setChanged(true) & setJudgeLoginData({ ...judgeLoginData, token: e.target.value }) } autoFocus /> 
        <button  type="submit" className="btn btn-primary SWbutton " data-toggle="modal" value='Save Form' >
          <span className = "englishF" > Login / </span> <span> 登入 </span>
        </button>
      </form>
    </div>
  )
}

export default JudgeLogin
