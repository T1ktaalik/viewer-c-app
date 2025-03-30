import { useRef, useEffect, useState } from "react";
import { BIMViewer } from "/src/xeokitBimViewerSrc/BIMViewer.js";
import { Server } from "/src/xeokitBimViewerSrc/server/Server.js";
import Explorer from "/src/viewer/Explorer"
import Inspector from "/src/viewer/Inspector.tsx"
import Toolbar from "/src/viewer/Toolbar"
import { useSearchParams } from 'react-router-dom';
import copy from 'copy-to-clipboard';
/* import { qs } from 'qs' */
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

  const requestedParams: any = useRef(null)  
  const bcfViewPoint = useRef('the string');



  /** a router instance*/
  const [searchParams, setSearchParams] = useSearchParams();
 
  const listOfProjects = { projects: [] };

  let [componentState, setcomponentsState] = useState(true)
  
  getRequestParams()

  

  useEffect(() => { 
    console.log(searchParams.get("projectId"))
    let projectId = searchParams.get("projectId")
    console.log(searchParams.get("view"))
    loadViewer(projectId)}, [location] )

    
  

    function getRequestParams() {
 /*      console.log(searchParams)
      console.log(searchParams.get("projectId"))
      console.log(searchParams.get("bcfViewPoint"))
      requestedParams.current.projectId = searchParams.get("projectId")
      requestedParams.current.bcfViewPoint = searchParams.get("bcfViewPoint") */

    }

/*     function setRequestParams() {
      searchParams.set("projectId", requestedParams.current.projectId)
      searchParams.set("bcfViewPoint", requestedParams.current.bcfViewPoint)
    } */
   function handleCopy() {
    copy(bcfViewPoint.current)
  }  
  function saveBCFViewpoint() {
    bcfViewPoint.current = bimViewer.current.saveBCFViewpoint()
    setSearchParams({...Object.fromEntries(searchParams) , view: bcfViewPoint.current})
  }
  function loadBCFViewpoint() {
  /*   if (!bcfViewPoint) return */
    bimViewer.current.loadBCFViewpoint(bcfViewPoint.current, { immediate: false})
  }
  function loadViewer(project: string | null) {
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
        bimViewer.current.loadProject(project);
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
        { componentState ? <div><Toolbar /> 
        <button className="xeokit-btn" onClick={saveBCFViewpoint} >save Viewpoint</button> 
        <button className="xeokit-btn" onClick={loadBCFViewpoint} >SET  Viewpoint</button>
        <button className="xeokit-btn" onClick={handleCopy} >Возьми ссылку</button>
        </div>  : <div> Нет еще</div>}
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
