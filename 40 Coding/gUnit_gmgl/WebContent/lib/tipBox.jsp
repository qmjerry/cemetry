<script language=JavaScript>
<!--//
var allSupport = document.all!=null
function setupEventObject(e) {
// Map NS event object to IEs
if (e==null) return // IE returns
window.event = e
window.event.fromElement = e.target
window.event.toElement = e.target
window.event.srcElement = e.target
window.event.x = e.x
window.event.y = e.y
// Route the event to the original element
// Necessary to make sure _tip is set.
window.event.srcElement.handleEvent(e);
}
function checkName(src) {
// Look for tooltip in IE
while ((src!=null) && (src._tip==null))
src = src.parentElement
return src
}

function getElement(elName) {
// Get an element from its ID
if (allSupport)
return document.all[elName]
else
return document.layers[elName]
}

function writeContents(el, tip) {
// Replace the contents of the tooltip
if (allSupport)
el.innerHTML = tip
else {
// In NS, insert a table to work around
// stylesheet rendering bug.
// NS fails to apply style sheets when writing
// contents into a positioned element.
el.document.open()
el.document.write("<TABLE WIDTH=200 BORDER=1 bordercolor=black><TR><TD WIDTH=100% BGCOLOR=yellow>")
el.document.write(tip)
el.document.write("</TD></TR></TABLE>")
el.document.close()
}
}

function getOffset(el, which) {
// Function for IE to calculate position
// of an element.
var amount = el["offset"+which]
if (which=="Top")
amount+=el.offsetHeight
el = el.offsetParent
while (el!=null) {
amount+=el["offset"+which]
el = el.offsetParent
}
return amount
}
function setPosition(el) {
// Set the position of an element
src = window.event.srcElement
if (allSupport) {
el.style.pixelTop = getOffset(src, "Top") +10
el.style.pixelLeft = getOffset(src, "Left") +15
} else
{
el.top = src.y + 40
el.left = src.x +40
}
}
function setVisibility(el, bDisplay) {
// Hide or show to tip
if (bDisplay)
if (allSupport)
el.style.visibility = "visible"
else
el.visibility = "show";
else
if (allSupport)
el.style.visibility = "hidden"
else
el.visibility = "hidden"
}
function displayContents(tip) {
// Display the tooltip.
var el = getElement("tipBoxABC")
writeContents(el, tip)
setPosition(el)
setVisibility(el, true)
}
function doMouseOver(e) {
// Mouse moves over an element
setupEventObject(e)
var el, tip
if ((el = checkName(window.event.srcElement))!=null)
if (!el._display) {
displayContents(el._tip)
el._display = true
}
}
function doMouseOut(e) {
// Mouse leaves an element
setupEventObject(e)
el = checkName(window.event.srcElement)
var el, tip
if ((el = checkName(window.event.srcElement))!=null)
if (el._display)
if ((el.contains==null) || (!el.contains(window.event.toElement))) {
setVisibility(getElement("tipBoxABC"), false)
el._display = false
}
}
function doLoad() {
// Do Loading
// setInterval("update()", 2000);
if ((window.document.captureEvents==null) && (!allSupport))
return // Not IE4 or NS4
if (window.document.captureEvents!=null) // NS - capture events
window.document.captureEvents(Event.MOUSEOVER | Event.MOUSEOUT)
window.document.onmouseover = doMouseOver;
window.document.onmouseout = doMouseOut;
}

window.onload = doLoad
//-->
function StraightPath(fromX, fromy, toX, toY, n) {
// All path objects must have these 5 methods
this.x = fromX; // Retrieves the current x value
this.y = fromy;
this.step = int_step; // Move to next step
// Returns true if the step was succesfull
// Returns false when the path has been done
this.reset = int_reset;
// The rest may vary from different path objects

this.startX = fromX;
this.startY = fromy;
this.endX = toX;
this.endY = toY;

// Initiate steps
this.steps = n;
this.totalSteps = n;
if (this.totalSteps < 1) { // No Amimation!
this.x = this.endX;
this.y = this.endY;
this.deltaX = 0; // NN work around
this.deltaY = 0;
}
else {
this.deltaX = (this.endX - this.startX) / this.totalSteps;
this.deltaY = (this.endY - this.startY) / this.totalSteps;
}
function int_step() {
if (this.steps >= 0) {
this.steps--;
this.x += this.deltaX;
this.y += this.deltaY;
}
return (this.steps >= 0 );
}
function int_reset() {
if (this.totalSteps < 1) {
this.steps = 0;
this.x = this.endX;
this.y = this.endY;
}
else {
this.steps = this.totalSteps;
this.x = this.startX;
this.y = this.startY;
}
}
}
//StraightPath.prototype = new Path;
</script>
<style TYPE="text/css">
#tipBoxABC {position: absolute;
width: 160px;
z-index: 100;
border: 1pt black solid;
font-family:\u5B8B\u4F53;
font-size: 9pt;
background: #FFFF00;
visibility: hidden}
</style>

<div ID="tipBoxABC"></div>
<img src="../lib/11.bmp" width="13" height="13" border="0" onMouseOver="this._tip = '' ">

