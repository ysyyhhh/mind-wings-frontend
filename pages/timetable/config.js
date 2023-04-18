export const config = {
	weekNum:4,
	oneWeekNum:7,
}

const sizeClassWidthInit = 120

export const size  = {
	classWidthInit : sizeClassWidthInit,
	courseWidthInit : (750-sizeClassWidthInit)/config.oneWeekNum,
	
	
	courseHeightInit : 150,
	weeksHeightInit : 100,
	
	minYChange : 5,
	minXChange : 5,
	
	maxX : 20,
	maxY : 20,
	
	morningAfternoonGap:30,
}




export const color  = {
	gray:"#ffffff",
	
	pink:"#fef0ef",
	pinkLight:"#ffedf6",
	
	blueLight:"#defbf7",
	
	orange:"#fdebdd",
	
	yellow:"#fbeacc",
	yellowLight:"#fffac7",
	
	
	green:"#e2f9f1",
	greenLight:"#defbf7",
	
	purple:"#efecff",
	purpleLight:"#f4f1ff"
}
export const colorList  = ["#fef0ef","#ffedf6","#defbf7","#fdebdd","#fbeacc",
"#fffac7","#e2f9f1","#defbf7","#efecff","#f4f1ff"]


