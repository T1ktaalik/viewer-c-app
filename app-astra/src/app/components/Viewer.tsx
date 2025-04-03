import  { BIMViewer } from '@/app/assets/xktbimviewer/src/BIMViewer'
import { Server } from '@/app/assets/xktbimviewer/src/server/Server'
import { LocaleService } from '@xeokit/xeokit-bim-viewer'
import { messages as localeMessages } from '@/app/assets/xktbimviewer/locales/messages'
import { useEffect } from 'react'
export default function Viewer() {
    useEffect(()=> {
    }, [])

    function loadViewer () {
        const locale = 'ru'
        
        const server = new Server({
            dataDir: "./data"
        })


    }
    return (
        <>
        <div id="viewer">
            xoxo
            <div id="toolbar"></div>
            <div id="explorer"></div>
            <div id="inspector"></div>
           <canvas id="viewerCanvas"></canvas>
           <canvas id="navCubeCanvas"></canvas>
           </div>
        </>
    )
}