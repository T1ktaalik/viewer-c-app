"use client"
import { BIMViewer, LocaleService, Server} from 'xeokit-bim-viewer';
import tippy from 'tippy.js'
import { useEffect, useRef, useState } from 'react';

console.log()
/* import 'https://kit.fontawesome.com/d129036538.js'; */
/* import 'tippy.js/dist/tippy.css';
import 'xeokit-bim-viewer/dist/xeokit-bim-viewer.css';
import './Viewer.css'; */


export default function Viewer() {
  const server = useRef(null)
  const bimViewer = useRef(null)
  const viewerLoaded = useRef(false)
  const canvasElement = useRef()
  const explorerElement = useRef()
  const toolbarElement = useRef()
  const inspectorElement = useRef()
  const navCubeCanvasElement = useRef()
  const viewerElement = useRef()

  useEffect(() => {
    if (!viewerLoaded.current) {
      viewerLoaded.current = true;
      loadViewer('Duplex');
    }
  });

    function loadViewer(projectId) {
      server.current = new Server({
        dataDir: './'
      })
  
      bimViewer.current = new BIMViewer(server.current, {
       /*  localeService: new LocaleService({
          messages: localeMessages,
          locale: 'en'
        }), */
        canvasElement: canvasElement.current,
        explorerElement: explorerElement.current,
        toolbarElement: toolbarElement.current,
        inspectorElement: inspectorElement.current,
        navCubeCanvasElement: navCubeCanvasElement.current,
        busyModalBackdropElement: viewerElement.current,
        enableEditModels: false
      })
  
      loadProject('Duplex')
    } 
    
    function loadProject(projectId) {
      if (!bimViewer.current) return
  
      bimViewer.current.loadProject(projectId, ()=> { bimViewer.current.resetView(), (err)=> {console.log(err)} } )
    }

  return (
    <>
    <input type="checkbox" id="explorer-toggle" />
    <label
      htmlFor="explorer-toggle"
      className="xeokit-i18n explorer-toggle-label xeokit-btn fas fa-2x fa-sitemap"
      data-xeokit-i18ntip="toolbar.toggleExplorer"
      data-tippy-content="Toggle explorer"
    />
    <input type="checkbox" id="inspector-toggle" />
    <label
      id="inspector-toggle-label"
      htmlFor="inspector-toggle"
      className="xeokit-i18n inspector-toggle-label xeokit-btn fas fa-info-circle fa-2x"
      data-xeokit-i18ntip="toolbar.toggleProperties"
      data-tippy-content="Toggle properties"
    />
    <div id="explorer" ref={explorerElement} />
    <div id="toolbar" ref={toolbarElement} />
    <div id="inspector" ref={inspectorElement} />

    <div id="viewer" ref={viewerElement}>
      <canvas id="canvas" ref={canvasElement} />
      <canvas id="nav-cube-canvas" ref={navCubeCanvasElement} />
    </div>
  </>
  );
}
