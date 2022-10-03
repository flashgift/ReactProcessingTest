import React, { WheelEventHandler } from 'react'
import Sketch from 'react-p5'
import p5Types from 'p5'

const App:React.FC = () => {

  let pg:p5Types;
  let scale:number = 12;
  let wheelDir:number;

  const SetGrid = (pixelRenderer:p5Types, gridRenderer:p5Types, gridCount:number) => {
    let i:number = 0, j:number = 0;
    gridRenderer.strokeWeight(0.7);

    
    for(j = 0; j < pixelRenderer.width/gridCount; j++) {
      gridRenderer.stroke(0, 40)
      for(i = 1;i < gridCount; i++) {
        gridRenderer.line(0.5 + (i + j * gridCount) * scale, 0.5, 0.5 + (i + j * gridCount) * scale, 0.5 + pixelRenderer.height * scale);
      }
      gridRenderer.stroke(0, 255)
      gridRenderer.line(0.5 + (gridCount + j * gridCount) * scale, 0.5, 0.5 + (gridCount + j * gridCount) * scale, 0.5 + pixelRenderer.height * scale);
    }

    
    for(j = 0; j < pixelRenderer.height/gridCount; j++) {
      gridRenderer.stroke(0, 40)
      for(i = 1;i < gridCount; i++) {
        gridRenderer.line(0.5, 0.5 + (i + j * gridCount) * scale, 0.5 + pixelRenderer.width * scale, 0.5 + (i + j * gridCount) * scale);
      }
      gridRenderer.stroke(0, 255)
      gridRenderer.line(0.5, 0.5 + (gridCount + j * gridCount) * scale, 0.5 + pixelRenderer.width * scale, 0.5 + (gridCount + j * gridCount) * scale);
    }
    
    gridRenderer.fill(0,0,0,0)
    gridRenderer.rect(0.5, 0.5, pixelRenderer.width * scale, pixelRenderer.height * scale)
  }

  const setup = (p5:p5Types, canvasParentRef: Element) => {
    p5.createCanvas(1024, 512).parent(canvasParentRef)
    pg = p5.createGraphics(128, 128)
    p5.background(0, 155, 55)
    pg.noSmooth()
    p5.noSmooth()
    pg.strokeWeight(1)
    pg.stroke(100, 255)
  }
  
  const draw = (p5:p5Types) => {
    pg.rectMode('corners');
    p5.background(255, 255, 255);
    pg.fill(p5.random(0, 255), p5.random(0, 255), p5.random(0, 255), 40);
    pg.rect(0.5, 0.5, 4.5, 4.5)

    p5.image(pg as unknown as p5Types.Image, 0.5, 0.5, pg.width * scale, pg.height * scale)
    SetGrid(pg, p5, 8)
  }
  
  const mouseDragged = (p5:p5Types) => {
    let mx:number, my:number;

    if(p5.mouseX < 0)
      return
    else if(p5.mouseX > p5.width)
      return
    else
      mx = p5.mouseX;

    if(p5.mouseY < 0)
      return
    else if(p5.mouseY > p5.height)
      return
    else
      my = p5.mouseY;

    pg.loadPixels()
    switch(p5.mouseButton){
      case 'right':
        pg.set(p5.int(mx / scale), p5.int(my / scale), 255)
        break
      case 'left':
        pg.set(p5.int(mx / scale), p5.int(my / scale), 0)
        break
    }
    pg.updatePixels()
  }


  const mouseWheel = (p5:any) => {
    if(wheelDir > 0) {
      if(scale <= 30)
        scale++
    }
    else if(scale > 1) {
      scale--
    }
  }

  const onWheel = (e:React.WheelEvent<HTMLDivElement>) => {
    wheelDir = e.deltaY;
  }

  return <div style={{display: 'inline-flex', flexDirection: 'row', justifyContent: 'center'}}>
              <div style={{border: '1px solid black', width:'350px'}}>
                조작법.<br></br>
                1.마우스휠로 확대 축소 가능<br></br>
                2.왼쪽클릭으로 드래그하면 그리기 가능<br></br>
                3.오른쪽클릭으로 드래그하면 지우기 가능<br></br>
              </div>
              <div onWheel={onWheel} style={{border: '1px solid black', width:'1200px', display: 'inline-flex', justifyContent:'center', alignItems:'center'}} onContextMenu={(e)=>e.preventDefault()} >
                <Sketch setup={setup} draw={draw} mouseDragged={mouseDragged} mousePressed={mouseDragged} mouseWheel={mouseWheel} />
              </div>
              <div>
              </div>
          </div>
}

export default App