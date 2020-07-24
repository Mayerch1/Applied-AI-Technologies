(this.webpackJsonphephaistos=this.webpackJsonphephaistos||[]).push([[0],{109:function(e,t,a){},196:function(e,t,a){},197:function(e,t,a){},198:function(e,t,a){},200:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(29),s=a.n(o),i=(a(88),a(7)),l=a(8),c=a(6),u=a(10),d=a(9),h=a(74),m=a.n(h),p=(a(89),a(14)),g=a.n(p),v=a(15),f=a(51),b=a(13),E=a(25),y=function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).handleSubmit=n.handleSubmit.bind(Object(c.a)(n)),n.handleLogout=n.handleLogout.bind(Object(c.a)(n)),n.state={benutzername:"",passwort:"",LogInScreen:!0,showPopup:!1},g.a.interceptors.response.use((function(e){return e}),(function(e){return console.log(e),e.toString().includes("401")&&n.handleLogout(),Promise.reject(e)})),n}return Object(l.a)(a,[{key:"updateInputValue",value:function(e){this.setState({benutzername:e.currentTarget.value})}},{key:"updatePasswortValue",value:function(e){this.setState({passwort:e.currentTarget.value})}},{key:"togglePopup",value:function(){this.setState({showPopup:!this.state.showPopup})}},{key:"createXurlcodeFromObject",value:function(e){var t=[];for(var a in e){var n=encodeURIComponent(a),r=encodeURIComponent(e[a]);t.push(n+"="+r)}return t.join("&")}},{key:"handleLogout",value:function(){var e=new CustomEvent("LogIn",{detail:{LogIn:!1},bubbles:!0,cancelable:!0});document.dispatchEvent(e),this.setState({LogInScreen:!0}),this.setState({passwort:""})}},{key:"handleSubmit",value:function(e){var t=this;e.preventDefault();var a={email:this.state.benutzername,password:this.state.passwort},n=this.createXurlcodeFromObject(a);g.a.post("/auth/login",n,{withCredentials:!0}).then((function(a){t.setState({LogInScreen:!1}),e=new CustomEvent("LogIn",{detail:{LogIn:!0},bubbles:!0,cancelable:!0}),document.dispatchEvent(e)})).catch((function(e){t.setState({passwort:""})}))}},{key:"render",value:function(){var e=this;return!0===this.state.LogInScreen?r.a.createElement("div",{className:"Login justify-content-end"},r.a.createElement(b.a,{inline:!0,onSubmit:this.handleSubmit},r.a.createElement(E.a,null,r.a.createElement(b.a.Control,{type:"text",placeholder:"username",value:this.state.benutzername,onChange:function(t){return e.updateInputValue(t)}}),r.a.createElement(b.a.Control,{type:"password",placeholder:"password",value:this.state.passwort,onChange:function(t){return e.updatePasswortValue(t)}}),r.a.createElement(E.a.Append,null,r.a.createElement(f.a,null,r.a.createElement(v.a,{variant:"outline-secondary",type:"submit"},"Login"),r.a.createElement(v.a,{variant:"outline-secondary",onClick:function(){alert("Please contact Github (https://github.com/Mayerch1/Applied-AI-Technologies) maintainer to recover your password.")}},"recover password")))))):r.a.createElement("div",{className:"Login"},r.a.createElement("span",{className:"white"},"You are logged in."),r.a.createElement(f.a,null,r.a.createElement(v.a,{variant:"outline-secondary",onClick:function(){alert("Please contact Github (https://github.com/Mayerch1/Applied-AI-Technologies) maintainer to recover your password.")}},"Do you have trouble?"),r.a.createElement(v.a,{variant:"outline-secondary",onClick:this.handleLogout},"Logout")))}}]),a}(r.a.Component),w=a(17),k=a(37),O=a(31),I=a(24),P=(a(109),a(202)),C=function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(l.a)(a,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"Terms of Service"),r.a.createElement("p",null,"This page is only intendet for development and demonstration purposes. Uploaded images are stored within our database."),r.a.createElement("p",null,'By using this website, you acknowledge that this service is provided "as is", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.'),r.a.createElement("h1",null,"Privacy Policy for Hephaistos"),r.a.createElement("p",null,"At Hephaistos, accessible from www.hephaistos.online, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Hephaistos and how we use it."),r.a.createElement("p",null,"If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us (privacy(at)hephaistos(dot)online or https://github.com/Mayerch1/Applied-AI-Technologies). "),r.a.createElement("h2",null,"Uploaded Images"),r.a.createElement("p",null,"Hephaistos stores images uploaded by the user. We store pictures to provide the service as it is and improve our service. These pictures will never be shared with third parties."),r.a.createElement("h2",null,"Log Files"),r.a.createElement("p",null,"Hephaistos follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information."),r.a.createElement("h2",null,"Cookies and Web Beacons"),r.a.createElement("p",null,"Like any other website, Hephaistos uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information."),r.a.createElement("p",null,'For more general information on cookies, please read the "What Are Cookies" article on ',r.a.createElement("a",{href:"https://www.cookieconsent.com/what-are-cookies/"},"Cookie Consent website"),"."),r.a.createElement("h2",null,"Privacy Policies"),r.a.createElement("p",null,"You may consult this list to find the Privacy Policy for each of the advertising partners of Hephaistos. Our Privacy Policy was created with the help of the ",r.a.createElement("a",{href:"https://www.privacypolicygenerator.org"},"Free Privacy Policy Generator")," and the ",r.a.createElement("a",{href:"https://www.privacypolicyonline.com/privacy-policy-generator/"},"Privacy Policy Generator Online"),"."),r.a.createElement("p",null,"Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on Hephaistos, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit."),r.a.createElement("p",null,"Note that Hephaistos has no access to or control over these cookies that are used by third-party advertisers."),r.a.createElement("h2",null,"Third Party Privacy Policies"),r.a.createElement("p",null,"Hephaistos's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options. "),r.a.createElement("p",null,"You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites. What Are Cookies?"),r.a.createElement("h2",null,"Children's Information"),r.a.createElement("p",null,"Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity."),r.a.createElement("p",null,"Hephaistos does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records."),r.a.createElement("h2",null,"Online Privacy Policy Only"),r.a.createElement("p",null,"This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in Hephaistos. This policy is not applicable to any information collected offline or via channels other than this website."),r.a.createElement("h2",null,"Consent"),r.a.createElement("p",null,"By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions."))}}]),a}(r.a.Component),S=a(76),j=a.n(S),L=function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).state={input:"Is Loading..."},g.a.get("https://raw.githubusercontent.com/Mayerch1/Applied-AI-Technologies/master/Hephaistos/AboutUS.md").then((function(e){n.setState({input:e.data})})),n}return Object(l.a)(a,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(j.a,{source:this.state.input}))}}]),a}(r.a.Component),A=a(19),T=a(77),F=a.n(T),N=a(5),D=function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).handleSubmit=n.handleSubmit.bind(Object(c.a)(n)),n.changePassword=n.changePassword.bind(Object(c.a)(n)),n.NewApiKey=n.NewApiKey.bind(Object(c.a)(n)),n.deleteChatId=n.deleteChatId.bind(Object(c.a)(n)),n.state={email:"",password:"",passwordConfirm:"",name:"",surname:"",chatID:"",apiToken:"",telegramUrl:""},g.a.get("/users/get",{withCredentials:!0}).then((function(e){n.setState(e.data)})),n}return Object(l.a)(a,[{key:"createXurlcodeFromObject",value:function(e){var t=[];for(var a in e){var n=encodeURIComponent(a),r=encodeURIComponent(e[a]);t.push(n+"="+r)}return t.join("&")}},{key:"NewApiKey",value:function(e){var t=this;e.preventDefault(),g.a.get("/users/NewApiToken",{withCredentials:!0}).then((function(e){t.setState(e.data)})).catch((function(e){return console.log(e)}))}},{key:"handleSubmit",value:function(e){e.preventDefault();var t=this.createXurlcodeFromObject(this.state);g.a.put("/users/update",t,{withCredentials:!0}).then((function(e){})).catch((function(e){return console.log(e)}))}},{key:"changePassword",value:function(e){e.preventDefault();var t=this.createXurlcodeFromObject({password:this.state.password,passwordConfirm:this.state.passwordConfirm});g.a.put("/users/changePassword",t,{withCredentials:!0}).then((function(e){})).catch((function(e){return console.log(e)}))}},{key:"deleteChatId",value:function(e){var t=this;e.preventDefault(),g.a.delete("/users/ChatId",{withCredentials:!0}).then((function(e){t.setState({chatID:""}),t.forceUpdate()})).catch((function(e){return console.log(e)}))}},{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement(N.a,null,r.a.createElement(N.a.Header,null,"Settings"),r.a.createElement(N.a.Body,null,r.a.createElement(b.a,{onSubmit:this.handleSubmit},r.a.createElement(A.a,null,r.a.createElement("label",{htmlFor:"email"},"E-Mail-Adresse"),r.a.createElement(b.a.Control,{type:"email",id:"email",placeholder:"email",value:this.state.email,disabled:!0})),r.a.createElement(b.a.Row,null,r.a.createElement(w.a,null,r.a.createElement(A.a,null,r.a.createElement("label",{htmlFor:"name"},"Name"),r.a.createElement(b.a.Control,{id:"name",placeholder:"Name",value:this.state.name,required:!0,onChange:function(t){return e.setState({name:t.currentTarget.value})}}))),r.a.createElement(w.a,null,r.a.createElement(A.a,null,r.a.createElement("label",{htmlFor:"surname"},"Surname"),r.a.createElement(b.a.Control,{id:"surname",placeholder:"Surname",value:this.state.surname,required:!0,onChange:function(t){return e.setState({surname:t.currentTarget.value})}})))),r.a.createElement(A.a,null,r.a.createElement(v.a,{type:"submit"},"Submit"))))),r.a.createElement(N.a,null,r.a.createElement(N.a.Header,null,"Change password"),r.a.createElement(N.a.Body,null,r.a.createElement(b.a,{onSubmit:this.changePassword},r.a.createElement(b.a.Row,null,r.a.createElement(w.a,null,r.a.createElement(A.a,null,r.a.createElement("label",{htmlFor:"password"},"New Password"),r.a.createElement(b.a.Control,{id:"password",type:"password",placeholder:"Password",value:this.state.password,onChange:function(t){return e.setState({password:t.currentTarget.value})}}))),r.a.createElement(w.a,null,r.a.createElement(A.a,null,r.a.createElement("label",{htmlFor:"password"},"Password confirm"),r.a.createElement(b.a.Control,{id:"password_confirm",type:"password",placeholder:"Password confirm",value:this.state.passwordConfirm,onChange:function(t){return e.setState({passwordConfirm:t.currentTarget.value})}})))),r.a.createElement(A.a,null,r.a.createElement(v.a,{type:"submit"},"Submit"))))),r.a.createElement(N.a,null,r.a.createElement(N.a.Header,null,"API Token"),r.a.createElement(N.a.Body,null,r.a.createElement(E.a,null,r.a.createElement(b.a.Control,{id:"token",type:"text",placeholder:"Api-Token",value:this.state.apiToken,disabled:!0}),r.a.createElement("div",{className:"input-group-append"},r.a.createElement(v.a,{onClick:this.NewApiKey},"New Api-Token"))))),r.a.createElement(N.a,null,r.a.createElement(N.a.Header,null,"Telegram"),r.a.createElement(N.a.Body,null,r.a.createElement(b.a,null,r.a.createElement(b.a.Row,null,r.a.createElement(w.a,null,r.a.createElement("label",{htmlFor:"chatId"},"Telegram Url"),r.a.createElement(E.a,null,r.a.createElement(b.a.Control,{id:"token",type:"text",placeholder:"Telegram-Url",value:this.state.telegramUrl,disabled:!0}),r.a.createElement("div",{className:"input-group-append"},r.a.createElement("a",{href:this.state.telegramUrl,target:"_blank",rel:"noopener noreferrer",className:"btn btn-primary"},"open link"))),r.a.createElement("div",{className:"home"},r.a.createElement(F.a,{value:this.state.telegramUrl}))),r.a.createElement(w.a,null,r.a.createElement("label",{htmlFor:"chatId"},"Telegram Chat Id"),r.a.createElement(E.a,null,r.a.createElement(b.a.Control,{id:"chatId",type:"password",readOnly:!0,placeholder:"Telegram Chat Id",value:this.state.chatID}),r.a.createElement("div",{className:"input-group-append"},r.a.createElement(v.a,{onClick:this.deleteChatId,className:"btn btn-danger"},"X")))))))))}}]),a}(r.a.Component),U=a(53),H=a(52),x=a.n(H),R=a(78),B=(a(196),function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).state={hightlight:!1},n.fileInputRef=r.a.createRef(),n.openFileDialog=n.openFileDialog.bind(Object(c.a)(n)),n.onFilesAdded=n.onFilesAdded.bind(Object(c.a)(n)),n.onDragOver=n.onDragOver.bind(Object(c.a)(n)),n.onDragLeave=n.onDragLeave.bind(Object(c.a)(n)),n.onDrop=n.onDrop.bind(Object(c.a)(n)),n}return Object(l.a)(a,[{key:"openFileDialog",value:function(){this.props.disabled||this.fileInputRef.current.click()}},{key:"onFilesAdded",value:function(e){if(!this.props.disabled){var t=e.target.files;if(this.props.onFilesAdded){var a=this.fileListToArray(t);this.props.onFilesAdded(a)}}}},{key:"onDragOver",value:function(e){e.preventDefault(),this.props.disabed||this.setState({hightlight:!0})}},{key:"onDragLeave",value:function(e){this.setState({hightlight:!1})}},{key:"onDrop",value:function(e){if(e.preventDefault(),!this.props.disabed){var t=e.dataTransfer.files;if(this.props.onFilesAdded){var a=this.fileListToArray(t);this.props.onFilesAdded(a)}this.setState({hightlight:!1})}}},{key:"fileListToArray",value:function(e){for(var t=[],a=0;a<e.length;a++)t.push(e.item(a));return t}},{key:"render",value:function(){return r.a.createElement("div",{className:"Dropzone ".concat(this.state.hightlight?"Highlight":""),onDragOver:this.onDragOver,onDragLeave:this.onDragLeave,onDrop:this.onDrop,onClick:this.openFileDialog,style:{cursor:this.props.disabled?"default":"pointer"}},r.a.createElement("input",{ref:this.fileInputRef,className:"FileInput",type:"file",multiple:!0,onChange:this.onFilesAdded}),r.a.createElement("img",{alt:"File",src:"https://img.icons8.com/ios/50/000000/file-filled.png"}),r.a.createElement("span",null,"Dateien hochladen"))}}]),a}(n.Component)),M=a(79),W=a.n(M),q=(a(197),function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).state={},n}return Object(l.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"ProgressBar"},r.a.createElement("div",{className:"Progress",style:{width:this.props.progress+"%"}}))}}]),a}(n.Component)),z=(a(198),function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(i.a)(this,a),n=t.call(this,e),console.log(e),n.state={files:[],uploading:!1,uploadProgress:{},successfullUploaded:!1,showMaskPopup:!1,mask:!1},n.onFilesAdded=n.onFilesAdded.bind(Object(c.a)(n)),n.uploadFiles=n.uploadFiles.bind(Object(c.a)(n)),n.sendRequest=n.sendRequest.bind(Object(c.a)(n)),n.renderActions=n.renderActions.bind(Object(c.a)(n)),n}return Object(l.a)(a,[{key:"onFilesAdded",value:function(e){this.setState((function(t){return{files:t.files.concat(e)}}))}},{key:"uploadFiles",value:function(){var e=Object(R.a)(x.a.mark((function e(){var t,a,n=this;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.setState({uploadProgress:{},uploading:!0}),t=[],this.state.files.forEach((function(e){t.push(n.sendRequest(e))})),e.prev=3,e.next=6,Promise.all(t);case 6:a=new CustomEvent("filesUploaded",{bubbles:!0,cancelable:!0}),document.dispatchEvent(a),this.setState({successfullUploaded:!1,uploading:!1,files:[]}),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(3),this.setState({successfullUploaded:!0,uploading:!1});case 14:case"end":return e.stop()}}),e,this,[[3,11]])})));return function(){return e.apply(this,arguments)}}()},{key:"sendRequest",value:function(e){var t=this;return new Promise((function(a,n){var r=new FormData;r.append("file",e,e.name),g.a.post(t.props.url,r,{withCredentials:!0}).then((function(n){var r=Object(U.a)({},t.state.uploadProgress);r[e.name]={state:"done",percentage:100},t.setState({uploadProgress:r,showMaskPopup:!0,mask:n.data.mask}),a(n)})).catch((function(a){var r=Object(U.a)({},t.state.uploadProgress);r[e.name]={state:"error",percentage:0},t.setState({uploadProgress:r}),n(a)}))}))}},{key:"renderProgress",value:function(e){var t=this.state.uploadProgress[e.name];if(this.state.uploading||this.state.successfullUploaded)return r.a.createElement("div",{className:"ProgressWrapper"},r.a.createElement(q,{progress:t?t.percentage:0}),r.a.createElement("img",{className:"CheckIcon",alt:"done",src:"baseline-check_circle_outline-24px.svg",style:{opacity:t&&"done"===t.state?.5:0}}))}},{key:"renderActions",value:function(){var e=this;return this.state.successfullUploaded?r.a.createElement("button",{onClick:function(){return e.setState({files:[],successfullUploaded:!1})}},"Clear"):r.a.createElement("button",{disabled:this.state.uploading,onClick:this.uploadFiles},"Upload")}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"Upload"},r.a.createElement("span",{className:"Title"},this.props.title),r.a.createElement("div",{className:"Content"},r.a.createElement("div",null,r.a.createElement(B,{onFilesAdded:this.onFilesAdded,disabled:this.state.uploading||this.state.successfullUploaded})),r.a.createElement("div",{className:"Files"},this.state.files.map((function(t){return r.a.createElement("div",{key:t.name,className:"Row"},r.a.createElement("span",{className:"Filename"},t.name),e.renderProgress(t))})))),r.a.createElement("div",{className:"Actions"},this.renderActions()),this.state.showMaskPopup&&!this.state.mask?r.a.createElement("img",{src:"https://slm-assets.secondlife.com/assets/7285225/view_large/andreas.jpg",alt:"Not Passed"}):"",this.state.showMaskPopup&&this.state.mask?r.a.createElement("img",{src:W.a,alt:"passed"}):"")}}]),a}(n.Component)),_=a(80),X=a.n(_),G=a(81),K=function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).handleSubmit=n.handleSubmit.bind(Object(c.a)(n)),n.state={packageId:3},g.a.get("/users/get",{withCredentials:!0}).then((function(e){n.setState(e.data)})),n}return Object(l.a)(a,[{key:"createXurlcodeFromObject",value:function(e){var t=[];for(var a in e){var n=encodeURIComponent(a),r=encodeURIComponent(e[a]);t.push(n+"="+r)}return t.join("&")}},{key:"handleSubmit",value:function(e){var t=this;g.a.put("/users/updatePackage",{packageId:e},{withCredentials:!0}).then((function(a){t.setState({packageId:e})})).catch((function(e){return console.log(e)}))}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"Change HEPHAISTOS subscription:"),r.a.createElement(G.a,null,r.a.createElement(N.a,null,r.a.createElement(N.a.Header,null,"Free"),r.a.createElement(N.a.Body,null,"1 000 Images per day."),r.a.createElement(N.a.Footer,null,0===this.state.packageId?r.a.createElement(v.a,{type:"submit",variant:"success"},"Deactivate"):r.a.createElement(v.a,{type:"submit",onClick:this.handleSubmit.bind(this,0)},"Activate"))),r.a.createElement(N.a,null,r.a.createElement(N.a.Header,null,"Premium"),r.a.createElement(N.a.Body,null,r.a.createElement(N.a.Text,null,"7 200 Images per day. This corresponds to a picture every 5 seconds.",r.a.createElement("p",null,"With this subscription it is possible to connect one camera. "))),r.a.createElement(N.a.Footer,null,1===this.state.packageId?r.a.createElement(v.a,{type:"submit",variant:"success"},"Deactivate"):r.a.createElement(v.a,{type:"submit",onClick:this.handleSubmit.bind(this,1)},"Subsrcibe for 39.99 \u20ac/Month"))),r.a.createElement(N.a,null,r.a.createElement(N.a.Header,null,"Business"),r.a.createElement(N.a.Body,null,"50 000 Images per day."),r.a.createElement(N.a.Footer,null,2===this.state.packageId?r.a.createElement(v.a,{type:"submit",variant:"success"},"Deactivate"):r.a.createElement(v.a,{type:"submit",onClick:this.handleSubmit.bind(this,2)},"Subsrcibe for 59.99 \u20ac/Month"))),r.a.createElement(N.a,null,r.a.createElement(N.a.Header,null,"Security"),r.a.createElement(N.a.Body,null,"No upload Limit ",r.a.createElement("br",null),"Optional Self-Hosted (Docker)"),r.a.createElement(N.a.Footer,null,r.a.createElement(v.a,{href:"mailto:sales@hephaistos.online?subject=Licencing%20request%20for%20HEPAHISTOS",className:"btn  btn-primary"},"Contact Us")))))}}]),a}(r.a.Component),V=function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).state={LogInScreen:!0},n.LogIn=n.LogIn.bind(Object(c.a)(n)),window.addEventListener("LogIn",n.LogIn,!1),n}return Object(l.a)(a,[{key:"LogIn",value:function(e){this.setState({LogInScreen:!e.detail.LogIn})}},{key:"render",value:function(){return"#AboutUs"===window.location.hash?r.a.createElement(L,null):"#privacy"===window.location.hash?r.a.createElement(C,null):this.state.LogInScreen?r.a.createElement("div",{className:"home"},r.a.createElement("h1",null,"Welcome to HEPHAISTOS!"),r.a.createElement("h2",null,"Your digital helper in the Corona era."),r.a.createElement("div",{className:"logo"},r.a.createElement("img",{src:X.a,className:"App-logo col-5",alt:"logo"}))):"#settings"===window.location.hash?r.a.createElement(D,null):"#packages"===window.location.hash?r.a.createElement(K,null):"#provide_data"===window.location.hash?r.a.createElement("div",null,r.a.createElement("h1",null,"Provide your data"),r.a.createElement("br",null),r.a.createElement("p",null,"Abuse can lead to suspension  of your account! By uploading your images you grant us all rights to use them internally for our service."),r.a.createElement(k.a,null,r.a.createElement(N.a,{className:"col col-md-6 uploaddata"},r.a.createElement("div",null,r.a.createElement(z,{url:"/hephaistos/provideDataMask",title:"Mask images"}))),r.a.createElement(N.a,{className:"col col-md-6 uploaddata"},r.a.createElement("div",null,r.a.createElement(z,{url:"/hephaistos/provideDataNoMask",title:"No mask images"}))))):r.a.createElement("div",null,r.a.createElement("h1",null,"Test us! Upload a picture."),r.a.createElement(z,{url:"/hephaistos/detection",title:""}))}}]),a}(r.a.Component),Y=function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(i.a)(this,a),n=t.call(this,e),window.addEventListener("popstate",(function(){return n.forceUpdate()})),n.state={LogInScreen:!0,showPopup:!1},n.LogIn=n.LogIn.bind(Object(c.a)(n)),window.addEventListener("LogIn",n.LogIn,!1),n}return Object(l.a)(a,[{key:"LogIn",value:function(e){this.setState({LogInScreen:!e.detail.LogIn})}},{key:"togglePopup",value:function(){this.setState({showPopup:!this.state.showPopup})}},{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement("script",{src:"https://unpkg.com/react/umd/react.production.min.js",crossOrigin:"true"}),r.a.createElement("script",{src:"https://unpkg.com/react-dom/umd/react-dom.production.min.js",crossOrigin:"true"}),r.a.createElement("script",{src:"https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js",crossOrigin:"true"}),r.a.createElement("script",{src:"https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",crossOrigin:"true"}),r.a.createElement("header",{className:"App-header"},r.a.createElement(O.a,{collapseOnSelect:!0,expand:"lg",bg:"dark",variant:"dark"},r.a.createElement(O.a.Brand,{href:"#home"}," ",r.a.createElement("img",{src:m.a,width:"50px",height:"50px",className:"App-logo",alt:"logo"}),"          "),r.a.createElement(O.a.Toggle,{"aria-controls":"responsive-navbar-nav"}),r.a.createElement(O.a.Collapse,{id:"responsive-navbar-nav"},r.a.createElement(I.a,{className:"mr-auto"},r.a.createElement(I.a.Link,{href:"#home"},"Home"),this.state.LogInScreen?"":r.a.createElement(I.a.Link,{href:"#settings"},"Settings"),this.state.LogInScreen?"":r.a.createElement(I.a.Link,{href:"#packages"},"Pricing"),r.a.createElement(I.a.Link,{href:"#AboutUs"},"About Us"),r.a.createElement(I.a.Link,{href:"#privacy"},"Privacy"),this.state.LogInScreen?"":r.a.createElement(I.a.Link,{href:"#provide_data"},"Provide Dataset")),r.a.createElement("div",null,r.a.createElement(y,null))))),r.a.createElement(k.a,null,r.a.createElement(w.a,null),r.a.createElement(w.a,{xs:6},r.a.createElement("main",null,r.a.createElement(V,null))),r.a.createElement(w.a,null)))}}]),a}(r.a.Component),J=Object(P.a)(Y);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var $=a(203);g.a.defaults.baseURL="https://api.hephaistos.online/api",s.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement($.a,null,r.a.createElement(J,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},74:function(e,t,a){e.exports=a.p+"static/media/logo_small.e82b113e.png"},79:function(e,t,a){e.exports=a.p+"static/media/passed.87acb9c7.png"},80:function(e,t,a){e.exports=a.p+"static/media/logo.45a63ef1.png"},83:function(e,t,a){e.exports=a(200)},88:function(e,t,a){},89:function(e,t,a){}},[[83,1,2]]]);
//# sourceMappingURL=main.9d270ee4.chunk.js.map