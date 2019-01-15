const zsNume=['Du', 'Lu','Ma','Mi','Jo','Vi','Sa']
const lNume= ['Ian','Feb','Mar','Apr','Mai','Iun','Iul','Aug','Sep','Oct','Nov','Dec']
const obLunileAnSL={ // varianta Scurta : varianta Lunga 
    'Ian':'Ianuarie' 
    ,'Feb':'Februarie'
    ,'Mar':'Martie'
    ,'Apr':'Aprilie'
    ,'Mai':'Mai'
    ,'Iun':'Iunie'
    ,'Iul':'Iulie'
    ,'Aug':'August'
    ,'Sep':'Septembrie'
    ,'Oct':'Octombrie'
    ,'Nov':'Noiembrie'      
    ,'Dec':'Decembrie'
}
const ordLuniAn={
    'Ian':1
    ,'Feb':2
    ,'Mar':3
    ,'Apr':4
    ,'Mai':5
    ,'Iun':6
    ,'Iul':7
    ,'Aug':8
    ,'Sep':9
    ,'Oct':10
    ,'Nov':11
    ,'Dec':12
}

Array.prototype.comuta = function(e){//adauga (daca nu exista) sau scoate  elementul (e) intr-un array cu elemente unice (avu)
    var exista=false
	for(var i = 0; i < this.length; i++) {
        if (e==this[i]){
                       this.splice(i,1)
                       exista=true
        }
    }
    if (!exista) this.push(e)
}

/*
elmCard:{
    titlu:'sale - Sa 2-Dec-2017'
    ,continut:[
        {
          cant: 5
          ,id: 4
          ,nume: "trcou30"
          ,pret: "30"
          ,valoare: 150
        }
    ]
}

    activitate: "sale"
    cumulate: {cant: Array(2), id: Array(2)}
    items: (2) [{…}, {…}]
    zl: "3"
    zla: "Du 3-Dec-2017"
    zszl: "Du 3"
*/

Array.prototype.unique2 = function(){
	var n = {},r=[];
	for(var i = 0; i < this.length; i++)
	{
		if (!n[this[i]])
		{
			n[this[i]] = true;
			r.push(this[i]);
		}
	}
	return r;
}

function v8_getScurtCrr(crr,nivX){//preia un string tip carare(path) crr='root/niv1/niv2'... si return unul mai scurt doar pana la nivelul X ex: getScurtCrr(crr,1) -> 'root/niv1'
    let nl//new length
        ,scurt=crr
    for (let i=-1;i<nivX;i++){
         nl=scurt.lastIndexOf('/')
         scurt=scurt.slice(0,nl)
         }
    return scurt
}
function v9_getScurtCrr(crr,nivX){
    let arr=crr.split('/')
        ,srez=''
    if (nivX<arr.length)
             arr.every((e,i) => {
                srez=srez+e+'/'
                if (i==nivX) return false
                 return true
            })

    return srez=srez.slice(0,srez.length-1)
}
function getScurtCrr(crr,a,b){
    let arr=crr.split('/')
        ,srez=''
    if (b<arr.length){
        for (let i=a;i<=b;i++){
             let e=arr[i]
              srez=srez+e+'/'
        }
      return srez=srez.slice(0,srez.length-1)
    }
}


function formatTimp(date){


    let d=new Date(date),

        zl=d.getDate().toString(),
        zs=zsNume[d.getDay()],
         luna=lNume[d.getMonth()],
        an=d.getFullYear().toString(),
        zszl=zs+" "+zl,
        zslL=zs+" - "+zl+" "+luna,
        orez={
          ziua:d.toDateString(),
          moment:date,
          zszl:zszl,
          luna:luna,
          an:an,
          zl:zl
        }
        return orez;
}

