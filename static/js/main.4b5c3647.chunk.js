(this.webpackJsonpplanner=this.webpackJsonpplanner||[]).push([[0],{146:function(e,t,a){e.exports=a.p+"static/media/event.90837826.svg"},203:function(e,t,a){e.exports=a(396)},208:function(e,t,a){},209:function(e,t,a){},217:function(e,t,a){},218:function(e,t,a){},219:function(e,t,a){},222:function(e,t,a){},223:function(e,t,a){},224:function(e,t,a){},386:function(e,t,a){},392:function(e,t,a){},393:function(e,t,a){},396:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),l=a(12),r=a.n(l),o=(a(208),a(24)),i=a(27),c=a(25),d=a(68),u=a(28),m=a(20),p=a.n(m),h=(a(209),a(210),a(145)),b=a.n(h),k=a(146),g=a.n(k),x=(a(216),a(36)),C=(a(217),a(405)),f=function(e){var t=e.menuOptionsList.map((function(e){return s.a.createElement(C.a.Item,{className:"menuOption",key:e.text,onClick:e.onClick},e.text)})),a={left:e.tempPosition[0]+150<window.screen.width?e.tempPosition[0]+"px":e.tempPosition[0]-100+"px",top:e.tempPosition[0]+150<window.screen.width?e.tempPosition[1]+"px":e.tempPosition[1]-50+"px"};return s.a.createElement(C.a,{className:"menuItems",id:"menuItems",style:a},t)},v=(a(218),a(219),function(e){return function(t){function a(){return Object(o.a)(this,a),Object(i.a)(this,Object(c.a)(a).apply(this,arguments))}return Object(u.a)(a,t),Object(x.a)(a,[{key:"render",value:function(){window.matchMedia("only screen and (max-width: 760px)").matches?console.log("isMobile true"):console.log("is mobile false");var t=this.props,a=t.tempPosition[0]+300<window.screen.width?{left:t.tempPosition[0]+"px",top:t.tempPosition[1]+"px"}:{left:"0",right:"0",top:"40%",marginLeft:"auto",marginRight:"auto"};return s.a.createElement(e,Object.assign({},this.props,{divStyle:a,name:"Mohaimin"}))}}]),a}(s.a.Component)}),L=a(404),y=a(150),T=a(409),E=v((function(e){var t={},a=window.matchMedia("only screen and (max-width: 760px)").matches;return a&&(t.position="absolute",t.bottom="0px",t.left="0px",t.top="70%",t.width="100%",t.border="1px solid lightgrey",t.borderTopLeftRadius="12px",t.borderTopRightRadius="12px",t.boxShadow="0px 0px 20px 5px rgba(0, 0, 0, .2)"),s.a.createElement("div",{className:"linkContextMenu",style:a?t:e.divStyle},s.a.createElement(L.a,{className:"mb-3"},s.a.createElement(L.a.Group,{controlId:"formAddURL"},s.a.createElement(y.a,{onChange:e.changeURLFn,value:e.currentURL,placeholder:"Add url","aria-label":"Add url","aria-describedby":"basic-addon2"})),s.a.createElement(L.a.Group,{controlId:"formAddURLText"},s.a.createElement(y.a,{onChange:e.changeURLTextFn,value:e.currentURLText,placeholder:"Add text to show","aria-label":"Add text to show","aria-describedby":"basic-addon2"})),s.a.createElement("div",null,s.a.createElement(T.a,{variant:"primary",className:"okContextMenuBtn",onClick:e.saveFn},"Ok"),s.a.createElement(T.a,{variant:"secondary",onClick:e.closeFn},"Cancel"))))})),w=(a(222),a(401)),S=v((function(e){var t={},a=window.matchMedia("only screen and (max-width: 760px)").matches;a&&(t.position="absolute",t.bottom="0px",t.left="0px",t.top="70%",t.width="100%",t.border="1px solid lightgrey",t.borderTopLeftRadius="12px",t.borderTopRightRadius="12px",t.boxShadow="0px 0px 20px 5px rgba(0, 0, 0, .2)");var n=["secondary","success","danger","warning","info","light","dark"].map((function(t,a){return s.a.createElement("div",{key:a,className:"badgeOption "+t+(a===e.selectedLabelIdx?" clicked":""),onClick:function(){e.selectedLabelIdxChange(a)}})})),l=[];e.labels.forEach((function(e){l.push(e)}));var r=function(t){e.currentLabelChangeByClick(t.currentTarget.getAttribute("value"))},o=-1,i=l.map((function(e){return o++,s.a.createElement(w.a,{key:o,className:"prevUsedLabel",variant:"warning",onClick:r,value:e},e)}));return s.a.createElement("div",{className:"labelContextMenu",style:a?t:e.divStyle},s.a.createElement(L.a,{className:"mb-3"},s.a.createElement(L.a.Group,{controlId:"formAddLabel"},s.a.createElement(y.a,{placeholder:"Label","aria-label":"Add url","aria-describedby":"basic-addon2",value:e.currentLabel,onChange:e.currentLabelChange})),s.a.createElement("h6",{className:"badge-container-heading"},"Choose color"),s.a.createElement("div",{className:"badge-container"},n),s.a.createElement("div",{className:"prevBadgeContainer"},i," "),s.a.createElement("div",null,s.a.createElement(T.a,{variant:"primary",className:"okContextMenuBtn",onClick:e.saveLabel},"Ok"),s.a.createElement(T.a,{variant:"secondary",onClick:e.cancelSaveLabel},"Cancel"))))})),M=(a(223),v((function(e){var t={},a=window.matchMedia("only screen and (max-width: 760px)").matches;return a&&(t.position="absolute",t.bottom="0px",t.left="0px",t.top="85%",t.width="100%",t.border="1px solid lightgrey",t.borderTopLeftRadius="12px",t.borderTopRightRadius="12px",t.boxShadow="0px 0px 20px 5px rgba(0, 0, 0, .2)"),s.a.createElement("div",{className:"deleteContextMenu",style:a?t:e.divStyle},s.a.createElement("div",null,"Are you sure you want to delete this task?"),s.a.createElement(T.a,{style:{marginRight:"8px"},className:"cancelDelete",variant:"secondary",onClick:e.cancelDelete},"Cancel"),s.a.createElement(T.a,{variant:"danger",onClick:function(){return e.deleteTask(e.tempTask)}},"Delete task"))}))),D=a(160),N=(a(224),a(402)),O=a(151),F=a.n(O),R=(a(225),v((function(e){var t=Object(n.useState)(new Date),a=Object(D.a)(t,2),l=a[0],r=a[1],o={},i=window.matchMedia("only screen and (max-width: 760px)").matches;return i&&(o.position="absolute",o.border="1px solid lightgrey",o.borderTopLeftRadius="10px",o.borderTopRightRadius="10px",o.width="100%",o.bottom="0px",o.left="0px",o.height="100px",o.boxShadow="0px 0px 20px 5px rgba(0, 0, 0, .2)"),Object(n.useEffect)((function(){if(i){var e=document.getElementsByClassName("react-datepicker__input-container");Array.from(e).forEach((function(e){return e.childNodes[0].setAttribute("readOnly",!0)}))}})),s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{className:"taskContextMenu",style:i?o:e.divStyle},s.a.createElement(F.a,{selected:l,onChange:function(t){r(t),e.changeFn(t.toString())},showTimeSelect:!0,timeFormat:"HH:mm",timeIntervals:15,timeCaption:"time",dateFormat:"MMMM d, yyyy h:mm aa"}),s.a.createElement("span",{className:"deadlont-text"},"Select a deadline for the task"),s.a.createElement(N.a.Append,null,s.a.createElement(T.a,{className:"deadline-close-btn",onClick:e.closeFn,variant:"secondary"},"Cancel"),s.a.createElement(T.a,{className:"deadline-ok-btn",onClick:function(){e.changeFn(l),e.closeFn(),console.log(l)},variant:"primary"},"Okay"))))}))),I=function(e){function t(e){return Object(o.a)(this,t),Object(i.a)(this,Object(c.a)(t).call(this,e))}return Object(u.a)(t,e),Object(x.a)(t,[{key:"render",value:function(){var e=this.props,t=e.displayAllContextMenus,a=e.tempPosition,n=e.menuOptionsList,l=e.displaySortingOptionsMenu,r=e.displayTaskCtxMenu,o=e.endTimeCloseFn,i=e.changeFn,c=e.curDeadline,d=e.displayDeleteCtxMenu,u=e.displayLinkCtxMenu,m=e.displayLabelCtxMenu,p=e.linkCloseFn,h=e.saveFn,b=e.currentURL,k=e.currentURLText,g=e.changeURLTextFn,x=e.changeURLFn,C=e.saveLabel,v=e.currentLabel,L=e.cancelSaveLabel,y=e.tempTask,T=e.currentLabelChange,w=e.selectedLabelIdx,D=e.selectedLabelIdxChange,N=e.labels,O=e.currentLabelChangeByClick,F=e.deleteTask,I=e.cancelDelete;return s.a.createElement(s.a.Fragment,null,t?s.a.createElement(f,{tempPosition:a,menuOptionsList:n}):null,l?s.a.createElement(f,{tempPosition:a,menuOptionsList:n}):null,r?s.a.createElement(R,{closeFn:o,changeFn:i,curDeadline:c,tempPosition:a}):null,u?s.a.createElement(E,{tempPosition:a,closeFn:p,saveFn:h,currentURL:b,currentURLText:k,changeURLTextFn:g,changeURLFn:x}):null,m?s.a.createElement(S,{tempPosition:a,saveLabel:C,currentLabel:v,cancelSaveLabel:L,tempTask:y,currentLabelChange:T,selectedLabelIdx:w,selectedLabelIdxChange:D,labels:N,currentLabelChangeByClick:O}):null,d?s.a.createElement(M,{tempPosition:a,tempTask:y,deleteTask:F,cancelDelete:I}):null)}}]),t}(s.a.Component),U=a(154),A=a.n(U),j=(a(386),a(387),a(403)),P=new(a(155).a)("Planner");P.version(1).stores({tasks:"++id, userName, task"});var B=P,Y=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(i.a)(this,Object(c.a)(t).call(this,e))).closeFn=function(){var e=null;a.props.tasks.forEach((function(t){t.task===a.props.currentModalTask&&(e=t)})),B.tasks.where("task").equalsIgnoreCase(a.props.currentModalTask).first((function(t){t&&(console.log("found item"),B.tasks.put({userName:a.props.userName,task:a.props.currentModalTask,endTime:e.end,richText:a.props.richText,id:t.id,label:t.label,selectedLabelIdx:t.selectedLabelIdx}))})).then((function(){a.props.closeFn()}))},a.state={text:e.richText||""},a}return Object(u.a)(t,e),Object(x.a)(t,[{key:"render",value:function(){var e=this.props;return s.a.createElement(j.a,{show:e.show,onHide:e.onHide,centered:!0},s.a.createElement(j.a.Header,{closeButton:!0},s.a.createElement(j.a.Title,{className:"task-modal-title"},e.currentModalTask)),s.a.createElement(j.a.Body,null,s.a.createElement(L.a.Group,{controlId:"exampleForm.ControlTextarea1"},s.a.createElement(L.a.Label,null,e.currentModalTask&&"Due by: "+p()(e.currentModalTaskEnd).format("LLLL")),s.a.createElement(A.a,{value:e.richText||"",onChange:e.onRichTextChange,modules:{toolbar:[[{header:[1,2,!1]}],["bold","italic","underline","strike","code-block"],[{list:"ordered"},{list:"bullet"},{indent:"-1"},{indent:"+1"}],["clean"]]},formats:["header","bold","italic","underline","strike","code-block","list","bullet","indent"]}))),s.a.createElement(j.a.Footer,null,s.a.createElement(T.a,{variant:"secondary",onClick:this.closeFn},"Close"),s.a.createElement(T.a,{variant:"primary",onClick:this.closeFn},"Save Changes")))}}]),t}(s.a.Component),_=(a(22),a(157)),q=a.n(_),H=(a(391),function(e){function t(e){var a;Object(o.a)(this,t),a=Object(i.a)(this,Object(c.a)(t).call(this,e));var n=p()(new Date).subtract(30,"days").format("YYYY-MM-DD"),s=p()(new Date).add(100,"days").format("YYYY-MM-DD");return a.state={dates:[],firstDate:n,lastDate:s},a}return Object(u.a)(t,e),Object(x.a)(t,[{key:"componentDidMount",value:function(){var e={},t=[];for(var a in this.props.tasks.forEach((function(t){if(t.end){var a=p()(t.end).format("YYYY-MM-DD");e[a]=e[a]?e[a]+1:1}})),e)t.push({date:a,count:e[a]});this.setState({dates:t})}},{key:"render",value:function(){return s.a.createElement("div",{className:"dashboard"},s.a.createElement(q.a,{startDate:new Date(this.state.firstDate||"2020-01-01"),endDate:new Date(this.state.lastDate||"2020-06-12"),values:this.state.dates,titleForValue:function(e){return e&&"".concat(e.date," : ").concat(e.count," tasks")}}))}}]),t}(s.a.Component)),X=(a(392),function(e){return s.a.createElement(s.a.Fragment,null,s.a.createElement(w.a,{className:"tabselector "+(e.shouldShowDashboard?"":"selected"),onClick:e.hideDashboard},"Tasks"),s.a.createElement(w.a,{className:"tabselector "+(e.shouldShowDashboard?"selected":""),onClick:e.showDashboard},"Statistics"))}),G=a(158),W=a.n(G),J=(a(393),function(e){return s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{className:"login-welcome"},"Welcome to Planner App"),s.a.createElement(W.a,{appId:"176625356093687",autoLoad:!1,callback:e.responseFacebook,cssClass:"my-facebook-button-class",fields:"name,email,picture"}))}),K=a(80),Q=a(406),V=a(407),Z=a(408),$=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(i.a)(this,Object(c.a)(t).call(this,e))).componentDidMount=function(){null!==window.localStorage.getItem("todousername")&&a.responseFacebook({name:window.localStorage.getItem("todousername")})},a.responseFacebook=function(e){var t=[],n=new Set;window.localStorage.setItem("todousername",e.name),B.tasks.where("userName").equalsIgnoreCase(e.name).each((function(e){e.label&&n.add(e.label),t.push({task:e.task,end:e.endTime,url:e.url,urlText:e.urlText,progressState:e.progressState,label:e.label,selectedLabelIdx:e.selectedLabelIdx})})).then((function(){a.props.facebookLoginDispatch({loggedin:!0,userName:e.name}),0===t.length&&t.push({task:"Add a task like this!",end:new Date,url:"www.google.com",urlText:"Add a link like this",progressState:"progress",label:"Label",selectedLabelIdx:1}),a.setState({tasks:t,labels:n})}))},a.logOutFacebook=function(){window.localStorage.removeItem("todousername"),window.FB.logout(),a.props.facebookLoginDispatch({loggedin:!1,userName:"User"})},a.addToList=function(e){if(a.state.curTask.trim().length>=1){var t=a.state.curTask,n=a.state.tasks;n.push({task:t}),a.setState({tasks:n,curTask:""}),B.tasks.put({userName:a.props.userName,task:t})}},a.closeAllCtxMenus=function(){a.setState({displayAllContextMenus:!1,displaySortingOptionsMenu:!1,displayCurtain:!1,displayDeleteCtxMenu:!1})},a.handleInputChange=function(e){e.target.value.length<50&&a.setState({curTask:e.target.value})},a.deleteTask=function(e){for(var t,n=a.state.tasks,s=e,l=0;l<n.length;l++)if(n[l].task===s){t=l;break}n=n.slice(0,t).concat(n.slice(t+1,n.length)),a.setState({tasks:n,displayDeleteCtxMenu:!1,displayCurtain:!1}),B.tasks.where("task").equalsIgnoreCase(s).delete()},a.showDeadlineContextMenu=function(e){a.setState({displayAllContextMenus:!0,displayCurtain:!(window.screen.width<500),tempTask:e.currentTarget.value,tempPosition:[e.clientX,e.clientY]})},a.deadlineChangeFn=function(e){a.setState({curDeadline:e})},a.endTimeCloseFn=function(){var e=a.state.tasks.concat(),t=a.state.tempTask;if(a.setState({displayTaskCtxMenu:!1}),a.state.curDeadline){for(var n=0;n<e.length;n++)if(e[n].task===t){e[n].end=a.state.curDeadline;break}var s;a.setState({tasks:e}),B.tasks.where("task").equalsIgnoreCase(t).first((function(e){s=e,console.log("putting this in the database"),console.log(a.state.curDeadline),B.tasks.put({userName:a.props.userName,task:t,richText:s.richText,endTime:a.state.curDeadline,id:s.id,label:s.label,selectedLabelIdx:s.selectedLabelIdx})}))}a.setState({tempTask:""})},a.linkCloseFn=function(){a.setState({displayLinkCtxMenu:!1,currentURL:"",currentURLText:""})},a.saveLinkFn=function(){for(var e=a.state,t=e.currentURL,n=e.currentURLText,s=e.tempTask,l=a.state.tasks.concat(),r=0;r<l.length;r++)if(l[r].task===s){l[r].url=t,l[r].urlText=n;break}B.tasks.where("task").equalsIgnoreCase(s).first((function(e){var l=e;B.tasks.put({userName:a.props.userName,task:s,endTime:l.endTime,url:t,urlText:n,id:l.id})})),a.setState({displayLinkCtxMenu:!1,tasks:l,currentURL:"",currentURLText:""})},a.changeURLTextFn=function(e){a.setState({currentURLText:e.target.value})},a.changeURLFn=function(e){a.setState({currentURL:e.target.value})},a.changeProgressState=function(e){var t=e.currentTarget.value,n=e.currentTarget.getAttribute("task");e.currentTarget.parentElement.parentElement.classList.remove("show");for(var s=a.state.tasks.concat(),l=0;l<s.length;l++)if(s[l].task===n){s[l].progressState=t;break}B.tasks.where("task").equalsIgnoreCase(n).first((function(e){if(e){var s=e;B.tasks.put({userName:a.props.userName,task:n,endTime:s.endTime,url:s.url,urlText:s.urlText,progressState:t,id:s.id})}})),a.setState({displayLinkCtxMenu:!1,tasks:s,currentURL:"",currentURLText:""})},a.showColors=function(e){var t="true"===e.currentTarget.value;a.setState({shouldShowColors:!t})},a.showDashboard=function(){a.setState({shouldShowDashboard:!0})},a.hideDashboard=function(){a.setState({shouldShowDashboard:!1})},a.openTaskModal=function(e){var t=e.currentTarget.getAttribute("value");B.tasks.where("task").equalsIgnoreCase(t).first((function(e){a.setState({showModal:!0,currentModalTask:e?e.task:"You'll see your task header here",currentModalTaskEnd:e?e.endTime:"Jan 24 2020 8:45pm EST",currentRichText:e?e.richText:"Here you can have a details section too! ^_^"})}))},a.handleQuillClose=function(){a.setState({showModal:!1})},a.richTextChange=function(e){a.setState({currentRichText:e,didRichTextChange:!0})},a.saveLabel=function(){var e=a.state.currentLabel,t=a.state.tempTask,n=a.state.labels;n.add(e),B.tasks.where("task").equalsIgnoreCase(t).first((function(n){var s=n;B.tasks.put({userName:a.props.userName,task:t,endTime:s.endTime,url:s.url,urlText:s.urlText,progressState:s.progressState,id:s.id,label:e,selectedLabelIdx:a.state.selectedLabelIdx})}));for(var s=a.state.tasks.concat(),l=0;l<s.length;l++)if(s[l].task===t){s[l].label=e,s[l].selectedLabelIdx=a.state.selectedLabelIdx;break}a.setState({displayAllContextMenus:!1,displayLabelCtxMenu:!1,currentLabel:"",tasks:s,labels:n})},a.cancelSaveLabel=function(){a.setState({displayAllContextMenus:!1,displayLabelCtxMenu:!1,currentLabel:""})},a.currentLabelChange=function(e){a.setState({currentLabel:e.currentTarget.value})},a.selectedLabelIdxChange=function(e){a.setState({selectedLabelIdx:e})},a.currentLabelChangeByClick=function(e){a.setState({currentLabel:e})},a.sortTasksByLabel=function(){var e=a.state.tasks;e.sort((function(e,t){var a=e.label&&e.label.toUpperCase()||"Z",n=t.label&&t.label.toUpperCase()||"Z";return a<n?-1:a>n?1:0})),a.setState({tasks:e,displaySortingOptionsMenu:!1,displayCurtain:!1})},a.sortTasksByEndTime=function(){var e=a.state.tasks;e.sort((function(e,t){return e.end||(e.end=p()(new Date).subtract(10,"years"),e.removeEnd=!0),t.end||(t.end=p()(new Date).subtract(10,"years"),t.removeEnd=!0),-1*p()(e.end).diff(p()(t.end))})),e.forEach((function(e){e.removeEnd&&(e.end=void 0)})),a.setState({tasks:e,displaySortingOptionsMenu:!1,displayCurtain:!1})},a.showSortingOptionsMenu=function(e){a.setState({displaySortingOptionsMenu:!0,displayCurtain:window.screen.width>500,tempPosition:[e.clientX,e.clientY]})},a.showDeleteContextMenu=function(e){a.setState({displayDeleteCtxMenu:!0,displayCurtain:window.screen.width>500,tempTask:e.currentTarget.value,tempPosition:[e.clientX,e.clientY]})},a.cancelDelete=function(){a.setState({displayDeleteCtxMenu:!1,displayCurtain:!1})},a.render=function(){var e=0,t=a.state,n=t.curDeadline,l=t.currentURL,r=t.currentURLText,o=t.curTask,i=t.displayAllContextMenus,c=t.displaySortingOptionsMenu,u=t.displayLinkCtxMenu,m=t.displayTaskCtxMenu,h=(t.displayLabelCtxMenu,t.displayDeleteCtxMenu,t.menuOptionsList),k=t.tempPosition,x=t.shouldShowColors,f=Object(d.a)(a),v=f.addToList,L=f.changeProgressState,E=f.changeURLFn,S=f.changeURLTextFn,M=f.closeAllCtxMenus,D=f.endTimeCloseFn,O=f.deadlineChangeFn,F=f.deleteTask,R=f.handleInputChange,U=f.linkCloseFn,A=(f.responseFacebook,f.saveLinkFn),j=f.showDeadlineContextMenu,P=f.showColors,B=f.saveLabel,_=f.cancelSaveLabel,q=f.showSortingOptionsMenu,G=a.props,W=G.loggedin,K=G.userName,$=["secondary","success","danger","warning","info","light","dark"];return s.a.createElement(s.a.Fragment,null,a.state.displayCurtain?s.a.createElement("div",{className:"curtain",onClick:M}):null,s.a.createElement("div",{className:"App"},W?s.a.createElement("div",{className:"checklist-container"},s.a.createElement(T.a,{variant:"secondary",className:"logout-button",onClick:a.logOutFacebook},"Log out"),s.a.createElement("div",{className:"nameHeader"},s.a.createElement("div",{className:"welcomeBar"},"Welcome ",s.a.createElement("span",{className:"userName"},K)),s.a.createElement("div",{className:"toggle-container"},s.a.createElement("label",null,s.a.createElement(b.a,{defaultChecked:!1,onChange:P,value:x}))),s.a.createElement("button",{onClick:q,className:"sortIcon"})),s.a.createElement(X,{shouldShowDashboard:a.state.shouldShowDashboard,showDashboard:a.showDashboard,hideDashboard:a.hideDashboard}),s.a.createElement(Y,{show:a.state.showModal,onHide:a.handleQuillClose,tasks:a.state.tasks,task:a.state.currentTask,userName:a.props.userName,onRichTextChange:a.richTextChange,currentModalTask:a.state.currentModalTask,currentModalTaskEnd:a.state.currentModalTaskEnd,didRichTextChange:a.state.didRichTextChange,richText:a.state.currentRichText,closeFn:a.handleQuillClose}),a.state.shouldShowDashboard?s.a.createElement(H,{tasks:a.state.tasks}):null,a.state.shouldShowDashboard?null:s.a.createElement(s.a.Fragment,null,s.a.createElement(N.a,{className:"mb-3"},s.a.createElement(y.a,{onChange:R,value:o,placeholder:"Add task to do","aria-label":"Add task to do","aria-describedby":"basic-addon2"}),s.a.createElement(N.a.Append,null,s.a.createElement(T.a,{onClick:v,variant:"outline-secondary"},"Add"))),s.a.createElement(I,{cancelDelete:a.cancelDelete,cancelSaveLabel:_,changeFn:O,changeURLFn:E,closeFn:U,curDeadline:n,currentLabel:a.state.currentLabel,currentLabelChange:a.currentLabelChange,currentLabelChangeByClick:a.currentLabelChangeByClick,currentURL:l,currentURLText:r,changeURLTextFn:S,deleteTask:F,displayAllContextMenus:i,displayDeleteCtxMenu:a.state.displayDeleteCtxMenu,displayLabelCtxMenu:a.state.displayLabelCtxMenu,displaySortingOptionsMenu:c,displayTaskCtxMenu:m,displayLinkCtxMenu:u,endTimeCloseFn:D,labels:a.state.labels,linkCloseFn:U,menuOptionsList:i?h:a.state.sortingOptions,saveFn:A,saveLabel:B,selectedLabelIdx:a.state.selectedLabelIdx,selectedLabelIdxChange:a.selectedLabelIdxChange,tempPosition:k,tempTask:a.state.tempTask}),s.a.createElement(C.a,{className:"listOfTasksContainer"},a.state&&a.state.tasks.map((function(t){return s.a.createElement(C.a.Item,{key:e++},a.state.shouldShowColors?s.a.createElement("div",{className:"color-status "+t.progressState}):null,s.a.createElement("div",{className:"task-title",value:t.task,onClick:a.openTaskModal},t.task),t.end?s.a.createElement(s.a.Fragment,null,s.a.createElement("img",{className:"calendar-icon",src:g.a}),s.a.createElement("div",{className:"endTime"},p()(t.end).format("LLLL"))):null,s.a.createElement("button",{onClick:a.showDeleteContextMenu,value:t.task,className:"menuItembutton"}),s.a.createElement("div",{className:"list-link"},s.a.createElement("a",{href:"https://"+t.url,target:"_blank"},t.urlText)),s.a.createElement("button",{onClick:j,value:t.task,className:"menuLinkbutton"}),t.label?s.a.createElement(w.a,{className:"genericLabel",variant:$[t.selectedLabelIdx]},t.label):null,s.a.createElement(Q.a,{defaultActiveKey:"0"},s.a.createElement(V.a,{className:"invisible-card"},s.a.createElement(Q.a.Toggle,{className:"accordion-toggle",eventKey:"1"},s.a.createElement(Z.a,{striped:!0,now:t.progressState?"defined"===t.progressState?10:"inprogress"===t.progressState?60:100:10}),"Status:"," ",t.progressState?t.progressState:"Defined"),s.a.createElement(Q.a.Collapse,{eventKey:"1"},s.a.createElement(V.a.Body,{className:"invisible-card-body"}," ",s.a.createElement("select",{className:"custom-select",value:t.progressState,task:t.task,onChange:L},s.a.createElement("option",{value:"defined",key:"0"},"Defined"),s.a.createElement("option",{value:"inprogress",key:"1"},"In Progress"),s.a.createElement("option",{value:"completed",key:"2"},"Completed")))))))}))))):s.a.createElement(J,{responseFacebook:a.responseFacebook})))},a.state={curDeadline:"",tasks:[],shouldShowColors:!1,tempPosition:[],curTask:"",tempTask:"",displayAllContextMenus:!1,displaySortingOptionsMenu:!1,displayTaskCtxMenu:!1,displayLinkCtxMenu:!1,displayLabelCtxMenu:!1,displayDeleteCtxMenu:!1,displayCurtain:!1,currentURL:"",currentURLText:"",showModal:!1,currentModalTask:{},currentRichText:"",currentLabel:"",didRichTextChange:!1,selectedLabelIdx:0,shouldShowDashboard:!1,labels:new Set,menuOptionsList:[{text:"Close",onClick:function(){a.setState({displayAllContextMenus:!1,displayCurtain:!1})}},{text:"Add deadline",onClick:function(){a.setState({displayAllContextMenus:!1,displayTaskCtxMenu:!0,displayCurtain:!1})}},{text:"Add link",onClick:function(){a.setState({displayAllContextMenus:!1,displayLinkCtxMenu:!0,displayCurtain:!1})}},{text:"Add Label",onClick:function(){var e="";a.state.tasks.forEach((function(t){t.task===a.state.tempTask&&(e=t.label)})),a.setState({displayAllContextMenus:!1,displayLabelCtxMenu:!0,currentLabel:e,displayCurtain:!1})}}],sortingOptions:[{text:"Sort By Label",onClick:function(){a.sortTasksByLabel()}},{text:"Sort By Deadline",onClick:function(){a.sortTasksByEndTime()}}]},a}return Object(u.a)(t,e),t}(s.a.Component),z=Object(K.b)((function(e){return{loggedin:e.loggedin,userName:e.userName}}),(function(e){return{facebookLoginDispatch:function(t){e({type:"facebookLogin",payload:t})}}}))($),ee=a(79);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var te={loggedin:!1,userName:""},ae="facebookLogin",ne=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:te,t=arguments.length>1?arguments[1]:void 0,a=t.type,n=t.payload;return"undefined"===a?e:a===ae?Object.assign({},te,{loggedin:n.loggedin,userName:n.userName}):e},se=Object(ee.b)(ne,window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__());r.a.render(s.a.createElement(K.a,{store:se},s.a.createElement(z,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[203,1,2]]]);
//# sourceMappingURL=main.4b5c3647.chunk.js.map