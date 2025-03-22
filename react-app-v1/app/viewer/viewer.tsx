export function Viewer() {
    const viewer
    return (
        <>
        <div>
            <div id="explorer"></div>
            <div id="inspector"></div>
            <div id="toolbar"></div>
            <div id="viewer">
                <canvas id="viewerCanvas"></canvas>
                <canvas id="navCube"></canvas>
            </div>
        </div>
        </>
    )
}