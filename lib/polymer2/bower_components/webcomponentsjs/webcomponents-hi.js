(function(){'use strict';/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */(b=>{const c=!!('import'in document.createElement('link'));let d=null;!1=='currentScript'in document&&Object.defineProperty(document,'currentScript',{get(){return d||('complete'===document.readyState?null:document.scripts[document.scripts.length-1])},configurable:!0});const f=/(^\/)|(^#)|(^[\w-\d]*:)/,g=/(url\()([^)]*)(\))/g,h=/(@import[\s]+(?!url\())([^;]*)(;)/g,k=/(<link[^>]*)(rel=['|"]?stylesheet['|"]?[^>]*>)/g,o={fixUrls(L,M){L.href&&L.setAttribute('href',o.replaceAttrUrl(L.getAttribute('href'),M)),L.src&&L.setAttribute('src',o.replaceAttrUrl(L.getAttribute('src'),M)),'style'===L.localName&&o.resolveUrlsInStyle(L,M)},fixUrlAttributes(L,M){const N=['action','src','href','url','style'];for(let P,O=0;O<N.length&&(P=N[O]);O++){const Q=L.attributes[P],R=Q&&Q.value;R&&0>R.search(/({{|\[\[)/)&&(Q.value='style'===P?o.resolveUrlsInCssText(R,M):o.replaceAttrUrl(R,M))}},fixUrlsInTemplates(L,M){const N=L.querySelectorAll('template');for(let O=0;O<N.length;O++)o.fixUrlsInTemplate(N[O],M)},fixUrlsInTemplate(L,M){const N=L.content||L,O=N.querySelectorAll('style, form[action], [src], [href], [url], [style]');for(let P=0;P<O.length;P++){const Q=O[P];'style'==Q.localName?o.resolveUrlsInStyle(Q,M):o.fixUrlAttributes(Q,M)}o.fixUrlsInTemplates(N,M)},resolveUrlsInStyle(L,M){L.textContent=o.resolveUrlsInCssText(L.textContent,M)},resolveUrlsInCssText(L,M){let N=o.replaceUrls(L,M,g);return N=o.replaceUrls(N,M,h),N},replaceUrls(L,M,N){return L.replace(N,(O,P,Q,R)=>{let S=Q.replace(/["']/g,'');return M&&(S=o.resolveUrl(S,M)),P+'\''+S+'\''+R})},replaceAttrUrl(L,M){return L&&f.test(L)?L:o.resolveUrl(L,M)},resolveUrl(L,M){if(void 0===o.__workingURL){o.__workingURL=!1;try{const O=new URL('b','http://a');O.pathname='c%20d',o.__workingURL='http://a/c%20d'===O.href}catch(O){}}if(o.__workingURL)return new URL(L,M).href;let N=o.__tempDoc;return N||(N=document.implementation.createHTMLDocument('temp'),o.__tempDoc=N,N.__base=N.createElement('base'),N.head.appendChild(N.__base),N.__anchor=N.createElement('a')),N.__base.href=M,N.__anchor.href=L,N.__anchor.href||L}},p={async:!0,load(L,M,N){if(!L)N('error: href must be specified');else if(L.match(/^data:/)){const O=L.split(','),P=O[0];let Q=O[1];Q=-1<P.indexOf(';base64')?atob(Q):decodeURIComponent(Q),M(Q)}else{const O=new XMLHttpRequest;O.open('GET',L,p.async),O.onload=()=>{let P=O.getResponseHeader('Location');if(P&&0===P.indexOf('/')){const R=location.origin||location.protocol+'//'+location.host;P=R+P}const Q=O.response||O.responseText;304===O.status||0===O.status||200<=O.status&&300>O.status?M(Q,P):N(Q)},O.send()}}},q=/Trident/.test(navigator.userAgent)||/Edge\/\d./i.test(navigator.userAgent),t='link[rel=import]',w='import-disable',x=`link[rel=stylesheet][href][type=${w}]`,y=`${t}, ${x},
    style:not([type]), link[rel=stylesheet][href]:not([type]),
    script:not([type]), script[type="application/javascript"],
    script[type="text/javascript"]`,z='import-dependency',A=`${t}:not(${z})`,B=`script[${z}]`,C=`style[${z}],
    link[rel=stylesheet][${z}]`;const E=L=>{return L.nodeType===Node.ELEMENT_NODE&&'link'===L.localName&&'import'===L.rel},F=(L,M)=>{if(L.__loaded)M&&M();else if('script'===L.localName&&!L.src)L.__loaded=!0,M&&M();else{const N=O=>{L.removeEventListener(O.type,N),L.__loaded=!0,M&&M()};L.addEventListener('load',N),q&&'style'===L.localName||L.addEventListener('error',N)}},G=L=>{H(()=>I(()=>L&&L()))},H=L=>{if('loading'!==document.readyState)L();else{const M=()=>{'loading'!==document.readyState&&(document.removeEventListener('readystatechange',M),L())};document.addEventListener('readystatechange',M)}},I=L=>{let M=document.querySelectorAll(A),N=M.length;if(!N)return void L();for(let Q,O=0,P=M.length;O<P&&(Q=M[O]);O++)F(Q,()=>{0==--N&&L()})},J=L=>{if(c)return L.ownerDocument===document?null:L.ownerDocument;let M=L.__importDoc;if(!M&&L.parentNode){if(M=L.parentNode,'function'==typeof M.closest)M=M.closest(t);else for(;!E(M)&&(M=M.parentNode););L.__importDoc=M}return M},K=(L,M)=>{if('function'==typeof window.CustomEvent)return new CustomEvent(L,M);const N=document.createEvent('CustomEvent');return N.initCustomEvent(L,!!M.bubbles,!!M.cancelable,M.detail),N};if(c){const L=document.querySelectorAll(t);for(let P,N=0,O=L.length;N<O&&(P=L[N]);N++)P.import&&'loading'===P.import.readyState||(P.__loaded=!0);const M=N=>{const O=N.target;E(O)&&(O.__loaded=!0)};document.addEventListener('load',M,!0),document.addEventListener('error',M,!0)}else new class{constructor(){this.documents={},this.inflight=0,this.dynamicImportsMO=new MutationObserver(L=>this.handleMutations(L)),H(()=>{this.dynamicImportsMO.observe(document.head,{childList:!0,subtree:!0}),this.loadImports(document)})}loadImports(L){const M=L.querySelectorAll(t);for(let N=0,O=M.length;N<O;N++)this.loadImport(M[N])}loadImport(L){const M=L.href;if(void 0!==this.documents[M]){const N=this.documents[M];return void(N&&N.__loaded&&(L.import=N,this.fireEventIfNeeded(L)))}this.inflight++,this.documents[M]='pending',p.load(M,(N,O)=>{const P=this.makeDocument(N,O||M);this.documents[M]=P,this.inflight--,this.loadImports(P),this.processImportsIfLoadingDone()},()=>{this.documents[M]=null,this.inflight--,this.processImportsIfLoadingDone()})}makeDocument(L,M){if(!L)return document.createDocumentFragment();q&&(L=L.replace(k,(S,T,U)=>{return-1===S.indexOf('type=')?`${T} type=${w} ${U}`:S}));let N;const O=document.createElement('template');if(O.innerHTML=L,O.content)N=O.content;else for(N=document.createDocumentFragment();O.firstChild;)N.appendChild(O.firstChild);const P=N.querySelector('base');P&&(M=o.replaceAttrUrl(P.getAttribute('href'),M),P.removeAttribute('href'));const Q=N.querySelectorAll(y);let R=0;for(let U,S=0,T=Q.length;S<T&&(U=Q[S]);S++)if(F(U),o.fixUrls(U,M),U.setAttribute(z,''),'script'===U.localName&&!U.src&&U.textContent){const V=R?`-${R}`:'',W=U.textContent+`\n//# sourceURL=${M}${V}.js\n`;U.setAttribute('src','data:text/javascript;charset=utf-8,'+encodeURIComponent(W)),U.textContent='',R++}return o.fixUrlsInTemplates(N,M),N}processImportsIfLoadingDone(){if(!this.inflight){this.dynamicImportsMO.disconnect(),this.flatten(document);let L=!1,M=!1;const N=()=>{M&&L&&(this.dynamicImportsMO.observe(document.head,{childList:!0,subtree:!0}),this.fireEvents())};this.waitForStyles(()=>{M=!0,N()}),this.runScripts(()=>{L=!0,N()})}}flatten(L){const M=L.querySelectorAll(t);for(let P,N=0,O=M.length;N<O&&(P=M[N]);N++){const Q=this.documents[P.href];P.import=Q,Q&&Q.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&(this.documents[P.href]=P,P.readyState='loading',P.import=P,Object.defineProperty(P,'baseURI',{get:()=>P.href,configurable:!0,enumerable:!0}),this.flatten(Q),P.appendChild(Q))}}runScripts(L){const M=document.querySelectorAll(B),N=M.length,O=P=>{if(P<N){const Q=M[P],R=document.createElement('script');Q.removeAttribute(z);for(let S=0,T=Q.attributes.length;S<T;S++)R.setAttribute(Q.attributes[S].name,Q.attributes[S].value);d=R,Q.parentNode.replaceChild(R,Q),F(R,()=>{d=null,O(P+1)})}else L()};O(0)}waitForStyles(L){const M=document.querySelectorAll(C);let N=M.length;if(!N)return void L();const O=q&&!!document.querySelector(x);for(let R,P=0,Q=M.length;P<Q&&(R=M[P]);P++)if(F(R,()=>{R.removeAttribute(z),0==--N&&L()}),O&&R.parentNode!==document.head){const S=document.createElement(R.localName);S.__appliedElement=R,S.setAttribute('type','import-placeholder'),R.parentNode.insertBefore(S,R.nextSibling);let T=J(R);for(;T&&J(T);)T=J(T);T.parentNode!==document.head&&(T=null),document.head.insertBefore(R,T),R.removeAttribute('type')}}fireEvents(){const L=document.querySelectorAll(t);for(let N,M=L.length-1;0<=M&&(N=L[M]);M--)this.fireEventIfNeeded(N)}fireEventIfNeeded(L){if(!L.__loaded){L.__loaded=!0,L.import&&(L.import.readyState='complete');const M=L.import?'load':'error';L.dispatchEvent(K(M,{bubbles:!1,cancelable:!1,detail:void 0}))}}handleMutations(L){for(let M=0;M<L.length;M++){const N=L[M];if(N.addedNodes)for(let O=0;O<N.addedNodes.length;O++){const P=N.addedNodes[O];P&&P.nodeType===Node.ELEMENT_NODE&&(E(P)?this.loadImport(P):this.loadImports(P))}}}};G(()=>document.dispatchEvent(K('HTMLImportsLoaded',{cancelable:!0,bubbles:!0,detail:void 0}))),b.useNative=c,b.whenReady=G,b.importForElement=J})(window.HTMLImports=window.HTMLImports||{}),function(){'use strict';if(customElements&&customElements.polyfillWrapFlushCallback){function c(){if(d){let g=d;return d=null,g(),!0}}let d,f=HTMLImports.whenReady;customElements.polyfillWrapFlushCallback(function(g){d=g,f(c)}),HTMLImports.whenReady=function(g){f(function(){c()?HTMLImports.whenReady(g):g()})}}HTMLImports.whenReady(function(){requestAnimationFrame(function(){window.dispatchEvent(new CustomEvent('WebComponentsReady'))})})}(window.WebComponents),function(){var c=document.createElement('style');c.textContent='body {transition: opacity ease-in 0.2s; } \nbody[unresolved] {opacity: 0; display: block; overflow: hidden; position: relative; } \n';var d=document.querySelector('head');d.insertBefore(c,d.firstChild)}(window.WebComponents)})();
//# sourceMappingURL=webcomponents-hi.js.map