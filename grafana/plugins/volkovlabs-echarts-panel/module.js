/*! For license information please see module.js.LICENSE.txt */
define(["@grafana/data","@grafana/runtime","@grafana/ui","react","@emotion/css","react-dom","redux","react-redux","@emotion/react"],((e,t,n,r,i,o,a,s,l)=>(()=>{var u={468:(e,t,n)=>{"use strict";var r=n(696),i=n(568),o=n(10),a=n(464);const s=e=>({rootOutline:r.css`
      border: 1px solid ${e.colors.border.weak};
      background-color: ${e.colors.background.primary};
    `,header:r.css`
      padding: ${e.spacing(.5,.5)};
      min-height: ${e.spacing(4)};
      display: flex;
      align-items: center;
      justify-content: flex-start;
      white-space: nowrap;

      &:focus {
        outline: none;
      }
    `,headerSolid:r.css`
      border-radius: ${e.shape.radius?.default};
      background: ${e.colors.background.secondary};
    `,title:r.css`
      font-weight: ${e.typography.fontWeightBold};
      margin: ${e.spacing(0,.5)};
      overflow: hidden;
      text-overflow: ellipsis;
    `,collapseIcon:r.css`
      margin-left: ${e.spacing(.5)};
      color: ${e.colors.text.disabled};
    `,actions:r.css`
      margin-left: auto;
      display: flex;
      align-items: center;
    `});var l=(e=>(e.SELECT="select",e.SLIDER="slider",e.GROUP="group",e.CUSTOM="custom",e.COLOR="color",e.RADIO="radio",e.HIDDEN="hidden",e.INPUT="input",e.NUMBER_INPUT="numberInput",e))(l||{});i.stylesFactory(((e,t,n=!1)=>{const{spacing:i}=e,o=e.colors.border.strong,s=e.colors.primary.main,l=e.colors.primary.main,u=`box-shadow: 0px 0px 0px 6px ${e.colors.primary.transparent}`;return{container:r.css({width:"100%",margin:t?"inherit":i(1,3,1,1),paddingBottom:t&&n?e.spacing(1):"inherit",height:t?"auto":"100%"}),slider:r.css`
      .rc-slider {
        display: flex;
        flex-grow: 1;
        margin-left: 7px; // half the size of the handle to align handle to the left on 0 value
      }
      .rc-slider-mark {
        top: ${e.spacing(1.75)};
      }
      .rc-slider-mark-text {
        color: ${e.colors.text.disabled};
        font-size: ${e.typography.bodySmall.fontSize};
      }
      .rc-slider-mark-text-active {
        color: ${e.colors.text.primary};
      }
      .rc-slider-handle {
        border: none;
        background-color: ${l};
        box-shadow: ${e.shadows.z1};
        cursor: pointer;
        opacity: 1;
      }

      .rc-slider-handle:hover,
      .rc-slider-handle:active,
      .rc-slider-handle-click-focused:focus {
        ${u};
      }

      // The triple class names is needed because that's the specificity used in the source css :(
      .rc-slider-handle-dragging.rc-slider-handle-dragging.rc-slider-handle-dragging,
      .rc-slider-handle:focus-visible {
        box-shadow: 0 0 0 5px ${e.colors.text.primary};
      }

      .rc-slider-dot,
      .rc-slider-dot-active {
        background-color: ${e.colors.text.primary};
        border-color: ${e.colors.text.primary};
      }

      .rc-slider-track {
        background-color: ${s};
      }
      .rc-slider-rail {
        background-color: ${o};
        cursor: pointer;
      }
    `,tooltip:a.css`
      body {
        .rc-slider-tooltip {
          cursor: grab;
          user-select: none;
          z-index: ${e.zIndex.tooltip};
        }

        .rc-slider-tooltip-inner {
          color: ${e.colors.text.primary};
          background-color: transparent !important;
          border-radius: 0;
          box-shadow: none;
        }

        .rc-slider-tooltip-placement-top .rc-slider-tooltip-arrow {
          display: none;
        }

        .rc-slider-tooltip-placement-top {
          padding: 0;
        }
      }
    position: relative;
      margin-bottom: ${e.spacing(2)};
    `,header:I7.css`
      label: Header;
      padding: ${e.spacing(.5,.5)};
      border-radius: ${e.shape.borderRadius(1)};
      background: ${e.colors.background.secondary};
      min-height: ${e.spacing(4)};
      display: grid;
      grid-template-columns: minmax(100px, max-content) min-content;
      align-items: center;
      justify-content: space-between;
      white-space: nowrap;

      &:focus {
        outline: none;
      }
    `,column:I7.css`
      label: Column;
      display: flex;
      align-items: center;
    `,dragIcon:I7.css`
      cursor: grab;
      color: ${e.colors.text.disabled};
      margin: ${e.spacing(0,.5)};
      &:hover {
        color: ${e.colors.text};
      }
    `,collapseIcon:I7.css`
      margin-left: ${e.spacing(.5)};
      color: ${e.colors.text.disabled};
    `,titleWrapper:I7.css`
      display: flex;
      align-items: center;
      flex-grow: 1;
      cursor: pointer;
      overflow: hidden;
      margin-right: ${e.spacing(.5)};
    `,title:I7.css`
      font-weight: ${e.typography.fontWeightBold};
      color: ${e.colors.text.secondary};
      margin-left: ${e.spacing(.5)};
      overflow: hidden;
      text-overflow: ellipsis;
    `,item:I7.css`
      margin-bottom: ${e.spacing(1)};
    `});function Bne(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function zne(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),r.forEach((function(t){Bne(e,t,n[t])}))}return e}function Fne(e,t){return t=null!=t?t:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):function(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n.push.apply(n,r)}return n}(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))})),e}const Vne=({value:e,onChange:t,data:n})=>{const r=(0,x.useStyles2)(kne),[i,o]=(0,b.useState)(e),[a,s]=(0,b.useState)(null),l=(0,b.useCallback)((e=>{o(e),t(e)}),[t]),u=(0,b.useCallback)((e=>{e.destination&&l(F7(i,e.source.index,e.destination.index))}),[i,l]),c=(0,b.useMemo)((()=>n.reduce(((e,t)=>e.concat(t.fields.map((e=>({value:`${t.refId}:${e.name}`,fieldName:e.name,label:`${t.refId?`${t.refId}:`:""}${e.name}`,source:t.refId}))))),[]).filter((e=>!i.some((t=>t.name===e.fieldName&&t.source===e.source))))),[i,n]),h=(0,b.useCallback)((()=>{a&&(l([...i,{name:a.name,source:a.source}]),s(null))}),[i,a,l]);return w().createElement("div",{"data-testid":ie,className:r.root},w().createElement($te,{onDragEnd:u},w().createElement(Rne,{droppableId:"dataset"},(e=>w().createElement("div",Fne(zne({},e.droppableProps),{ref:e.innerRef}),i.map(((e,t)=>w().createElement(pne,{key:V7(e),draggableId:V7(e),index:t},((t,n)=>{return w().createElement("div",Fne(zne({ref:t.innerRef},t.draggableProps,t.dragHandleProps),{style:(n.isDragging,o=t.draggableProps.style,zne({},o)),className:r.item,"data-testid":te(V7(e))}),w().createElement("div",{className:r.header},w().createElement("div",{className:r.column},e.name&&w().createElement("div",{className:r.titleWrapper},w().createElement("div",{className:(0,I7.cx)(r.title)},e.source?`${e.source}:`:"",e.name))),w().createElement("div",{className:r.column},w().createElement(x.IconButton,{name:"trash-alt","aria-label":ee,onClick:()=>l(i.filter((t=>V7(t)!==V7(e))))}),w().createElement("div",t.dragHandleProps,w().createElement(x.Icon,{title:"Drag and drop to reorder",name:"draggabledots",size:"lg",className:r.dragIcon})))));var o})))),e.placeholder)))),w().createElement(x.InlineFieldRow,{"data-testid":ne},w().createElement(x.InlineField,{label:"New Item",grow:!0},w().createElement(x.Select,{options:c,value:(null==a?void 0:a.value)||null,"aria-label":re,onChange:e=>{s({value:e.value,source:e.source,name:e.fieldName})}})),w().createElement(x.Button,{icon:"plus",title:"Add Item",disabled:!a,onClick:h,"data-testid":Q},"Add")))};var Gne=h(468);function Hne(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Une(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),r.forEach((function(t){Hne(e,t,n[t])}))}return e}function Wne(e,t){return t=null!=t?t:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):function(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n.push.apply(n,r)}return n}(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))})),e}const jne=({value:e,onChange:t,dataset:n})=>{var r,i;return w().createElement(w().Fragment,null,w().createElement(x.InlineFieldRow,null,w().createElement(x.InlineField,{label:"ID",labelWidth:10,grow:!0},w().createElement(x.Input,{value:e.id,onChange:n=>{t(Wne(Une({},e),{id:n.currentTarget.value}))},"data-testid":Y})),w().createElement(x.InlineField,{label:"Type",labelWidth:10,grow:!0},w().createElement(x.Select,{value:e.type,options:ae,onChange:n=>{n.value&&t(H7(e,n.value))},"aria-label":K}))),w().createElement(x.InlineFieldRow,null,w().createElement(x.InlineField,{label:"Name",labelWidth:10,grow:!0},w().createElement(x.Input,{value:e.name,onChange:n=>{t(Wne(Une({},e),{name:n.currentTarget.value}))},"data-testid":q}))),e.type===oe.LINE&&w().createElement(w().Fragment,null,w().createElement(x.InlineFieldRow,null,w().createElement(x.InlineField,{label:"Encode Y",labelWidth:10,grow:!0},w().createElement(x.Select,{value:null===(r=e.encode)||void 0===r?void 0:r.y,options:n.map((e=>({value:V7(e),label:V7(e)}))),isMulti:!0,isClearable:!0,onChange:n=>{const r=n;t(Wne(Une({},e),{encode:Wne(Une({},e.encode),{y:r.map((e=>e.value))})}))},"aria-label":J}))),w().createElement(x.InlineFieldRow,null,w().createElement(x.InlineField,{label:"Encode X",labelWidth:10,grow:!0},w().createElement(x.Select,{value:null===(i=e.encode)||void 0===i?void 0:i.x,options:n.map((e=>({value:V7(e),label:V7(e)}))),isMulti:!0,isClearable:!0,onChange:n=>{const r=n;t(Wne(Une({},e),{encode:Wne(Une({},e.encode),{x:r.map((e=>e.value))})}))},"aria-label":$})))))};function Xne(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Zne(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),r.forEach((function(t){Xne(e,t,n[t])}))}return e}function Yne(e,t){return t=null!=t?t:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):function(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n.push.apply(n,r)}return n}(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))})),e}const qne=({value:e,onChange:t,dataset:n})=>{const r=(e=>({item:I7.css`
      margin-bottom: ${e.spacing(1)};
    `,dragIcon:I7.css`
      cursor: grab;
      color: ${e.colors.text.disabled};
      margin: ${e.spacing(0,.5)};
      &:hover {
        color: ${e.colors.text};
      }
    `,removeButton:I7.css`
      color: ${e.colors.text.secondary};
    `}))((0,x.useTheme2)()),[i,o]=(0,b.useState)(e),[a,s]=(0,b.useState)(""),[l,u]=(0,b.useState)({}),c=(0,b.useCallback)((e=>{o(e),t(e)}),[t]),h=(0,b.useCallback)((e=>{e.destination&&c(F7(i,e.source.index,e.destination.index))}),[i,c]),d=(0,b.useCallback)((e=>{u((t=>Yne(Zne({},t),{[e.uid]:!t[e.uid]})))}),[]),p=(0,b.useCallback)((()=>{s("");const e=H7({id:a,name:"",uid:R7()},oe.LINE);c(i.concat(e)),d(e)}),[i,a,c,d]),f=(0,b.useCallback)((e=>{c(i.map((t=>t.uid===e.uid?e:t)))}),[i,c]),g=(0,b.useMemo)((()=>i.some((e=>e.id===a))),[i,a]);return w().createElement("div",{"data-testid":G},w().createElement($te,{onDragEnd:h},w().createElement(Rne,{droppableId:"series-editor"},(e=>w().createElement("div",Yne(Zne({},e.droppableProps),{ref:e.innerRef}),i.map(((e,t)=>w().createElement(pne,{key:e.uid,draggableId:e.uid,index:t},((t,o)=>{return w().createElement("div",Yne(Zne({ref:t.innerRef},t.draggableProps),{style:(o.isDragging,a=t.draggableProps.style,Zne({},a)),className:r.item}),w().createElement(Gne.aS,{headerTestId:W(e.id),contentTestId:j(e.id),isOpen:l[e.uid],onToggle:()=>d(e),title:w().createElement(w().Fragment,null,e.name," [",e.id,"]"),actions:w().createElement(w().Fragment,null,w().createElement(x.Button,{icon:"trash-alt",variant:"secondary",fill:"text",size:"sm",className:r.removeButton,onClick:()=>{c(i.filter((t=>t.uid!==e.uid)))},"data-testid":U}),w().createElement("div",t.dragHandleProps,w().createElement(x.Icon,{name:"draggabledots",className:r.dragIcon})))},w().createElement(jne,{value:e,onChange:f,dataset:n})));var a})))),e.placeholder)))),w().createElement(x.InlineFieldRow,{"data-testid":X},w().createElement(x.InlineField,{label:"New Series",grow:!0,invalid:g,error:"Series with the same id already exists."},w().createElement(x.Input,{placeholder:"Unique Id",value:a,onChange:e=>s(e.currentTarget.value),"data-testid":Z})),w().createElement(x.Button,{icon:"plus",title:"Add Series",disabled:!a||g,onClick:p,"data-testid":H},"Add")))};function Kne(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function $ne(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),r.forEach((function(t){Kne(e,t,n[t])}))}return e}function Jne(e,t){return t=null!=t?t:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):function(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n.push.apply(n,r)}return n}(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))})),e}const Qne=({value:e,onChange:t,context:n})=>w().createElement(w().Fragment,null,w().createElement(x.Label,{description:"Fields which values will be used for the dataset."},"Dataset Items"),w().createElement(Vne,{value:e.dataset,onChange:n=>{t(Jne($ne({},e),{dataset:n}))},data:n.data}),w().createElement(x.Label,null,"Series"),w().createElement(qne,{value:e.series,onChange:n=>{t(Jne($ne({},e),{series:n}))},dataset:e.dataset}));function ere(){return ere=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},ere.apply(this,arguments)}const tre=new y.PanelPlugin((({options:e,data:t,width:n,height:r,replaceVariables:i,eventBus:o})=>{const a=(0,b.useRef)(null),[s,l]=(0,b.useState)(),[u,c]=(0,b.useState)(),[d,p]=(0,b.useState)(),f=(0,x.useTheme2)(),m=(0,x.useStyles2)(U7),S=(0,_.getAppEvents)(),M=e=>S.publish({type:y.AppEvents.alertSuccess.name,payload:e}),T=e=>S.publish({type:y.AppEvents.alertError.name,payload:e}),C=D7(),I=()=>{if(!a.current)return;s&&(s.clear(),s.dispose()),p(void 0);let t=f.isDark?"dark":void 0;if(e.themeEditor.name===v.CUSTOM)try{const n=JSON.parse(e.themeEditor.config);t=v.CUSTOM,jx(t,n)}catch(e){p(e instanceof Error?e:new Error(`${e}`))}l(zx(a.current,t,{renderer:e.renderer}))};return(0,b.useEffect)((()=>{I()}),[e.renderer,e.map,e.themeEditor.name,e.themeEditor.config]),(0,b.useEffect)((()=>{null==s||s.resize()}),[n,r]),(0,b.useEffect)((()=>{let n=()=>{};if(!s)return n;if(s.off("restore"),s.on("restore",(()=>{I()})),t.state&&![y.LoadingState.Done,y.LoadingState.Streaming].includes(t.state))return n;c(void 0);try{const r=e.editorMode===A.VISUAL?new Function("context",e.visualEditor.code):new Function("data","theme","echartsInstance","echarts","ecStat","replaceVariables","eventBus","locationService","notifySuccess","notifyError","context",e.getOption);switch(e.map){case N.NONE:break;case N.JSON:(()=>{const e=h(932);e.keys().map((t=>{const n=t.match(/\.\/([0-9a-zA-Z_]*)\.json/);n&&!sb(n[1])&&ab(n[1],e(t))}))})();break;case N.GMAP:(e=>{if("object"==typeof google&&"object"==typeof google.maps)return;const t=document.createElement("script");t.type="text/javascript",t.src=`https://maps.googleapis.com/maps/api/js?key=${e.key}&callback=${e.callback}`,document.body.appendChild(t)})(e.google);break;case N.BMAP:(e=>{if(window.BMap)return;const t=document.createElement("script");t.type="text/javascript",t.src=`https://api.map.baidu.com/api?v=3.0&ak=${e.key}&callback=${e.callback}`,document.body.appendChild(t)})(e.baidu);break;case N.AMAP:(e=>{if(window.AMap)return;const t=document.createElement("script");t.type="text/javascript",t.src=`https://webapi.amap.com/maps?v=1.4.15&ak=${e.key}&plugin=${e.plugin}`,document.body.appendChild(t)})(e.gaode)}const a={grafana:{theme:f,replaceVariables:i,eventBus:o,locationService:_.locationService,notifySuccess:M,notifyError:T,refresh:()=>S.publish({type:"variables-changed",payload:{refreshAll:!0}})},panel:{data:t,chart:s},echarts:g,ecStat:C},l=e.editorMode===A.VISUAL?r(function(e,t){return t=null!=t?t:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):function(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n.push.apply(n,r)}return n}(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))})),e}(j7({},a),{editor:{dataset:{source:G7(t.series,e.visualEditor.dataset)},series:e.visualEditor.series}})):r(t,f,s,g,C,i,o,_.locationService,M,T,a);let u,c={notMerge:!0};if(l&&"version"in l&&2===l.version){u=l.option||{},c=l.config||c;const e=l.unsubscribe;"function"==typeof e&&(n=()=>{e()})}else u=l||{};s.setOption(j7({backgroundColor:"transparent"},u),c)}catch(e){c(e instanceof Error?e:new Error(`${e}`))}return n}),[s,e.getOption,t,e.visualEditor,e.editorMode]),w().createElement(w().Fragment,null,(null==u?void 0:u.message)&&w().createElement(x.Alert,{"data-testid":z,severity:"warning",title:"ECharts Execution Error"},u.message),(null==u?void 0:u.stack)&&w().createElement("pre",null,u.stack),(null==d?void 0:d.message)&&w().createElement(x.Alert,{"data-testid":F,severity:"warning",title:"ECharts Custom Theme Error"},d.message),w().createElement("div",{ref:a,"data-testid":B,className:(0,I7.cx)(m.wrapper,I7.css`
            width: ${n}px;
            height: ${r}px;
          `)}))})).setNoPadding().setMigrationHandler((e=>{const t=ere({},function(e){if(null==e)throw new TypeError("Cannot destructure "+e);return e}(e.options));return t.editorMode||(t.editorMode=A.CODE),t})).setPanelOptions((e=>{const t=e=>e.editorMode!==A.VISUAL,n=e=>e.editorMode===A.VISUAL;return e.addRadio({path:"renderer",name:"Renderer",settings:{options:M},defaultValue:k.renderer}).addRadio({path:"map",name:"Maps",settings:{options:R},defaultValue:k.map}).addRadio({path:"themeEditor.name",name:"Theme",settings:{options:S},defaultValue:v.DEFAULT}),e.addTextInput({path:"baidu.key",name:"Access Key",description:"Set Access Key to use Baidu Maps. You can get it from https://lbsyun.baidu.com/apiconsole/key#/home",defaultValue:k.baidu.key,showIf:e=>e.map===N.BMAP,category:["Baidu"]}).addTextInput({path:"baidu.callback",name:"Callback",description:"Name of the Callback function.",defaultValue:k.baidu.callback,showIf:e=>e.map===N.BMAP,category:["Baidu"]}),e.addTextInput({path:"gaode.key",name:"Access Key",description:"Set Access Key to use Gaode Maps. You can get it from https://console.amap.com/dev/key/app",defaultValue:k.gaode.key,showIf:e=>e.map===N.AMAP,category:["Gaode"]}).addTextInput({path:"gaode.plugin",name:"Plugins",description:"Name of the Plugins to use.",defaultValue:k.gaode.plugin,showIf:e=>e.map===N.AMAP,category:["Gaode"]}),e.addTextInput({path:"google.key",name:"Access Key",description:"Set Access Key to use Google Maps. You can get it from https://console.cloud.google.com/apis/credentials",defaultValue:k.google.key,showIf:e=>e.map===N.GMAP,category:["Google"]}).addTextInput({path:"google.callback",name:"Callback",description:"Name of the Callback function.",defaultValue:k.google.callback,showIf:e=>e.map===N.GMAP,category:["Google"]}),e.addRadio({path:"editorMode",name:"Editor Mode",defaultValue:A.VISUAL,settings:{options:D},category:["Editor"]}),e.addCustomEditor({id:"visualEditor",path:"visualEditor",name:"Visual Editor",defaultValue:k.visualEditor,editor:Qne,category:["Visual Editor"],showIf:n}).addSliderInput({path:"visualEditor.codeHeight",name:"Height, px",defaultValue:k.visualEditor.codeHeight,settings:{min:100,max:2e3},category:["Visual Editor"],showIf:n}).addCustomEditor({id:T.VISUALCODE,path:"visualEditor.code",name:"Function",description:"Should return parameters and data for setOption() or an extended result object.",defaultValue:k.visualEditor.code,editor:le,category:["Visual Editor"],showIf:n}),e.addSliderInput({path:"editor.height",name:"Height, px",defaultValue:k.editor.height,settings:{min:100,max:2e3},category:["Code"],showIf:t}).addRadio({path:"editor.format",name:"Formatting",settings:{options:P},defaultValue:k.editor.format,category:["Code"],showIf:t}).addCustomEditor({id:T.CODE,path:"getOption",name:"Function",description:"Should return parameters and data for setOption() or an extended result object.",defaultValue:k.getOption,editor:le,category:["Code"],showIf:t}),e.addSliderInput({path:"themeEditor.height",name:"Height, px",defaultValue:k.themeEditor.height,settings:{min:100,max:2e3},category:["Theme"],showIf:e=>e.themeEditor.name===v.CUSTOM}).addCustomEditor({id:T.THEME,path:"themeEditor.config",name:"Configuration",description:"Custom Theme from the Theme Builder.",defaultValue:k.themeEditor.config,editor:le,category:["Theme"],showIf:e=>e.themeEditor.name===v.CUSTOM}),e})).setDataSupport({annotations:!0,alertStates:!0})})(),d})()));
//# sourceMappingURL=module.js.map