function idCumulareCant(ao){// ao=[{cant:",id:"}...] (app daeStillIdm)
    let  orez={},obc={}
    ao.forEach((e) => {
        e.id.forEach ((e2) => {
           obc[e2]=0
        })
    })
    ao.forEach((e) => {
        e.id.forEach ((e2,i) => {
           obc[e2]+=e.cant[i]
        })
    })
    orez['id']=[]
    orez['cant']=[]

    for (i in obc){
        orez.id.push(i)
        orez.cant.push(obc[i])
    }

    return orez
}
function kReuniune(ao,avuId){//avuId="id"; ao=[{id:["xxx","abc",..],cant:[5,19,2,..],valoare:[70,133,36,..],...},{...},...] expl: un arai de obiecte cu aceiasi k (id,cant,valoare). se cumuleaza valorile corespunzatoare aceluiasi id . avuId trebuie sa fie un arai cu valori unice
    let  orez={},obc={},aK=Object.keys(ao[0])
    
     ao.forEach((ob) => {s
         ak.forEach((k) => {
             orez[k]=0
         })
     })
    ao.forEach((e) => {
        e.id.forEach ((e2) => {
           obc[e2]=0
        })
    })
    ao.forEach((e) => {
        e.id.forEach ((e2,i) => {
           obc[e2]+=e.cant[i]
        })
    })

    orez['id']=[]
    orez['cant']=[]

    for (i in obc){
        orez.id.push(i)
        orez.cant.push(obc[i])
    }

    return orez
}
function okavTOaokv(okav){//primeste un okav si returneaza un aokv
  /* Exemplu
  okav={
          cant:[3,5,8],
          id:[43,56,22],
          val:[230,133,345]
        }
  aokv: [
            0: {cant: 3, id: 43, val: 230}
            1: {cant: 5, id: 56, val: 133}
            2: {cant: 8, id: 22, val: 345}
        ]
*/
    let rAokv=[]
        ,xk=Object.keys(okav)[0]
        ,lung=okav[xk].length
        ,verif=Object.keys(okav).every((e) =>{
                    let k=okav[e].length
                    return k==lung
                })
    if (verif){
        for (let i=0;i<lung;i++){
            let okv={},arr
            Object.keys(okav).forEach((e) => {
                arr=okav[e]
                okv[e]=arr[i]
            })
            rAokv.push(okv)
        }
    }
    return rAokv
}

function arrIdxAokvExtractArrK_okav(aokv,arrIdx,arrK){
    /* pe baza de arrIdx extrage din a[okv[idx]] doar k din arrK

    ex:
    aokv=[{},{}{k1:5,k2:19,k3:22},{k1:12,k2:61,k3:8},{},{}]
    arrIdx=[2,3]
    arrK['k2']
    -----------
    rezultat:
    okav=={k2:[19,61]}
    */
    let rOkav={}
    arrIdx.forEach((e) => {
        let okv=aokv[e]
        Object.keys(okv).forEach((e) => {
            if (arrK.indexOf(e))
            rOkav[e].push=okv[e]
        })
    })
}

function setArrKidDataUlt10(dataArrSalvate10,catalog,arrk){ //seteaza in ob items:{id:[...]} arrK cu valorile id-urilor din catalog  Ex: items:{id:[5,47]} ; arrK['nume'] ; rezultat== items:{... , id:[5,47], nume:['numele id 5', 'numele id 5']}

    let d=dataArrSalvate10
        ,c=catalog
        ,orez={}
    d.forEach((eU10) => {
        arrk.forEach((eK) => {
            orez[eK]=[]
            eU10.items.id.forEach((eId) => {
                 orez[eK].push(catalog[eId][ek])
            })
            eU10.items[eK]=orez[eK]
        })

    })
}

function getObKarrId(arrId,arrK,db){
     let orez={}
         ,ai=arrId
         ,ak=arrK
     ak.forEach((eK) => {
            orez[eK]=[]
            ai.forEach((eId) => {
                 orez[eK].push(db[eId][eK])
            })
        })
    return orez
}

 const dViuz={
    id:['intrare','iesire','vanzare']
    ,pp:['vizibil','nIcon']
    ,vizibil:[true,false,false]
    ,nIcon:['input','launch','plus_one']
}

let orez={
    vizibil:{
        intrare:true
        ,iesire:false
        ,vanzare:false
    }
    ,nIcon:{
        intrare:'fa-in'
        ,iesire:'fa-out'
        ,vanzare:'fa-sale'
    }
}

