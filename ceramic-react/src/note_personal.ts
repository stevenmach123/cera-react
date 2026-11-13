
//start here
//notice that Sub_Cate_Product group products by sub-general-categories, while SubCate_Brand_Product group products by sub-brand-categories. When made up products, you don't have to mentions every products in sub-general-categories to be included in sub-brand-categories (it's ok to make up some diff products for either SubCate_Brand_Product and Sub_Cate_Product  ) 
//for rooms, each room contain RoomSubCate[], which are sub-general-categories scatters around from SubCates 
BigCates= [{displayName:'',name:"modern_porcelain"},{displayName:'',name:"modern_desk"},{displayName:'',name:"modern_seat"}]
SubCates = [{"name":"modern_porcelain",displayName:'same as ones in BigCates',"sub_cate":[{'displayName':"","name":"kitchen_porcelain","surface_show":true},{'displayName':'',"name":"soft_paste","surface_show":false}, {displayName:'',"name":"porcelain_vase",surface_show:true}   ]},
{name:'modern_desk',"sub_cate":[{'displayName':'',name:'kitchen_desk',surface_show:true}, ] },
{name:'modern_seat',"sub_cate":[{'displayName':'',name:'sectional_sofa',surface_show:true}, {displayName:'',name:'bar_stool',surface_show:false} ]}   
]
Sub_Cate_Product={"subtype_a1":[{displayName:'',name:"a1_item1",big_cate_name:'modern_porcelain',des:"",other_features:['popular'],branch_brand:['toto','toto_subtype1'] }],"subtype_a2":[{}]}

let BrandBigCates= [{name:'toto',displayName:''},{name:'inax',displayName:''}]
let BrandSubCates = [{displayName:'same as ones in  BrandBigCates',name:'toto','sub_cate':[{'displayName':'','name':'toto_subtype1'},{'displayName':'','name':'toto_subtype2'}] },{displayName:'',name:'inax','sub_cate':[]} ]
let SubCate_Brand_Product = {"toto_subtype1":[ {displayName:'',name:"a1_item1",des:"",branch_brand:['toto','toto_subtype1'],popular:true}, {"toto_subtype2":[]} ]}   

type Feature = 'popular' | 'unique' 
type Tofdfdfdsdfsdfsfsdfdfdssfdddsdsds= 'toto_subtype1' | 'toto_subtype2' ...
type Inax_SubType = 'inax_subtype1' | 'inax_subtype2' ...
type Branch_Brand = ['toto',Toto_SubType] | ['inax',Inax_SubType]
type Product = {displayName:string,name:string,big_cate_name:string,sub_cate_name:string,des:string,other_features:Feature[],branch:Branch_Brand} 
type SubCate = {displayName:string,name:string,surface_show:boolean }
type Cates = {name:string,displayName:string,sub_cate:SubCate[]}[]

type BrandProduct = {displayName,name,des,branch_brand:Branch_Brand,popular:boolean}
type SubCateProductProp = {[key:string]:Product}
type SubCateProp = {name,displayName,sub_cate:SubCate[]}
type SubCateBrandProductProp = {[key:string]:BrandProduct} 


---
type RoomSubCate = Partial<SubCate> & {big_cate_name:string} // although RoomSubCate  no contains all instance variable of SubCate

type Collection = {name,displayName:'',product:Partial<Product>[]}
type Room = {displayName:'',name,sub_cate:RoomSubCate[],collection:Collection} 
//each room sub_cate need to be those sub-general-categories of SubCates 
//each room collection are products from Sub_Cate_Product, but don't have to implicitly mentions ones exist in sub-general-categories, it's ok to made up some collection products
let rooms =[{name:'dinning',"sub_cate":[{displayName:"",sub_cate_name:'kitchen_porcelain',big_cate_name:"modern_porcelain"},{displayName:"",sub_cate_name="kitchen_desk",big_cate_name:"modern_desk"} ] ,
    collection:[{displayName:'',name,"products":[{name:'a3_item2',displayName:'',sub_cate_name:"kitchen_porcelain",big_cate_name:"modern_porcelain"},{name:'a2_item2',displayName:'',sub_cate_name:"modern_seat",big_cate_name:"bar_stool"}     ]},{} ]    
}, 
{name:'living',"sub_cate":[{displayName:'',sub_cate_name:'sectional_sofa',big_cate_name:'modern_seat'} ,{displayName:'',sub_cate_name:'porcelain_vase',big_cate_name:'modern_porcelain'} ] }
]

---

// end here

function extract_brand_popular_product(brand:string){
    let brand = 'toto' | 'inax'
    _SubCateProduct = Object.entries(SubCate_Brand_Product).filter((name,obj)=>name.includes(brand) )
    popular_product = Object.entries( _SubCateProduct).reduce((cumu_obj,obj,idx,[]/*start*/)=>{
        for(let product of obj[1]){
            if(product?.popular)
                cumu_obj.push(product)
        }
        return cumu_obj
    }) 
}

popular
    sub_cate_product_dict
    for [sub_cate,values] of Sub_cate_product
        sub_cate_product[sub_cate_name].map(v=>{ const {name,...prop}=v; return[v.name,prop]} )
        product_dict = fromentries()
        sub_cate_product_dict[sub_cate] = product_dict




//relation of some overlap between mock data such as Sub_Cate_Product vs SubCate_Brand_Product, rooms sub_cate vs Subcates , rooms collection vs Sub_Cate_Product. can be creative on construct mock data or types.     
let v = "dfd"
data_item = [{img:'#'},{img:'#'}]
function ImageMap(item)=>{
    item.src.include('#')?<div class="color-img"></div> : <img src={data_item.src} /> 
}
<ImageMap item={data_item} />



const tabCount = tabs.length; 
const [tabPaused,SetTabPaused] = useState<>() 
const [tabIndex,SetTabIndex] = useState(0); 
const [activeTab, setActiveTab] = useState(tabs[0].key);


useEffect(()=>{
    if(tabPaused || tabCount ) return
    const timer = setInterval(()=>
        SetTabIndex(index=>{
            setActiveTab(activeTab[(index+1)%(tabCount+1)])
            return index +1;
        })
    ,[AUTOPLAYTAB_MS])
    return ()=> clearInterval(timer)
},[tabPaused,tabCount])