import { useRef, useEffect } from "react";
import { BIMViewer, Server } from "@xeokit/xeokit-bim-viewer";
import './Viewer.css'
import '@xeokit/xeokit-bim-viewer/dist/xeokit-bim-viewer.css'



export default function Viewer() {
  // The viewer instances
  const bimViewer = useRef<typeof BIMViewer>(null);
  const bimViewerServer = useRef<typeof Server>(null);

  // The viewer elements
  const viewerWrapper = useRef(null);
  const explorer = useRef(null);
  const inspector = useRef(null);
  const toolbar = useRef(null);
  const viewerCanvas = useRef(null);
  const navCube = useRef(null);
  
  const listOfProjects =  { projects: []}

  useEffect(() => {
    loadViewer();
  });

  function loadViewer() {
    bimViewerServer.current = new Server({
      dataDir: "./",
    });

    bimViewer.current = new BIMViewer(bimViewerServer.current, {
      canvasElement: viewerCanvas.current,
      explorerElement: explorer.current,
      inspectorElement: inspector.current,
      toolbarElement: toolbar.current,
      navCubeCanvasElement: navCube.current,
      busyModalBackdropElement: viewerWrapper.current,
    })

    bimViewerServer.current.getProjects((projects: {projects: []} )=>  {
        listOfProjects.projects = projects.projects
        bimViewer.current.loadProject("Duplex")}, (err: any)=> {console.log(err)})
    
  }


  return (
    <>
      <div ref={viewerWrapper}>
        <div ref={explorer} id="explorer"></div>
        <div ref={inspector} id="inspector"></div>
        <div ref={toolbar} id="toolbar"></div>
        <div id="viewer">
          <canvas ref={viewerCanvas} id="canvas"></canvas>
          <canvas ref={navCube} id="nav-cube-canvas"></canvas>
        </div>
      </div>
    </>
  );
}
