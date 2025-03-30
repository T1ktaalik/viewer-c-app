/**the react components */
import { useRef, useEffect, useState } from "react";
/** Usage of a react router */
import { useSearchParams } from 'react-router-dom';
/**  */
import { BIMViewer } from "/src/xeokitBimViewerSrc/BIMViewer.js";
import { Server } from "/src/xeokitBimViewerSrc/server/Server.js";
/** the components of the viewer */
import Explorer from "/src/viewer/Explorer"
import Inspector from "/src/viewer/Inspector.tsx"
import Toolbar from "/src/viewer/Toolbar"
/** UI components */
import copy from 'copy-to-clipboard';

import  qs from 'qs'

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
  
  /** Get data from the URL */
  const requestedParams: any = useRef(null)  
  const bcfViewPoint = useRef(null);



  /** a router instance*/
  const [searchParams, setSearchParams] = useSearchParams();
 
  const listOfProjects = { projects: [] };


  
  useEffect(() => { 

    let projectId = searchParams.get("projectId")
    let view = searchParams.get("view") 
    if (view) {
      bcfViewPoint.current = qs.parse(view)
    } 
    loadViewer(projectId)}, [location] )

  
  function saveBCFViewpoint() {
    let x =  bimViewer.current.saveBCFViewpoint()
    x.snapshot = {}
    x.bitmaps = []
    console.log(x)
    console.log(Object.keys(x).length)
    let y = qs.stringify(x)
    console.log(y)
    setSearchParams({...Object.fromEntries(searchParams) , view: y})
  }
 
  function loadViewer(project: string | null) {
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
        bimViewer.current.loadProject(project, () => {
          if (bcfViewPoint.current) {
            bimViewer.current.loadBCFViewpoint(bcfViewPoint.current, {immediate: true});
          }
        });
      },
      (err: any) => {
        console.log(err);
      }
    )
  }
  return (
    <div
      ref={viewerWrapper}
      className="flex flex-row overflow-hidden h-full w-full"
    >
      <div ref={explorer} id="explorer" className="w-1/4 overflow-hidden h-full">
           <Explorer /> 
      </div>
      <div id="viewer" className="w-1/2 overflow-hidden relative h-full ">
        <div ref={toolbar} id="toolbar" className="absolute top-0 left-0">
        <Toolbar /> 
        <button className="xeokit-btn" onClick={saveBCFViewpoint} >Create a Viewpoint</button> 
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
      <Inspector /> 
      </div>
    </div>
  );
}
