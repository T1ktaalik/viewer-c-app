export default function Toolbar () {
    return (
        <div className="xeokit-toolbar">    
  {/* Reset button */}
  <div className="xeokit-btn-group">
    <button
      type="button"
      className="xeokit-i18n xeokit-reset xeokit-btn fa fa-home fa-2x disabled"
      data-xeokit-i18ntip="toolbar.resetViewTip"
      data-tippy-content="Reset view"
    />
  </div>
  <div className="xeokit-btn-group" role="group">
    {/* 3D Mode button */}
    <button
      type="button"
      className="xeokit-i18n xeokit-threeD xeokit-btn fa fa-cube fa-2x disabled"
      data-xeokit-i18ntip="toolbar.toggle2d3dTip"
      data-tippy-content="Toggle 2D/3D"
    />
    {/* Perspective/Ortho Mode button */}
    <button
      type="button"
      className="xeokit-i18n xeokit-ortho xeokit-btn fa fa-th fa-2x  disabled"
      data-xeokit-i18ntip="toolbar.togglePerspectiveTip"
      data-tippy-content="Toggle Perspective/Ortho"
    />
    {/* Fit button */}
    <button
      type="button"
      className="xeokit-i18n xeokit-fit xeokit-btn fa fa-crop fa-2x disabled"
      data-xeokit-i18ntip="toolbar.viewFitTip"
      data-tippy-content="View fit"
    />
    {/* First Person mode button */}
    <button
      type="button"
      className="xeokit-i18n xeokit-firstPerson xeokit-btn fa fa-male fa-2x disabled"
      data-xeokit-i18ntip="toolbar.firstPersonTip"
      data-tippy-content="Toggle first-person mode"
    />
    {/* Show/hide IFCSpaces */}
    <button
      type="button"
      className="xeokit-i18n xeokit-showSpaces xeokit-btn fab fa-codepen fa-2x disabled"
      data-xeokit-i18ntip="toolbar.showSpacesTip"
      data-tippy-content="Show IFCSpaces"
    />
  </div>
  {/* Tools button group */}
  <div className="xeokit-btn-group" role="group">
    {/* Hide tool button */}
    <button
      type="button"
      className="xeokit-i18n xeokit-hide xeokit-btn fa fa-eraser fa-2x disabled"
      data-xeokit-i18ntip="toolbar.hideObjectsTip"
      data-tippy-content="Hide objects"
    />
    {/* Select tool button */}
    <button
      type="button"
      className="xeokit-i18n xeokit-select xeokit-btn fa fa-mouse-pointer fa-2x disabled"
      data-xeokit-i18ntip="toolbar.selectObjectsTip"
      data-tippy-content="Select objects"
    />
    {/* Marquee select tool button */}
    <button
      type="button"
      className="xeokit-i18n xeokit-marquee xeokit-btn fas fa-object-group fa-2x disabled"
      data-xeokit-i18ntip="toolbar.marqueeSelectTip"
      data-tippy-content="Marquee select objects"
    />
    {/* Measure distance tool button */}
    <button
      type="button"
      className="xeokit-i18n xeokit-measure-distance xeokit-btn fa fa-ruler fa-2x disabled"
      data-xeokit-i18ntip="toolbar.measureDistanceTip"
      data-tippy-content="Measure distance"
    />
    {/* Measure angle tool button */}
    <button
      type="button"
      className="xeokit-i18n xeokit-measure-angle xeokit-btn fa fa-chevron-left fa-2x disabled"
      data-xeokit-i18ntip="toolbar.measureAngleTip"
      data-tippy-content="Measure angle"
    />
    {/* section tool button */}
    <button
      type="button"
      className="xeokit-i18n xeokit-section xeokit-btn fa fa-cut fa-2x disabled"
      data-xeokit-i18ntip="toolbar.sliceObjectsTip"
      data-tippy-content="Slice objects"
    >
      <div
        className="xeokit-i18n xeokit-section-menu-button disabled"
        data-xeokit-i18ntip="toolbar.slicesMenuTip"
        data-tippy-content="Slices menu"
      >
        <span className="xeokit-arrow-down xeokit-section-menu-button-arrow" />
      </div>
      <div
        className="xeokit-i18n xeokit-section-counter"
        data-xeokit-i18ntip="toolbar.numSlicesTip"
        data-tippy-content="Number of existing slices"
      />
    </button>
  </div>
</div>
    )
}