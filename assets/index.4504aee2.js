import{f as e}from"./vendor.2356b38d.js";!function(e=".",t="__import__"){try{self[t]=new Function("u","return import(u)")}catch(o){const n=new URL(e,location),a=e=>{URL.revokeObjectURL(e.src),e.remove()};self[t]=e=>new Promise(((o,c)=>{const d=new URL(e,n);if(self[t].moduleMap[d])return o(self[t].moduleMap[d]);const s=new Blob([`import * as m from '${d}';`,`${t}.moduleMap['${d}']=m;`],{type:"text/javascript"}),i=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(s),onerror(){c(new Error(`Failed to import: ${e}`)),a(i)},onload(){o(self[t].moduleMap[d]),a(i)}});document.head.appendChild(i)})),self[t].moduleMap={}}}("/remote-webrtc/assets/");const t={apiKey:"AIzaSyBwKaw1gp8Qr1_NFEbm5_-m_2-M5_JqvMo",authDomain:"webrtc-81ec9.firebaseapp.com",projectId:"webrtc-81ec9",storageBucket:"webrtc-81ec9.appspot.com",messagingSenderId:"105366870931",appId:"1:105366870931:web:7af0858755e09250496666"};e.apps.length||e.initializeApp(t);const o=e.firestore(),n=new RTCPeerConnection({iceServers:[{urls:["stun:stun1.l.google.com:19302","stun:stun2.l.google.com:19302"]}],iceCandidatePoolSize:10});let a=null,c=null;const d=document.getElementById("webcamButton"),s=document.getElementById("webcamVideo"),i=document.getElementById("callButton"),l=document.getElementById("callInput"),r=document.getElementById("answerButton"),m=document.getElementById("remoteVideo"),p=document.getElementById("hangupButton");document.getElementById("sharedICEButton");const u=document.getElementById("sharedICE");d.onclick=async()=>{a=await navigator.mediaDevices.getUserMedia({video:!0,audio:!0}),c=new MediaStream,a.getTracks().forEach((e=>{n.addTrack(e,a)})),n.ontrack=e=>{e.streams[0].getTracks().forEach((e=>{c.addTrack(e)}))},s.srcObject=a,m.srcObject=c,i.disabled=!1,r.disabled=!1,d.disabled=!0},i.onclick=async()=>{const e=o.collection("calls").doc(),t=e.collection("offerCandidates"),a=e.collection("answerCandidates");l.value=e.id,n.onicecandidate=e=>{e.candidate&&t.add(e.candidate.toJSON()),console.log(`OnICECandidate event: ${JSON.stringify(e)}`),u.value=u.value+JSON.stringify(e.candidate)};const c=await n.createOffer();await n.setLocalDescription(c);const d={sdp:c.sdp,type:c.type};console.log(`SDP document details: ${JSON.stringify(d)}`),await e.set({offer:d}),e.onSnapshot((e=>{const t=e.data();if(console.log(`onSnapshot data in DB: ${JSON.stringify(t)}`),!n.currentRemoteDescription&&(null==t?void 0:t.answer)){const e=new RTCSessionDescription(t.answer);n.setRemoteDescription(e)}})),a.onSnapshot((e=>{e.docChanges().forEach((e=>{if("added"===e.type){const t=new RTCIceCandidate(e.doc.data());n.addIceCandidate(t)}}))})),p.disabled=!1},r.onclick=async()=>{console.log(" Answer button clicked");const e=l.value,t=o.collection("calls").doc(e),a=t.collection("answerCandidates"),c=t.collection("offerCandidates");n.onicecandidate=e=>{e.candidate&&a.add(e.candidate.toJSON()),console.log(`OnICECandidate event: ${JSON.stringify(e)}`)},console.log("Trying to get the offer call data");const d=(await t.get()).data();console.log(`Call data: ${JSON.stringify(d)}`);const s=d.offer;await n.setRemoteDescription(new RTCSessionDescription(s));const i=await n.createAnswer();await n.setLocalDescription(i),console.log(`answerDescription: ${JSON.stringify(i)}`);const r={type:i.type,sdp:i.sdp};await t.update({answer:r}),c.onSnapshot((e=>{e.docChanges().forEach((e=>{if(console.log(`change is : ${JSON.stringify(e)}`),"added"===e.type){let t=e.doc.data();n.addIceCandidate(new RTCIceCandidate(t))}}))}))};