const anva=['an','luna','zi','activitate']//arr id-uri nivele pornind de la 'an'
class setCopacuQtree{
    constructor(dataCopac,dataItems,arrNivele){
        this.dc=dataCopac
        //this.di=dataItems
        this.rez=[]
    }
    cladescAN(anul){
        let cAnul=this.dc[anul]
            ,sn=new setNodLC(anul)
            ,rootRef=sn.getRootRef()
            ,sortLunarS=function(a,b){ return ordLuniAn[a] - ordLuniAn[b] }
            //LunarS - lunile anului varianta scurta ['ian','feb',...]
         
        aplic.tmpCopac=rootRef

        this.rez=rootRef

        if (cAnul){ //eLuna-elememt Luna ; cLuna - continut eLuna
                Object.keys(cAnul).sort(sortLunarS).forEach((eLuna) => {
                    let cLuna=cAnul[eLuna]
                        ,rn1=sn.urmatoru(obLunileAnSL[eLuna],rootRef)
                     Object.keys(cLuna).forEach((eZiua) => {
                        let cZiua=cLuna[eZiua]
                            ,actvt=Object.keys(cZiua)
                            ,zla=cZiua[actvt[0]].zla
                            ,rn2=sn.urmatoru(zla,rn1)
                            
                        actvt.forEach((eActivitate) => {
                            let nodFinal=cZiua[eActivitate]
                                ,rn3=sn.urmatoru(eActivitate,rn2)
                            nodFinal.cumulate.id.forEach((e,i) => {
                                let elmId=e
                                    ,elmCant=nodFinal.cumulate.cant[i]
                                    ,oId=aplic.catalog[elmId]
                                    ,sRez=oId.id+': '+oId.nume+' - '+elmCant+'x '+oId.pret+'Lei (stoc '+oId.buc+'buc)'
                                //,sRez=elmCant+'x '+oId.nume+':'+oId.id+' - '+oId.pret+'Lei/stoc '+oId.buc+'buc'
                                let rn4=sn.urmatoru(sRez,rn3)
                              
                            })

                        })
                    })
                })
        }

    }
}//class

class setNodLC{//nod de tipul oLB={label:'',childern:[oLB]}
    constructor(label){
        this.root=({label:label, children:[]})
    }
    getRootRef(){
         return this.root
    }
    urmatoru(label,refNod){
     let r=refNod.children
       r.push({
                label:label,
                children:[]
            })
      return r[r.length-1]
    }
    urmFinal(label,refNod){
     let r=refNod.children
         r.push({   label:label     })
    }
}

class arrNinv{//un arr inversat de N elm cu furnizare Elm Scos
    constructor(arr,n){
        this.arr=arr
        this.n=n
        this.elmScos=null
    }
    adaug(elm){
        this.arr.unshift(elm)
        if (this.arr.length>this.n) {
             this.elmScos=this.arr.pop()

        }
    }
}
/*
class obNkv extends arrNinv{
    constructor(obj,nk){
        this.o=obj
        this.nk=nk
        this.arrK=[]
    }
    adaug(oElm){
        this.o[oElm.k]=oElm.v
        this.arrK.unshift(oElm.k)
    }
}
*/



class PropItems {
    constructor (arrId){
       this.ud=arrId
       this.od={}
    }
    adNprop(nume,ai){
        //this.od[nume]={}
        let orez=this.od[nume]={}

        this.ud.forEach(function(e,i){
            orez[e]=ai[i]
        })
    }
    adBooProp(nume){//default value :false
        let orez=this.od[nume]={}

        this.ud.forEach(function(e){
            orez[e]=false
        })
    }
    setActive(numePboo,aid){//set all id from object to :false ...
                            // .. but given array values [aid]:true
        let op=this.od[numePboo]
        if (op){
            for (var k in op){
                op[k]=false
            }
            aid.forEach((e) => {
                op[e]=true
            })
            
        }
    }
}

function totKey(sdao, ak){//sdao - sursa date arr de obj; ak - arrai cu val k de totalizat
    let okt={}
    ak.forEach((e) => {
        okt[e]=0
    })
    sdao.forEach((e) => {
        for (let k in okt){
          if (e[k]) {
                    okt[k]+=e[k]
          }
        }
    })
    return okt
}
function multpAK(sdao, ak, nkrm){//sdao - sursa date arr de obj; ak - ; nkrm-noul k care ca avea caloarea rezultata prin opertia de multiplicare a valorilor din ak 
     // ex: ak['cant', 'pret] , knrm='valoare'. La fiecare obj element al araiului sdao y se va adauga k valoare:cant*pret
    //ex sdao=[{cant:4,pret25},{cant:10,pret:7}] => return [{cant:4,pret25,valoare:100},{cant:10,pret:7,valoare:70}]
   
    let rmk=1
    sdao.forEach((o) => {
        ak.forEach((k) => {
            rmk*=o[k]
        })
        o[nkrm]=rmk
        rmk=1 //reset
    })
}
function totLista(sdao, ak, nkrm, akr){
    multpAK(sdao, ak, nkrm)
    return totKey(sdao, [nkrm,akr])
}

