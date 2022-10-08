import React, { useEffect } from 'react'
import p5 from 'p5'




const s = (sketch:p5) => {

  let scale:number = 12;
  let graphicRenderer:p5;

  const SetGrid = (gridCount:number) => {
    let i:number = 0, j:number = 0;
    sketch.strokeWeight(0.7);

    if(true) {
      for(j = 0; j < graphicRenderer.width/gridCount; j++) {
        sketch.stroke(0, 40)
        for(i = 1;i < gridCount; i++) {
          sketch.line(0.5 + (i + j * gridCount) * scale, 0.5, 0.5 + (i + j * gridCount) * scale, 0.5 + graphicRenderer.height * scale);
        }
        sketch.stroke(0, 255)
        sketch.line(0.5 + (gridCount + j * gridCount) * scale, 0.5, 0.5 + (gridCount + j * gridCount) * scale, 0.5 + graphicRenderer.height * scale);
      }
  
      
      for(j = 0; j < graphicRenderer.height/gridCount; j++) {
        sketch.stroke(0, 40)
        for(i = 1;i < gridCount; i++) {
          sketch.line(0.5, 0.5 + (i + j * gridCount) * scale, 0.5 + graphicRenderer.width * scale, 0.5 + (i + j * gridCount) * scale);
        }
        sketch.stroke(0, 255)
        sketch.line(0.5, 0.5 + (gridCount + j * gridCount) * scale, 0.5 + graphicRenderer.width * scale, 0.5 + (gridCount + j * gridCount) * scale);
      }
    }
    
    
    sketch.fill(0,0,0,0)
    sketch.rect(0.5, 0.5, graphicRenderer.width * scale, graphicRenderer.height * scale)
  }

  sketch.setup = () => {
    sketch.createCanvas(1024, 768, 'p2d')
    graphicRenderer = sketch.createGraphics(128, 128, 'p2d')
    sketch.background(0, 155, 55)
    sketch.noSmooth()
    graphicRenderer.noSmooth()
    graphicRenderer.strokeWeight(1)
    graphicRenderer.stroke(100, 255)
  }
  
  sketch.draw = () => {
    sketch.background(255, 255, 255);

    sketch.image(graphicRenderer as unknown as p5.Image, 0.5, 0.5, graphicRenderer.width * scale, graphicRenderer.height * scale)
    
    SetGrid(8)
  }
  
  sketch.mouseDragged = () => {
    let mx:number, my:number;

    if(sketch.mouseX < 0)
      return
    else if(sketch.mouseX > graphicRenderer.width * scale)
      return
    else
      mx = sketch.mouseX;

    if(sketch.mouseY < 0)
      return
    else if(sketch.mouseY > graphicRenderer.height * scale)
      return
    else
      my = sketch.mouseY;

    graphicRenderer.loadPixels()
    switch(sketch.mouseButton){
      case 'right':
        graphicRenderer.set(sketch.int(mx / scale), sketch.int(my / scale), 255)
        break
      case 'left':
        graphicRenderer.set(sketch.int(mx / scale), sketch.int(my / scale), 0)
        break
    }
    graphicRenderer.updatePixels()
  }
  sketch.mousePressed = sketch.mouseDragged
}


let p5Instance:p5;

const App:React.FC = () => { 
  
  useEffect(() => {
    p5Instance = new p5(s, document.getElementById('p5Render') as HTMLElement)
    return () => {
      p5Instance = null
    }
  }, []);

  return <div style={{display: 'inline-flex', flexDirection: 'row', justifyContent: 'center'}}>
              <div style={{border: '1px solid black', width:'350px'}}>
                조작법.<br></br>
                1.마우스휠로 확대 축소 가능<br></br>
                2.왼쪽클릭으로 드래그하면 그리기 가능<br></br>
                3.오른쪽클릭으로 드래그하면 지우기 가능<br></br>
              </div>
              <div style={{border: '1px solid black', width:'1280px', display: 'inline-flex', justifyContent:'center', alignItems:'center'}} >
                <div id = 'p5Render'></div>
              </div>
              <div>
              </div>
          </div>
}

export default App