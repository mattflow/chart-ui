(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{158:function(e,t,a){"use strict";(function(e){var n=a(26),r=a(29),l=a(40),o=a(39),c=a(41),i=a(42),s=a(0),m=a.n(s),h=a(18),u=a(59),d=a(453),p=a(5),b=a(160),E=a.n(b),g=a(164),v=a.n(g),f=a(161),y=a.n(f),C=a(163),k=a.n(C),w=a(162),O=a.n(w),j=Object(h.createMuiTheme)({palette:{primary:u.blue,secondary:u.pink}}),N=e.browser&&/iPad|iPhone|iPod/.test(navigator.userAgent),x=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(l.a)(this,Object(o.a)(t).call(this,e))).handleNavToggle=function(){a.setState(function(e){return{navOpen:!e.navOpen}})},a.handleNavClick=function(e){return function(){setTimeout(function(){a.props.history.push(e),a.setState({navOpen:!1})},150)}},a.state={navOpen:!1},a}return Object(c.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this.props.classes,t=m.a.createElement("div",null,m.a.createElement("div",{className:e.toolbar}),m.a.createElement(p.d,null),m.a.createElement(p.l,null,m.a.createElement(p.m,{button:!0,key:"Home",onClick:this.handleNavClick("/")},m.a.createElement(p.n,null,m.a.createElement(E.a,null)),m.a.createElement(p.o,{primary:"Home"})),m.a.createElement(p.m,{button:!0,key:"Bar",onClick:this.handleNavClick("/bar")},m.a.createElement(p.n,null,m.a.createElement(y.a,null)),m.a.createElement(p.o,{primary:"Bar"})),m.a.createElement(p.m,{button:!0,key:"Line",onClick:this.handleNavClick("/line")},m.a.createElement(p.n,null,m.a.createElement(O.a,null)),m.a.createElement(p.o,{primary:"Line"})),m.a.createElement(p.m,{button:!0,key:"Pie",onClick:this.handleNavClick("/pie")},m.a.createElement(p.n,null,m.a.createElement(k.a,null)),m.a.createElement(p.o,{primary:"Pie"}))));return m.a.createElement(h.MuiThemeProvider,{theme:j},m.a.createElement(p.c,null),m.a.createElement("div",{className:e.root},m.a.createElement(p.a,{position:"fixed",className:e.appBar},m.a.createElement(p.r,null,m.a.createElement(p.k,{color:"inherit","aria-label":"Open drawer",onClick:this.handleNavToggle,className:e.menuButton},m.a.createElement(v.a,null)),m.a.createElement(p.s,{variant:"h6",color:"inherit",noWrap:!0},"Chart UI"))),m.a.createElement("nav",{className:e.drawer},m.a.createElement(p.j,{smUp:!0,implementation:"css"},m.a.createElement(p.p,{disableBackdropTransition:!N,disableDiscovery:N,variant:"temporary",open:this.state.navOpen,onOpen:this.handleNavToggle,onClose:this.handleNavToggle,classes:{paper:e.drawerPaper},ModalProps:{keepMounted:!0}},t)),m.a.createElement(p.j,{xsDown:!0,implementation:"css"},m.a.createElement(p.e,{variant:"permanent",open:!0,classes:{paper:e.drawerPaper}},t))),m.a.createElement("main",{className:e.content},m.a.createElement("div",{className:e.toolbar}),this.props.children)))}}]),t}(s.Component);t.a=Object(d.a)(Object(h.withStyles)(function(e){return{root:{display:"flex"},drawer:Object(i.a)({},e.breakpoints.up("sm"),{width:240,flexShrink:0}),drawerPaper:{width:240},appBar:Object(i.a)({marginLeft:240},e.breakpoints.up("sm"),{width:"calc(100% - ".concat(240,"px)")}),menuButton:Object(i.a)({marginRight:2*e.spacing.unit},e.breakpoints.up("sm"),{display:"none"}),content:{flexGrow:1,padding:3*e.spacing.unit},toolbar:e.mixins.toolbar}},{withTheme:!0})(x))}).call(this,a(238))},231:function(e,t,a){e.exports=a(450)},236:function(e,t,a){},450:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(19),o=a.n(l),c=(a(236),a(26)),i=a(29),s=a(40),m=a(39),h=a(41),u=a(158),d=a(452),p=a(451),b=a(5);function E(){return r.a.createElement(b.i,{container:!0,spacing:0},r.a.createElement(b.i,{item:!0,xs:12},r.a.createElement(b.s,{variant:"h5",gutterBottom:!0},"Welcome to Chart UI!",r.a.createElement("hr",null)),r.a.createElement(b.s,{variant:"body1",gutterBottom:!0},"Chart UI is a free and easy to use interface for creating great looking charts. Charting programs can be difficult to use and often cost money. This tool helps users of all ages create visually appealing charts and graphs for any purpose. It uses chart.js behind the scenes but provides the user with an easy interface for adding multiple datasets and data points."),r.a.createElement(b.s,{variant:"body1",gutterBottom:!0},"This method of creating graphs is similar to creating a graph by hand, except easier to update, delete and add new data on the fly. Many users will have less headaches with this method than they would entering all the data at once, and generating an all-or-nothing graph afterwards like in Excel."),r.a.createElement(b.s,{variant:"body1",gutterBottom:!0},"You can get started by choosing your chart type in the menu!")))}var g=a(42),v=a(166),f=a.n(v),y=a(18),C=a(103),k=a.n(C),w=a(168),O=a.n(w),j=a(167),N=a.n(j),x=function(){function e(t){Object(c.a)(this,e),this.label=t,this.data=[],this.backgroundColor=[],this.borderColor=[],this.borderWidth=1}return Object(i.a)(e,[{key:"addData",value:function(e){this.data.push(e.value),this.backgroundColor.push(e.backgroundColor),this.borderColor.push(e.borderColor)}}]),e}(),B=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(s.a)(this,Object(m.a)(t).call(this,e))).handleNewDatasetClick=function(){var e=new x("Dataset ".concat(a.state.datasets.length+1)),t=k()(a.state,{datasets:{$push:[e]}});a.setState(t),a.chart.data.datasets.push(e),a.chart.update()},a.handleChartClearClick=function(){a.setState({labels:[],datasets:[]}),a.chart.labels=[],a.chart.data.datasets=[],a.chart.update()},a.handleDatasetLabelChange=function(e){return function(t){var n=k()(a.state,{datasets:Object(g.a)({},e,{label:{$set:t.target.value}})});a.setState(n),a.chart.data.datasets[e].label=t.target.value,a.chart.update()}},a.handleChartDownload=function(){var e=document.createElement("a");e.setAttribute("href",a.chart.toBase64Image()),e.setAttribute("download","barchart.png"),e.style.display="none",document.body.appendChild(e),e.click(),document.body.removeChild(e)},a.state={labels:[],datasets:[]},a.chart=void 0,a}return Object(h.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=document.getElementById("chart").getContext("2d");this.chart=new f.a(e,{type:"bar",data:{labels:[],datasets:[]},options:{scales:{yAxes:[{ticks:{beginAtZero:!0}}]}}})}},{key:"render",value:function(){var e=this,t=this.props.classes;return r.a.createElement(b.i,{container:!0,spacing:16},r.a.createElement(b.i,{item:!0,xs:12},r.a.createElement(b.s,{variant:"h4",gutterBottom:!0},"Bar Chart",r.a.createElement("hr",null))),r.a.createElement(b.i,{item:!0,xs:12,md:4},r.a.createElement("div",{className:t.bottomMargin},r.a.createElement(b.b,{color:"primary",className:t.button,onClick:this.handleNewDatasetClick},"Add Dataset"),r.a.createElement(b.b,{color:"secondary",className:t.button,onClick:this.handleChartClearClick},"Clear Chart")),r.a.createElement("div",{className:t.bottomMargin},this.state.datasets.map(function(a,n){return r.a.createElement(b.f,{key:N.a.generate()},r.a.createElement(b.h,{expandIcon:r.a.createElement(O.a,null)},r.a.createElement(b.q,{type:"text",value:a.label,fullWidth:!0,onChange:e.handleDatasetLabelChange(n)})),r.a.createElement(b.g,null,r.a.createElement(b.b,{color:"primary",className:t.button},"Add Data"),r.a.createElement(b.b,{color:"secondary"},"Remove Dataset")))}))),r.a.createElement(b.i,{item:!0,xs:12,md:8},r.a.createElement("canvas",{id:"chart"}),r.a.createElement(b.r,null,r.a.createElement(b.b,{color:"secondary",onClick:this.handleChartDownload},"Download Chart"))))}}]),t}(n.Component),D=Object(y.withStyles)(function(e){return{button:{marginRight:e.spacing.unit},bottomMargin:{marginBottom:2*e.spacing.unit}}},{withTheme:!0})(B);function T(){return r.a.createElement(b.i,{container:!0},r.a.createElement(b.i,{item:!0,xs:12},r.a.createElement(b.s,{variant:"h5",gutterBottom:!0},"Coming soon!")))}function P(){return r.a.createElement(b.i,{container:!0},r.a.createElement(b.i,{item:!0,xs:12},r.a.createElement(b.s,{variant:"h5",gutterBottom:!0},"Coming soon!")))}var M=function(e){function t(){return Object(c.a)(this,t),Object(s.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement(d.a,null,r.a.createElement(u.a,null,r.a.createElement(p.a,{exact:!0,path:"/",component:E}),r.a.createElement(p.a,{path:"/bar",component:D}),r.a.createElement(p.a,{path:"/line",component:T}),r.a.createElement(p.a,{path:"/pie",component:P})))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(M,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[231,2,1]]]);
//# sourceMappingURL=main.b1f10cb7.chunk.js.map