"use strict";var _regeneratorRuntime=require("D:/Programming/begining/groww-feed-app/node_modules/@babel/runtime/helpers/regeneratorRuntime.js").default,_asyncToGenerator=require("D:/Programming/begining/groww-feed-app/node_modules/@babel/runtime/helpers/asyncToGenerator.js").default,digit="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz#$%*+,-.:;=?@[]^_{|}~",decode83=function(e,r,n){for(var a=0;r<n;)a*=83,a+=digit.indexOf(e[r++]);return a},pow=Math.pow,PI=Math.PI,PI2=2*PI,d=3294.6,e=269.025,sRGBToLinear=function(r){return r>10.31475?pow(r/e+.052132,2.4):r/d},linearTosRGB=function(r){return~~(r>1227e-8?e*pow(r,.416666)-13.025:r*d+1)},signSqr=function(e){return(e<0?-1:1)*e*e},fastCos=function(e){for(e+=PI/2;e>PI;)e-=PI2;var r=1.27323954*e-.405284735*signSqr(e);return.225*(signSqr(r)-r)+r};function decode(e,r,n,a){var t=decode83(e,0,1),o=t%9+1,i=1+~~(t/9),s=o*i,d=(decode83(e,1,2)+1)/13446*(1|a),u=new Float64Array(3*s),c=decode83(e,2,6);u[0]=sRGBToLinear(c>>16),u[1]=sRGBToLinear(c>>8&255),u[2]=sRGBToLinear(255&c);var g=0,f=0,h=0,w=0,m=0,p=0,l=0,v=0,R=0,I=0,G=0,P=0,T=0;for(g=1;g<s;g++)c=decode83(e,4+2*g,6+2*g),u[3*g]=signSqr(~~(c/361)-9)*d,u[3*g+1]=signSqr(~~(c/19)%19-9)*d,u[3*g+2]=signSqr(c%19-9)*d;var B=4*r,S=new Uint8ClampedArray(B*n);for(w=0;w<n;w++)for(P=PI*w/n,h=0;h<r;h++){for(m=0,p=0,l=0,T=PI*h/r,f=0;f<i;f++)for(R=fastCos(P*f),g=0;g<o;g++)v=fastCos(T*g)*R,m+=u[I=3*(g+f*o)]*v,p+=u[I+1]*v,l+=u[I+2]*v;S[G=4*h+w*B]=linearTosRGB(m),S[G+1]=linearTosRGB(p),S[G+2]=linearTosRGB(l),S[G+3]=255}return S}var weakCanvasStore={};self.onmessage=function(){var e=_asyncToGenerator(_regeneratorRuntime().mark((function e(r){var n,a,t,o,i,s,d,u,c,g,f,h;return _regeneratorRuntime().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=r.data,t=n.hash,o=n.width,i=n.height,s=n.punch,d=n.id,n.canvas&&(weakCanvasStore[d]=new WeakRef(n.canvas)),u=null===(a=weakCanvasStore[d])||void 0===a?void 0:a.deref()){e.next=6;break}return e.abrupt("return");case 6:return u.width=o||u.width,u.height=i||u.height,c=u.getContext("2d"),g=decode(t,o,i,s),(f=c.createImageData(o,i)).data.set(g),e.next=14,createImageBitmap(f,0,0,o,i);case 14:h=e.sent,c.drawImage(h,0,0,u.width,u.height);case 16:case"end":return e.stop()}}),e)})));return function(r){return e.apply(this,arguments)}}();