const oLviuu={
        bxSelectare:['listSelect','inputCautare']
}
const oListViuuz={
    bxSelectare:['listSelect','boxFab','carutzXitems','inputCautare','arataStoc','xBifate']
    ,bxCarutz:['carutz','boxFab']
    ,bxIstoric:['istoric','boxFab']
    //,cgEdit:['listSelect','editCatalog','btnAddItemCtg']
    ,cgSelectare:['listSelect','inputCautare','editCatalog']
}
const dButonActivitati={
    id:['listSelect','istoric','carutz','catalog','editCatalog','boxFab','btnAddItemCtg','carutzXitems','inputCautare','arataStoc','xBifate','removeItem']
    //,pp:['vizibil','nIcon']
    //,vizibil:[true,false,false,false]
    ,nIcon:['input','launch','plus_one','face']
}
const oprActivitate={
            int:1,
            out:-1,
            sale:-1
}
const dateleActivitati=[
            {
                label:'Intrare',
                value:'int'
            },
            {
                label:'Esire',
                value:'out'
            },
            {
                label:'Vanzare',
                value:'sale'
            },
      ]
var dateleIstoric=[
      {
        label: 'Satisfied customers',
        children: [
          {
            label: 'Good food',
            children: [
              { label: 'Quality ingredients' },
              { label: 'Good recipe' }
            ]
          },
          {
            label: 'Good service (disabled node)',
            disabled: true,
            children: [
              { label: 'Prompt attention' },
              { label: 'Professional waiter' }
            ]
          },
          {
            label: 'Pleasant surroundings',
            children: [
              { label: 'Happy atmosphere' },
              { label: 'Good table presentation' },
              { label: 'Pleasing decor' }
            ]
          }
        ]
      }
    ]
var ao51=[
 {
   "id": 0,
   "nume": "Brosa 65 - id:0",
   "buc": 2,
   "pret": '65'
 },
 {
   "id": 1,
   "nume": "brosa 40",
   "buc": 1,
   "pret": '40'
 },
 {
   "id": 2,
   "nume": "curea 20",
   "buc": 13,
   "pret": '20'
 },
 {
   "id": 3,
   "nume": "tricou35",
   "buc": 19,
   "pret": '35'
 },
 {
   "id": 4,
   "nume": "trcou30",
   "buc": 26,
   "pret": '30'
 },
 {
   "id": 5,
   "nume": "Bluza E 60",
   "buc": 12,
   "pret": '60'
 },
 {
   "id": 6,
   "nume": "bluza E 50",
   "buc": 2,
   "pret": '50'
 },
 {
   "id": 7,
   "nume": "Bluza LSK",
   "buc": 4,
   "pret": '30'
 },
 {
   "id": 8,
   "nume": "bluza50",
   "buc": 4,
   "pret": '50'
 },
 {
   "id": 9,
   "nume": "bluza60",
   "buc": 3,
   "pret": '60'
 },
 {
   "id": 10,
   "nume": "pulov 55",
   "buc": 3,
   "pret": '55'
 },
 {
   "id": 11,
   "nume": "rochita scurta110",
   "buc": 11,
   "pret": '110'
 },
 {
   "id": 12,
   "nume": "rochita 100",
   "buc": 2,
   "pret": '100'
 },
 {
   "id": 13,
   "nume": "rochita 90",
   "buc": 5,
   "pret": '90'
 },
 {
   "id": 14,
   "nume": "rochita 150",
   "buc": 3,
   "pret": '150'
 },
 {
   "id": 15,
   "nume": "rochita 115",
   "buc": 3,
   "pret": '115'
 },
 {
   "id": 16,
   "nume": "rochita 95",
   "buc": 8,
   "pret": '95'
 },
 {
   "id": 17,
   "nume": "rochita E 145",
   "buc": 3,
   "pret": '145'
 },
 {
   "id": 18,
   "nume": "rochita 80",
   "buc": 2,
   "pret": '80'
 },
 {
   "id": 19,
   "nume": "rochita 45",
   "buc": 16,
   "pret": '45'
 },
 {
   "id": 20,
   "nume": "rochita 85",
   "buc": 5,
   "pret": '85'
 },
 {
   "id": 21,
   "nume": "halat 75",
   "buc": 1,
   "pret": '75'
 },
 {
   "id": 22,
   "nume": "rochita 125",
   "buc": 2,
   "pret": '125'
 },
 {
   "id": 23,
   "nume": "rochita 155",
   "buc": 2,
   "pret": '155'
 },
 {
   "id": 24,
   "nume": "salopeta 125",
   "buc": 4,
   "pret": '125'
 },
 {
   "id": 25,
   "nume": "colier 30",
   "buc": 1,
   "pret": '30'
 },
 {
   "id": 26,
   "nume": "brosa 60",
   "buc": 2,
   "pret": '60'
 },
 {
   "id": 27,
   "nume": "rochita 55",
   "buc": 1,
   "pret": '55'
 },
 {
   "id": 28,
   "nume": "rochita 110",
   "buc": 10,
   "pret": '110'
 },
 {
   "id": 29,
   "nume": "salopeta 100",
   "buc": 4,
   "pret": '100'
 },
 {
   "id": 30,
   "nume": "salopeta E 135",
   "buc": 2,
   "pret": '135'
 },
 {
   "id": 31,
   "nume": "salopeta E 110",
   "buc": 1,
   "pret": '110'
 },
 {
   "id": 32,
   "nume": "rochita E 210",
   "buc": 2,
   "pret": '210'
 },
 {
   "id": 33,
   "nume": "salopeta E 130",
   "buc": 2,
   "pret": '130'
 },
 {
   "id": 34,
   "nume": "salop 95",
   "buc": 1,
   "pret": '95'
 },
 {
   "id": 35,
   "nume": "rochita130",
   "buc": 2,
   "pret": '130'
 },
 {
   "id": 36,
   "nume": "rochita 120",
   "buc": 4,
   "pret": '120'
 },
 {
   "id": 37,
   "nume": "rochita E 90",
   "buc": 8,
   "pret": '90'
 },
 {
   "id": 38,
   "nume": "rochita E 80",
   "buc": 6,
   "pret": '80'
 },
 {
   "id": 39,
   "nume": "rochita 75",
   "buc": 9,
   "pret": '75'
 },
 {
   "id": 40,
   "nume": "rochita tul",
   "buc": 2,
   "pret": '65'
 },
 {
   "id": 41,
   "nume": "fusta 60",
   "buc": 1,
   "pret": '60'
 },
 {
   "id": 42,
   "nume": "pant 70",
   "buc": 8,
   "pret": '70'
 },
 {
   "id": 43,
   "nume": "pant plisati",
   "buc": 3,
   "pret": '55'
 },
 {
   "id": 44,
   "nume": "pant 65",
   "buc": 2,
   "pret": '65'
 },
 {
   "id": 45,
   "nume": "blugi 75",
   "buc": 5,
   "pret": '75'
 },
 {
   "id": 46,
   "nume": "blug alb 85",
   "buc": 1,
   "pret": '85'
 },
 {
   "id": 47,
   "nume": "geaca blug 125",
   "buc": 1,
   "pret": '125'
 },
 {
   "id": 48,
   "nume": "geaca piele 80",
   "buc": 2,
   "pret": '80'
 },
 {
   "id": 49,
   "nume": "cam 55",
   "buc": 4,
   "pret": '55'
 },
 {
   "id": 50,
   "nume": "cam 75",
   "buc": 1,
   "pret": '75'
 },
 {
   "id": 51,
   "nume": "salopeta 110",
   "buc": 3,
   "pret": '110'
 }
]

