(window["webpackJsonpsolitary-confinement"]=window["webpackJsonpsolitary-confinement"]||[]).push([[0],{33:function(e,t,a){e.exports=a(69)},39:function(e,t,a){},69:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(11),l=a.n(s),c=(a(38),a(39),a(12)),u=a(13),i=a(16),m=a(17),o=a(32),d=a.n(o),f=a(8),h=a.n(f),p=a(14),v=a.n(p),g=a(9),y=a.n(g),b=function(e){Object(m.a)(a,e);var t=Object(i.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).handleClick=function(){e.props.handler&&e.props.handler(e.props.num)},e}return Object(u.a)(a,[{key:"render",value:function(){var e=this.props.nomargin?"":"mx-auto";return this.props.card?r.a.createElement("img",{className:"img-fluid card "+e,src:"/solitary-confinement/cards/"+this.props.card.display+this.props.card.suit+".svg",alt:"Playing card, "+this.props.card.display+" of "+this.props.card.suit,onClick:this.handleClick}):r.a.createElement("img",{className:"img-fluid card "+e,src:"/solitary-confinement/cards/B.svg",alt:"Card back",onClick:this.handleClick})}}]),a}(n.Component),k="S",E="H",w="C",S="D",N=function(e){Object(m.a)(a,e);var t=Object(i.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).resetGame=function(){n.setState({stage:"layer",deck:n.generateShuffledDeck(),foundations:[[{number:1,display:"A",suit:k}],[{number:1,display:"A",suit:E}],[{number:1,display:"A",suit:w}],[{number:1,display:"A",suit:S}]],maneuvers:[[],[],[],[],[],[],[],[]],selectedManeuver:null})},n.generateShuffledDeck=function(){for(var e=[],t=2;t<14;t++){var a=void 0;switch(t){case 11:a="J";break;case 12:a="Q";break;case 13:a="K";break;default:a=t}e.push({number:t,display:a,suit:k}),e.push({number:t,display:a,suit:E}),e.push({number:t,display:a,suit:w}),e.push({number:t,display:a,suit:S})}return n.shuffleDeck(e)},n.shuffleDeck=function(e){var t,a,n;for(t=e.length-1;t>0;t--)a=Math.floor(Math.random()*(t+1)),n=e[t],e[t]=e[a],e[a]=n;return e},n.checkSequence=function(e,t){var a=n.state.foundations[t][0];return a.suit===e.suit&&a.number+1===e.number},n.trySequence=function(e,t){if(n.checkSequence(n.state.maneuvers[e][0],t)){var a=n.state.maneuvers,r=n.state.foundations;r[t].unshift(a[e].shift()),n.setState({maneuvers:a,foundations:r})}},n.tryLayer=function(e){if(n.state.deck.length>0){var t=n.state.deck,a=n.state.maneuvers;a[e].unshift(t.shift()),n.setState({maneuvers:a,deck:t}),0===t.length&&n.setState({stage:"sequence"})}},n.getNumAvailableMoves=function(){for(var e=0,t=0;t<n.state.maneuvers.length;t++)if(0!==n.state.maneuvers[t].length)for(var a=n.state.maneuvers[t][0],r=0;r<n.state.foundations.length;r++)n.checkSequence(a,r)&&e++;return e},n.getGameState=function(){if(n.getNumAvailableMoves())return"winnable";for(var e=0;e<4;e++)if(13!==n.state.foundations[e].length)return"unwinnable";return"won!"},n.handleManeuver=function(e){"layer"===n.state.stage?n.tryLayer(e):"sequence"===n.state.stage&&n.state.maneuvers[e].length&&n.setState({selectedManeuver:e})},n.handleFoundation=function(e){"sequence"===n.state.stage&&null!==n.state.selectedManeuver&&n.trySequence(n.state.selectedManeuver,e)},n.state={stage:"layer",deck:n.generateShuffledDeck(),foundations:[[{number:1,display:"A",suit:k}],[{number:1,display:"A",suit:E}],[{number:1,display:"A",suit:w}],[{number:1,display:"A",suit:S}]],maneuvers:[[],[],[],[],[],[],[],[]],selectedManeuver:null},n}return Object(u.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement(v.a,{className:"game-container",fluid:!0},r.a.createElement(y.a,null,r.a.createElement(h.a,{className:"text-center text-md-left",md:4},r.a.createElement(b,{className:"mx-auto mx-md-0",card:this.state.deck[0]}),r.a.createElement("br",null),r.a.createElement("ul",{className:"list-unstyled mt-1"},r.a.createElement("li",null,"stage: ",this.state.stage),r.a.createElement("li",null,"cards left in deck: ",this.state.deck.length),"sequence"===this.state.stage&&r.a.createElement("li",null,"game state: ",this.getGameState()),null!==this.state.selectedManeuver&&r.a.createElement("li",null,"selected maneuver: ",this.state.selectedManeuver)),r.a.createElement(d.a,{className:"mt-2",onClick:this.resetGame},"Restart Game")),r.a.createElement(h.a,{md:8},r.a.createElement(y.a,null,[0,1,2,3].map((function(t){return r.a.createElement(h.a,{className:"my-2 mt-md-0",key:t,xs:6,md:3},r.a.createElement(b,{card:e.state.foundations[t][0],num:t,handler:function(t){return e.handleFoundation(t)}}))}))),r.a.createElement("hr",{className:"divider"}),r.a.createElement(y.a,{className:"my-2"},[0,1,2,3].map((function(t){return r.a.createElement(h.a,{className:"my-2 mt-md-0",key:t,xs:6,md:3},r.a.createElement(b,{card:e.state.maneuvers[t][0],num:t,handler:function(t){return e.handleManeuver(t)}}))}))),r.a.createElement(y.a,{className:"my-2"},[4,5,6,7].map((function(t){return r.a.createElement(h.a,{className:"my-2 mt-md-0",key:t,xs:6,md:3},r.a.createElement(b,{card:e.state.maneuvers[t][0],num:t,handler:function(t){return e.handleManeuver(t)}}))}))))))}}]),a}(n.Component),M=a(21),A=a.n(M),C=a(20),x=a.n(C),q="https://github.com/malsf21/solitary-confinement";var j=function(){return r.a.createElement("div",null,r.a.createElement(x.a,{bg:"dark",variant:"dark"},r.a.createElement(x.a.Brand,{href:q},r.a.createElement("span",{role:"img","aria-label":"a playing card"},"\ud83c\udccf"),"Solitary Confinement"),r.a.createElement(A.a,{className:"ml-auto"},r.a.createElement(A.a.Link,{href:q,target:"_blank",rel:"noopener noreferrer"},"Source Code"))),r.a.createElement(v.a,null,r.a.createElement(N,null),r.a.createElement("p",{className:"text-center mt-2"},"made by ",r.a.createElement("a",{href:"https://matthewwang.me",target:"_blank",rel:"noopener noreferrer"},"matt wang")," with react and react-bootstrap | cards by ",r.a.createElement("a",{href:"https://www.me.uk/cards/",target:"_blank",rel:"noopener noreferrer"},"Adrian Kennard"))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(j,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[33,1,2]]]);
//# sourceMappingURL=main.eacecb71.chunk.js.map