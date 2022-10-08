import React, { useState, useEffect } from 'react'
import P5Component from './component/P5Component/P5Component'






const App:React.FC = () => { 

  const [gridDraw, SetGridDraw] = useState<boolean>(true)

  useEffect(() => {

  }, [gridDraw])

  return <div style={{display: 'inline-flex', flexDirection: 'row', justifyContent: 'center'}}>
              <div style={{border: '1px solid black', width:'350px'}}>
                조작법.<br></br>
                1.마우스휠로 확대 축소 가능<br></br>
                2.왼쪽클릭으로 드래그하면 그리기 가능<br></br>
                3.오른쪽클릭으로 드래그하면 지우기 가능<br></br>
                <input type='checkbox' id='gridDrawCheckbox' onChange={(e) => {SetGridDraw(e.target.checked)}}/>
              </div>
              <div style={{border: '1px solid black', width:'1280px', display: 'inline-flex', justifyContent:'center', alignItems:'center'}} >
                <P5Component name='asdf' gridDraw = {gridDraw}/>
              </div>
              <div>
              </div>
          </div>
}

export default App