/*
----------------------------------
setActive(numePboo,id){//set all id from object to :false ...
                            // .. but given id :true
        let op=this.od[numePboo]
        if (op){
            for (var k in op){
                op[k]=false
            }
            op[id]=true
        }
    }
-------------------------------------
const dButonActivitati={
    id:['catalog','istoric','carutz']
    ,pp:['vizibil','nIcon']
    ,vizibil:[true,false,false]
    ,nIcon:['input','launch','plus_one']
}
---------------------------------------------------
cladescAN(anul){
        let cAnul=this.dc[anul]
            ,sn=new setNodLC(anul)
            ,rootRef=sn.getRootRef()
        
        aplic.tmpCopac=rootRef

        this.rez=rootRef

        if (cAnul){
                Object.keys(cAnul).forEach((eLuna) => {
                    let cLuna=cAnul[eLuna]
                        ,rn1=sn.urmatoru(eLuna,rootRef)
                     Object.keys(cLuna).forEach((eZiua) => {
                        let cZiua=cLuna[eZiua]
                            ,rn2=sn.urmatoru(eZiua,rn1)
                        Object.keys(cZiua).forEach((eActivitate) => {
                            let nodFinal=cZiua[eActivitate]
                                ,rn3=sn.urmatoru(eActivitate,rn2)
                            nodFinal.cumulate.id.forEach((e,i) => {
                                let elmId=e
                                    ,elmCant=nodFinal.cumulate.cant[i]
                                    ,oId=aplic.catalog[elmId]
                                    ,sRez=oId.id+': '+oId.nume+' - '+elmCant+'x '+oId.pret+'Lei (stoc '+oId.buc+'buc)'
                                
                                let rn4=sn.urmatoru(sRez,rn3)
                               
                            })

                        })
                    })
                })
        }

    }


*/


