import { useRef, useEffect, useState } from "react";
//import { BIMViewer, Server } from "@xeokit/xeokit-bim-viewer";
import { BIMViewer } from "/src/xeokitBimViewerSrc/BIMViewer.js";
import { Server } from "/src/xeokitBimViewerSrc/server/Server.js";
import Explorer from "/src/viewer/Explorer"
import Inspector from "/src/viewer/Inspector.tsx"
import Toolbar from "/src/viewer/Toolbar"
import "/src/css/xeokit-bim-viewer.css";
import "/src/css/style.css";

//import * as React from 'react'
import { useSearchParams } from 'react-router-dom';
 
//use react context
import { useContext } from 'react';


export default function Viewer() {
  /* The viewer instances */
  const bimViewer = useRef<typeof BIMViewer>(null);
  const bimViewerServer = useRef<typeof Server>(null);

  /* The viewer elements */
  const viewerWrapper = useRef(null);
  const explorer = useRef(null);
  const inspector = useRef(null);
  const toolbar = useRef(null);
  const viewerCanvas = useRef(null);
  const navCube = useRef(null);

  /* To get data from a query. Such as projectId and BCFViewepoint*/

  //https://dev.to/vikram-boominathan/search-params-and-use-location-5b7h
  const [searchParams, setSearchParams] = useSearchParams();

  console.log(searchParams.get("projectId"))
  const listOfProjects = { projects: [] };
  
  let [componentState, setcomponentsState] = useState(true)
  
  useEffect(() => { 

    loadViewer()}, [location] )

   
 
  function loadViewer() {
    setcomponentsState(()=> true)
    
     if (!componentState) return
    bimViewerServer.current = new Server({
      dataDir: "./",
    })
  
    bimViewer.current = new BIMViewer(bimViewerServer.current, {
      canvasElement: viewerCanvas.current,
      explorerElement: explorer.current,
      inspectorElement: inspector.current,
      toolbarElement: toolbar.current,
      navCubeCanvasElement: navCube.current,
      busyModalBackdropElement: viewerWrapper.current,
    })
  
    bimViewerServer.current.getProjects(
      (projects: { projects: [] }) => {
        listOfProjects.projects = projects.projects;
        bimViewer.current.loadProject("Duplex");
      },
      (err: any) => {
        console.log(err);
      }
    )
    bimViewer.current.on("openInspector", () => {
      console.log("open inspector");
    })
 
  }
  return (
    <div
      ref={viewerWrapper}
      className="flex flex-row overflow-hidden h-full w-full"
    >
      <div ref={explorer} id="explorer" className="w-1/4 overflow-hidden h-full">
          {componentState ? <Explorer /> : <div>Loading...</div>}
      </div>
      <div id="viewer" className="w-1/2 overflow-hidden relative h-full ">
        <div ref={toolbar} id="toolbar" className="absolute top-0 left-0">
        { componentState ? <Toolbar /> : <div> Нет еще</div>}
        </div>
        <canvas
          ref={viewerCanvas}
          id="canvas"
          className="h-full w-full border"
        ></canvas>
        <canvas
          ref={navCube}
          id="nav-cube-canvas"
          className="absolute bottom-0 right-0"
        ></canvas>
      </div>
      <div ref={inspector} id="inspector" className="w-1/4 overflow-hidden ">
      { componentState ? <Inspector /> : <div> Нет еще</div>}
      </div>
    </div>
  );
}
