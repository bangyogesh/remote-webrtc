import{f as e}from"./vendor.2356b38d.js";!function(e=".",t="__import__"){try{self[t]=new Function("u","return import(u)")}catch(n){const o=new URL(e,location),a=e=>{URL.revokeObjectURL(e.src),e.remove()};self[t]=e=>new Promise(((n,c)=>{const s=new URL(e,o);if(self[t].moduleMap[s])return n(self[t].moduleMap[s]);const d=new Blob([`import * as m from '${s}';`,`${t}.moduleMap['${s}']=m;`],{type:"text/javascript"}),i=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(d),onerror(){c(new Error(`Failed to import: ${e}`)),a(i)},onload(){n(self[t].moduleMap[s]),a(i)}});document.head.appendChild(i)})),self[t].moduleMap={}}}("/remote-webrtc/assets/");const t={apiKey:"AIzaSyBwKaw1gp8Qr1_NFEbm5_-m_2-M5_JqvMo",authDomain:"webrtc-81ec9.firebaseapp.com",projectId:"webrtc-81ec9",storageBucket:"webrtc-81ec9.appspot.com",messagingSenderId:"105366870931",appId:"1:105366870931:web:7af0858755e09250496666"};e.apps.length||e.initializeApp(t);const n=e.firestore(),o=new RTCPeerConnection({iceServers:[{urls:["stun:stun1.l.google.com:19302","stun:stun2.l.google.com:19302"]}],iceCandidatePoolSize:10});let a=null,c=null;const s=document.getElementById("webcamButton"),d=document.getElementById("webcamVideo"),i=document.getElementById("callButton"),r=document.getElementById("callInput"),l=document.getElementById("answerButton"),m=document.getElementById("remoteVideo"),p=document.getElementById("hangupButton");document.getElementById("sharedICEButton");const u=document.getElementById("sharedICE");s.onclick=async()=>{a=await navigator.mediaDevices.getUserMedia({video:!0,audio:!0}),c=new MediaStream,a.getTracks().forEach((e=>{o.addTrack(e,a)})),o.ontrack=e=>{e.streams[0].getTracks().forEach((e=>{c.addTrack(e)}))},d.srcObject=a,m.srcObject=c,i.disabled=!1,l.disabled=!1,s.disabled=!0},i.onclick=async()=>{const e=n.collection("calls").doc(),t=e.collection("offerCandidates"),a=e.collection("answerCandidates");r.value=e.id,o.onicecandidate=e=>{e.candidate&&t.add(e.candidate.toJSON()),console.log(`OnICECandidate event: ${JSON.stringify(e)}`)};const c=await o.createOffer();await o.setLocalDescription(c);const s={sdp:c.sdp,type:c.type};console.log(`SDP document details: ${JSON.stringify(s)}`),r.value=JSON.stringify(s),await e.set({offer:s}),e.onSnapshot((e=>{const t=e.data();if(console.log(`onSnapshot data in DB: ${JSON.stringify(t)}`),!o.currentRemoteDescription&&(null==t?void 0:t.answer)){const e=new RTCSessionDescription(t.answer);o.setRemoteDescription(e)}})),a.onSnapshot((e=>{e.docChanges().forEach((e=>{if("added"===e.type){const t=new RTCIceCandidate(e.doc.data());o.addIceCandidate(t)}}))})),p.disabled=!1},l.onclick=async()=>{console.log(" Answer button clicked");const e=u.value;await o.setRemoteDescription(new RTCSessionDescription(e));const t=await o.createAnswer();await o.setLocalDescription(t),console.log(`answerDescription: ${JSON.stringify(t)}`);const n={type:t.type,sdp:t.sdp};await callDoc.update({answer:n}),offerCandidates.onSnapshot((e=>{e.docChanges().forEach((e=>{if(console.log(`change is : ${JSON.stringify(e)}`),"added"===e.type){let t=e.doc.data();o.addIceCandidate(new RTCIceCandidate(t))}}))}))};
